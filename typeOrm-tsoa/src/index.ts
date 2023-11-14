import "dotenv/config" 
import express,{ Request, Response,NextFunction } from "express"
import { ValidateError } from "tsoa";
import { AppDataSource } from "./data-source"
//import { RegisterRoutes } from "./myroutes"
import { RegisterRoutes } from "./routes"
import { User } from "./entity/User"
import swaggerJson from "./swagger.json";
import swaggerUI from "swagger-ui-express";
const port = Number(process.env.PORT) || 80
AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(express.json())
    app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJson));
    RegisterRoutes(app)

    //https://tsoa-community.github.io/docs/error-handling.html
    app.use(function errorHandler(
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction
      ): Response | void {
        if (err instanceof ValidateError) {
          console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
          console.log(err)
          return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
          });
        }
        if (err instanceof Error) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }
        next();
      });


    // start express server
    app.listen(port)
    console.log("Express server has started on port "+port)

}).catch(error => console.log(error))
