import { MessageBus } from '@arpinum/messaging';
import { Observable, Subject } from 'rxjs';
import { DomainAnswer, DomainCommand } from '../domain';

interface CommandRunner {
  runCommand: (cmd: DomainCommand) => Promise<{}>;
  answer$: Observable<{}>;
}

interface CommandRunnerDependencies {
  messageBus: MessageBus;
  data$: Observable<{}>;
}

export function createCommandRunner(
  dependencies: CommandRunnerDependencies
): CommandRunner {
  const { messageBus, data$ } = dependencies;
  const answerSource = new Subject();

  return {
    runCommand,
    get answer$() {
      return answerSource.asObservable();
    }
  };

  function runCommand(cmd: DomainCommand): Promise<DomainAnswer> {
    return Promise.resolve({});
  }
}
