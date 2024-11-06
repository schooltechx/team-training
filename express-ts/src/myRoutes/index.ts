import { Express, Request, Response } from 'express'
import {HelloController} from "../controllers/helloController";
export function RegisterRoutes(app: Express) {
  app.get("/hello", async (_req, res) => {
    const controller = new HelloController();
    const response = await controller.getMessage();
    res.send(response);
  });
}  
// https://medium.com/ms-club-of-sliit/building-rest-api-with-express-js-typescript-and-swagger-387a9c731717