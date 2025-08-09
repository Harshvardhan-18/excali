import { useEffect,useRef,useState } from "react";
import { initDraw } from "../draw";
import { IconButton } from "./IconButton";
import { Circle, Pencil, PenLineIcon, RectangleHorizontalIcon } from "lucide-react";

export type Tool = "circle" | "rect" | "pencil" | "line";

export function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){
        const canvasRef=useRef<HTMLCanvasElement>(null);
        const [selectedTool, setSelectedTool] = useState<Tool>("circle")

    useEffect(()=>{
        if(canvasRef.current){ 
            initDraw(canvasRef.current,roomId,socket);         
        }
    },[canvasRef])
    useEffect(()=>{
        //@ts-ignore
        window.selectedTool=selectedTool;

    },[selectedTool])
    return <div style={{
        height: "100vh",
        overflow: "hidden"
    }}>
        <canvas ref={canvasRef} width={2000} height={1460}></canvas>
        <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
    </div>
}

function Topbar({selectedTool, setSelectedTool}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return <div style={{
            position: "fixed",
            top: 10,
            left: 10
        }}>
            <div className="flex gap-t">
                <IconButton 
                    onClick={() => {
                        setSelectedTool("pencil")
                    }}
                    activated={selectedTool === "pencil"}
                    icon={<Pencil />}
                />
                <IconButton onClick={() => {
                    setSelectedTool("rect")
                }} activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon />}></IconButton>
                <IconButton onClick={() => {
                    setSelectedTool("line")
                }} activated={selectedTool === "line"} icon={<PenLineIcon/>} ></IconButton>
                <IconButton onClick={() => {
                    setSelectedTool("circle")
                }} activated={selectedTool === "circle"} icon={<Circle />}></IconButton>
            </div>
        </div>
}