import express, { Express, Request, Response,NextFunction } from 'express'
export const myapiRoute = express.Router()

myapiRoute.get('/', (req, res) => {
    res.json({
        message: 'Hello from My API',
    });
});

// /api/myapi/area?width=3&height=4
myapiRoute.get('/area', (req, res,next) => {
    const width = Number(req.query.width)
    const height = Number(req.query.height)
    const area = width*height
    return res.json(area)

});

