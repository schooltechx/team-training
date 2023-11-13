// src/app.ts
import "dotenv/config"
import express, { Express, Request, Response } from 'express'
// import {myapiRoute} from './lib/myapi'
// import {fruitRoute} from "./lib/fruit"
const app: Express = express()
const port = Number(process.env.PORT) || 80
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
// app.use('/api/myapi',myapiRoute)
// app.use('/api/fruits',fruitRoute)
// C R U D
const test_data = [
    {id:1,name:"test1"},
    {id:2,name:"test2"}
]
app.get('/test', (req, res) => {
    res.json(test_data)
})
app.get('/test/:id', (req, res) => {
    const id = Number(req.params.id)
    res.send("Hello "+id)
})
//create
app.post('/test', (req, res) => {
    const data = JSON.stringify(req.body) 
    res.status(201).send("Creted :"+data)
})
// put,patch update
app.patch('/test/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = JSON.stringify(req.body) 
    res.send("Updated "+id+":"+data)
})
//Delete
app.delete('/test/:id', (req, res) => {
    const id = Number(req.params.id)
    res.send("Deleted "+id)
})


// app.get('*',(req,res)=>{
//   res.sendFile(`${process.cwd()}/static/index.html`)
// })

app.listen(port, () => console.log(`Application is running on port ${port}`))
