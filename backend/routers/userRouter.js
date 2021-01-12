import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/:userId", expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({message: "profilo non trovato"});
    }
}));

userRouter.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
        console.log("seed route is hit");
        const createdUsers = await User.insertMany(data.users);
        res.send({ createdUsers });
    })
);

userRouter.put("/update-profile", expressAsyncHandler (async (req,res) =>{
    console.log("req.body for put route", req.body);
}))


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
        }
        res.status(401).send({ message: "username o password non validi" });
    })
);

userRouter.post(
    "/register",
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const createdUser = await user.save();
        res.send({
            _id: createdUser.id,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
        })
    })
);

export default userRouter;