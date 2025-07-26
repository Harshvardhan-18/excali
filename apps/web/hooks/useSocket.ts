import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading]=useState<boolean>(true);
    const [socket,setSocket]=useState<WebSocket>();
    const token=

    useEffect(()=>{
        const ws=new WebSocket(`${WEBSOCKET_URL}?token=${token}`);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);  
        }
    },[])

    return {
        socket,loading
    }
}