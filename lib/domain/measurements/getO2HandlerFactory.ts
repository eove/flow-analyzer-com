import { DomainCommandHandler } from '../DomainTypes';

export function createO2Handler(): DomainCommandHandler {
  return {
    type: 'GET_O2_HANDLER',
    handle: () => {
      return Promise.resolve({ payload: 'coucou' });
    }
  };
}
