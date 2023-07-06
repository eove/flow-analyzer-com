import { FrameType } from '../../protocol';
import { DeviceType } from '../DeviceType';
import { DomainCommandHandlerFactoryDependencies } from '../DomainTypes';

export function makeGetDeviceType(
  dependencies: DomainCommandHandlerFactoryDependencies
) {
  const { runCommand, buildCommand } = dependencies;

  return async function getDeviceType(): Promise<string | undefined> {
    try {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 12,
      });
      const deviceType = await runCommand(command).then(
        (answer) => `${answer.value}`
      );
      return decodeDeviceType(deviceType);
    } catch (error) {
      return undefined;
    }
  };
}

function decodeDeviceType(value: string): string {
  switch (value) {
    case '1':
      return DeviceType.CITREX_H4;
    case '2':
      return DeviceType.VT305;
    case '3':
      return DeviceType.CITREX_H5;
    case '4':
      return DeviceType.CITREX_H3;
    case '5':
      return DeviceType.PF300_PRO;
    case '6':
      return DeviceType.FLOW_METER_F1;
    case '7':
      return DeviceType.FLOW_METER_F2;

    default:
      return DeviceType.INVALID;
  }
}
