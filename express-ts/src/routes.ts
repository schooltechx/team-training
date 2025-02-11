/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HelloZodController } from './controllers/helloZod.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HelloController } from './controllers/hello.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "msgZodObj": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"msg":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "msgObj": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"msg":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsHelloZodController_getMessage: Record<string, TsoaRoute.ParameterSchema> = {
                msg: {"in":"path","name":"msg","required":true,"dataType":"string"},
        };
        app.get('/helloZod/:msg',
            ...(fetchMiddlewares<RequestHandler>(HelloZodController)),
            ...(fetchMiddlewares<RequestHandler>(HelloZodController.prototype.getMessage)),

            async function HelloZodController_getMessage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHelloZodController_getMessage, request, response });

                const controller = new HelloZodController();

              await templateService.apiHandler({
                methodName: 'getMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHelloZodController_logMessage: Record<string, TsoaRoute.ParameterSchema> = {
                msgBody: {"in":"body","name":"msgBody","required":true,"ref":"msgZodObj"},
        };
        app.post('/helloZod',
            ...(fetchMiddlewares<RequestHandler>(HelloZodController)),
            ...(fetchMiddlewares<RequestHandler>(HelloZodController.prototype.logMessage)),

            async function HelloZodController_logMessage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHelloZodController_logMessage, request, response });

                const controller = new HelloZodController();

              await templateService.apiHandler({
                methodName: 'logMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHelloZodController_updateMessage: Record<string, TsoaRoute.ParameterSchema> = {
                msgBody: {"in":"body","name":"msgBody","required":true,"ref":"msgZodObj"},
        };
        app.patch('/helloZod',
            ...(fetchMiddlewares<RequestHandler>(HelloZodController)),
            ...(fetchMiddlewares<RequestHandler>(HelloZodController.prototype.updateMessage)),

            async function HelloZodController_updateMessage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHelloZodController_updateMessage, request, response });

                const controller = new HelloZodController();

              await templateService.apiHandler({
                methodName: 'updateMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHelloZodController_removeMessage: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/helloZod',
            ...(fetchMiddlewares<RequestHandler>(HelloZodController)),
            ...(fetchMiddlewares<RequestHandler>(HelloZodController.prototype.removeMessage)),

            async function HelloZodController_removeMessage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHelloZodController_removeMessage, request, response });

                const controller = new HelloZodController();

              await templateService.apiHandler({
                methodName: 'removeMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHelloController_getMessage: Record<string, TsoaRoute.ParameterSchema> = {
                msg: {"in":"path","name":"msg","required":true,"dataType":"string"},
        };
        app.get('/hello/:msg',
            ...(fetchMiddlewares<RequestHandler>(HelloController)),
            ...(fetchMiddlewares<RequestHandler>(HelloController.prototype.getMessage)),

            async function HelloController_getMessage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHelloController_getMessage, request, response });

                const controller = new HelloController();

              await templateService.apiHandler({
                methodName: 'getMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHelloController_logMessage: Record<string, TsoaRoute.ParameterSchema> = {
                msgBody: {"in":"body","name":"msgBody","required":true,"ref":"msgObj"},
        };
        app.post('/hello',
            ...(fetchMiddlewares<RequestHandler>(HelloController)),
            ...(fetchMiddlewares<RequestHandler>(HelloController.prototype.logMessage)),

            async function HelloController_logMessage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHelloController_logMessage, request, response });

                const controller = new HelloController();

              await templateService.apiHandler({
                methodName: 'logMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHelloController_updateMessage: Record<string, TsoaRoute.ParameterSchema> = {
                msgBody: {"in":"body","name":"msgBody","required":true,"ref":"msgObj"},
        };
        app.patch('/hello',
            ...(fetchMiddlewares<RequestHandler>(HelloController)),
            ...(fetchMiddlewares<RequestHandler>(HelloController.prototype.updateMessage)),

            async function HelloController_updateMessage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHelloController_updateMessage, request, response });

                const controller = new HelloController();

              await templateService.apiHandler({
                methodName: 'updateMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHelloController_removeMessage: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/hello',
            ...(fetchMiddlewares<RequestHandler>(HelloController)),
            ...(fetchMiddlewares<RequestHandler>(HelloController.prototype.removeMessage)),

            async function HelloController_removeMessage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHelloController_removeMessage, request, response });

                const controller = new HelloController();

              await templateService.apiHandler({
                methodName: 'removeMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
