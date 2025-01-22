import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, RoomSchema, SignInSchema } from "@repo/common/types";

const app = express();

app.post("/signup", (req, res) => {
  //db call
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
  }
  res.json({
    userId: "123123",
  });
});
app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);

  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
  }

  res.json({
    token,
  });
});
app.post("/room", middleware, (req, res) => {
  //db call

  const data = RoomSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
  }

  res.json({
    roomId: "123",
  });
});

app.listen(3001);
