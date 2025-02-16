import dotenv from 'dotenv'; 
dotenv.config();
import cors from "cors" 
import express, { Express, Request, Response } from 'express'
import {initPublicKey,initPublicKeyOnline,verifyRoles, verify,verifyOnline,getDecodeToken} from './auth'
const app: Express = express()
const port: number = Number(process.env.PORT) || 80;
if(process.env.NODE_ENV!=="production"){
  app.use(cors())
}

app.use(express.json()); // ‘application/json’ 
app.use(express.raw());  // ‘application/octet-stream’ 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

(async()=>{ //simulate top level await
  let isInit = (
  (process.env.PUBLICKEY && await initPublicKey(process.env.PUBLICKEY)) || 
  (process.env.REALM_URL && await initPublicKeyOnline(process.env.REALM_URL)) )
  if(!isInit){
    console.error('Require valid environment variable REALM_URL or PUBLIC_KEY')
    process.exit(1)
  }
  app.get('/api/profile',verify, (req: Request, res: Response) => {
    let dt = getDecodeToken(req)
    console.log(dt)
    // console.log(dt?.role)
    res.json(dt)
  })
  app.get('/api/admin_profile',verifyRoles(["admin"]), (req: Request, res: Response) => {
    let dt = getDecodeToken(req)
    // console.log(dt?.role)
    console.log("This is admin")
    console.log(dt?.role)
    res.json(dt)
  })
  app.get('*',(req,res,next)=>{
    res.sendFile(`${process.cwd()}/static/index.html`)
  })

  app.listen(port, () => console.log(`Application is running on port ${port}`))
})();

