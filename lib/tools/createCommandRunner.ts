import { createMessageBus, MessageBus } from '@arpinum/messaging';
import { Observable, throwError } from 'rxjs';
import {
  catchError,
  filter,
  flatMap,
  map,
  scan,
  tap,
  timeout
} from 'rxjs/operators';

import {
  DomainAnswer,
  DomainCommand,
  DomainCommandHandlerFatory
} from '../domain';
import { findAnswers, ProtocolAnswer, ProtocolCommand } from '../protocol';
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
  const answer$ = data$.pipe(
    tap(data => debug('received:', data)),
    scan((acc, bytes) => acc.concat(bytes), []),
    map(data => {
      const result = findAnswers(data);
      return result.answers;
    }),
    flatMap(x => x)
  );

  createAndRegisterHandlers(commandBus, handlerFactories);

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
    return transport.write(raw).then(() => answer);

    function waitAnswer(currentCmd: ProtocolCommand) {
      return commandAnswer$()
        .pipe(
          tap(
            () => undefined,
            error => debug('error when waiting answer', error)
          ),
          timeout(2000),
          catchError(error => throwError(error))
        )
        .toPromise();

      function commandAnswer$() {
        return answer$.pipe(filter(a => a.type === currentCmd.type));
      }
    }
  }

  function createAndRegisterHandlers(
    bus: MessageBus,
    factories: DomainCommandHandlerFatory[]
  ) {
    const unregisterHandlers: any[] = [];
    for (const factory of factories) {
      const instance = factory({ runCommand, buildCommand });
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
