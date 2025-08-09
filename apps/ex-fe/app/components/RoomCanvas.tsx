"use client"
import { WS_URL } from "@/config";
import { Canvas } from "./Canvas";
import {useEffect, useState} from "react"
export default function RoomCanvas({roomId}:{roomId:string}){

    const [socket,setSocket]=useState<WebSocket|null>(null);
    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZjkwNjFhYi1iNzNiLTRhNWQtOGM2Yy1jMGQ1NWQxNWVjMTgiLCJpYXQiOjE3NTQyODM0MjZ9.piSUCZGCVBg0m27eGW1pN44Vngwd7rTsLRCO3S4I2SA`);
        ws.onopen=()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type:"join_room",
                roomId:Number(roomId),

            }))
        }
    })
    
    if(!socket){
        return <div>
            Connecting to Server.......
        </div>
    }
    return(
        <Canvas roomId={roomId} socket={socket}/>
    )
}