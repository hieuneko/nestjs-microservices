import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '@app/shared';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [UserEntity],
  migrations: ['dist/apps/auth/db/migrations/*.js'],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
};

export const dataSource = new DataSource(dataSourceOptions);
