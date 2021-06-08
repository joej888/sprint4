"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecommendedDeals = getRecommendedDeals;
exports.getPricePlans = getPricePlans;
exports.getPackageDetails = getPackageDetails;
exports.getDealDetails = getDealDetails;
exports.getAllRecommendedDeals = getAllRecommendedDeals;
exports.getDealersProductOffering = getDealersProductOffering;

var client = _interopRequireWildcard(require("./client"));

var _msisdn = require("vod-npm-utils/msisdn");

var _wsLogger = require("vod-npm-utils/ws-logger");

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _error = require("vod-npm-utils/error");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const logger = new _wsLogger.WsLogger('vod-ms-deals service');
const service = 'vod-ms-deals';
/**
 * @typedef {Object} res
 * @property {Object} data - The data from the upstream response.
 * @property {Object} headers - The headers from the upstream response.
 * @property {Integer} status - The status code from the upstream response.
 * @property {boolean} ok - TRUE for the correct response case.
 */

/**
 * @typedef {Object} err
 * @property {Error} error - Error object thrown by axios.
 * @property {boolean} ok - FALSE for the error case.
 */

/**
 * Function to get customer details via the restricted-cluster-only endpoint
 * @param {request} req - The entire request object.
 * @param {Object} params - The object containing the request parameters.
 * @param {Object} params.headers - Headers for the request.
 * @param {String} [params.accessory=] - Accessory to be queried
 * @param {String} [params.accountDealFlag=] - Account Deal Flag to be queried
 * @param {String} [params.channel=] - Channel to be queried
 * @param {String} [params.dealValueLowerLimit=] - Deal Value Lower Limit to be queried
 * @param {String} [params.dealerGroup=] -Dealer Group to be queried
 * @param {String} [params.dealerId=] - Dealer Id to be queried
 * @param {String} [params.dealsheetNumber=] - Deal Sheet Number to be queried
 * @param {String} [params.device=] - Device name to be queried
 * @param {String} [params.deviceManufacturer=] - Device manufacturer to be queried
 * @param {String} [params.deviceType=] - Device Type name end to be queried
 * @param {String} [params.duration=] - Duration to be queried
 * @param {String} [params.financedThresholdAmount=] - Financed ThresholdAmount to be queried
 * @param {String} [params.interactSessionId=] - Interact Session Id Value Upper Limit to be queried
 * @param {String} params.msisdn - MSISDN to be queried
 * @param {String} [params.pricePlan=] - Price Plan to be queried
 * @param {String} [params.rowStart=] - Row Start to be queried
 * @param {String} [params.rowEnd=] - Row end to be queried
 * @param {String} [params.simOnly=] - Sim only value to be queried
 * @param {String} [params.sortBy=] - Sort By to be queried
 * @param {String} [params.stockCode=] - Stock Code to be queried
 * @param {String} [params.subChannel=] - Sub Channel to be queried
 * @param {String} [params.tariffLimit=] - Tariff Limit to be queried
 * @param {String} [params.tariffLowerLimit=] - Tariff Lower Limit to be queried
 * @return {Promise<res|err>} The response or error from vod-ms-customer.
 */

async function getRecommendedDeals(req, params) {
  const endpoint = 'Get recommended deals';
  (0, _helpers.startLog)(req, logger, endpoint, service, params);

  if (!(0, _helpers.validParams)(params, ['msisdn'])) {
    return {
      ok: false,
      error: new _error.CustomError('BadRequest', _httpStatusCodes.default.BAD_REQUEST)
    };
  }

  if (!(0, _msisdn.isValidMsisdn)(params.msisdn)) {
    const err = new _error.CustomError('InvalidMsisdn', _httpStatusCodes.default.BAD_REQUEST);
    (0, _helpers.errLog)(req, logger, endpoint, service, err);
    return {
      ok: false,
      error: err
    };
  }

  params.msisdn = (0, _msisdn.getFormattedMsisdn)(params.msisdn);
  return client.getRecommendedDeals(params).then(res => {
    if (!res.data) {
      (0, _helpers.errLog)(req, logger, endpoint, service, res);
      return {
        ok: false,
        error: new _error.CustomError('InvalidResponse', _httpStatusCodes.default.FAILED_DEPENDENCY, res)
      };
    }

    return res;
  }).catch(err => {
    (0, _helpers.errLog)(req, logger, endpoint, service, err);
    return {
      ok: false,
      error: err
    };
  });
}
/**
 * Function to get deals price plans
 * @param {request} req - The entire request object.
 * @param {Object} params - The object containing the request parameters.
 * @param {Object} params.headers - Headers for the request.
 * @return {Promise<res|err>} The response or error from vod-ms-deals.
 */


async function getPricePlans(req, params) {
  const endpoint = 'Get Price Plans';
  (0, _helpers.startLog)(req, logger, endpoint, service, params);

  if (!(0, _helpers.validParams)(params, ['headers'])) {
    return {
      ok: false,
      error: new _error.CustomError('BadRequest', _httpStatusCodes.default.BAD_REQUEST)
    };
  }

  return client.getPricePlans(params).then(res => {
    if (!res.data) {
      (0, _helpers.errLog)(req, logger, endpoint, service, res);
      return {
        ok: false,
        error: new _error.CustomError('InvalidResponse', _httpStatusCodes.default.FAILED_DEPENDENCY, res)
      };
    }

    return res;
  }).catch(err => {
    (0, _helpers.errLog)(req, logger, endpoint, service, err);
    return {
      ok: false,
      error: err
    };
  });
}
/**
 * Function to get package details
 * @param {request} req - The entire request object.
 * @param {Object} params - The object containing the request parameters.
 * @param {Object} params.headers - Headers for the request.
 * @param {String} params.channel - channel
 * @param {String} params.originalPackageCode - originalPackageCode
 * @return {Promise<res|err>} The response or error from vod-ms-customer.
 */


async function getPackageDetails(req, params) {
  const endpoint = 'Get package details';
  (0, _helpers.startLog)(req, logger, endpoint, service, params);

  if (!(0, _helpers.validParams)(params, ['headers', 'channel', 'originalPackageCode'])) {
    return {
      ok: false,
      error: new _error.CustomError('BadRequest', _httpStatusCodes.default.BAD_REQUEST)
    };
  }

  return client.getPackageDetails(params).then(res => {
    if (!res.data) {
      (0, _helpers.errLog)(req, logger, endpoint, service, res);
      return {
        ok: false,
        error: new _error.CustomError('InvalidResponse', _httpStatusCodes.default.FAILED_DEPENDENCY, res)
      };
    }

    return res;
  }).catch(err => {
    (0, _helpers.errLog)(req, logger, endpoint, service, err);
    return {
      ok: false,
      error: err
    };
  });
}
/**
 * Function to get deal details via the restricted-cluster-only endpoint
 * @param {request} req - The entire request object.
 * @param {Object} params - The object containing the request parameters.
 * @param {Object} params.headers - Headers for the request.
 * @param {String} params.dealSheetNumber - dealSheetNumber to be queried
 * @param {String} params.channel - channel to be queried
 * @return {Promise<res|err>} The response or error from vod-ms-customer.
 */


async function getDealDetails(req, params) {
  const endpoint = 'Get Deal details';
  (0, _helpers.startLog)(req, logger, endpoint, service, params);

  if (!(0, _helpers.validParams)(params, ['headers', 'dealsheetNumber', 'channel'])) {
    return {
      ok: false,
      error: new _error.CustomError('BadRequest', _httpStatusCodes.default.BAD_REQUEST)
    };
  }

  return client.getDealDetails({
    headers: params.headers,
    dealsheetNumber: params.dealsheetNumber,
    channel: params.channel
  }).then(res => {
    if (!res.data) {
      (0, _helpers.errLog)(req, logger, endpoint, service, res);
      return {
        ok: false,
        error: new _error.CustomError('InvalidResponse', _httpStatusCodes.default.FAILED_DEPENDENCY, res)
      };
    }

    return res;
  }).catch(err => {
    (0, _helpers.errLog)(req, logger, endpoint, service, err);
    return {
      ok: false,
      error: err
    };
  });
}
/**
 * Function to get all customer recommended deals via the restricted-cluster-only endpoint
 * @param {request} req - The entire request object.
 * @param {Object} params - The object containing the request parameters.
 * @param {Object} params.headers - Headers for the request.
 * @param {String} [params.accessory=] - Accessory to be queried
 * @param {String} [params.accountDealFlag=] - Account Deal Flag to be queried
 * @param {String} [params.channel=] - Channel to be queried
 * @param {String} [params.dealType=] - Type of deal to be queried
 * @param {String} [params.dealValueLowerLimit=] - Deal Value Lower Limit to be queried
 * @param {String} [params.dealValueUpperLimit=] - Deal Value Upper Limit to be queried
 * @param {String} [params.dealerGroup=] -Dealer Group to be queried
 * @param {String} [params.dealerId=] - Dealer Id to be queried
 * @param {String} [params.dealsheetNumber=] - Deal Sheet Number to be queried
 * @param {String} [params.device=] - Device name to be queried
 * @param {String} [params.deviceManufacturer=] - Device manufacturer to be queried
 * @param {String} [params.deviceType=] - Device Type name end to be queried
 * @param {String} [params.financedThresholdAmount=] - Financed ThresholdAmount to be queried
 * @param {String} [params.interactSessionId=] - Interact Session Id Value Upper Limit to be queried
 * @param {String} params.msisdn - MSISDN to be queried
 * @param {String} [params.pricePlan=] - Price Plan to be queried
 * @param {String} [params.rowEnd=] - Row end to be queried
 * @param {String} [params.rowStart=] - Row Start to be queried
 * @param {String} [params.simOnly=] - Sim only value to be queried
 * @param {String} [params.stockCode=] - Stock Code to be queried
 * @param {String} [params.subChannel=] - Sub Channel to be queried
 * @param {String} [params.tariffLimit=] - Tariff Limit to be queried
 * @param {String} [params.tariffLowerLimit=] - Tariff Lower Limit to be queried
 * @return {Promise<res|err>} The response or error from vod-ms-customer.
 */


async function getAllRecommendedDeals(req, params) {
  const endpoint = 'Get All Recommended Deals';
  (0, _helpers.startLog)(req, logger, endpoint, service, params);

  if (!(0, _helpers.validParams)(params, ['msisdn'])) {
    return {
      ok: false,
      error: new _error.CustomError('BadRequest', _httpStatusCodes.default.BAD_REQUEST)
    };
  }

  if (!(0, _msisdn.isValidMsisdn)(params.msisdn)) {
    const err = new _error.CustomError('InvalidMsisdn', _httpStatusCodes.default.BAD_REQUEST);
    (0, _helpers.errLog)(req, logger, endpoint, service, err);
    return {
      ok: false,
      error: err
    };
  }

  params.msisdn = (0, _msisdn.getFormattedMsisdn)(params.msisdn);
  return client.getAllRecommendedDeals(params).then(res => {
    if (!res.data) {
      (0, _helpers.errLog)(req, logger, endpoint, service, res);
      return {
        ok: false,
        error: new _error.CustomError('InvalidResponse', _httpStatusCodes.default.FAILED_DEPENDENCY, res)
      };
    }

    return res;
  }).catch(err => {
    (0, _helpers.errLog)(req, logger, endpoint, service, err);
    return {
      ok: false,
      error: err
    };
  });
}
//******New Services

/**
 * Function to get deal details via the restricted-cluster-only endpoint
 * @param {request} req - The entire request object.
 * @param {Object} params - The object containing the request parameters.
 * @param {Object} params.headers - Headers for the request.
 * @param {String} [params.accessory=] - dealSheetNumber to be queried
 * @param {String} [params.accountDealFlag=] - dealSheetNumber to be queried
 * @param {String} [params.dealType=] - dealSheetNumber to be queried
 * @param {String} [params.dealValueUpperLimit=] - dealSheetNumber to be queried
 * @param {String} [params.dealerId=] - dealSheetNumber to be queried
 * @param {String} [params.dealsheetNumber=] - dealSheetNumber to be queried
 * @param {String} [params.device=] - dealSheetNumber to be queried
 * @param {String} [params.deviceManufacturer=] - dealSheetNumber to be queried
 * @param {String} [params.financedThresholdAmount=] - dealSheetNumber to be queried
 * @param {Array}  [params.packageCodes=] - dealSheetNumber to be queried
 * @param {String} [params.pricePlan=] - dealSheetNumber to be queried
 * @param {String} [params.simOnly=] - dealSheetNumber to be queried
 * @param {String} [params.stockCode=] - dealSheetNumber to be queried
 * @return {Promise<res|err>} The response or error from vod-ms-customer.
 */

 async function getDealersProductOffering(req, params) {
  const endpoint = 'Get Dealers Product Offering';
  (0, _helpers.startLog)(req, logger, endpoint, service, params);

  if (!(0, _helpers.validParams)(params, ['headers', 'dealerId'])) {
    return {
      ok: false,
      error: new _error.CustomError('BadRequest', _httpStatusCodes.default.BAD_REQUEST)
    };
  }

  return client.getDealersProductOffering({
    headers: params.headers,
    accessory: params.accessory,
    accountDealFlag: params.accountDealFlag,
    dealType: params.dealType,
    dealValueUpperLimit: params.dealValueUpperLimit,
    dealerId: params.dealerId,
    dealsheetNumber: params.dealsheetNumber,
    device: params.device,
    deviceManufacturer: params.deviceManufacturer,
    financedThresholdAmount: params.financedThresholdAmount,
    packageCodes: params.packageCodes,
    pricePlan: params.pricePlan,
    simOnly: params.simOnly,
    stockCode: params.stockCode
  }).then(res => {
    if (!res.data) {
      (0, _helpers.errLog)(req, logger, endpoint, service, res);
      return {
        ok: false,
        error: new _error.CustomError('InvalidResponse', _httpStatusCodes.default.FAILED_DEPENDENCY, res)
      };
    }

    return res;
  }).catch(err => {
    (0, _helpers.errLog)(req, logger, endpoint, service, err);
    return {
      ok: false,
      error: err
    };
  });
}