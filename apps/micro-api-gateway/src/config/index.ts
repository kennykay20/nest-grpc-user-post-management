import * as dotenv from 'dotenv';
import * as joi from 'joi';

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

const schemaValidate = joi
  .object({
    HTTP_PORT: joi.number().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'dev', 'staging', 'production')
      .required(),
    POST_SVC: joi.string().required(),
    SECRET_KEY: joi.string(),
  })
  .unknown()
  .required();

const { error, value: envVar } = schemaValidate.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  port: envVar.HTTP_PORT,
  NODE_ENV: envVar.NODE_ENV,
  userServiceUrl: envVar.POST_SVC,
  redisUrl: envVar.REDIS_URL,
  SECRET_KEY: envVar.SECRET_KEY,
};
