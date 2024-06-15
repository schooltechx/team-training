import {Get, Route} from "tsoa";  
  @Route("hello")
  export class HelloController {
    @Get()
    public async getMessage(){
      return {
        message: "hello",
      };
    }
  }