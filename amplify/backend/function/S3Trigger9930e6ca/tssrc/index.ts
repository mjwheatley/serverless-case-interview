/* eslint-disable @typescript-eslint/naming-convention */
import { Handler } from '@mawhea/module-lambda-handlers';
import { Controller } from './controllers';

const {
  LOG_LEVEL = `silly`
} = process.env;

class MyHandler extends Handler {
  validateEvent(): boolean {
    return !!this.event.Records?.[0]?.s3;
  }

  setPayloadFromEvent() {
    this.payload = this.event.Records[0].s3;
  }
}

export const handler = async (event: any, context: any) => {
  const h = new MyHandler({event, context});
  h.logger.updateConfig({ config: { logger: { LOG_LEVEL } } });
  const controller = new Controller();
  return h.handleIt({ controller });
};
