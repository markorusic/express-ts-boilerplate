import { Express } from 'express'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import { createEntityRouter } from '../utils/resourse-utils'
import { User } from '../entities/User'

export const router = {
  init(app: Express) {
    app.disable('x-powered-by')

    app.use(cors())
    app.use(json())
    app.use(urlencoded({ extended: true }))
    app.use(morgan('dev'))

    const userRouter = createEntityRouter('/users', User)

    app.use('/api', userRouter)
  }
}
