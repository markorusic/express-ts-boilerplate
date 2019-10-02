import express from 'express'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) =>
  res.json({
    message: 'hello'
  })
)

export const start = () =>
  new Promise((resolve, reject) => {
    try {
      app.listen(3000, () => {
        console.log('Started on port 3000')
        resolve()
      })
    } catch (err) {
      console.error(`Starting app error: ${err}`)
      reject(err)
    }
  })
