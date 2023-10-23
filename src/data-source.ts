import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import 'dotenv/config';

const dataSourseConfig = (): DataSourceOptions => {
  const migrationsPath = path.join(__dirname, './migrations/**.{js,ts}');
  const entitiesPath = path.join(__dirname, './entities/**.{js,ts}');

  const url = process.env.DATABASE_URL;
  const nodeEnv = process.env.NODE_ENV;

  if(!url && nodeEnv !== 'test') {
    throw new Error('Missing env var: "DATABASE_URL"');
  }

  return nodeEnv !== 'test' ? {
    type: 'postgres',
    url,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath]
  } : {
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    entities: [entitiesPath]
  }
}

export const AppDataSource = new DataSource(dataSourseConfig());