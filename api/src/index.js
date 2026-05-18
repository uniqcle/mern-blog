import express from "express";
import mongoose from "mongoose";

import { registerValidator, loginValidator } from "./validators/auth.js";
import { postValidator } from "./validators/post.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
    .connect("mongodb://admin:secret@localhost:27017/blog", {
        authSource: "admin", // Явно указываем, где искать пользователя
    })
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("DB error", err);
    });

const app = express();
app.use(express.json());

app.post("/auth/register", registerValidator, UserController.register);
app.post("/auth/login", loginValidator, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll)
app.get("/posts/:id", PostController.getOne)
app.post("/posts", checkAuth, postValidator, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
// app.patch("/posts", PostController.update);

app.listen(4001, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server is running");
});
