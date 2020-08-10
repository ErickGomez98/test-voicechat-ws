const express = require("express");
const app = express();
const app2 = express();
const server = require("http").createServer(app);
const server2 = require("http").createServer(app2);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");
const { ExpressPeerServer } = require("peer");

// const peerServer = ExpressPeerServer(server, {
//   debug: true,
// });

// app2.use("/peerjs", peerServer);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log("www");
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// server2.listen(3001, () => console.log("awa 3001"));

// const express = require("express");
// const app = express();
// const server = require("http").Server(app);
// const io = require("socket.io")(http);
// const { v4: uuidV4 } = require("uuid");
// const { ExpressPeerServer } = require("peer");

// io.on("connection", (socket) => {
//   socket.on("join-room", (roomId, userId) => {
//     console.log("www");
//     socket.join(roomId);
//     socket.to(roomId).broadcast.emit("user-connected", userId);

//     socket.on("disconnect", () => {
//       socket.to(roomId).broadcast.emit("user-disconnected", userId);
//     });
//   });
// });

// server.listen(3000);

// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: "/",
// });

// app.use("/peerjs", peerServer);
