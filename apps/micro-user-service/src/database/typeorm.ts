import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from '../config';

console.log('config ', config);
const configs = {
  type: 'postgres',
  host: `${config.db.host}`,
  port: parseInt(`${config.db.port}`, 10),
  username: `${process.env.PGUSER}`,
  password: `${process.env.PGPASSWORD}`,
  database: `${process.env.PGDATABASE}`,
  entities: ['./**/*.model{.ts,.js}'],
  migrations: ['./apps/micro-user-service/src/database/migrations/*{.ts,.js}'],
  synchronize: true,
} satisfies DataSourceOptions;

export const connectionSource = new DataSource(configs);
