import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'postgres',
  host: `${process.env.PGHOST}`,
  port: parseInt(`${process.env.PGPORT}`, 10),
  username: `${process.env.PGUSER}`,
  password: `${process.env.PGPASSWORD}`,
  database: `${process.env.PGDATABASE}`,
  entities: ['dist/**/*.models{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  synchronize: true,
} satisfies DataSourceOptions;

export const connectionSource = new DataSource(config);
