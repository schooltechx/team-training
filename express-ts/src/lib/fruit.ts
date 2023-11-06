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
    {id:1,name:"apple",color:"green"},
    {id:2,name:"apple",color:"red"},
]
interface Fruit{
    id:number;
    name:string;
    color:string;
}
fruitRoute.get('/', (req, res) => {
    res.json(_fruit);
});
fruitRoute.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const afruit = _fruit.find((e)=>{
        return e.id===id
    })
    res.json(afruit);
});
fruitRoute.post('/', (req, res) => {
    const id = Date.now()
    const afruit = {id,...req.body}
    _fruit.push(afruit)
    res.json(afruit);
});

