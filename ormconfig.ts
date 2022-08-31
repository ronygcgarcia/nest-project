import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import 'dotenv/config';

enum DatabaseType {
  MYSQL = 'mysql',
  POSTGRES = 'postgres',
  SQLITE = 'sqlite',
  MARIADB = 'mariadb',
  MSSQL = 'mssql',
}

const options: DataSourceOptions & SeederOptions = {
  type: (process.env.DB_DIALECT as DatabaseType) || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  logging: process.env.DB_LOGGING === 'true' || true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration_table',
  seeds: ['src/**/seeds/*{.ts,.js}'],
  factories: ['src/**/factories/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(options);
