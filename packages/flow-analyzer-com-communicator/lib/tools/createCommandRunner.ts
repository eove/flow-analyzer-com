import { createMessageBus, MessageBus } from '@arpinum/messaging';
import { createQueue } from '@arpinum/promising';
import * as _ from 'lodash';
import { from, Observable, Subject, throwError } from 'rxjs';
import {
  catchError,
  filter,
  first,
  map,
  mergeMap,
  scan,
  timeout,
} from 'rxjs/operators';
import { DomainCommand, DomainCommandHandlerFactory } from '../domain';
import {
  FindAnswerResult,
  findAnswers,
  isAnswerValid,
  ProtocolAnswer,
  ProtocolCommand,
} from '../protocol';
import { Transport } from './createTransport';

export interface ErrorEvent {
  type: CommandError;
  payload: any;
}

interface CommandRunner {
  postCommand: (cmd: DomainCommand) => Promise<{}>;
  answer$: Observable<ProtocolAnswer>;
  error$: Observable<ErrorEvent>;
  command$: Observable<unknown>;
}

interface CommandRunnerOptions {
  maxSequentialErrors?: number;
}

export enum CommandError {
  WriteError = 'maxSequentialErrorsReached',
}

interface CommandRunnerDependencies {
  handlerFactories: DomainCommandHandlerFactory[];
  buildCommand: any;
  debug: any;
  findAnswers: any;
  transport: Transport;
  data$: Observable<unknown>;
  translate?: (msg: string) => string;
  options?: CommandRunnerOptions;
}

export function createCommandRunner(
  dependencies: CommandRunnerDependencies
): CommandRunner {
  const commandBus = createMessageBus({
    ensureAtLeastOneHandler: true,
    exclusiveHandlers: true,
  });
  const {
    data$,
    handlerFactories,
    buildCommand,
    transport,
    debug,
    translate,
    options,
  } = _.defaults({}, dependencies, { translate: (msg: string) => msg });
  const { maxSequentialErrors } = _.defaults({}, options, {
    maxSequentialErrors: 3,
  });
  const commandQueue = createQueue({ concurrency: 1 });
  const commandSource = new Subject();
  const errorSource = new Subject();
  const errorCounters = {
    sequentialWriteErrors: 0,
  };

  const error$ = errorSource.asObservable() as Observable<ErrorEvent>;
  const answer$ = data$.pipe(
    scan(
      (acc: FindAnswerResult, byte: any) => {
        const { remaining: remainingBytes } = acc;
        const received = remainingBytes.concat(...byte);
        const { remaining, answers } = findAnswers(received);
        return { remaining, answers };
      },
      {
        remaining: [],
        answers: [],
      }
    ),
    filter((result: FindAnswerResult) => result.answers.length !== 0),
    map((result: FindAnswerResult) => result.answers),
    mergeMap((x: ProtocolAnswer[]) => from(x))
  );

  createAndRegisterHandlers(
    commandBus,
    handlerFactories ? handlerFactories : []
  );

  return {
    postCommand,
    answer$,
    error$,
    get command$() {
      return commandSource.asObservable();
    },
  };

  function postCommand(cmd: DomainCommand): Promise<{}> {
    return commandBus.post(cmd);
  }

  function runCommand(cmd: ProtocolCommand): Promise<any> {
    const { raw, answerTimeout } = _.defaults({}, cmd, { answerTimeout: 2000 });
    return commandQueue
      .enqueue(() => {
        commandSource.next(cmd);
        if (!transport.connected) {
          return Promise.reject(
            new Error(translate('Flow analyzer disconnected'))
          );
        }
        const answer = waitAnswer(cmd);
        return transport
          .write(raw)
          .then(() => answer)
          .catch(() => {
            throw new Error(translate('Cannot communicate with flow analyzer'));
          });
      })
      .then((result) => {
        initializeErrorCounter();
        return result;
      })
      .catch((e) => {
        mayFireSequentialWriteErrors();
        throw e;
      });

    function waitAnswer(currentCmd: ProtocolCommand) {
      return answer$
        .pipe(
          map((a) => {
            if (isAnswerValid(a)) {
              return a;
            }
            throw new Error(`answer is invalid: ${a}`);
          }),
          filter(isAnswerRelatedToCommand),
          first(),
          timeout(answerTimeout),
          catchError((error) => throwError(error))
        )
        .toPromise();

      function isAnswerRelatedToCommand(a: ProtocolAnswer) {
        return a.type === currentCmd.type && a.id === currentCmd.id;
      }
    }

    function mayFireSequentialWriteErrors() {
      if (errorCounters.sequentialWriteErrors >= maxSequentialErrors) {
        errorSource.next({ type: CommandError.WriteError });
        initializeErrorCounter();
      }
      errorCounters.sequentialWriteErrors += 1;
    }

    function initializeErrorCounter() {
      errorCounters.sequentialWriteErrors = 0;
    }
  }

  function createAndRegisterHandlers(
    bus: MessageBus,
    factories: DomainCommandHandlerFactory[]
  ) {
    const unregisterHandlers: any[] = [];
    for (const factory of factories) {
      const instance = factory({ runCommand, buildCommand, debug });
      bus.register(instance.type, instance.handle);
      unregisterHandlers.push(() => bus.unregisterAll(instance.type));
    }

    return () => {
      for (const unregister of unregisterHandlers) {
        unregister();
      }
    };
  }
}
