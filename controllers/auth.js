import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Registration
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: "That username already taken",
      });
    }

    const salt = bcrypt.genSaltSync(10); // Making hash difficulty for password
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    await newUser.save(); // Upload newUser to DBMongoose

    res.json({
      newUser,
      message: "Succsessful registration",
    });
  } catch (e) {
    res.json({ message: "Failure to create user" });
  }
};
// User login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      return res.json({
        message: "there are no such user or wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "You logged in",
    });
  } catch (e) {
    res.json({ message: "Failure to login" });
  }
};
//Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "there are no such user",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (e) {
    res.json({ message: "Failure to get user" });
  }
};
