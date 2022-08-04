export class MutationResolver {
  async execute({ payload, logger }: { payload: any; logger: any }) {
    logger.silly(`Trace`, `MutationResolver.execute()`);
    const { fieldName } = payload;
    logger.info(`MutationResolver fieldName`, fieldName);
    // @ts-ignore
    if (!this[fieldName]) {
      throw new Error(`Resolver not found.`);
    } else {
      // @ts-ignore
      return this[fieldName]({ payload, logger });
    }
  }
}
