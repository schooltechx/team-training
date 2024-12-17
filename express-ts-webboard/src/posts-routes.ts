import express, { Express, Request, Response, NextFunction } from "express";
export const postRoute = express.Router();
import {prisma} from './db'
postRoute.get("/", async (req, res) => {
  const writtenPosts = Boolean(req.query.writtenPosts);
  const users = await prisma.post.findMany();
  res.json(users);
});

postRoute.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const writtenPosts = Boolean(req.query.writtenPosts);
  const user = await prisma.post.findFirst({
    where: { id }
  });
  res.json(user);
});

postRoute.post("/", async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const post = await prisma.post.create({
    data: req.body,
  });
  res.json(post);
});

postRoute.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.post.update({
    where: { id },
    data: req.body,
  });
  res.json(user);
});

postRoute.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.post.delete({
    where: {
      id,
    },
  });
  res.json(user);
});
