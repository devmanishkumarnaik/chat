const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

dotenv.config();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    })
})

server.listen(PORT);