import { createMessageBus, MessageBus } from '@arpinum/messaging';
import { createQueue } from '@arpinum/promising';
import { from, Observable, throwError } from 'rxjs';
import {
  catchError,
  filter,
  first,
  map,
  mergeMap,
  scan,
  tap,
  timeout
} from 'rxjs/operators';

import {
  DomainAnswer,
  DomainCommand,
  DomainCommandHandlerFatory
} from '../domain';
import {
  FindAnswerResult,
  findAnswers,
  ProtocolAnswer,
  ProtocolCommand
} from '../protocol';
import { Transport } from './createTransport';

interface CommandRunner {
  postCommand: (cmd: DomainCommand) => Promise<{}>;
  answer$: Observable<ProtocolAnswer>;
}

interface CommandRunnerDependencies {
  handlerFactories: DomainCommandHandlerFatory[];
  buildCommand: any;
  debug: any;
  findAnswers: any;
  transport: Transport;
  data$: Observable<any>;
}

export function createCommandRunner(
  dependencies: CommandRunnerDependencies
): CommandRunner {
  const commandBus = createMessageBus();
  const {
    data$,
    handlerFactories,
    buildCommand,
    transport,
    debug
  } = dependencies;
  const commandQueue = createQueue({ capacity: 1 });

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
    mergeMap((x: ProtocolAnswer[]) => from(x)),
    tap(x => debug('answer', x))
  );

  createAndRegisterHandlers(
    commandBus,
    handlerFactories ? handlerFactories : []
  );

  return {
    postCommand,
    answer$
  };

  function postCommand(cmd: DomainCommand): Promise<DomainAnswer> {
    return commandBus.post(cmd);
  }

  function runCommand(cmd: ProtocolCommand) {
    const { raw } = cmd;
    const answer = waitAnswer(cmd);
    return commandQueue.enqueue(() => transport.write(raw).then(() => answer));

    function waitAnswer(currentCmd: ProtocolCommand) {
      return commandAnswer$()
        .pipe(
          timeout(5000),
          catchError(error => throwError(error))
        )
        .toPromise();

      function commandAnswer$() {
        return answer$.pipe(
          filter(a => a.type === currentCmd.type),
          first()
        );
      }
    }
  }

  function createAndRegisterHandlers(
    bus: MessageBus,
    factories: DomainCommandHandlerFatory[]
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
