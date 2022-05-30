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

const m = (name, text, id) => ({ name, text, id });

io.on("connection", (socket) => {
  // Полчучаем name и room от пользователя
  socket.on("user_joined", (data, cb) => {
    if (!data.name || !data.room) {
      // Запускаем колбэк функцию если данные не корректны
      return cb("Данные не корректны");
    }
    // Создаем подключение к указанной пользователем комнате
    cb({userId: socket.id})
    socket.join(data.room);
    socket.emit("new_message", m("admin", `Добро пожаловать ${data.name}`));
    // Отправка сообщения всем кроме транслятора
    socket.broadcast
      .to(data.room)
      .emit("new_message", m("admin", `Пользователь ${data.name} зашел`));
  });
  // Получаем данные от пользователя и рассылаем
  // всем подключенным к комнате
  socket.on("send_message", ({ message, room }) => {
    socket.to(room).emit("receive_message", message);
  });
});

httpServer.listen(8080, () => console.log("Server start"));

