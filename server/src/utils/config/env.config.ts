import { ConfigFactory, ConfigModuleOptions } from '@nestjs/config';
import { envConfigValidation } from './env-validation.config';
import { EnvConfig } from '../interface/env-config.interface';

export const env = (): ConfigFactory<EnvConfig> => {
  return () => ({
    app: {
      prefix: process.env.APP_ROUTE_PREFIX,
      port: parseInt(process.env.APP_PORT, 10) ?? 3000,
      env: process.env.APP_NODE_ENV,
      url: process.env.API_BASE_URL,
    },
    db: {
      url: process.env.DB_URI,
      type: 'postgres',
      logging: false,
      ssl: false,
      synchronize: true,
    },
  });
};

export const envConfig = (): ConfigModuleOptions => {
  return {
    isGlobal: true,
    envFilePath: '.env',
    validationSchema: envConfigValidation(),
    load: [env()],
  };
};
