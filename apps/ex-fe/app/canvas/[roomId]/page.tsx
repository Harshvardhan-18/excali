"use client"
import {useEffect, useRef,useState} from "react"
export default function Canvas(){
    const canvasRef=useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if(canvasRef.current){
            const canvas=canvasRef.current;
            const ctx=canvas.getContext("2d");
            if(!ctx) {return};
            let clicked=false;
            let stX=0;
            let stY=0;
            canvas.addEventListener("mousedown",(e)=>{
                clicked=true;
                stX=e.clientX;
                stY=e.clientY ;

            })
            canvas.addEventListener("mouseup",(e)=>{
                clicked=false;
                console.log(e.clientX);
                console.log(e.clientY);

            })
            
                canvas.addEventListener("mousemove",(e)=>{
                    if(clicked){
                        const width=e.clientX-stX;
                        const height=e.clientY-stY;
                        ctx.clearRect(0,0,canvas.width,canvas.height);
                        ctx.strokeRect(stX,stY,width,height);
                    }

            })
            
        }
    },[canvasRef])
    return(
        <div className="bg-white">
            <canvas ref={canvasRef} height={500} width={500}></canvas>
        </div>
    )
}