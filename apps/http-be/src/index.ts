import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/be-common/config";
import { middleware } from "./middleware";
import {
  createRoomSchema,
  createUserSchema,
  signInSchema,
} from "@repo/common/types";
import bcrypt from "bcrypt";
import cors from "cors"
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(cors({
  origin:"http://localhost:3000",
  credentials: true
}))

app.use(express.json());

app.post("/signin", async(req, res) => {
  const parsedData = signInSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }
  const user=await prismaClient.user.findFirst({
    where:{
      email:parsedData.data.username
    }
  })


  if(!user){
    res.status(403).json({
      message:"Not authorized"
    })
  }

  if(await bcrypt.compare(parsedData.data.password,user?.password as string)){
      const token = jwt.sign({ userId:user?.id }, JWT_SECRET);
      res.send(
        token
      )
      res.cookie("token",token,{
        httpOnly:true,
      });
  }else{
      res.json(403).json({
        message:"Incorect password"
      })
  }


  
});
app.post("/signup", async (req, res) => {
  const parsedData = createUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }
  try {
    const name=parsedData.data?.name;
    const password=parsedData.data?.password;
    const hashedPasword=await bcrypt.hash(password,10);
    await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: hashedPasword,
        name: name,
      },
    });

    

    res.json({
      message:`${name} is signed up!!`
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists with this username",
    });
  }
});
app.post("/room", middleware, async(req, res) => {
  const parsedData = createRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }
  const userId=req.userId;
  try{

    const room =await prismaClient.room.create({
      data:{
        slug:parsedData.data.name,
        adminId:userId
      }
    })
    res.json({
      roomId: room.id,
    });
  }catch(e){
    res.status(411).json({
      message:"Room already exists"
    })
  }
});

app.get("/chats/:roomId",async(req,res)=>{
  try{
    const roomId=Number(req.params.roomId);
  const messages=await prismaClient.chat.findMany({
    where:{
      roomId:roomId
    },
    orderBy:{
      id:"desc"
    },
    take:50
  })
  res.json({
    messages
  })
  }catch(e){
    res.json({
      messages:[]
    })
  }
  
})
app.get("/room/:slug",async(req,res)=>{
  const slug =req.params.slug;
  const room=await prismaClient.room.findFirst({
    where:{
        slug
    }
  })
  res.json({
    room
  })
})

app.listen(3001);
