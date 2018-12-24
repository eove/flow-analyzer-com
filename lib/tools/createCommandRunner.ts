import { createMessageBus, MessageBus } from '@arpinum/messaging';
import { Observable, Subject } from 'rxjs';
import {
  DomainAnswer,
  DomainCommand,
  DomainCommandHandlerFatory
} from '../domain';

interface CommandRunner {
  postCommand: (cmd: DomainCommand) => Promise<{}>;
  answer$: Observable<{}>;
}

interface CommandRunnerDependencies {
  handlerFactories: DomainCommandHandlerFatory[];
  buildCommand: any;
  findAnswers: any;
  transport: any;
  data$: Observable<{}>;
}

export function createCommandRunner(
  dependencies: CommandRunnerDependencies
): CommandRunner {
  const commandBus = createMessageBus();
  const { data$, handlerFactories } = dependencies;
  const answerSource = new Subject();

  createAndRegisterHandlers(commandBus, handlerFactories);

  return {
    postCommand,
    get answer$() {
      return answerSource.asObservable();
    }
  };

  function postCommand(cmd: DomainCommand): Promise<DomainAnswer> {
    return commandBus.post(cmd);
  }

  function createAndRegisterHandlers(
    bus: MessageBus,
    factories: DomainCommandHandlerFatory[]
  ) {
    const unregisterHandlers: any[] = [];
    for (const factory of factories) {
      const instance = factory();
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
