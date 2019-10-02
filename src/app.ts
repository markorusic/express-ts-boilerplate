import express, { Request, Response } from 'express'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) =>
  res.json({
    message: 'hello'
  })
)

app.listen(3000, () => {
  console.log('running on port 3000')
})
