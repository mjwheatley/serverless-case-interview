/* eslint-disable @typescript-eslint/naming-convention,max-len */
/* Amplify Params - DO NOT EDIT
	API_WAREHOUSEGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_WAREHOUSEGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_WAREHOUSEGRAPHQL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { AppSyncResolverHandler, Context } from 'aws-lambda';
import { Handler } from '@mawhea/module-lambda-handlers';
import { MutationResolver, QueryResolver } from './controllers';

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers: any = {
  Query: QueryResolver,
  Mutation: MutationResolver
};

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
export const handler: AppSyncResolverHandler<any, any> = async (event: any, context: Context) => {
  const h = new Handler({ event, context });
  h.setPayloadFromEvent();
  const { typeName } = event;
  const controller = new resolvers[typeName]();
  if (controller) {
    return await h.startController({ controller });
  }
  throw new Error('Resolver not found.');
};
