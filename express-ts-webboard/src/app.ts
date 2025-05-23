import express from 'express'
import 'dotenv/config'
import {userRoute,meRoute} from './users-routes'
import {postRoute} from './posts-routes'
const port = Number(process.env.PORT)||80
const app = express()
app.use(express.json()); // ‘application/json’ 
app.use(express.raw());  // ‘application/octet-stream’ 
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use('/api/me',meRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.get('/hello',(_req,res)=>{res.send("hello")})
console.log("server start http://localhost:"+port)
const server = app.listen(port)