import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express();

app.post("/signup", (req, res) => {
  //db call
  res.json({
    userId: "123123",
  });
});
app.post("/signin", (req, res) => {
  const userId = 1;

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    token,
  });
});
app.post("/room", middleware, (req, res) => {
  //db call

  res.json({
    roomId: "123",
  });
});

app.listen(3001);
