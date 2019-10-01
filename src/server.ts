import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => res.json({
    message: 'zxc'
}))

app.listen(3000, () => {
    console.log('running on port 3000')
})