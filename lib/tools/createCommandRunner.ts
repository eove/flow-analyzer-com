import { createMessageBus, MessageBus } from '@arpinum/messaging';
import { createQueue } from '@arpinum/promising';
import { from, Observable, Subject, throwError } from 'rxjs';
import {
  catchError,
  filter,
  first,
  map,
  mergeMap,
  publish,
  refCount,
  scan,
  timeout
} from 'rxjs/operators';

import {
  DeviceTypes,
  DomainCommand,
  DomainCommandHandlerFactory
} from '../domain';
import {
  FindAnswerResult,
  findAnswers,
  isAnswerValid,
  ProtocolAnswer,
  ProtocolCommand
} from '../protocol';
import { Transport } from './createTransport';

interface CommandRunner {
  postCommand: (cmd: DomainCommand) => Promise<{}>;
  answer$: Observable<ProtocolAnswer>;
  command$: Observable<{}>;
}

interface CommandRunnerDependencies {
  deviceType: DeviceTypes;
  handlerFactories: DomainCommandHandlerFactory[];
  buildCommand: any;
  debug: any;
  findAnswers: any;
  transport: Transport;
  data$: Observable<any>;
}

export function createCommandRunner(
  dependencies: CommandRunnerDependencies
): CommandRunner {
  const commandBus = createMessageBus({
    ensureAtLeastOneHandler: true,
    exclusiveHandlers: true
  });
  const {
    deviceType,
    data$,
    handlerFactories,
    buildCommand,
    transport,
    debug
  } = dependencies;
  const commandQueue = createQueue({ concurrency: 1 });
  const commandSource = new Subject();

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
        answers: []
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
    get command$() {
      return commandSource.asObservable();
    }
  };

  function postCommand(cmd: DomainCommand): Promise<{}> {
    return commandBus.post(cmd);
  }

  function runCommand(cmd: ProtocolCommand) {
    const { raw, answerTimeout } = cmd;
    return commandQueue.enqueue(() => {
      commandSource.next(cmd);
      const answer = waitAnswer(cmd);
      return transport.write(raw).then(() => answer);
    });

    function waitAnswer(currentCmd: ProtocolCommand) {
      return commandAnswer$()
        .pipe(
          timeout(answerTimeout),
          catchError(error => throwError(error))
        )
        .toPromise();

      function commandAnswer$() {
        return answer$.pipe(
          publish(),
          refCount(),
          filter(isAnswerRelatedToCommand),
          map(a =>
            isAnswerValid(a)
              ? a
              : throwError(new Error('device answer says: invalid! :('))
          ),
          first()
        );
      }

      function isAnswerRelatedToCommand(a: ProtocolAnswer) {
        if (a.type === currentCmd.type && a.id && a.id === currentCmd.id) {
          return true;
        }
        return false;
      }
    }
  }

  function createAndRegisterHandlers(
    bus: MessageBus,
    factories: DomainCommandHandlerFactory[]
  ) {
    const unregisterHandlers: any[] = [];
    for (const factory of factories) {
      const instance = factory({ runCommand, buildCommand, debug, deviceType });
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
