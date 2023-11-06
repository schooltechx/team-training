// src/app.ts
import "dotenv/config" 
import express, { Express, Request, Response } from 'express'
import {myapiRoute} from './lib/myapi'
import {fruitRoute} from "./lib/fruit"
const app: Express = express()
const port = Number(process.env.PORT) || 80
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({extended:true}))

app.use('/api/myapi',myapiRoute)
app.use('/api/fruits',fruitRoute)
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
})
app.listen(port, () => console.log(`Application is running on port ${port}`))

//C R U  D