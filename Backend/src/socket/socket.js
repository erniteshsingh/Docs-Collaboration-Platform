import { Server } from "socket.io";
import Document from "../models/documents.model.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-document", async (docId) => {
      try {
        if (!docId) return;

        const document = await Document.findById(docId);

        if (!document) {
          return socket.emit("error-message", "Document not found");
        }

        socket.join(docId);

        console.log(`Socket ${socket.id} joined document ${docId}`);
      } catch (error) {
        console.error("Join Document Error:", error);
      }
    });

    socket.on("edit-document", ({ docId, content }) => {
      if (!docId) return;

      socket.to(docId).emit("receive-changes", content);
    });

    socket.on("save-document", async ({ docId, content }) => {
      try {
        if (!docId) return;

        const document = await Document.findById(docId);

        if (!document) {
          return socket.emit("error-message", "Document not found");
        }

        document.content = content;

        await document.save();
      } catch (error) {
        console.error("Save Document Error:", error);
      }
    });

    socket.on("disconnect", () => {});
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};
