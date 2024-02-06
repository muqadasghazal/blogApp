import express, { Request, Response } from "express";
import { createConnection, getRepository } from "typeorm";
import authRoute from "./routes/auth";
import postRoute from "./routes/Posts";
import deleteUser from "./routes/deleteUser";
import chat from "./routes/chatBlog"
import cors from 'cors'
import {getConnectionOptions } from "typeorm";


//things done in this code
//1-connection with db
//2-validation , data storing in db , token eneration, hashing password
//3-avoiding duplication if use user in db
//4-deleting specified user


//5-user rgistration in db
//6-user login authentication

const app = express();
const port = 3020;
app.use(express.json());
app.use(cors());
createConnection()
  .then(async (connection)=>{
    await connection.runMigrations().then(()=>{
      console.log("migration done")
    }).catch((e)=>{
      console.log(e)
    });
    console.log("db connected")
  })
  .catch((e) => {
    console.log("erroe:" + e);
  });


const jwtSecret = "i am muqadas";
//create and authenticate user
app.use("/api/auth", authRoute);
//create posts
app.use("/api/auth", postRoute);
//delet users
app.use("/api/auth", deleteUser);

app.use("/api/chat", chat);

app.get('/helo',(req:Request , res:Response)=>{
  console.log("helo");
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
