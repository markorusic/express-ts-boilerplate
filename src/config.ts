import get from 'lodash/get'

const env = <T>(path: string, defaultValue: T): T =>
  get<any, string, T>(process.env, path, defaultValue)

const config = {
  env: env('APP_ENV', 'development'),
  port: env('APP_PORT', 3000),
  db: {
    type: env('DB_TYPE', 'mysql'),
    host: env('DB_HOST', '127.0.0.1'),
    port: env('DB_PORT', 3306),
    database: env('DB_DATABASE', 'test_db'),
    username: env('DB_USERNAME', 'root'),
    password: env('DB_PASSWORD', 'root'),
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: ['src/subscribers/**/*.ts']
  }
}

export default config
