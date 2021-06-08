"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecommendedDeals = getRecommendedDeals;
exports.getPackageDetails = getPackageDetails;
exports.getDealDetails = getDealDetails;
exports.getPricePlans = getPricePlans;
exports.getAllRecommendedDeals = getAllRecommendedDeals;
exports.getDealersProductOffering = getDealersProductOffering;

var _zipkin = require("vod-npm-utils/zipkin");

var _helpers = require("../helpers");

const zipkinAxios = (0, _zipkin.getWrappedAxios)('vod-ms-deals');
const config = (0, _helpers.getEnvConfig)();
const BASE_URL = config.get('vod-npm-services.vod-ms-deals.baseUrl');
const GET_RECOMMENDED_DEALS_URL = `${BASE_URL}${config.get('vod-npm-services.vod-ms-deals.getRecommendedDealsPostfix')}`;
const GET_PACKAGE_DETAILS_URL = `${BASE_URL}${config.get('vod-npm-services.vod-ms-deals.getPackageDetailsPostfix')}`;
const GET_DEAL_DETAILS_URL = `${BASE_URL}${config.get('vod-npm-services.vod-ms-deals.getDealDetailsPostfix')}`;
const GET_PRICE_PLANS_URL = `${BASE_URL}${config.get('vod-npm-services.vod-ms-deals.getPricePlansPostfix')}`;
const GET_ALL_RECOMMENDED_DEALS_URL = `${BASE_URL}${config.get('vod-npm-services.vod-ms-deals.getAllRecommendedDealsPostfix')}`;
const GET_DEALERS_PRODUCT_OFFERINGS_URL = `${BASE_URL}${config.get('vod-npm-services.vod-ms-deals.getDealersProductOfferingPostfix')}`;

async function getRecommendedDeals({
  headers,
  accessory,
  accountDealFlag,
  channel,
  dealValueLowerLimit,
  dealerGroup,
  dealerId,
  dealsheetNumber,
  device,
  deviceManufacturer,
  deviceType,
  duration,
  financedThresholdAmount,
  interactSessionId,
  msisdn,
  pricePlan,
  rowStart,
  rowEnd,
  simOnly,
  sortBy,
  stockCode,
  subChannel,
  tariffLimit,
  tariffLowerLimit
}) {
  return zipkinAxios.get(GET_RECOMMENDED_DEALS_URL, {
    headers,
    params: {
      accessory,
      accountDealFlag,
      channel,
      dealValueLowerLimit,
      dealerGroup,
      dealerId,
      dealsheetNumber,
      device,
      deviceManufacturer,
      deviceType,
      duration,
      financedThresholdAmount,
      interactSessionId,
      msisdn,
      pricePlan,
      rowStart,
      rowEnd,
      simOnly,
      sortBy,
      stockCode,
      subChannel,
      tariffLimit,
      tariffLowerLimit
    }
  });
}

async function getPackageDetails({
  headers,
  channel,
  originalPackageCode
}) {
  return zipkinAxios.get(GET_PACKAGE_DETAILS_URL, {
    headers,
    pathParams: {
      channel,
      originalPackageCode
    }
  });
}

async function getDealDetails({
  dealsheetNumber,
  channel,
  headers
}) {
  return zipkinAxios.get(GET_DEAL_DETAILS_URL, {
    headers,
    pathParams: {
      dealsheetNumber,
      channel
    }
  });
}

async function getPricePlans({
  headers
}) {
  return zipkinAxios.get(GET_PRICE_PLANS_URL, {
    headers
  });
}

async function getAllRecommendedDeals({
  headers,
  accessory,
  accountDealFlag,
  channel,
  dealType,
  dealValueLowerLimit,
  dealValueUpperLimit,
  dealerGroup,
  dealerId,
  dealsheetNumber,
  device,
  deviceManufacturer,
  deviceType,
  financedThresholdAmount,
  interactSessionId,
  msisdn,
  pricePlan,
  rowEnd,
  rowStart,
  simOnly,
  stockCode,
  subChannel,
  tariffLimit,
  tariffLowerLimit
}) {
  return zipkinAxios.get(GET_ALL_RECOMMENDED_DEALS_URL, {
    headers,
    params: {
      accessory,
      accountDealFlag,
      channel,
      dealType,
      dealValueLowerLimit,
      dealValueUpperLimit,
      dealerGroup,
      dealerId,
      dealsheetNumber,
      device,
      deviceManufacturer,
      deviceType,
      financedThresholdAmount,
      interactSessionId,
      msisdn,
      pricePlan,
      rowEnd,
      rowStart,
      simOnly,
      stockCode,
      subChannel,
      tariffLimit,
      tariffLowerLimit
    }
  });
}

async function getDealersProductOffering({
  headers,
  accessory,
  accountDealFlag,
  dealType,
  dealValueUpperLimit,
  dealerId,
  dealsheetNumber,
  device,
  deviceManufacturer,
  financedThresholdAmount,
  packageCodes,
  pricePlan,
  simOnly,
  stockCode
}) {
  return zipkinAxios.get(GET_DEALERS_PRODUCT_OFFERINGS_URL, {
    headers,
    params: {
      accessory,
      accountDealFlag,
      dealType,
      dealValueUpperLimit,
      dealerId,
      dealsheetNumber,
      device,
      deviceManufacturer,
      financedThresholdAmount,
      packageCodes,
      pricePlan,
      simOnly,
      stockCode
    }
  });
}