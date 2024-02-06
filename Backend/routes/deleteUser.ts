
import { Router } from 'express';
import express, { Request, Response } from 'express';
import {  getRepository } from "typeorm";
import { User } from '../entities/User';

const router = Router();


router.post("/delete", async (req: Request, res: Response) => {
    let { startID, endID } = req.body;
    try {
    let userRepo = await getRepository(User);

    let find = await userRepo.findOne({where:{id:startID}})
    let find2 = await userRepo.findOne({where:{id:endID}})

    if(find && find2){
        let userTodelete = async (id: number) => {
            await userRepo.delete(id);
          }
          for (let i = startID; i <= endID; i++) {
              userTodelete(i);
          }
          res.send("users deleted successfully")
    }
    else{
        res.send("id didn't exist");
    }
} catch (error) {
        res.send(error)
}
    
  });

  export default router;
