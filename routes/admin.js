import { Router } from "express";
import { adminList } from "../controllers/adminControllers.js";


const adminRouter = Router();

adminRouter.get("/list", adminList);

adminRouter.get("/:id", (req, res) => {
    const id = req?.params?.id;
    console.log("id", id);
    return res.json({message: "Admin route!"})
})


export default adminRouter;