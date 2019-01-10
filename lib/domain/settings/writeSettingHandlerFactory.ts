import * as _ from 'lodash';
import { FrameType, ProtocolAnswer, ProtocolCommand } from '../../protocol';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';
import getSettingInfos from './getSettingInfos';

export function createWriteSettingHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'WRITE_SETTING',
    handle: ({ type, payload }: DomainCommand) => {
      debug(`running ${type} command handler...`);

      const { name, value } = payload;
      const {
        id,
        nameToValue = (v: any) => v,
        valueToName = (v: any) => v,
        allNames,
        allValues
      } = getSettingInfos(name);

      const command = buildCommand(
        {
          type: FrameType.WRITE_SETTING,
          id,
          value: buildValue(value)
        },
        { answerTimeout: 10000 }
      );

      return runCommand(command).then(answer => {
        return isAnswerOk(answer, command)
          ? Promise.resolve(answer)
          : Promise.reject(
              new Error(`Failed to write ${command.value} to ${command.id}`)
            );
      });

      function buildValue(v: any): string {
        const computed = isNaN(v)
          ? nameToValue(v)
          : valueToName(v)
          ? `${v}`
          : undefined;

        if (computed === undefined) {
          throw new Error(
            `'${v}' is not a valid value, supported named ones: [${allNames()}] or corresponding values: [${allValues()}]`
          );
        }
        return computed;
      }

      function isAnswerOk(ans: ProtocolAnswer, cmd: ProtocolCommand): boolean {
        return ans.raw === cmd.raw;
      }
    }
  };
}