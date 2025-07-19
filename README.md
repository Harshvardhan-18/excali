# ✏️ Excali (working title)

A virtual whiteboard app for sketching hand‑drawn style diagrams — inspired by [Excalidraw](https://github.com/excalidraw/excalidraw).  
Build interactive, infinite canvas diagrams with real‑time collaboration.

## 🚀 Features

- 🖊️ Freehand drawing + basic shapes (rectangle, ellipse, line, arrow)
- 🎨 Hand‑drawn visual style
- 🌓 Dark mode support
- 🔁 Undo/Redo stack
- 📄 Export as PNG, SVG, JSON
- 📥 Import from custom JSON
- 🌐 Infinite canvas with panning and zooming
- ⚡ Real-time collaboration (via WebSocket)
- 🧠 Local‑first autosave

*(Additional features coming soon: text support, shape libraries, E2EE, etc.)*

## 🧩 Architecture & Tech Stack

| Layer       | Tech Stack                  |
|-------------|-----------------------------|
| Frontend    | React + TypeScript          |
| Rendering   | HTML5 Canvas                |
| Styling     | Tailwind CSS / CSS Modules |
| Real‑time   | WebSocket (or Socket.IO)    |
| Backend     | Node.js + Express           |
| State Mgmt  | Zustand / Redux (optional)  |
| Build Tool  | Vite                        |

## 📥 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/Harshvardhan-18/excali.git
   cd excali
