// src/app.ts
import "dotenv/config"
import cors from "cors" 
import express, { Express, Request, Response,NextFunction } from 'express'
import {myapiRoute} from './lib/myapi'
import {fruitRoute} from "./lib/fruit"
import swaggerUi from "swagger-ui-express"
import { ValidateError } from "tsoa";
const app: Express = express()
const port = Number(process.env.PORT) || 80
const apikey = Number(process.env.APIKEY) || '123456789'
if(process.env.NODE_ENV!=="production"){
  app.use(cors())
}
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({extended:true}))
app.use(express.static('static'))
app.use('/api/myapi',myapiRoute)
app.use('/api/fruits',fruitRoute)
//import { RegisterRoutes } from "./myRoutes"
import { RegisterRoutes } from "./routes"

const apiKeyCheck = (req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware");
  if (req.headers.apikey !== apikey) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
}
//app.use(apiKeyCheck);
app.get("/hello2",apiKeyCheck,(_req, res) => {
  res.send("Hello 2");
});

RegisterRoutes(app) 
app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});



app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.get("/", (_req, res) => {
  res.send("Hello Express");
});
// app.get('*',(req,res,next)=>{
//   res.sendFile(`${process.cwd()}/static/index.html`)
// })
app.listen(port, () => console.log(`Running on port http://localhost:${port}`))
