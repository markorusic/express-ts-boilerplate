import express from 'express'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => res.json(config))

export const start = () =>
  new Promise((resolve, reject) => {
    try {
      app.listen(config.port, () => {
        console.log(`Started on port ${config.port}`)
        resolve()
      })
    } catch (err) {
      console.error(`Starting app error: ${err}`)
      reject(err)
    }
  })
