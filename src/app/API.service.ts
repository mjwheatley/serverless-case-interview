/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateInventory: OnCreateInventorySubscription;
  onUpdateInventory: OnUpdateInventorySubscription;
  onDeleteInventory: OnDeleteInventorySubscription;
  onCreateProduct: OnCreateProductSubscription;
  onUpdateProduct: OnUpdateProductSubscription;
  onDeleteProduct: OnDeleteProductSubscription;
  onCreateWarehouse: OnCreateWarehouseSubscription;
  onUpdateWarehouse: OnUpdateWarehouseSubscription;
  onDeleteWarehouse: OnDeleteWarehouseSubscription;
};

export type UpdateInventoryInput = {
  id: string;
  warehouseId?: string | null;
  productId?: string | null;
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

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
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
  __typename: "Inventory";
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
  __typename: "Warehouse";
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
  __typename: "ModelInventoryConnection";
  items: Array<Inventory | null>;
  nextToken?: string | null;
};

export type Product = {
  __typename: "Product";
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

export type DeleteInventoryInput = {
  id: string;
};

export type UpdateProductInput = {
  id: string;
  productId?: string | null;
  name?: string | null;
  manufacturer?: string | null;
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

export type DeleteProductInput = {
  id: string;
};

export type UpdateWarehouseInput = {
  id: string;
  warehouseId?: string | null;
  name?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  phoneNumber?: string | null;
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

export type DeleteWarehouseInput = {
  id: string;
};

export type CreateInventoryInput = {
  id?: string | null;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  productInventoryId?: string | null;
  warehouseInventoryId?: string | null;
};

export type CreateProductInput = {
  id?: string | null;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
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

export type ModelInventoryFilterInput = {
  id?: ModelIDInput | null;
  warehouseId?: ModelStringInput | null;
  productId?: ModelStringInput | null;
  inventory?: ModelIntInput | null;
  and?: Array<ModelInventoryFilterInput | null> | null;
  or?: Array<ModelInventoryFilterInput | null> | null;
  not?: ModelInventoryFilterInput | null;
  productInventoryId?: ModelIDInput | null;
  warehouseInventoryId?: ModelIDInput | null;
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null;
  productId?: ModelStringInput | null;
  name?: ModelStringInput | null;
  manufacturer?: ModelStringInput | null;
  cost?: ModelIntInput | null;
  price?: ModelIntInput | null;
  and?: Array<ModelProductFilterInput | null> | null;
  or?: Array<ModelProductFilterInput | null> | null;
  not?: ModelProductFilterInput | null;
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection";
  items: Array<Product | null>;
  nextToken?: string | null;
};

export type ModelWarehouseFilterInput = {
  id?: ModelIDInput | null;
  warehouseId?: ModelStringInput | null;
  name?: ModelStringInput | null;
  address?: ModelStringInput | null;
  city?: ModelStringInput | null;
  state?: ModelStringInput | null;
  zipcode?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  and?: Array<ModelWarehouseFilterInput | null> | null;
  or?: Array<ModelWarehouseFilterInput | null> | null;
  not?: ModelWarehouseFilterInput | null;
};

export type ModelWarehouseConnection = {
  __typename: "ModelWarehouseConnection";
  items: Array<Warehouse | null>;
  nextToken?: string | null;
};

export type UpdateInventoryMutation = {
  __typename: "Inventory";
  id: string;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  warehouse?: {
    __typename: "Warehouse";
    id: string;
    warehouseId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    inventory?: {
      __typename: "ModelInventoryConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  product?: {
    __typename: "Product";
    id: string;
    productId: string;
    name: string;
    manufacturer: string;
    cost?: number | null;
    price?: number | null;
    inventory?: {
      __typename: "ModelInventoryConnection";
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

export type DeleteInventoryMutation = {
  __typename: "Inventory";
  id: string;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  warehouse?: {
    __typename: "Warehouse";
    id: string;
    warehouseId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    inventory?: {
      __typename: "ModelInventoryConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  product?: {
    __typename: "Product";
    id: string;
    productId: string;
    name: string;
    manufacturer: string;
    cost?: number | null;
    price?: number | null;
    inventory?: {
      __typename: "ModelInventoryConnection";
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

export type UpdateProductMutation = {
  __typename: "Product";
  id: string;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type DeleteProductMutation = {
  __typename: "Product";
  id: string;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type UpdateWarehouseMutation = {
  __typename: "Warehouse";
  id: string;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type DeleteWarehouseMutation = {
  __typename: "Warehouse";
  id: string;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type CreateInventoryMutation = {
  __typename: "Inventory";
  id: string;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  warehouse?: {
    __typename: "Warehouse";
    id: string;
    warehouseId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    inventory?: {
      __typename: "ModelInventoryConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  product?: {
    __typename: "Product";
    id: string;
    productId: string;
    name: string;
    manufacturer: string;
    cost?: number | null;
    price?: number | null;
    inventory?: {
      __typename: "ModelInventoryConnection";
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

export type CreateProductMutation = {
  __typename: "Product";
  id: string;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type CreateWarehouseMutation = {
  __typename: "Warehouse";
  id: string;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type GetInventoryQuery = {
  __typename: "Inventory";
  id: string;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  warehouse?: {
    __typename: "Warehouse";
    id: string;
    warehouseId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    inventory?: {
      __typename: "ModelInventoryConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  product?: {
    __typename: "Product";
    id: string;
    productId: string;
    name: string;
    manufacturer: string;
    cost?: number | null;
    price?: number | null;
    inventory?: {
      __typename: "ModelInventoryConnection";
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

export type ListInventoriesQuery = {
  __typename: "ModelInventoryConnection";
  items: Array<{
    __typename: "Inventory";
    id: string;
    warehouseId: string;
    productId: string;
    inventory?: number | null;
    warehouse?: {
      __typename: "Warehouse";
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
    product?: {
      __typename: "Product";
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
};

export type GetProductQuery = {
  __typename: "Product";
  id: string;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type ListProductsQuery = {
  __typename: "ModelProductConnection";
  items: Array<{
    __typename: "Product";
    id: string;
    productId: string;
    name: string;
    manufacturer: string;
    cost?: number | null;
    price?: number | null;
    inventory?: {
      __typename: "ModelInventoryConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetWarehouseQuery = {
  __typename: "Warehouse";
  id: string;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type ListWarehousesQuery = {
  __typename: "ModelWarehouseConnection";
  items: Array<{
    __typename: "Warehouse";
    id: string;
    warehouseId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    inventory?: {
      __typename: "ModelInventoryConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateInventorySubscription = {
  __typename: "Inventory";
  id: string;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  warehouse?: {
    __typename: "Warehouse";
    id: string;
    warehouseId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    inventory?: {
      __typename: "ModelInventoryConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  product?: {
    __typename: "Product";
    id: string;
    productId: string;
    name: string;
    manufacturer: string;
    cost?: number | null;
    price?: number | null;
    inventory?: {
      __typename: "ModelInventoryConnection";
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

export type OnUpdateInventorySubscription = {
  __typename: "Inventory";
  id: string;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  warehouse?: {
    __typename: "Warehouse";
    id: string;
    warehouseId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    inventory?: {
      __typename: "ModelInventoryConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  product?: {
    __typename: "Product";
    id: string;
    productId: string;
    name: string;
    manufacturer: string;
    cost?: number | null;
    price?: number | null;
    inventory?: {
      __typename: "ModelInventoryConnection";
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

export type OnDeleteInventorySubscription = {
  __typename: "Inventory";
  id: string;
  warehouseId: string;
  productId: string;
  inventory?: number | null;
  warehouse?: {
    __typename: "Warehouse";
    id: string;
    warehouseId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    inventory?: {
      __typename: "ModelInventoryConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  product?: {
    __typename: "Product";
    id: string;
    productId: string;
    name: string;
    manufacturer: string;
    cost?: number | null;
    price?: number | null;
    inventory?: {
      __typename: "ModelInventoryConnection";
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

export type OnCreateProductSubscription = {
  __typename: "Product";
  id: string;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type OnUpdateProductSubscription = {
  __typename: "Product";
  id: string;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type OnDeleteProductSubscription = {
  __typename: "Product";
  id: string;
  productId: string;
  name: string;
  manufacturer: string;
  cost?: number | null;
  price?: number | null;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type OnCreateWarehouseSubscription = {
  __typename: "Warehouse";
  id: string;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type OnUpdateWarehouseSubscription = {
  __typename: "Warehouse";
  id: string;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

export type OnDeleteWarehouseSubscription = {
  __typename: "Warehouse";
  id: string;
  warehouseId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  inventory?: {
    __typename: "ModelInventoryConnection";
    items: Array<{
      __typename: "Inventory";
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

@Injectable({
  providedIn: "root"
})
export class APIService {
  async UpdateInventory(
    input: UpdateInventoryInput,
    condition?: ModelInventoryConditionInput
  ): Promise<UpdateInventoryMutation> {
    const statement = `mutation UpdateInventory($input: UpdateInventoryInput!, $condition: ModelInventoryConditionInput) {
        updateInventory(input: $input, condition: $condition) {
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateInventoryMutation>response.data.updateInventory;
  }
  async DeleteInventory(
    input: DeleteInventoryInput,
    condition?: ModelInventoryConditionInput
  ): Promise<DeleteInventoryMutation> {
    const statement = `mutation DeleteInventory($input: DeleteInventoryInput!, $condition: ModelInventoryConditionInput) {
        deleteInventory(input: $input, condition: $condition) {
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteInventoryMutation>response.data.deleteInventory;
  }
  async UpdateProduct(
    input: UpdateProductInput,
    condition?: ModelProductConditionInput
  ): Promise<UpdateProductMutation> {
    const statement = `mutation UpdateProduct($input: UpdateProductInput!, $condition: ModelProductConditionInput) {
        updateProduct(input: $input, condition: $condition) {
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateProductMutation>response.data.updateProduct;
  }
  async DeleteProduct(
    input: DeleteProductInput,
    condition?: ModelProductConditionInput
  ): Promise<DeleteProductMutation> {
    const statement = `mutation DeleteProduct($input: DeleteProductInput!, $condition: ModelProductConditionInput) {
        deleteProduct(input: $input, condition: $condition) {
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteProductMutation>response.data.deleteProduct;
  }
  async UpdateWarehouse(
    input: UpdateWarehouseInput,
    condition?: ModelWarehouseConditionInput
  ): Promise<UpdateWarehouseMutation> {
    const statement = `mutation UpdateWarehouse($input: UpdateWarehouseInput!, $condition: ModelWarehouseConditionInput) {
        updateWarehouse(input: $input, condition: $condition) {
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateWarehouseMutation>response.data.updateWarehouse;
  }
  async DeleteWarehouse(
    input: DeleteWarehouseInput,
    condition?: ModelWarehouseConditionInput
  ): Promise<DeleteWarehouseMutation> {
    const statement = `mutation DeleteWarehouse($input: DeleteWarehouseInput!, $condition: ModelWarehouseConditionInput) {
        deleteWarehouse(input: $input, condition: $condition) {
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteWarehouseMutation>response.data.deleteWarehouse;
  }
  async CreateInventory(
    input: CreateInventoryInput,
    condition?: ModelInventoryConditionInput
  ): Promise<CreateInventoryMutation> {
    const statement = `mutation CreateInventory($input: CreateInventoryInput!, $condition: ModelInventoryConditionInput) {
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateInventoryMutation>response.data.createInventory;
  }
  async CreateProduct(
    input: CreateProductInput,
    condition?: ModelProductConditionInput
  ): Promise<CreateProductMutation> {
    const statement = `mutation CreateProduct($input: CreateProductInput!, $condition: ModelProductConditionInput) {
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateProductMutation>response.data.createProduct;
  }
  async CreateWarehouse(
    input: CreateWarehouseInput,
    condition?: ModelWarehouseConditionInput
  ): Promise<CreateWarehouseMutation> {
    const statement = `mutation CreateWarehouse($input: CreateWarehouseInput!, $condition: ModelWarehouseConditionInput) {
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
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateWarehouseMutation>response.data.createWarehouse;
  }
  async GetInventory(id: string): Promise<GetInventoryQuery> {
    const statement = `query GetInventory($id: ID!) {
        getInventory(id: $id) {
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
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetInventoryQuery>response.data.getInventory;
  }
  async ListInventories(
    filter?: ModelInventoryFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListInventoriesQuery> {
    const statement = `query ListInventories($filter: ModelInventoryFilterInput, $limit: Int, $nextToken: String) {
        listInventories(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    return <ListInventoriesQuery>response.data.listInventories;
  }
  async GetProduct(id: string): Promise<GetProductQuery> {
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
    return <GetProductQuery>response.data.getProduct;
  }
  async ListProducts(
    filter?: ModelProductFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListProductsQuery> {
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
    return <ListProductsQuery>response.data.listProducts;
  }
  async GetWarehouse(id: string): Promise<GetWarehouseQuery> {
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
    return <GetWarehouseQuery>response.data.getWarehouse;
  }
  async ListWarehouses(
    filter?: ModelWarehouseFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListWarehousesQuery> {
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
    return <ListWarehousesQuery>response.data.listWarehouses;
  }
  OnCreateInventoryListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateInventory">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateInventory {
        onCreateInventory {
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
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateInventory">>
  >;

  OnUpdateInventoryListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateInventory">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateInventory {
        onUpdateInventory {
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
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateInventory">>
  >;

  OnDeleteInventoryListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteInventory">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteInventory {
        onDeleteInventory {
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
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteInventory">>
  >;

  OnCreateProductListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateProduct">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateProduct {
        onCreateProduct {
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
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateProduct">>
  >;

  OnUpdateProductListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateProduct">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateProduct {
        onUpdateProduct {
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
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateProduct">>
  >;

  OnDeleteProductListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteProduct">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteProduct {
        onDeleteProduct {
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
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteProduct">>
  >;

  OnCreateWarehouseListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateWarehouse">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateWarehouse {
        onCreateWarehouse {
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
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateWarehouse">>
  >;

  OnUpdateWarehouseListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateWarehouse">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateWarehouse {
        onUpdateWarehouse {
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
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateWarehouse">>
  >;

  OnDeleteWarehouseListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteWarehouse">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteWarehouse {
        onDeleteWarehouse {
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
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteWarehouse">>
  >;
}
