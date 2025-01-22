const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //validate
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "name is required",
            });
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "email is required",
            });
        }
        if (!password || password.length < 6) {
            return res.status(400).send({
                success: false,
                message: "password is required and 6 character long",
            });
        }
        //exisiting user
        const exisitingUser = await userModel.findOne({ email });
        if (exisitingUser) {
            return res.status(400).send({
                success: false,
                message: "email already exists",
            });
        }
        //hash password
        const hashedPassword = await hashPassword(password);

        //save user
        const user = await userModel({
            name,
            email,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
};

//login

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validate
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide email and password",
            });
        }
        //find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found",
            });
        }
        //match password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(500).send({
                success: false,
                message: "Incorrect password",
            });
        }
        //Token jwt
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        //undeinfed password
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            token,
            user,
        });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
};

module.exports = { registerController, loginController };
