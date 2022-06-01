const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("user_joined", ({ name, room }, cb) => {
    if (!name || !room) cb("Данные не корректны");
    socket.join(room);

    cb({
      userId: socket.id,
      name: name,
      room: room,
    });
  });
});

httpServer.listen(8080, () => console.log("Server start"));
