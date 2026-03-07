import { Server } from "socket.io";
import Document from "../models/documents.model.js";
import jwt from "jsonwebtoken";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  // 🔐 SOCKET AUTH MIDDLEWARE
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId; // attach user
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    // ✅ join room
    socket.on("join-document", (docId) => {
      socket.join(docId);
    });

    // ⚡ realtime broadcast (no DB write)
    socket.on("edit-document", ({ docId, content }) => {
      socket.to(docId).emit("receive-changes", content);
    });

    // 💾 SAFE DB PERSISTENCE (NEW — IMPORTANT)
    socket.on("save-document", async ({ docId, content }) => {
      try {
        if (!docId) return;

        const document = await Document.findById(docId);
        if (!document) return;

        const userId = socket.userId;

        // 🧠 role check
        const isOwner = document.owner.toString() === userId;

        const collaborator = document.collaborators.find(
          (c) => c.user.toString() === userId,
        );

        const canEdit =
          isOwner || (collaborator && collaborator.role === "editor");

        if (!canEdit) {
          console.log(" Save blocked: no permission");
          return;
        }

        // ✅ update content
        document.content = content;
        await document.save();

        console.log("✅ Document saved to DB");
      } catch (err) {
        console.error("Save Document Error:", err);
      }
    });
  });
};
