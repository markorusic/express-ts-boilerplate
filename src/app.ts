import express from 'express'
import { createConnection } from 'typeorm'
import { router } from './routes'
import config from './config'

export const start = () =>
  new Promise(async (resolve, reject) => {
    try {
      const app = express()
      await createConnection()
      router.init(app)
      app.listen(config.port, () => {
        console.log(`Started on port ${config.port}`)
        resolve()
      })
    } catch (err) {
      console.error(`Starting app error: ${err}`)
      reject(err)
    }
  })
