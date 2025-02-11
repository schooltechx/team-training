import { Express, Request, Response } from 'express'
import { HelloController } from "../controllers/hello.controller";
export function RegisterRoutes(app: Express) {
  app.get("/hello/:msg", async (req, res) => {
    const controller = new HelloController();
    const response = await controller.getMessage(req.params.msg);
    res.send(response);
  });
}
// https://medium.com/ms-club-of-sliit/building-rest-api-with-express-js-typescript-and-swagger-387a9c731717