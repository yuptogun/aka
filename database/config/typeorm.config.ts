import { config as configurate } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs as registerConfig } from '@nestjs/config';

configurate();

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*.ts'],
  logging: process.env.APP_DEBUG === 'true' ? ['query', 'query'] : false,
};

export const AKADataSource = new DataSource(config);
export default registerConfig('typeORM', () => config);
