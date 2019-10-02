import express from 'express'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import { createConnection, getRepository } from 'typeorm'
import config from './config'
import { User } from './entities/User'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app
  .route('/api/users')
  .get(async (req, res) => {
    const userRepository = getRepository(User)
    const [users, count] = await userRepository.findAndCount()
    return res.json({ users, count })
  })
  .post(async (req, res) => {
    const userRepository = getRepository(User)
    const user = await userRepository.save(req.body)
    return res.json(user)
  })

export const start = () =>
  new Promise(async (resolve, reject) => {
    try {
      await createConnection()
      app.listen(config.port, () => {
        console.log(`Started on port ${config.port}`)
        resolve()
      })
    } catch (err) {
      console.error(`Starting app error: ${err}`)
      reject(err)
    }
  })
