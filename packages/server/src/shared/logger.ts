import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`,
    ),
  ),
  defaultMeta: { service: 'bag-of-holding' },
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL ?? 'info',
      handleExceptions: true,
    }),
  ],
});
