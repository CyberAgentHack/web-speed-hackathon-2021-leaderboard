import pino from 'pino';

export const logger = pino({
  level: process.env['WSH_SCORING_DEBUG'] === 'true' ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
    },
  },
});
