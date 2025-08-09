import { HTTP_BACKEND } from "@/config";
import axios from "axios";
type Point = {
  x: number;
  y: number;
};
type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      points: Point[];
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");
  const existingShape: Shape[] = await getShapes(roomId);
  if (!ctx) {
    return;
  }
  socket.onmessage = (e) => {
    const message = JSON.parse(e.data);
    if (message.type == "chat") {
      const parsedMessage = JSON.parse(message.message);
      existingShape.push(parsedMessage.shape);
      clearCanvas(existingShape, canvas, ctx);
    }
  };
  clearCanvas(existingShape, canvas, ctx);
  let clicked = false;
  let stX = 0;
  let stY = 0;
  const pointsArray: Point[] = [];

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    ctx.beginPath();
    stX = e.clientX;
    stY = e.clientY;
  });
  canvas.addEventListener("mouseup", (e) => {
    clicked = false;

    const width = e.clientX - stX;
    const height = e.clientY - stY;
    // @ts-ignore
    const selectedTool = window.selectedTool;
    let shape: Shape | null = null;
    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: stX,
        y: stY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: stX + radius,
        centerY: stY + radius,
      };
    } else if (selectedTool === "line") {
      shape = {
        type: "line",
        startX: stX,
        startY: stY,
        endX: e.clientX,
        endY: e.clientY,
      };
    } else if (selectedTool === "pencil") {
      shape = {
        type: "pencil",
        points: [...pointsArray],
      };
      pointsArray.length = 0;
    }

    if (!shape) {
      return;
    }
    existingShape.push(shape);
    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId: Number(roomId),
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - stX;
      const height = e.clientY - stY;
      const x = e.clientX;
      const y = e.clientY;
      const point: Point = { x, y };
      clearCanvas(existingShape, canvas, ctx);
      ctx.strokeStyle = "rgba(255, 255, 255)";
      // @ts-ignore
      const selectedTool = window.selectedTool;
      if (selectedTool === "rect") {
        ctx.strokeRect(stX, stY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.abs(Math.max(width, height) / 2);
        const centerX = stX + radius;
        const centerY = stY + radius;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
      } else if (selectedTool === "line") {
        const endX = x;
        const endY = y;
        ctx.beginPath();
        ctx.moveTo(stX, stY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      } else if (selectedTool === "pencil") {
        pointsArray.push(point);
        if (pointsArray.length === 1) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
    }
  });
}
function clearCanvas(
  existingShape: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,10,15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShape.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(
        shape.centerX,
        shape.centerY,
        Math.abs(shape.radius),
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type === "line") {
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.stroke();
    } else if (shape.type === "pencil") {
      ctx.beginPath();
      ctx.moveTo(shape.points[0].x, shape.points[0].y);
      for (let i = 1; i < shape.points.length; i++) {
        ctx.lineTo(shape.points[i].x, shape.points[i].y);
      }
      ctx.stroke();
    }
  });
}

async function getShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages.map((m: { message: string }) => {
    const messageData = JSON.parse(m.message);
    return messageData.shape;
  });

  return shapes;
}
