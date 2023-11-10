import express, { Express, Request, Response,NextFunction } from 'express'
export const fruitRoute = express.Router()
/* C R U D
GET /api/fruits (GET array of fruit) R
GET /api/fruits/1 (GET a fruit) R
POST /api/fruits (Create fruit) C
PATCH /api/fruits/1 (Update fruit) U
DELETE /api/fruits/1 (Delete a fruit) D filter
*/
let _fruit=[
    {id:1,name:"Apple",color:"green"},
    {id:2,name:"Apple",color:"red"},
]

fruitRoute.get('/', (req, res) => {
    res.json(_fruit);
});
fruitRoute.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const afruit = _fruit.find((e)=>e.id===id)
    res.json(afruit);
});

fruitRoute.post('/', (req, res) => {
    const id = Date.now()
    console.log(req.body)
    const afruit = {id,...req.body}
    _fruit.push(afruit)
    res.status(201).json(afruit);
});
fruitRoute.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const afruit = _fruit.find((e)=>e.id===id)
    if(afruit){
        _fruit = _fruit.filter(e=>e.id!==id)
        res.sendStatus(204);
    }else{
        res.sendStatus(404)
    }
        
    
});
fruitRoute.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const afruit = _fruit.find((e)=>e.id===id)
    console.log(afruit)
    if(afruit){
        _fruit = _fruit.filter(e=>e.id!==id) 
        const updatedFruit = {...afruit ,...req.body}
        _fruit.push(updatedFruit)
        res.status(200).json(updatedFruit);
    }else{
        res.sendStatus(404)
    }
});

