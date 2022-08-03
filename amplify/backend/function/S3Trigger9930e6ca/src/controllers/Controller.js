"use strict";
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
exports.Controller = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
var csvtojson_1 = __importDefault(require("csvtojson"));
var aws_sdk_1 = require("aws-sdk");
var utils_1 = require("../utils");
var s3 = new aws_sdk_1.S3();
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.execute = function (_a) {
        var payload = _a.payload, logger = _a.logger;
        return __awaiter(this, void 0, void 0, function () {
            var bucket, key, type, stream, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bucket = payload.bucket.name;
                        key = payload.object.key;
                        logger.debug("Bucket: " + bucket, "Key: " + key);
                        type = key.split("/")[1];
                        return [4 /*yield*/, s3.getObject({
                                Bucket: bucket,
                                Key: key
                            }).createReadStream()];
                    case 1:
                        stream = _b.sent();
                        return [4 /*yield*/, csvtojson_1.default().fromStream(stream)];
                    case 2:
                        data = _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, this[type]({ csvJson: data, logger: logger })];
                    case 3:
                        // @ts-ignore
                        _b.sent();
                        return [2 /*return*/, {
                                success: true
                            }];
                }
            });
        });
    };
    Controller.prototype.warehouses = function (_a) {
        var csvJson = _a.csvJson, logger = _a.logger;
        return __awaiter(this, void 0, void 0, function () {
            var promises, _i, csvJson_1, item, warehouseId, name_1, address, city, state, zipcode, phoneNumber, allSettledResults;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.silly("Controller.warehouses()", csvJson);
                        promises = [];
                        for (_i = 0, csvJson_1 = csvJson; _i < csvJson_1.length; _i++) {
                            item = csvJson_1[_i];
                            warehouseId = item.warehouse_id, name_1 = item.name, address = item.address, city = item.city, state = item.state, zipcode = item.zipcode, phoneNumber = item["phone-number"];
                            promises.push(utils_1.createWarehouse({
                                warehouseId: warehouseId,
                                name: name_1,
                                address: address,
                                city: city,
                                state: state,
                                zipcode: zipcode,
                                phoneNumber: phoneNumber
                            }));
                        }
                        return [4 /*yield*/, Promise.allSettled(promises)];
                    case 1:
                        allSettledResults = _b.sent();
                        allSettledResults.forEach(function (result) {
                            if (result.status !== "fulfilled") {
                                logger.warn("Failed to create warehouse record", result.reason);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.products = function (_a) {
        var csvJson = _a.csvJson, logger = _a.logger;
        return __awaiter(this, void 0, void 0, function () {
            var promises, _i, csvJson_2, item, productId, name_2, manufacturer, cost, price, allSettledResults;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.silly("Controller.products()", csvJson);
                        promises = [];
                        for (_i = 0, csvJson_2 = csvJson; _i < csvJson_2.length; _i++) {
                            item = csvJson_2[_i];
                            productId = item.product_id, name_2 = item.name, manufacturer = item.manufacturer, cost = item.cost, price = item.price;
                            promises.push(utils_1.createProduct({
                                name: name_2,
                                productId: productId,
                                manufacturer: manufacturer,
                                cost: cost,
                                price: price
                            }));
                        }
                        return [4 /*yield*/, Promise.allSettled(promises)];
                    case 1:
                        allSettledResults = _b.sent();
                        allSettledResults.forEach(function (result) {
                            if (result.status !== "fulfilled") {
                                logger.warn("Failed to create product record", result.reason);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.inventory = function (_a) {
        var csvJson = _a.csvJson, logger = _a.logger;
        return __awaiter(this, void 0, void 0, function () {
            var warehouses, products, promises, _loop_1, _i, csvJson_3, item, allSettledResults;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.silly("Controller.inventory()", csvJson);
                        return [4 /*yield*/, utils_1.listWarehouses()];
                    case 1:
                        warehouses = (_b.sent()).items;
                        return [4 /*yield*/, utils_1.listProducts()];
                    case 2:
                        products = (_b.sent()).items;
                        promises = [];
                        _loop_1 = function (item) {
                            var warehouseId = item.warehouse_id, productId = item.product_id, inventory = item.inventory;
                            var warehouse = warehouses.find(function (w) { return (w === null || w === void 0 ? void 0 : w.warehouseId) === warehouseId; });
                            var product = products.find(function (p) { return (p === null || p === void 0 ? void 0 : p.productId) === productId; });
                            if (warehouse && product) {
                                promises.push(utils_1.createInventory({
                                    warehouseId: warehouseId,
                                    warehouseInventoryId: warehouse.id,
                                    productId: productId,
                                    productInventoryId: product.id,
                                    inventory: inventory
                                }));
                            }
                            else {
                                if (!warehouse) {
                                    logger.warn("Create Inventory Error", "Warehouse[" + warehouseId + "] not found");
                                }
                                else if (!product) {
                                    logger.warn("Create Inventory Error", "Product[" + productId + "] not found");
                                }
                            }
                        };
                        for (_i = 0, csvJson_3 = csvJson; _i < csvJson_3.length; _i++) {
                            item = csvJson_3[_i];
                            _loop_1(item);
                        }
                        return [4 /*yield*/, Promise.allSettled(promises)];
                    case 3:
                        allSettledResults = _b.sent();
                        allSettledResults.forEach(function (result) {
                            if (result.status !== "fulfilled") {
                                logger.warn("Failed to create inventory record", result.reason);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Controller;
}());
exports.Controller = Controller;
