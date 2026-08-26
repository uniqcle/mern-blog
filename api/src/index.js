import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { registerValidator, loginValidator } from "./validators/auth.js";
import { postValidator } from "./validators/post.js";

import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import upload from "./utils/downloadImage.js";

import { UserController, PostController } from "./controllers/index.js";

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
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
    "/auth/register",
    registerValidator,
    handleValidationErrors,
    UserController.register,
);
app.post(
    "/auth/login",
    loginValidator,
    handleValidationErrors,
    UserController.login,
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
    "/posts",
    checkAuth,
    postValidator,
    handleValidationErrors,
    PostController.create,
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
    "/posts/:id",
    checkAuth,
    postValidator,
    handleValidationErrors,
    PostController.update,
);

// тэги
app.get("/tags", PostController.getLastTags);




// Использование в маршруте остается таким же. avatar это имя в запросе
app.post("/profile", checkAuth, upload.single("avatar"), (req, res) => {
    // ...
    res.json({
        url: `/uploads/${req.file.filename}`,
    });
});

app.listen(4001, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server is running");
});
