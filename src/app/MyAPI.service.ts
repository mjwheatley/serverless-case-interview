/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from '@angular/core';
import API, { graphqlOperation } from '@aws-amplify/api-graphql';
import { APIService, ModelProductFilterInput, ModelWarehouseFilterInput } from './API.service';

export type MyListProductsQuery = {
  __typename: 'ModelProductConnection';
  items: Array<{
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
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
        productInventoryId?: string | null;
        warehouseInventoryId?: string | null;
      }>
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type MyListWarehousesQuery = {
  __typename: 'ModelWarehouseConnection';
  items: Array<{
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
      items: {
        __typename: 'Inventory';
        id: string;
        warehouseId: string;
        productId: string;
        inventory?: number | null;
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
      }
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type MyGetProductQuery = {
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
        createdAt: string;
        updatedAt: string;
      } | null;
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

export type MyGetWarehouseQuery = {
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
      product?: {
        __typename: 'Product';
        id: string;
        productId: string;
        name: string;
        manufacturer: string;
        cost?: number | null;
        price?: number | null;
        createdAt: string;
        updatedAt: string;
      } | null;
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

@Injectable({
  providedIn: 'root'
})
export class MyAPIService extends APIService {
  async ListProducts(
    filter?: ModelProductFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<MyListProductsQuery> {
    const statement = `query ListProducts($filter: ModelProductFilterInput, $limit: Int, $nextToken: String) {
        listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
                  createdAt
                  updatedAt
                }
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
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <MyListProductsQuery>response.data.listProducts;
  }

  async ListWarehouses(
    filter?: ModelWarehouseFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<MyListWarehousesQuery> {
    const statement = `query ListWarehouses($filter: ModelWarehouseFilterInput, $limit: Int, $nextToken: String) {
        listWarehouses(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
                product {
                  __typename
                  id
                  productId
                  name
                  manufacturer
                  cost
                  price
                  createdAt
                  updatedAt
                }
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
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <MyListWarehousesQuery>response.data.listWarehouses;
  }

  async GetProduct(id: string): Promise<MyGetProductQuery> {
    const statement = `query GetProduct($id: ID!) {
        getProduct(id: $id) {
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
                createdAt
                updatedAt
              }
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
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <MyGetProductQuery>response.data.getProduct;
  }

  async GetWarehouse(id: string): Promise<MyGetWarehouseQuery> {
    const statement = `query GetWarehouse($id: ID!) {
        getWarehouse(id: $id) {
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
              product {
                __typename
                id
                productId
                name
                manufacturer
                cost
                price
                createdAt
                updatedAt
              }
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
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <MyGetWarehouseQuery>response.data.getWarehouse;
  }
}
