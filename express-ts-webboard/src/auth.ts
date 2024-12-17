import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
/**
 * ส่งค่า Public key หรือ secret key เพื่อใช้กับ jsonwebtoken
 * ระบบต้องเลือกเซ็คค่าตัวแปรแวดล้อม SECRETKEY หรือ PUBLICKEY 
 */
function secretOrPublicKey() {
  if (process.env.SECRETKEY) return process.env.SECRETKEY;
  if (process.env.PUBLICKEY) return process.env.PUBLICKEY;
  throw "Require environment variable SECRETKEY or PUBLICKEY";
}
/**
 * ส่งค่า secret key หรือ Private key เพื่อใช้กับ jsonwebtoken
 * ระบบต้องเลือกเซ็คค่าตัวแปรแวดล้อม SECRETKEY หรือ PRIVATEKEY 
 */
function secretOrPrivateKey() {
  if (process.env.SECRETKEY) return process.env.SECRETKEY;
  if (process.env.PRIVATEKEY) return process.env.PRIVATEKEY;
  throw "Require environment variable SECRETKEY or PRIVATEKEY";
}
/**
 * สร้าง JWT จากข้อมูลของ payload
 * @param payload ข้อมูลที่จะถูก signed
 */
export function generateAccessToken(payload: string | Buffer | object) {
  const expiresIn = process.env.TOKEN_EXPIRE || "1800s";
  const algorithm = process.env.SECRETKEY ? "HS256" : "RS256";
  return jwt.sign(payload, secretOrPrivateKey(), { expiresIn, algorithm });
}

/**
 * Express middleware สำหรับตรวจสอบ token ใน authorization header
 * ถ้า หมดอายุหรือไม่ถูกต้องจะส่ง 401 กลับไป ถ้าถูกต้องก็จะส่งให้ middleware ตัวต่อไป
 * @example
 * ```ts
 * import {verify} from './auth'
 * ...
 * app.get('/api/profile',verify,nextMiddleWare)
 * ```
 */
export async function verify(req: Request, res: Response, next: NextFunction) {
  const berrerHeader = req.headers["authorization"];
  const token = berrerHeader && berrerHeader.split(" ")[1];
  if (!token) {
    res.status(401).send({ error: "No authorization token" });
  } else {
    try {
      //console.log(token)
      // console.log(secretOrPublicKey())
      let decodedToken = jwt.verify(token, secretOrPublicKey()) as jwt.JwtPayload;
      //console.log(decodedToken.role);
      next();
    } catch (e) {
      if (
        e instanceof jwt.JsonWebTokenError ||
        e instanceof jwt.TokenExpiredError ||
        e instanceof jwt.NotBeforeError
      ) {
        res.status(401).send({ error: `Verify token fail ${e.message}` });
      } else res.status(401).send({ error: "Unknow error" });
    }
  }
}
/**
 * Express middleware ใช้ตรวจ token และ  role 
 * ถ้า role ตรงกับ ตัวใดตัวหนึ่งตรงกับใน token ก็จะส่งต่อให้ middleware ตัวต่อไป
 * @example
 * ```ts
 * import {verifyRoles} from './auth'
 * ...
 * app.get('/api/profile',verifyRoles(["admin"]),nextMiddleWare)
 * ```
 */
export function verifyRoles(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const berrerHeader = req.headers["authorization"];
    const token = berrerHeader && berrerHeader.split(" ")[1];
    if (!token) {
      res.status(401).send({ error: "No authorization token" });
    } else {
      try {
        let decodedToken = jwt.verify(token, secretOrPublicKey()) as jwt.JwtPayload;
        let roleList = decodedToken.role;
        if (!roleList) {
          res.status(401).send({ error: `No role in token` });
        } else {
          let found=false
          for (let i = 0; i < roleList.length; i++) {
            if (roles.includes(roleList[i]))
              found=true
          }
          if(found){
            next();
          }else{
            res
            .status(401)
            .send({ error: `Rols not match ` + roleList.join(",") });
          }
        }
      } catch (e) {
        if (
          e instanceof jwt.JsonWebTokenError ||
          e instanceof jwt.TokenExpiredError ||
          e instanceof jwt.NotBeforeError
        ) {
          res.status(401).send({ error: `Verify token fail ${e.message}` });
        } else {
          res.status(401).send({ error: "Unknow error" });
        }
      }
    }
  };
}
/**
 * ทำการ decoded ค่าของ token ที่อยู่ใน authorization header
 * @example
 * ```ts
 * import {verify,getDecodeToken} from './auth'
 * ...
 * app.get('/api/profile',verify,(req: Request,res: Response) => {
 *   res.json(getDecodeToken(req))
 * })
 * ```
 */
export function getDecodeToken(req: Request,complete:boolean) {
  const berrerHeader = req.headers["authorization"]
  const algorithm = process.env.SECRETKEY ? "HS256" : "RS256"
  const token = berrerHeader && berrerHeader.split(" ")[1];
  if (!token) return null;
//   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return jwt.decode(token,{ complete}) as jwt.JwtPayload;

}
