import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/be-common/config";
import { middleware } from "./middleware";
import {createRoomSchema, createUserSchema, signInSchema} from "@repo/common/types";


const app=express();

app.use(express.json());

app.post("/signin",(req,res)=>{
    const data=signInSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message:"Incorrect inputs"
        })
    }
    const userId=1;
    const token=jwt.sign({userId},JWT_SECRET);

    res.json({
        token
    })
})
app.post("/signup",(req,res)=>{
    const data=createUserSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message:"Incorrect inputs"
        })
    }
    res.json({
        userId:"123"
    })
})
app.post("/room",middleware,(req,res)=>{
    const data=createRoomSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message:"Incorrect inputs"
        })
    }
    res.json({
        roomId:123
    })
})



app.listen(3001);