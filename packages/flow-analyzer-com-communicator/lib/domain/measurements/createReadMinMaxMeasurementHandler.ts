import * as _ from 'lodash';
import { FrameType } from '../../protocol';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import getMeasurementInfos from './getMeasurementInfos';
import makeFormatMeasurementAnswer from './makeFormatMeasurementAnswer';

/* Note on sample delay limitation

communication is 19200 bauds => 1900 Byte/s => ~0.53 ms/Byte

For big exchanges (command and corresponding null-value answer):
  - command: '%RM#12$\r'
  - answer: '%RM#12$-2147483648\r'
      => total: 27 bytes < 30 bytes

 30 bytes <=> 30 * 0.53 ms = 15.9 ms

 So minimal inter-command delay should be set to 20 ms
*/

const MIN_SAMPLE_DELAY_MS = 20;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function createReadMinMaxMeasurementHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'READ_MIN_MAX_MEASUREMENT',
    handle: ({ type, payload }: DomainCommand) => {
      debug(`running ${type} command handler...`);
      const { sampleDelayMS, samplesNb, name, durationMS, sampleRate } =
        extractFromPayload(payload);
      const { divider, unit, id } = getMeasurementInfos(name);
      const format = makeFormatMeasurementAnswer({ name, id, divider, unit });
      const command = buildCommand({
        type: FrameType.READ_MEASUREMENT,
        id,
      });
      debug(
        `will read '${name}' ${samplesNb} times over ${durationMS} ms (sample delay: ${sampleDelayMS} ms, sample rate: ${sampleRate}/s)`
      );
      return Promise.all(
        _.range(samplesNb).map((i) =>
          delay(sampleDelayMS * i).then(() => readMeasurement())
        )
      ).then((answers) => ({
        id,
        name,
        min: minFrom(answers),
        max: maxFrom(answers),
        unit,
        values: answers,
      }));

      function readMeasurement(): any {
        return runCommand(command).then((answer) => format(answer));
      }

      function minFrom(answers: any[]) {
        const min = _.minBy(answers, 'value');
        return min ? min.value : undefined;
      }

      function maxFrom(answers: any[]) {
        const max = _.maxBy(answers, 'value');
        return max ? max.value : undefined;
      }
    },
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
  if (sampleDelayMS < MIN_SAMPLE_DELAY_MS) {
    throw new Error(
      `samplesNb (${samplesNb}) and durationMS (${durationMS}) result in a sampleDelayMS (${sampleDelayMS}) < 20 ms`
    );
  }
  const sampleRate = 1000 / sampleDelayMS;
  return { name, sampleDelayMS, samplesNb, durationMS, sampleRate };
}
