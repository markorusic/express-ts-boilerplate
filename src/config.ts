import get from 'lodash/get'

const env = (path: string, defaultValue?: string | number) => {
  const value = get(process.env, path, defaultValue)
  if (value) {
    return value.toString()
  }
  return null
}

const config = {
  env: env('APP_ENV', 'development'),
  port: env('APP_PORT', 3000),
  dbHost: env('DB_HOST', '127.0.0.1'),
  dbPort: env('DB_PORT', '3306'),
  dbDatabase: env('DB_DATABASE', 'my_db'),
  dbUsername: env('DB_USERNAME', 'root'),
  dbPassword: env('DB_PASSWORD', 'root')
}

export default config
