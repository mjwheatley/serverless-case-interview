/* eslint-disable @typescript-eslint/naming-convention */
import csvtojson from 'csvtojson';
import { S3 } from 'aws-sdk';
import { createInventory, createProduct, createWarehouse } from '../utils';

const s3 = new S3();

interface IController {
  execute: (params: { payload: any; logger: any }) => Promise<any>;
  warehouses: (params: IExecuteType) => Promise<void>;
  products: (params: IExecuteType) => Promise<void>;
  inventory: (params: IExecuteType) => Promise<void>;
}

interface IExecuteType {
  csvJson: any;
  logger: any;
}

export class Controller implements IController {
  async execute({ payload, logger }: { payload: any; logger: any }) {
    const bucket = payload.bucket.name;
    const key = payload.object.key;
    logger.debug(`Bucket: ${bucket}`, `Key: ${key}`);
    const type: string = key.split(`/`)[1];

    const stream = await s3.getObject({
      Bucket: bucket,
      Key: key
    }).createReadStream();
    const data = await csvtojson().fromStream(stream);

    // @ts-ignore
    await this[type]({ csvJson: data, logger });
    return {
      success: true
    };
  }

  async warehouses({ csvJson, logger }: IExecuteType) {
    logger.silly(`Controller.warehouses()`, csvJson);
    const promises = [];
    for (const item of csvJson) {
      const {
        warehouse_id: warehouseId,
        name,
        address,
        city,
        state,
        zipcode,
        'phone-number': phoneNumber
      } = item;
      promises.push(createWarehouse({
        warehouseId,
        name,
        address,
        city,
        state,
        zipcode,
        phoneNumber
      }));
    }
    const allSettledResults = await Promise.allSettled(promises);
    allSettledResults.forEach((result) => {
      if (result.status !== `fulfilled`) {
        logger.warn(`Failed to create warehouse record`, result.reason);
      }
    });
  }

  async products({ csvJson, logger }: IExecuteType) {
    logger.silly(`Controller.products()`, csvJson);
    const promises = [];
    for (const item of csvJson) {
      const {
        product_id: productId,
        name,
        manufacturer,
        cost,
        price
      } = item;
      promises.push(createProduct({
        name,
        productId,
        manufacturer,
        cost,
        price
      }));
    }
    const allSettledResults = await Promise.allSettled(promises);
    allSettledResults.forEach((result) => {
      if (result.status !== `fulfilled`) {
        logger.warn(`Failed to create product record`, result.reason);
      }
    });
  }

  async inventory({ csvJson, logger }: IExecuteType) {
    logger.silly(`Controller.inventory()`, csvJson);
    const promises = [];
    for (const item of csvJson) {
      const {
        warehouse_id: warehouseId,
        product_id: productId,
        inventory
      } = item;
      promises.push(createInventory({
        warehouseId,
        warehouseInventoryId: warehouseId,
        productId,
        productInventoryId: productId,
        inventory
      }));
    }
    const allSettledResults = await Promise.allSettled(promises);
    allSettledResults.forEach((result) => {
      if (result.status !== `fulfilled`) {
        logger.warn(`Failed to create inventory record`, result.reason);
      }
    });
  }
}
