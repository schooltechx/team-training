// src/app.ts
import "dotenv/config"
import cors from "cors" 
import express, { Express, Request, Response,NextFunction } from 'express'
import {myapiRoute} from './lib/myapi'
import {fruitRoute} from "./lib/fruit"
import { RegisterRoutes } from "./myRoutes"
//import { RegisterRoutes } from "./routes"
import swaggerUi from "swagger-ui-express"
const app: Express = express()
const port = Number(process.env.PORT) || 80
/*
let apikey="123456789"
app.use((req:Request,res:Response,next:NextFunction)=>{
  console.log("Middleware")
  if(req.headers.apikey!==apikey ){
    return res.status(401).json({error:"Unauthorized"})
  }
  next()
})
*/
if(process.env.NODE_ENV!=="production"){
  app.use(cors())
}
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({extended:true}))
app.use(express.static('static'))
app.use('/api/myapi',myapiRoute)
app.use('/api/fruits',fruitRoute)
RegisterRoutes(app) // /hello
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
// app.get('*',(req,res,next)=>{
//   res.sendFile(`${process.cwd()}/static/index.html`)
// })
app.listen(port, () => console.log(`Application is running on port ${port}`))
