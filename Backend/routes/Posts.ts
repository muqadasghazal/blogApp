import { Router } from "express";
import express, { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { body, validationResult } from "express-validator";
import { Posts } from "../entities/Posts";
import extractJWT from "../middleware/extractJWT";
import IUser from "../interface/user";

const router = Router();

//we use get request when we need to send something in header
//must send jet token in header of posts bcz we are using extractJWT that takes token from header
//login + auth token required
router.post(
  "/createPost",
  extractJWT,
  [
    // Validation using express-validator middleware
    body("title").notEmpty().withMessage("title is required"),
    body("content").notEmpty().withMessage("content is required"),
  ],
  async (req: Request, res: Response) => {
    let { title, content } = req.body;
    try {
      //check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //fetches user email from response decoded data sent by extractJWT in res.locals.
      const user: IUser = res.locals.user;
      const userEmail = user.email;

      const userRepo = await getRepository(User);
      let userfound = await userRepo.findOne({
        where: {
          email: userEmail,
        },
      });

      const postrepo = await getRepository(Posts);
      let newPost: Posts = new Posts();
      newPost.title = title;
      newPost.content = content;
      newPost.user = userfound;

      await postrepo.save(newPost);
      res
        .status(201)
        .json({ message: "Post created against userEmail:" + userEmail });
    } catch (error) {
      res.status(401).send(error);
    }
  }
);

//don't forget to send Authorization token in header
router.get("/getPosts", extractJWT, async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const userRepo = getRepository(User);
    const userFound = await userRepo.findOne({
      where: {
        email: user.email,
      },
      relations: ["userPosts"], // Eagerly load the userPosts relationship
    });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const postsFound = userFound.userPosts; // Access posts directly from the user object

    res.status(201).json({ postsFound });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//login required to see others posts
router.get(
  "/getAllUserPosts",
  extractJWT,
  async (req: Request, res: Response) => {
    let postrepo = await getRepository(Posts);
    let postFound = await postrepo.find();
    try {
      if (postFound.length !== 0) {
        res.status(201).json({postFound});
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//delete posts
//login required
//make request like this : localhost:3020/api/auth/update/26
router.delete(
  "/deletePost/:id",
  extractJWT,
  async (req: Request, res: Response) => {
    try {
      let postId = Number(req.params.id);
      const user = res.locals.user;
      let userRepo = await getRepository(User);
      //1- extract user id by data sent by res.locals afte rverifying jwt
      let userFound = await userRepo.findOne({
        where: {
          email: user.email,
        },
      });
      let userid = userFound.id;

      //2-once its extracted, now check that user who want  to update post is same who has these posts? or he
      //want to update other people posts
      let postrRepo = await getRepository(Posts);
      let postFound = await postrRepo.findOne({
        where: {
          id: postId,
        },
      });
      let postofUser = postFound.user;
      let useridFromPost = postofUser.id;

      //check user id from post == userid fwho is loged in
      //update post

      if (useridFromPost === userid) {
        let postdeleted = await postrRepo.delete(postId);
        try {
          if (postdeleted) {
            res.status(200).json({ message: "post delete" });
          }
        } catch (error) {
          res.status(401).send(error);
        }
      } else {
        res.status(401).send("You are not allowed to delete others post");
      }
    } catch (error) {
      res.status(401).send(error);
    }
  }
);

//delete post
//login required
//auth token required
router.put("/update/:id", extractJWT, async (req: Request, res: Response) => {
  try {
    let postId = Number(req.params.id);
    const { title, content } = req.body;
    const user = res.locals.user;
    let userRepo = await getRepository(User);
    //1- extract user id by data sent by res.locals afte rverifying jwt
    let userFound = await userRepo.findOne({
      where: {
        email: user.email,
      },
    });
    let userid = userFound.id;

    //2-once its extracted, now check that user who want  to update post is same who has these posts? or he
    //want to update other people posts
    let postrRepo = await getRepository(Posts);
    let postFound = await postrRepo.findOne({
      where: {
        id: postId,
      },
    });
    let postofUser = postFound.user;
    let useridFromPost = postofUser.id;

    //check user id from post == userid fwho is loged in
    //update post
    if (useridFromPost === userid) {
      if (title) {
        postFound.title = title;
      }
      if (content) {
        postFound.content = content;
      }
      let postsaved = await postrRepo.save(postFound);
      res.status(200).json({ postsaved: postsaved });
    } else {
      res.status(401).send("You are not allowed to update others post");
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

export default router;
