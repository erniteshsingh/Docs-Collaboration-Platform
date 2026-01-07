import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    socket.on("join-document", (docId) => {
      socket.join(docId);
    });

    socket.on("edit-document", ({ docId, content }) => {
      socket.to(docId).emit("receive-changes", content);
    });
  });
};
