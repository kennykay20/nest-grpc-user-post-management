import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: `${process.env.PGHOST}`,
        port: parseInt(`${process.env.PGPORT}`, 10),
        username: `${process.env.PGUSER}`,
        password: `${process.env.PGPASSWORD}`,
        database: `${process.env.PGDATABASE}`,
        entities: ['dist/*/.models{.ts,.js}'],
        migrations: ['dist/database/migrations/*{.ts,.js}'],
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
