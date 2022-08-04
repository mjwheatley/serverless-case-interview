"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryResolver = void 0;
var utils_1 = require("../utils");
var QueryResolver = /** @class */ (function () {
    function QueryResolver() {
    }
    QueryResolver.prototype.execute = function (_a) {
        var payload = _a.payload, logger = _a.logger;
        return __awaiter(this, void 0, void 0, function () {
            var fieldName;
            return __generator(this, function (_b) {
                logger.silly("Trace", "QueryResolver.execute()");
                fieldName = payload.fieldName;
                logger.info("QueryResolver fieldName", fieldName);
                // @ts-ignore
                if (!this[fieldName]) {
                    throw new Error("Resolver not found.");
                }
                else {
                    // @ts-ignore
                    return [2 /*return*/, this[fieldName]({ payload: payload, logger: logger })];
                }
                return [2 /*return*/];
            });
        });
    };
    QueryResolver.prototype.getProductCostOfWarehouse = function (_a) {
        var payload = _a.payload, logger = _a.logger;
        return __awaiter(this, void 0, void 0, function () {
            var queryString, _b, productId, warehouseId, product, cost, inventory, items, productAtWarehouse, total, totalCost;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        logger.silly("Trace", "QueryResolver.getProductCostOfWarehouse()");
                        queryString = payload.arguments.queryString;
                        _b = JSON.parse(queryString), productId = _b.productId, warehouseId = _b.warehouseId;
                        logger.debug("QueryResolver.getProductCostOfWarehouse()", { productId: productId, warehouseId: warehouseId });
                        return [4 /*yield*/, utils_1.getProduct(productId)];
                    case 1:
                        product = _c.sent();
                        logger.debug("QueryResolver.getProductCostOfWarehouse() product", product);
                        cost = product.cost, inventory = product.inventory;
                        items = inventory.items;
                        productAtWarehouse = items.filter(function (i) { return i.warehouseInventoryId === warehouseId; });
                        logger.debug("QueryResolver.getProductCostOfWarehouse() productAtWarehouse", productAtWarehouse);
                        total = 0;
                        if (productAtWarehouse === null || productAtWarehouse === void 0 ? void 0 : productAtWarehouse.length) {
                            total = productAtWarehouse.reduce(function (acc, value) { return acc + Number(value.inventory); }, total);
                        }
                        totalCost = total * Number(cost);
                        logger.info("QueryResolver.getProductCostOfWarehouse() totalCost", totalCost);
                        return [2 /*return*/, totalCost];
                }
            });
        });
    };
    QueryResolver.prototype.getProductDataFromWarehouses = function (_a) {
        var payload = _a.payload, logger = _a.logger;
        return __awaiter(this, void 0, void 0, function () {
            var productId, product, price, cost, inventory, items, warehouses, warehouseTotals, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.silly("Trace", "QueryResolver.getProductDataFromWarehouses()");
                        productId = payload.arguments.productId;
                        return [4 /*yield*/, utils_1.getProduct(productId)];
                    case 1:
                        product = _b.sent();
                        logger.debug("QueryResolver.getProductDataFromWarehouses() product", product);
                        price = product.price, cost = product.cost, inventory = product.inventory;
                        items = inventory.items;
                        logger.debug("QueryResolver.getProductDataFromWarehouses() inventory", items);
                        warehouses = items.map(function (inv) {
                            var _a;
                            return ({
                                warehouseId: (_a = inv.warehouse) === null || _a === void 0 ? void 0 : _a.warehouseId,
                                warehouse: inv.warehouse,
                                productQuantity: inv.inventory,
                                totalValueAtWarehouse: Number(inv.inventory) * Number(cost)
                            });
                        });
                        logger.debug("QueryResolver.getProductDataFromWarehouses() warehouses", items);
                        warehouseTotals = warehouses
                            .reduce(function (acc, value) {
                            acc.totalValueInAllWarehouses += value.totalValueAtWarehouse;
                            acc.totalQuantityInAllWarehouses += value.productQuantity;
                            return acc;
                        }, { totalQuantityInAllWarehouses: 0, totalValueInAllWarehouses: 0 });
                        response = __assign({ warehouses: warehouses, productCost: cost, productPrice: price }, warehouseTotals);
                        logger.debug("QueryResolver.getProductDataFromWarehouses() response", response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return QueryResolver;
}());
exports.QueryResolver = QueryResolver;
