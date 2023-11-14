import { AppDataSource } from "../data-source"
//import { NextFunction, Request, Response } from "express"
import { User,CreateUserDto,UpdateUserDto } from "../entity/User"
import {
    Body, Delete, Get, Patch, Path, Post, Put, Query, Route, SuccessResponse,
  } from "tsoa";
//export type CreateUserDto = Pick<User,"firstName"|"lastName"|"age">  
@Route("users")
export class UserController {
    private userRepository = AppDataSource.getRepository(User)
    @Get()
    async all() {
        return this.userRepository.find()
    }
    @Get("{id}")
    async one(@Path() id:number) {
        const user = await this.userRepository.findOne({where: { id }})
        return user
    }
    
    @SuccessResponse("201", "User Created")
    @Post()
    async save(@Body() requestBody:CreateUserDto) {
        //console.log(requestBody)
        const user = Object.assign(new User(), requestBody)
        return await this.userRepository.save(user)
    }
    @SuccessResponse("200", "User Updated")
    @Patch("{id}")
    async update(@Path() id:number,@Body() u:UpdateUserDto) {
        //const { firstName, lastName, age } = request.body;
        let user = await this.userRepository.findOneBy({ id })
        this.userRepository.merge(user,u)
        return await this.userRepository.save(user)
    }
    @SuccessResponse("204", "User Deleted")
    @Delete("{id}") 
    async remove(id:number) {
        let userToRemove = await this.userRepository.findOneBy({ id })
        if (!userToRemove) {
            return "this user not exist"
        }
        await this.userRepository.remove(userToRemove)
        return "user has been removed"
    }

}