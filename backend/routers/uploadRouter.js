import express from "express";
import multer from "multer";
import { isAuth } from "../utils.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./frontend/public/images/");
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.png`);
    },
});

const upload = multer({ storage });

uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default uploadRouter;
