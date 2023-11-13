import jwt from "jsonwebtoken"
/* look like strong type does not need, see type definition of JwtPayload
declare module "jsonwebtoken" {
    export interface CustomJwtPayload extends jwt.JwtPayload {
        role?: string[];
    }
}*/
import { Request, Response, NextFunction } from 'express'
import fetch from 'node-fetch-commonjs';
let public_key = ""

/**
 * Initialize Public Key before use
 * @param url URL to realm ,example http://keycloak.local/realms/sso
 */
export async function initPublicKeyOnline(url:string){
    try{
        const res = await fetch(url)
        if(!res.ok) throw new Error("Fetch public key fail")
        const data  = await res.json() as { public_key: string }
        if (!data.public_key) {
            throw new Error("Fetch public key fail")
        }
        public_key = `-----BEGIN PUBLIC KEY-----\n${data.public_key}\n-----END PUBLIC KEY-----`   
    }catch(e){
        console.error(e)
        return false
    }
    console.log("initPublicKeyOnline \n",public_key)
    return true
}
/**
 * Initialize Public Key before use
 * @param key undefine alway return false
 */
export async function initPublicKey(key:string){
    public_key = `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`
    console.log("initPublicKey "+public_key)
    return true
}

/**
 * Express middleware verify token in authorization header use public key
 * faster than verifyOnline
 * @example
 * ```ts
 * import {verify,verify,getDecodeToken} from './auth'
 * ...
 * app.get('/api/profile',verify,nextMiddleWare)
 * ```
 */
export async function verify(req: Request, res: Response, next: NextFunction) {
    const berrerHeader = req.headers["authorization"]
    const token = berrerHeader && berrerHeader.split(" ")[1]
    if (!token) return res.status(401).send({ error: 'No authorization token' });
    try {
        //console.log(token)
        let decodedToken = jwt.verify(token, public_key, { algorithms: ["RS256"] }) as jwt.JwtPayload
        console.log(decodedToken.role)
        next()
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError ||
            e instanceof jwt.TokenExpiredError ||
            e instanceof jwt.NotBeforeError) {
            return res.status(401).send({ error: `Verify token fail ${e.message}` });
        }
        return res.status(401).send({ error: 'Unknow error' });
    }
}
/**
 * Express middleware verify token with role check 
 * found only one role in array match is pass (or)
 * @example
 * ```ts
 * import {protect,getDecodeToken} from './auth'
 * ...
 * app.get('/api/profile',verifyRoles(["admin"]),nextMiddleWare)
 * ```
 */
export function verifyRoles(roles:string[]){
    return (req: Request, res: Response, next: NextFunction) => {
        const berrerHeader = req.headers["authorization"]
        const token = berrerHeader && berrerHeader.split(" ")[1]
        if (!token) return res.status(401).send({ error: 'No authorization token' });
        try {
            let decodedToken = jwt.verify(token, public_key, { algorithms: ["RS256"] }) as jwt.JwtPayload
            let roleList = decodedToken.role
            if(!roleList)
                return res.status(401).send({ error: `No role in token` });
            
            for(let i=0;i<roleList.length;i++){
                if(roles.includes(roleList[i])) next()
            }
            return res.status(401).send({ error: `Rols not match `+roleList.join(',')});
            
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError ||
                e instanceof jwt.TokenExpiredError ||
                e instanceof jwt.NotBeforeError) {
                return res.status(401).send({ error: `Verify token fail ${e.message}` });
            }
            return res.status(401).send({ error: 'Unknow error' });
        }
    }
  }
/**
 * Express middleware verify token in authorization header use api endpoint
 * slow but secre for band token
 * @example
 * ```ts
 * import {verify,verifyOnline,getDecodeToken} from './auth'
 * ...
 * app.get('/api/profile',verifyOnline,nextMiddleWare)
 * ```
 */

export async function verifyOnline(req: Request, res: Response, next: NextFunction) {
    res.locals.data = {}
    const berrerHeader = req.headers["authorization"]
    const token = berrerHeader && berrerHeader.split(" ")[1]
    if (!token) return res.status(401).send({ error: 'No authorization token' });

    const r = await fetch(`${process.env.REALM_URL}/protocol/openid-connect/userinfo`, {
        headers: {
            Authorization: `${req.headers.authorization}`
        }
    })
    if (r.ok) {
        let decodedToken = await r.json() as jwt.JwtPayload
        next()
    } else {
        return res.status(401).send({ error: 'Verify token endpoint fail' });
    }
}
/**
 * retrive decoded token after call verify or verifyOnline
 * @example
 * ```ts
 * import {verify,verifyOnline,getDecodeToken} from './auth'
 * ...
 * app.get('/api/profile',verifyOnline,(req: Request,res: Response) => {
 *   res.json(getDecodeToken(req))
 * })
 * ```
 */
export function getDecodeToken(req: Request) {
    const berrerHeader = req.headers["authorization"]
    const token = berrerHeader && berrerHeader.split(" ")[1]
    if (!token) return null
    return jwt.decode(token,{complete:true}) as jwt.JwtPayload
}
