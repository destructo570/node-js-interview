import express from "express";
import adminRouter from "./routes/admin.js";

const app = express();

const myMiddleWare = (req, res, next) => {
    console.log("In Middleware...");
    next();
}

app.get("/", myMiddleWare, (req, res) => {
    return res.status(500).json({"message":"hello"})
})

app.use("/admin", adminRouter);

app.listen("3000");