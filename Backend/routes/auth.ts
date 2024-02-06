// routes/auth.ts
import { Router } from 'express';
import express, { Request, Response,NextFunction } from 'express';
import {  getRepository } from "typeorm";
import { User } from '../entities/User';
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IUser from '../interface/user';
import extractJWT from '../middleware/extractJWT';




const router = Router();
const jwtSecret = 'i am muqadas'; // Replace with your actual secret key

//it is important to set type using interfaces in typescript while passing arguments.
 
const signJWT=(user:IUser, callback:(error:Error | null , token:string| null)=>void):void =>{
  try {
    jwt.sign({email : user.email},jwtSecret,(error,token)=>{
      if(error){
        callback(error , null)
      }
      else if(token){
        callback(null,token)
      }
    }) 
  } catch (error) {
    callback(error,null)
  }
}

// Create user
router.post(
  '/createUser',
  [
    // Validation using express-validator middleware
    body('userName').notEmpty().withMessage('User Name is required'),
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req:Request, res:Response) => {

    try {
    let userRepo =await getRepository(User);
    let { userName, email, password } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hashing passwords
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    // Check if user with the same email already exists
    let a = await userRepo.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!a) {
      let newUser = new User();
      newUser.userName = userName;
      newUser.email = email;
      newUser.password = secPassword;
      await userRepo.save(newUser);
      res.status(201).send({message:"user created" , user: newUser})
    } else {
      res.status(404).json({ message: 'User with that email already exists' });
    }
  } catch (error) {
      res.send(error)
  }
  }
);

// Login with email and password
router.post(
  '/login',
  [
    // Validation using express-validator middleware
    body('email').notEmpty().isEmail().withMessage('Enter correct email'),
  ],
  async (req:Request, res:Response) => {

    try {
    let { email, password } = req.body;
    const userRepo = await getRepository(User);
    // Search for the user by email
    let user = await userRepo.findOne({
      where: {
        email: email
      }
    });

    // If user found, then compare the entered password with the password stored in the database
    if (user) {
      let isPasswordMatch = await bcrypt.compare(password, user.password);
      // If the password matches, give the user a JWT token
      if (isPasswordMatch) {
        //generate token
       signJWT(user,(error , token)=>{
        if(error){
          res.send("unable to generate token");
        }
        else if(token){
          res.status(201).json({token : token});
        }
       })
       
      } else {
        res.status(401).send('Enter the right password');
      }
    } else {
      res.status(401).send('Email not found: enter a valid email');
    }
  } catch (error) {
      res.send(error)
  }
  }
);

//get user
router.get('/getUser',extractJWT, async (req: Request, res: Response) => {
  try {
  const user= res.locals.user;
  const userEmail = user.email;
  res.send(userEmail);
  console.log(userEmail)
} catch (error) {
  res.send(error)

}
});







export default router;
