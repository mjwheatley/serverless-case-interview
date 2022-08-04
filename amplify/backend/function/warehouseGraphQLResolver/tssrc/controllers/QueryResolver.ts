import { getProduct, Inventory } from '../utils';

interface IResolverParams {
  payload: any;
  logger: any;
}

export class QueryResolver {
  async execute({ payload, logger }: IResolverParams) {
    logger.silly(`Trace`, `QueryResolver.execute()`);
    const { fieldName } = payload;
    logger.info(`QueryResolver fieldName`, fieldName);
    // @ts-ignore
    if (!this[fieldName]) {
      throw new Error(`Resolver not found.`);
    } else {
      // @ts-ignore
      return this[fieldName]({ payload, logger });
    }
  }

  async getProductCostOfWarehouse({ payload, logger }: IResolverParams) {
    logger.silly(`Trace`, `QueryResolver.getProductCostOfWarehouse()`);
    const { arguments: { queryString } } = payload;
    const { productId, warehouseId } = JSON.parse(queryString);
    logger.debug(`QueryResolver.getProductCostOfWarehouse()`, { productId, warehouseId });
    const product = await getProduct(productId);
    logger.debug(`QueryResolver.getProductCostOfWarehouse() product`, product);
    const {
      cost,
      inventory
    } = product;
    // @ts-ignore
    const { items } = inventory;
    const productAtWarehouse = items.filter((i: Inventory) => i.warehouseInventoryId === warehouseId);
    logger.debug(`QueryResolver.getProductCostOfWarehouse() productAtWarehouse`, productAtWarehouse);
    let total = 0;
    if (productAtWarehouse?.length) {
      total = productAtWarehouse.reduce((acc: number, value: Inventory) => acc + Number(value.inventory), total);
    }
    const totalCost = total * Number(cost);
    logger.info(`QueryResolver.getProductCostOfWarehouse() totalCost`, totalCost);
    return totalCost;
  }

  async getProductDataFromWarehouses({ payload, logger }: IResolverParams) {
    logger.silly(`Trace`, `QueryResolver.getProductDataFromWarehouses()`);
  }
}
