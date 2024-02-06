import exp from 'constants';
import { Router } from 'express';
import express, { Request, Response,NextFunction } from 'express';
import jwt from "jsonwebtoken";
import IUser from '../interface/user';


const jwtSecret = 'i am muqadas'; // Replace with your actual secret key
const extractJWT =(req:Request , res:Response,next:NextFunction)=>{
    let token =req.headers.authorization?.split(' ')[1];
    if(token){
      jwt.verify(token,jwtSecret,(error,decoded)=>{
        if(error){
          return res.status(404).json({message:error.message , error});
        }
        else{
           const user = decoded as IUser;
          res.locals.user = user;
          next();
        }
      })
      
    }
    else{
      return res.status(401).json({
        message:"unauthorized"
      });
    }
  
  }
  export default extractJWT;