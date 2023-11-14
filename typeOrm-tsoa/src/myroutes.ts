import { Express, Request, Response } from 'express'
import { UserController } from "./controller/UserController"
const users = new UserController()

// 
// https://orkhan.gitbook.io/typeorm/docs/example-with-express
export function RegisterRoutes(app: Express) {
    app.get('/users', async (req, res, next) => {
        res.json(await users.all())
    })
    app.get('/users/:id', async (req, res, next) => {
        const id = parseInt(req.params.id)
        const u = await users.one(id)
        if(!u){
            res.status(404).json({error:"User not found"})
        }else{
            res.json(u)
        }
        
    })
    app.post('/users', async (req, res, next) => {
        res.status(201).json(await users.save(req.body))
    })
    app.patch('/users/:id', async (req, res, next) => {
        const id = parseInt(req.params.id)
        const u = await users.one(id)
        if(!u){
            res.status(404).json({error:"user not found"})
        }else{
            await users.update(id,req.body)
            res.status(200).json(await users.update(id,req.body))
        }
        
    })

    app.delete('/users/:id', async (req, res, next) => {
        const id = parseInt(req.params.id)
        const u = await users.one(id)
        if(!u){
            res.status(404).json({error:"user not found"})
        }else{
            await users.remove(id)
            res.sendStatus(204)
        }
    })
}
