const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const xssFilter = require('x-xss-protection');

const setGlobalMiddleware = (app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
  app.use(xssFilter());

  app.disable('etag');
  app.disable('x-powered-by');
  app.disable('views');
  app.disable('graceful-exit');
  app.use(morgan('dev'));
  app.use(cors());
};
const healthyResponse = (req, res) => {
  res.send('Healthy');
};
const notFound = (req, res, next) => {
  let err = new Error();
  err.status = 404;
  return next(err);
};
const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;

  if (status === 404) console.log(`${req.method} ${req.originalUrl} 404`);
  else console.log(err);

  res.status(status);
  res.json({
    error: err.response || errorCodesAndMessages[status],
  });
};

const errorCodesAndMessages = {
  '400': {
    message: 'UNPROCESSABLE ENTITY',
  },
  '401': {
    message: 'Unauthorized',
  },
  '403': {
    message: 'FORBIDDEN',
  },
  '404': {
    message: 'NOT FOUND',
  },
  '500': {
    message: 'INTERNAL ERROR',
  },
};

module.exports = {
  notFound,
  errorHandler,
  healthyResponse,
  setGlobalMiddleware,
};
