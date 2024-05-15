const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: 
    new winston.transports.File({ filename: 'error.log', level: 'info', format: winston.format.combine(winston.format.timestamp(),winston.format.json()) }),
  
});
module.exports = logger;