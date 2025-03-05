import express from "express";
import adminRouter from "./routes/admin.js";
import mongoose from "mongoose";
import {Worker} from "worker_threads";
import { resolve } from "path";

const mongoDb = "mongodb://localhost:27017";
const app = express();

function runWorkerTask() {
    return new Promise((resolve, reject) => {
        
      const worker = new Worker('./worker.js'); // Path to worker file
  
      worker.on('message', (result) => {
        resolve(result); // Resolve the promise with the worker's result
      });
  
      worker.on('error', (error) => {
        reject(error); // Reject the promise if the worker throws an error
      });
  
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

const myMiddleWare = (req, res, next) => {
    console.log("In Middleware...");
    next();
}

app.get("/", myMiddleWare, (req, res) => {
    return res.status(500).json({"message":"hello"})
})


app.use("/admin", adminRouter);

app.get("/cpu", async(req, res) => {
  try {
      const result = await runWorkerTask();
      console.log(result);
      res.json({result})
  } catch (error) {
      res.status(500, "Error")
  }
})

async function connectMongo(){
    mongoose.connect(mongoDb);
}

connectMongo().then(() => {
    console.log("Connected to Database!");
}).catch((err) => {
    console.log(err);
})

app.listen("3000", () => {
    
});