import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
        console.log("seed route is hit");
        /* await User.deleteMany({}); */
        const createdUsers = await User.insertMany(data.users);
        res.send({ createdUsers });
    })
);

userRouter.post(
    "/login",
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        } else {
            res.status(401).send({ message: "username o password non validi" });
        }
    })
);

export default userRouter;