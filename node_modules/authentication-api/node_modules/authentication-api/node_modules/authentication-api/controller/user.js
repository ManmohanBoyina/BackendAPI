const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const userCtrl = {
  //! Register
  register: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });

    //! Validations
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //! Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //! Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //! Create the user
    const userCreated = await User.create({
      password: hashedPassword,
      email,
    });

    //! Send the response
    console.log("userCreated", userCreated);
    res.status(201).json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated.id,
    });
  }),

  //! Login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //! Check if user email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //! Check if user password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //! Generate the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "defaultKey", {
      expiresIn: "30d",
    });

    //! Send the response
    res.status(200).json({
      message: "Login success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  //! Profile
  profile: asyncHandler(async (req, res) => {
    //Find the user
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  }),
};

module.exports = userCtrl;
