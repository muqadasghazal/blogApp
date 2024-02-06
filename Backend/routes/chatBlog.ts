import { Router } from "express";
import express, { Request, Response, NextFunction } from "express";
import { OpenAI } from "openai"; // Corrected import

const router = Router();

const openai = new OpenAI({
  apiKey: "",
});

router.post("/chat", async (req: Request, res: Response) => {
  const {prompt , typeofquestions } = req.body;
  try {
    const response = await openai.chat.completions
    .create({
      messages: [
        {role:'system' , content: `Generate a ${typeofquestions} type on ${prompt} topic quiz code in JavaScript suitable for a server-side environment. 
        The code should not include any references to the 'document' object or browser-specific APIs.`,},
        { role: "user", content: `${prompt}` }],
      model: "gpt-3.5-turbo"
    })
    let finalRes = response.choices[0].message.content;
    res.status(200).json({finalRes})
  } catch (error) {
    res.status(401).send( "error on ai response generation:" +error)
  }



        
});

export default router;
