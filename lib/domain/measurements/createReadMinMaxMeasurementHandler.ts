import * as _ from 'lodash';
import { FrameType } from '../../protocol';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';
import getMeasurementInfos from './getMeasurementInfos';
import makeFormatMeasurementAnswer from './makeFormatMeasurementAnswer';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export default function createReadMinMaxMeasurementHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'READ_MIN_MAX_MEASUREMENT',
    handle: ({ type, payload }: DomainCommand) => {
      debug(`running ${type} command handler...`);
      const {
        sampleDelayMS,
        samplesNb,
        name,
        durationMS,
        sampleRate
      } = extractFromPayload(payload);
      const { divider, unit, id } = getMeasurementInfos(name);
      const format = makeFormatMeasurementAnswer({ name, divider, unit });
      const command = buildCommand({
        type: FrameType.READ_MEASUREMENT,
        id
      });
      debug(
        `will read '${name}' ${samplesNb} times over ${durationMS} ms (sample delay: ${sampleDelayMS} ms, sample rate: ${sampleRate}/s)`
      );
      return Promise.all(
        _.range(samplesNb).map(i =>
          delay(sampleDelayMS * i).then(() => readMeasurement())
        )
      ).then(answers => {
        const { value: min } = _.minBy(answers, 'value');
        const { value: max } = _.maxBy(answers, 'value');
        return {
          id,
          name,
          min,
          max,
          unit
        };
      });

      function readMeasurement(): any {
        return runCommand(command).then(answer => format(answer));
      }
    }
  };
}

function extractFromPayload(payload: any) {
  const { name, durationMS = 500, samplesNb = 10 } = payload;
  if (isNaN(durationMS) || isNaN(samplesNb)) {
    throw new Error(
      `Both samplesNb (${samplesNb}) and durationMS (${durationMS}) must be numbers`
    );
  }
  const sampleDelayMS = durationMS / samplesNb;
  if (sampleDelayMS < 20) {
    throw new Error(
      `samplesNb (${samplesNb}) and durationMS (${durationMS}) result in a sampleDelayMS (${sampleDelayMS}) < 20 ms`
    );
  }
  const sampleRate = 1000 / sampleDelayMS;
  return { name, sampleDelayMS, samplesNb, durationMS, sampleRate };
}
