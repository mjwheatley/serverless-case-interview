"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInventory = exports.listProducts = exports.createProduct = exports.listWarehouses = exports.createWarehouse = exports.issueGQL = exports.getSignedRequest = exports.ModelAttributeTypes = void 0;
/* eslint-disable id-blacklist,@typescript-eslint/naming-convention */
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var graphql_1 = require("graphql");
var https_1 = __importDefault(require("https"));
var url_1 = require("url");
var aws_sdk_1 = __importStar(require("aws-sdk"));
var _a = process.env, _b = _a.API_WAREHOUSEGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT, appsyncUrl = _b === void 0 ? "" : _b, _c = _a.REGION, region = _c === void 0 ? "" : _c;
var endpoint = new url_1.URL(appsyncUrl).hostname.toString();
var ModelAttributeTypes;
(function (ModelAttributeTypes) {
    ModelAttributeTypes["binary"] = "binary";
    ModelAttributeTypes["binarySet"] = "binarySet";
    ModelAttributeTypes["bool"] = "bool";
    ModelAttributeTypes["list"] = "list";
    ModelAttributeTypes["map"] = "map";
    ModelAttributeTypes["number"] = "number";
    ModelAttributeTypes["numberSet"] = "numberSet";
    ModelAttributeTypes["string"] = "string";
    ModelAttributeTypes["stringSet"] = "stringSet";
    ModelAttributeTypes["_null"] = "_null";
})(ModelAttributeTypes = exports.ModelAttributeTypes || (exports.ModelAttributeTypes = {}));
var getSignedRequest = function (gqlQuery, opName, variables) {
    var req = new aws_sdk_1.default.HttpRequest(new aws_sdk_1.Endpoint(appsyncUrl), region);
    req.method = 'POST';
    req.path = '/graphql';
    req.headers.host = endpoint;
    req.headers['Content-Type'] = 'application/json';
    req.body = JSON.stringify({
        query: graphql_1.print(gqlQuery),
        operationName: opName,
        variables: variables
    });
    // @ts-ignore
    var signer = new aws_sdk_1.default.Signers.V4(req, 'appsync', true);
    var credentials = new aws_sdk_1.default.EnvironmentCredentials('AWS');
    // @ts-ignore
    signer.addAuthorization(credentials, aws_sdk_1.default.util.date.getDate());
    return req;
};
exports.getSignedRequest = getSignedRequest;
var issueGQL = function (gqlQuery, opName, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var req, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = exports.getSignedRequest(gqlQuery, opName, variables);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var httpRequest = https_1.default.request(__assign(__assign({}, req), { host: req.headers.host }), function (result) {
                            var chunks = '';
                            result.on('data', function (chunk) {
                                chunks += chunk;
                            });
                            result.on('end', function () {
                                resolve(JSON.parse(chunks.toString()));
                            });
                            result.on('error', function (error) {
                                console.log('In result error handler');
                                console.log(error);
                            });
                        });
                        httpRequest.on('error', function (error) {
                            console.log('In request error handler');
                            console.log(error);
                        });
                        httpRequest.write(req.body);
                        httpRequest.end();
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
        }
    });
}); };
exports.issueGQL = issueGQL;
var createWarehouse = function (input, condition) { return __awaiter(void 0, void 0, void 0, function () {
    var statement, gqlAPIServiceArguments, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                statement = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["mutation CreateWarehouse($input: CreateWarehouseInput!, $condition: ModelWarehouseConditionInput) {\n        createWarehouse(input: $input, condition: $condition) {\n          __typename\n          id\n          warehouseId\n          name\n          address\n          city\n          state\n          zipcode\n          phoneNumber\n          inventory {\n            __typename\n            items {\n              __typename\n              id\n              warehouseId\n              productId\n              inventory\n              createdAt\n              updatedAt\n              productInventoryId\n              warehouseInventoryId\n            }\n            nextToken\n          }\n          createdAt\n          updatedAt\n        }\n      }"], ["mutation CreateWarehouse($input: CreateWarehouseInput!, $condition: ModelWarehouseConditionInput) {\n        createWarehouse(input: $input, condition: $condition) {\n          __typename\n          id\n          warehouseId\n          name\n          address\n          city\n          state\n          zipcode\n          phoneNumber\n          inventory {\n            __typename\n            items {\n              __typename\n              id\n              warehouseId\n              productId\n              inventory\n              createdAt\n              updatedAt\n              productInventoryId\n              warehouseInventoryId\n            }\n            nextToken\n          }\n          createdAt\n          updatedAt\n        }\n      }"])));
                gqlAPIServiceArguments = {
                    input: input
                };
                if (condition) {
                    gqlAPIServiceArguments.condition = condition;
                }
                return [4 /*yield*/, exports.issueGQL(statement, 'CreateWarehouse', gqlAPIServiceArguments)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.createWarehouse];
        }
    });
}); };
exports.createWarehouse = createWarehouse;
var listWarehouses = function (filter, limit, nextToken) { return __awaiter(void 0, void 0, void 0, function () {
    var statement, gqlAPIServiceArguments, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                statement = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query ListWarehouses($filter: ModelWarehouseFilterInput, $limit: Int, $nextToken: String) {\n        listWarehouses(filter: $filter, limit: $limit, nextToken: $nextToken) {\n          __typename\n          items {\n            __typename\n            id\n            warehouseId\n            name\n            address\n            city\n            state\n            zipcode\n            phoneNumber\n            inventory {\n              __typename\n              nextToken\n            }\n            createdAt\n            updatedAt\n          }\n          nextToken\n        }\n      }"], ["query ListWarehouses($filter: ModelWarehouseFilterInput, $limit: Int, $nextToken: String) {\n        listWarehouses(filter: $filter, limit: $limit, nextToken: $nextToken) {\n          __typename\n          items {\n            __typename\n            id\n            warehouseId\n            name\n            address\n            city\n            state\n            zipcode\n            phoneNumber\n            inventory {\n              __typename\n              nextToken\n            }\n            createdAt\n            updatedAt\n          }\n          nextToken\n        }\n      }"])));
                gqlAPIServiceArguments = {};
                if (filter) {
                    gqlAPIServiceArguments.filter = filter;
                }
                if (limit) {
                    gqlAPIServiceArguments.limit = limit;
                }
                if (nextToken) {
                    gqlAPIServiceArguments.nextToken = nextToken;
                }
                return [4 /*yield*/, exports.issueGQL(statement, 'ListWarehouses', gqlAPIServiceArguments)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.listWarehouses];
        }
    });
}); };
exports.listWarehouses = listWarehouses;
var createProduct = function (input, condition) { return __awaiter(void 0, void 0, void 0, function () {
    var statement, gqlAPIServiceArguments, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                statement = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["mutation CreateProduct($input: CreateProductInput!, $condition: ModelProductConditionInput) {\n        createProduct(input: $input, condition: $condition) {\n          __typename\n          id\n          productId\n          name\n          manufacturer\n          cost\n          price\n          inventory {\n            __typename\n            items {\n              __typename\n              id\n              warehouseId\n              productId\n              inventory\n              createdAt\n              updatedAt\n              productInventoryId\n              warehouseInventoryId\n            }\n            nextToken\n          }\n          createdAt\n          updatedAt\n        }\n      }"], ["mutation CreateProduct($input: CreateProductInput!, $condition: ModelProductConditionInput) {\n        createProduct(input: $input, condition: $condition) {\n          __typename\n          id\n          productId\n          name\n          manufacturer\n          cost\n          price\n          inventory {\n            __typename\n            items {\n              __typename\n              id\n              warehouseId\n              productId\n              inventory\n              createdAt\n              updatedAt\n              productInventoryId\n              warehouseInventoryId\n            }\n            nextToken\n          }\n          createdAt\n          updatedAt\n        }\n      }"])));
                gqlAPIServiceArguments = {
                    input: input
                };
                if (condition) {
                    gqlAPIServiceArguments.condition = condition;
                }
                return [4 /*yield*/, exports.issueGQL(statement, 'CreateProduct', gqlAPIServiceArguments)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.createProduct];
        }
    });
}); };
exports.createProduct = createProduct;
var listProducts = function (filter, limit, nextToken) { return __awaiter(void 0, void 0, void 0, function () {
    var statement, gqlAPIServiceArguments, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                statement = graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["query ListProducts($filter: ModelProductFilterInput, $limit: Int, $nextToken: String) {\n        listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {\n          __typename\n          items {\n            __typename\n            id\n            productId\n            name\n            manufacturer\n            cost\n            price\n            inventory {\n              __typename\n              nextToken\n            }\n            createdAt\n            updatedAt\n          }\n          nextToken\n        }\n      }"], ["query ListProducts($filter: ModelProductFilterInput, $limit: Int, $nextToken: String) {\n        listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {\n          __typename\n          items {\n            __typename\n            id\n            productId\n            name\n            manufacturer\n            cost\n            price\n            inventory {\n              __typename\n              nextToken\n            }\n            createdAt\n            updatedAt\n          }\n          nextToken\n        }\n      }"])));
                gqlAPIServiceArguments = {};
                if (filter) {
                    gqlAPIServiceArguments.filter = filter;
                }
                if (limit) {
                    gqlAPIServiceArguments.limit = limit;
                }
                if (nextToken) {
                    gqlAPIServiceArguments.nextToken = nextToken;
                }
                return [4 /*yield*/, exports.issueGQL(statement, 'ListProducts', gqlAPIServiceArguments)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.listProducts];
        }
    });
}); };
exports.listProducts = listProducts;
var createInventory = function (input, condition) { return __awaiter(void 0, void 0, void 0, function () {
    var statement, gqlAPIServiceArguments, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                statement = graphql_tag_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["mutation CreateInventory($input: CreateInventoryInput!, $condition: ModelInventoryConditionInput) {\n        createInventory(input: $input, condition: $condition) {\n          __typename\n          id\n          warehouseId\n          productId\n          inventory\n          warehouse {\n            __typename\n            id\n            warehouseId\n            name\n            address\n            city\n            state\n            zipcode\n            phoneNumber\n            inventory {\n              __typename\n              nextToken\n            }\n            createdAt\n            updatedAt\n          }\n          product {\n            __typename\n            id\n            productId\n            name\n            manufacturer\n            cost\n            price\n            inventory {\n              __typename\n              nextToken\n            }\n            createdAt\n            updatedAt\n          }\n          createdAt\n          updatedAt\n          productInventoryId\n          warehouseInventoryId\n        }\n      }"], ["mutation CreateInventory($input: CreateInventoryInput!, $condition: ModelInventoryConditionInput) {\n        createInventory(input: $input, condition: $condition) {\n          __typename\n          id\n          warehouseId\n          productId\n          inventory\n          warehouse {\n            __typename\n            id\n            warehouseId\n            name\n            address\n            city\n            state\n            zipcode\n            phoneNumber\n            inventory {\n              __typename\n              nextToken\n            }\n            createdAt\n            updatedAt\n          }\n          product {\n            __typename\n            id\n            productId\n            name\n            manufacturer\n            cost\n            price\n            inventory {\n              __typename\n              nextToken\n            }\n            createdAt\n            updatedAt\n          }\n          createdAt\n          updatedAt\n          productInventoryId\n          warehouseInventoryId\n        }\n      }"])));
                gqlAPIServiceArguments = {
                    input: input
                };
                if (condition) {
                    gqlAPIServiceArguments.condition = condition;
                }
                return [4 /*yield*/, exports.issueGQL(statement, 'CreateInventory', gqlAPIServiceArguments)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.createInventory];
        }
    });
}); };
exports.createInventory = createInventory;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
