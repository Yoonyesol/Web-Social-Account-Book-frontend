// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// app.use(cors());

// const server = http.createServer();

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   },
// }); //cors오류 설정

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.emit("receive_message", data);
//     console.log(data)
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// server.listen(80, () => {
//   console.log("SERVER RUNNING");
// });

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("init", (payload) => {
    console.log(payload);
  });

  socket.on("send message", (item) => {//send message 이벤트 발생
     console.log(item.author + " : " + item.message);
    io.emit("receive message", { author: item.author, message: item.message, time:item.time });
    //클라이언트에 이벤트를 보냄
  });
});

httpServer.listen(80);