import * as dotenv from 'dotenv';
import * as joi from 'joi';

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

const schemaValidate = joi
  .object({
    GRPC_PORT: joi.number().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'dev', 'staging', 'production')
      .required(),
    // database configs
    PGHOST: joi.string().required(),
    PGUSER: joi.string().required(),
    PGPASSWORD: joi.string().required(),
    PGDATABASE: joi.string().required(),
    PGPORT: joi.number().port().required().default(5432),
    DATABASE_LOGGING: joi
      .boolean()
      .truthy('TRUE')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
      .default(false),
  })
  .unknown()
  .required();

const { error, value: envValue } = schemaValidate.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  port: envValue.GRPC_PORT,
  NODE_ENV: envValue.NODE_ENV,
  db: {
    port: envValue.PGPORT,
    host: envValue.PGHOST,
    username: envValue.PGUSER,
    password: envValue.PGPASSWORD,
    name: envValue.PGDATABASE,
    logging: envValue.DATABASE_LOGGING,
  },
};
