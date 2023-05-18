const winston = require('winston');

const logger = winston.createLogger({
  level: winston.config.npm.levels,
  format: winston.format.json(),
  defaultMeta: { service: 'course-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {

  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));

}

module.exports = { logger };