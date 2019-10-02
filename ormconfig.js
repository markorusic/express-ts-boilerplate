// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: config } = require('./src/config')

module.exports = {
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  logging: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts']
}
