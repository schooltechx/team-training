import express, { Express, Request, Response,NextFunction } from 'express'
export const myapiRoute = express.Router()
export const testRoute = express.Router()
import {hello} from "./hello"
myapiRoute.get('/', (req, res) => {
    res.json(hello("My Express"));
});

// C R U D
const test_data = [
    {id:1,name:"test1"},
    {id:2,name:"test2"}
]
testRoute.get('/', (req, res) => {
    res.json(test_data)
})
testRoute.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    res.send("Hello "+id)
})
//Create:
testRoute.post('/', (req, res) => {
    const data = JSON.stringify(req.body) 
    res.status(201).send("Creted :"+data)
})
//Update: put,patch 
testRoute.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = JSON.stringify(req.body) 
    res.send("Updated "+id+":"+data)
})
//Delete:
testRoute.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    res.status(204).send("Deleted "+id)
})

