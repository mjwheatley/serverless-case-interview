/* eslint-disable id-blacklist,@typescript-eslint/naming-convention */
import gql from 'graphql-tag';
import { DocumentNode, print } from 'graphql';
import https from 'https';
import { URL as urlParse } from 'url';
import AWS, { Endpoint } from 'aws-sdk';

const {
  API_WAREHOUSEGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT: appsyncUrl = ``,
  REGION: region = ``
} = process.env;
const endpoint = new urlParse(appsyncUrl).hostname.toString();

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null'
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type Inventory = {
  __typename: 'Inventory';
  id: string;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  warehouse?: Warehouse | null;
  product?: Product | null;
  createdAt: string;
  updatedAt: string;
  productInventoryId?: string | null;
  warehouseInventoryId?: string | null;
};

export type Warehouse = {
  __typename: 'Warehouse';
  id: string;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  inventory?: ModelInventoryConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelInventoryConnection = {
  __typename: 'ModelInventoryConnection';
  items: Array<Inventory | null>;
  nextToken?: string | null;
};

export type Product = {
  __typename: 'Product';
  id: string;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
  inventory?: ModelInventoryConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateWarehouseInput = {
  id?: string | null;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
};

export type ModelWarehouseConditionInput = {
  warehouseId?: ModelStringInput | null;
  name?: ModelStringInput | null;
  address?: ModelStringInput | null;
  city?: ModelStringInput | null;
  state?: ModelStringInput | null;
  zipcode?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  and?: Array<ModelWarehouseConditionInput | null> | null;
  or?: Array<ModelWarehouseConditionInput | null> | null;
  not?: ModelWarehouseConditionInput | null;
};

export type CreateWarehouseMutation = {
  __typename: 'Warehouse';
  id: string;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  inventory?: {
    __typename: 'ModelInventoryConnection';
    items: Array<{
      __typename: 'Inventory';
      id: string;
      warehouseId: string;
      productId: string;
      inventory?: number | null;
      createdAt: string;
      updatedAt: string;
      productInventoryId?: string | null;
      warehouseInventoryId?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductInput = {
  id?: string | null;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
};

export type ModelProductConditionInput = {
  productId?: ModelStringInput | null;
  name?: ModelStringInput | null;
  manufacturer?: ModelStringInput | null;
  cost?: ModelIntInput | null;
  price?: ModelIntInput | null;
  and?: Array<ModelProductConditionInput | null> | null;
  or?: Array<ModelProductConditionInput | null> | null;
  not?: ModelProductConditionInput | null;
};

export type CreateProductMutation = {
  __typename: 'Product';
  id: string;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
  inventory?: {
    __typename: 'ModelInventoryConnection';
    items: Array<{
      __typename: 'Inventory';
      id: string;
      warehouseId: string;
      productId: string;
      inventory?: number | null;
      createdAt: string;
      updatedAt: string;
      productInventoryId?: string | null;
      warehouseInventoryId?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateInventoryInput = {
  id?: string | null;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  productInventoryId?: string | null;
  warehouseInventoryId?: string | null;
};

export type ModelInventoryConditionInput = {
  warehouseId?: ModelStringInput | null;
  productId?: ModelStringInput | null;
  inventory?: ModelIntInput | null;
  and?: Array<ModelInventoryConditionInput | null> | null;
  or?: Array<ModelInventoryConditionInput | null> | null;
  not?: ModelInventoryConditionInput | null;
  productInventoryId?: ModelIDInput | null;
  warehouseInventoryId?: ModelIDInput | null;
};

export type CreateInventoryMutation = {
  __typename: 'Inventory';
  id: string;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  warehouse?: {
    __typename: 'Warehouse';
    id: string;
    warehouseId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    inventory?: {
      __typename: 'ModelInventoryConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  product?: {
    __typename: 'Product';
    id: string;
    productId: string;
    name: string;
    manufacturer: string;
    cost?: number | null;
    price?: number | null;
    inventory?: {
      __typename: 'ModelInventoryConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  productInventoryId?: string | null;
  warehouseInventoryId?: string | null;
};

export const getSignedRequest = (gqlQuery: DocumentNode, opName: string, variables: any) => {
  const req = new AWS.HttpRequest(new Endpoint(appsyncUrl), region);
  req.method = 'POST';
  req.path = '/graphql';
  req.headers.host = endpoint;
  req.headers['Content-Type'] = 'application/json';
  req.body = JSON.stringify({
    query: print(gqlQuery),
    operationName: opName,
    variables
  });

  // @ts-ignore
  const signer = new AWS.Signers.V4(req, 'appsync', true);
  const credentials = new AWS.EnvironmentCredentials('AWS');
  // @ts-ignore
  signer.addAuthorization(credentials, AWS.util.date.getDate());

  return req;
};

export const issueGQL = async (gqlQuery: DocumentNode, opName: string, variables: any) => {
  const req = getSignedRequest(gqlQuery, opName, variables);
  const { data } = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: req.headers.host }, (result) => {
      let chunks = '';

      result.on('data', (chunk) => {
        chunks += chunk;
      });

      result.on('end', () => {
        resolve(JSON.parse(chunks.toString()));
      });

      result.on('error', (error) => {
        console.log('In result error handler');
        console.log(error);
      });
    });

    httpRequest.on('error', (error) => {
      console.log('In request error handler');
      console.log(error);
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

  return data;
};

export const createWarehouse = async (
  input: CreateWarehouseInput,
  condition?: ModelWarehouseConditionInput
): Promise<CreateWarehouseMutation> => {
  const statement = gql`mutation CreateWarehouse($input: CreateWarehouseInput!, $condition: ModelWarehouseConditionInput) {
        createWarehouse(input: $input, condition: $condition) {
          __typename
          id
          warehouseId
          name
          address
          city
          state
          zipcode
          phoneNumber
          inventory {
            __typename
            items {
              __typename
              id
              warehouseId
              productId
              inventory
              createdAt
              updatedAt
              productInventoryId
              warehouseInventoryId
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
  const gqlAPIServiceArguments: any = {
    input
  };
  if (condition) {
    gqlAPIServiceArguments.condition = condition;
  }
  const data = await issueGQL(statement, 'CreateWarehouse', gqlAPIServiceArguments);
  return data.createWarehouse as CreateWarehouseMutation;
};

export const createProduct = async (
  input: CreateProductInput,
  condition?: ModelProductConditionInput
): Promise<CreateProductMutation> => {
  const statement = gql`mutation CreateProduct($input: CreateProductInput!, $condition: ModelProductConditionInput) {
        createProduct(input: $input, condition: $condition) {
          __typename
          id
          productId
          name
          manufacturer
          cost
          price
          inventory {
            __typename
            items {
              __typename
              id
              warehouseId
              productId
              inventory
              createdAt
              updatedAt
              productInventoryId
              warehouseInventoryId
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
  const gqlAPIServiceArguments: any = {
    input
  };
  if (condition) {
    gqlAPIServiceArguments.condition = condition;
  }
  const data = await issueGQL(statement, 'CreateProduct', gqlAPIServiceArguments);
  return data.createProduct as CreateProductMutation;
};

export const createInventory = async (
  input: CreateInventoryInput,
  condition?: ModelInventoryConditionInput
): Promise<CreateInventoryMutation> => {
  const statement = gql`mutation CreateInventory($input: CreateInventoryInput!, $condition: ModelInventoryConditionInput) {
        createInventory(input: $input, condition: $condition) {
          __typename
          id
          warehouseId
          productId
          inventory
          warehouse {
            __typename
            id
            warehouseId
            name
            address
            city
            state
            zipcode
            phoneNumber
            inventory {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          product {
            __typename
            id
            productId
            name
            manufacturer
            cost
            price
            inventory {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          productInventoryId
          warehouseInventoryId
        }
      }`;
  const gqlAPIServiceArguments: any = {
    input
  };
  if (condition) {
    gqlAPIServiceArguments.condition = condition;
  }
  const data = await issueGQL(statement, 'CreateInventory', gqlAPIServiceArguments);
  return data.createInventory as CreateInventoryMutation;
};
