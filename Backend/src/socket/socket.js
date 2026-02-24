import { Server } from "socket.io";

// 🔐 SOCKET AUTH MIDDLEWARE

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  // 🔐 SOCKET AUTH MIDDLEWARE
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication error: No token"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // attach user to socket
      socket.user = {
        userId: decoded.userId,
      };

      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.userId);

    // join room
    socket.on("join-document", (docId) => {
      socket.join(docId);
    });

    socket.on("edit-document", async ({ docId, content }) => {
      try {
        const document = await Document.findById(docId);
        if (!document) return;

        const userId = socket.user.userId;

        if (document.owner.toString() === userId) {
          socket.to(docId).emit("receive-changes", content);
          return;
        }

        const collaborator = document.collaborators.find(
          (c) => c.user.toString() === userId,
        );

        if (!collaborator || collaborator.role === "viewer") {
          return;
        }

        socket.to(docId).emit("receive-changes", content);
      } catch (err) {
        console.error("Socket edit error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.userId);
    });
  });
};
