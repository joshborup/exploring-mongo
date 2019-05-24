const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/chat-app", {
    useNewUrlParser: true
  });
};

const { registerUser, findUser } = require("./controller/controller")(connect);
app.post("/api/register", registerUser);

app.get("/api/find", findUser);

app.listen(4000, () => console.log("server listening on 4000"));
