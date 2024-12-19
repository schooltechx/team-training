import express, { Express, Request, Response, NextFunction, response } from "express";
import { verify, verifyRoles, getDecodeToken, generateAccessToken } from './auth'
//import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const userRoute = express.Router();
export const meRoute = express.Router();
import { prisma, User } from './db'


/********** Me Route *************/
/**
 * get my info
 * GET /api/me
 */
meRoute.get("/", verify, async (req, res) => {
  const me = getDecodeToken(req, false)
  if (!me) {
    res.status(404).json({ error: "User not found" })
    return
  }
  const user = await prisma.user.findFirst({
    where: { username: me.username },
    select: { username: true, email: true, role: true }
  });
  if (!user) {
    res.status(404).json({ error: "User not found" })
    return
  }
  const { role, ...auser } = user
  let roles = role ? role.split(",") : []
  res.json({ ...auser, role: roles });
})

/**
 * get my decoded token
 * GET /api/me
 */
meRoute.get("/decode-token", verify, async (req, res) => {
  res.json(getDecodeToken(req, true))
})
/**
 * Login
 * POST /api/me/login
 */
meRoute.post("/login", async (req, res) => {
  //console.dir(req.body)
  const { username, password } = req.body
  const user = await prisma.user.findFirst({
    where: { AND: [{ username }, { password }] }
  });
  if (!user) {
    res.status(404).json({ error: "Incorrect user or password" })
  } else {
    //console.dir(user, { depth: null })
    const email = user.email
    const role = user.role ? user.role.split(",") : []
    const token = generateAccessToken({ username, email, role })
    res.json({ token });
  }
})
/**
 * Change my password
 */
userRoute.post("/me/changepass", verify, async (req, res) => {
  try {
    const { username, password, newpass } = req.body
    if (!username || !password || !newpass)
      throw "invalid format"

    const user = await prisma.user.findFirst({
      where: { AND: [{ username }, { password }] }
    });
    if (!user)
      throw "User not found"
    await prisma.user.update({
      where: { username, password },
      data: { password: newpass },
    });
    res.json(user);

  } catch (e) {
    console.log(e)
    res.status(400).json({ error: "Error during change password" })
  }
})
/********** User Route *************/
/**
 * get user list
 * GET /api/users
 */
userRoute.get("/",verify, async (req, res) => {
  const writtenPosts = Boolean(req.query.writtenPosts);
  const favoritePosts = Boolean(req.query.favoritePosts);
  const userPreference = Boolean(req.query.userPreference);
  const users = await prisma.user.findMany({
    select: {
      username: true, email: true, role: true,
      writtenPosts: writtenPosts,
      favoritePosts: favoritePosts,
      userPreference: userPreference,
    },
  });

  res.json(users.map(u => {
    let role = u.role ? u.role.split(",") : []
    return { ...u, role }
  }));
});
/**
 * get a user info
 * GET /api/users/oom
 */
userRoute.get("/:username", verify, async (req, res) => {
  const writtenPosts = Boolean(req.query.writtenPosts);
  const favoritePosts = Boolean(req.query.favoritePosts);
  const userPreference = Boolean(req.query.userPreference);
  const username = String(req.params.username);
  const user = await prisma.user.findFirst({
    where: { username },
    select: {
      username: true, email: true, role: true,
      writtenPosts: writtenPosts,
      favoritePosts: favoritePosts,
      userPreference: userPreference
    }
  });
  if (!user) {
    res.status(404).json({ error: "User not found" })
  } else {
    const { role, ...auser } = user
    let roles = role ? role.split(",") : []
    res.json({ ...auser, role: roles });
  }

})

/**
 * Admin create user
 * POST /api/users
 */
userRoute.post("/", verifyRoles(["admin"]), async (req, res) => {
  //const user = await prisma.user.findFirst({where: {username}});
  try {
    const username = String(req.body.username).trim()
    const password = String(req.body.password).trim()
    const email = String(req.body.email).trim()
    const role = String(req.body.role ? req.body.role.join(",") : "").trim()
    if (username.length < 3 || password.length < 6 && email.length < 5) {
      throw "Incorrect format"
    }
    console.log(role)
    const auser = await prisma.user.create({ data: { username, password, email, role } })
    res.status(201).json(auser);
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: "Duplicate user,email or incorrect format" })
  }
})
/**
 * Admin update user
 * PUT /api/users/:username
 */
userRoute.put("/:username", async (req, res) => {
  const username = String(req.params.username);
  try {
    const user = await prisma.user.update({
      where: { username },
      data: req.body,
    });
    res.json(user);
  } catch (e) {
    console.log(e, req.body)
    res.status(500).json({ error: "Error during update user " + username })
  }
})

userRoute.delete("/:username", verifyRoles(["admin"]), async (req, res) => {
  const username = String(req.params.username);
  try {
    const user = await prisma.user.delete({
      where: {
        username,
      },
    });
    res.json(user);
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Error during delete user " + username })
  }
});
