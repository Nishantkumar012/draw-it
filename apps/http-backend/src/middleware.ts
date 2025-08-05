import { Request,Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET ='10';


  declare global{
    namespace Express{
         interface Request{
             userId?: string;
         }
    }
  }

 export const usermiddleware = (req:Request,res:Response,next:NextFunction)=>{
       
          const header = req.headers['authorization'];

          if(!header){
               return res.status(401).json({message: "Authorization headers are missing"})

          }

          const token = header.split(' ')[1];

          if(!token){
              return res.status(401).json({message: "Token is missing"})
          }

          try {
                  
                  if(!JWT_SECRET){
                             return res.status(500).json({message:"JWT_SECRET is not provided"})
                        }
                         
                        const decoded = jwt.verify(token as string ,JWT_SECRET) as JwtPayload

                        if(!decoded){
                             return res.status(403).json({message: "token payload is not correct"});
                         }

                         req.userId = decoded.userId;

                         next();
                
                } catch (error) {
                       return res.status(403).json({message: error})
                }
 }