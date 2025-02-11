import {
  Get, Post, Patch, Delete, SuccessResponse,
  Route, Path, Query, Controller
} from "@tsoa/runtime";
import {Body,ValidateBody} from '../lib/validation.decorators'
import {string, z} from 'zod'
type msgZodObj = { id:number, msg: string }
const msgZodObjSchema = z.object({
  id: z.number().optional().or(z.literal(0)),
  msg:z.string().min(5, "Must be at least 5 letters long")
})

@Route("helloZod")
export class HelloZodController extends Controller {
  /**
   * @param msg String in path /helloZod/Oom
  */
  @Get("{msg}")
  public async getMessage(@Path() msg: string) {
    return {
      msg: "Hello! " + msg,
    };
  }
  /**
   * Create message
   * @param msgBody Object of Message
   */
  @Post()
  @SuccessResponse("201", "Message Created")
  @ValidateBody(msgZodObjSchema)
  public async logMessage(@Body() msgBody: msgZodObj) {
    //this.setStatus(201);
    return msgBody
  }
  @Patch()
  @SuccessResponse("200","Message updated")
  public async updateMessage(@Body() msgBody: msgZodObj) {
    //this.setStatus(201);
    return msgBody
  }
  /**
   * Remove message
   */
  @Delete()
  public async removeMessage(@Query() id: number) {
    console.log("Remove " + id)
    return
  }
}