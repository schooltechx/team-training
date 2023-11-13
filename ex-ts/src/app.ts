// src/app.ts
import "dotenv/config"
import express, { Express, Request, Response } from 'express'
import {testRoute,myapiRoute} from "./lib/myapi"
// import {myapiRoute} from './lib/myapi'
// import {fruitRoute} from "./lib/fruit"
const app: Express = express()
const port = Number(process.env.PORT) || 80
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
app.use('/api/myapi',myapiRoute)
app.use('/api/tests',testRoute)

// app.get('*',(req,res)=>{
//   res.sendFile(`${process.cwd()}/static/index.html`)
// })

app.listen(port, () => console.log(`Application is running on port ${port}`))
