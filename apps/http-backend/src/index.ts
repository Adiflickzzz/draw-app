import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, RoomSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
      message: "Incorrect inputs",
    });
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.username!,
        name: parsedData.data?.name!,
        password: parsedData.data?.password!,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      error: "User already exists",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data?.username,
      password: parsedData.data?.password,
    },
  });

  if (!user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const token = jwt.sign({ userId: user?.id }, JWT_SECRET);
  res.json({
    token,
  });
});
app.post("/room", middleware, async (req, res) => {
  //db call

  const parsedData = RoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
  }

  //@ts-ignore
  const userId = req.userId;

  try {
    const room = await prismaClient.room.create({
      data: {
        Slug: parsedData.data?.name!,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room name already exists",
    });
  }
});

app.get("/chat/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });

  res.json({
    messages,
  });
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      Slug: slug,
    },
  });

  res.json({
    room,
  });
});

app.listen(3001);
