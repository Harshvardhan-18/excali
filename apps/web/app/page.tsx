"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home(){
  const [roomId,setroomId]=useState("")
  const router=useRouter();
  return(
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw"
    }}>
      <input style={{
          padding: 10
        }} value={roomId} onChange={(e)=>{
        setroomId(e.target.value)
      }} type="text" placeholder="" />

      <button style={{
          padding: 10
        }} onClick={()=>{
        router.push(`/room/${roomId}`)}
      }>
        Join room
      </button>

    </div>
  )
}