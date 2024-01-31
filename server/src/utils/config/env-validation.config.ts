import * as Joi from 'joi';

export const envConfigValidation = (): Joi.ObjectSchema<any> =>
  Joi.object({
    APP_NODE_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
    APP_ROUTE_PREFIX: Joi.string().default('api'),
    APP_PORT: Joi.number().default(3000),
    API_BASE_URL: Joi.string(),
    DB_URI: Joi.string().exist(),
  });
