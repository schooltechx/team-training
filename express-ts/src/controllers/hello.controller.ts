import {Get,Post,Patch,Delete,SuccessResponse, 
  Route,Path,Query,Body,Example,Controller} from "@tsoa/runtime";
  type msgObj = {msg:string}  
  @Route("hello")
  export class HelloController extends Controller {
    /**
     * @param msg String in path /hello/Oom
    */
    @Get("{msg}")
    public async getMessage(@Path() msg:string){
      return {
        msg: "Hello! "+msg,
      };
    }
    /**
     * Create message
     * @param msgBody Object of Message
     */
    @Post()
    @SuccessResponse("201", "Created")
    public async logMessage(@Body() msgBody:msgObj){
      //this.setStatus(201);
      return msgBody
    }
    @Patch()
    public async updateMessage(@Body() msgBody:msgObj){
      //this.setStatus(201);
      return msgBody
    }
    /**
     * Remove message
     */
    @Delete()
    public async removeMessage(@Query() id:number){
      console.log("Remove "+id)
      return
    }
  }