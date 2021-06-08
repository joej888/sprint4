const config = require('config');
const { Sentry } = require('vod-npm-sentry');
const sentryCategory = config.get('sentry.categories.getDealersProductOffering');
const { dealsService } = require('vod-npm-services');
const prometheusClient = require('restify-prom-bundle').client;

const getDealersProductOfferingErr = new prometheusClient.Counter({
  name: 'app_product_offering_error_count',
  help: 'vod-ms-deals authentication error'
});

exports.handler = async function getDealersProductOffering(req, res, next) {
  Sentry.info('Beginning productOffering...', {}, sentryCategory);

  const params = {
    headers: req.headers,
    dealerId: req.query.dealerId
  };

  const response = await dealsService.getDealersProductOffering(req, params);

  if (!response.ok) {
    getDealersProductOfferingErr.inc();
    return next(response.error);
  }

  res.status(response.status);
  res.json(response.data);
  return next();
};
