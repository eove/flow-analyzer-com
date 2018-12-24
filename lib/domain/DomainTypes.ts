export interface DomainCommand {
  type: string;
  payload: object;
}

export interface DomainAnswer {
  payload: any;
}

export interface DomainCommandHandler {
  type: string;
  handle: (command?: DomainCommand) => Promise<DomainAnswer>;
}

export type DomainCommandHandlerFatory = () => DomainCommandHandler;
