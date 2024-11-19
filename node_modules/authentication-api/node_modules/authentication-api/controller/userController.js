// controllers/userController.js
const asyncHandler = require("express-async-handler");
const User = require("../model/UserDetails");

const userController = {
  // Get User Details
  getUserDetails: asyncHandler(async (req, res) => {
    const email = req.params.email;
    console.log("Fetching user details for:", email);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const user = await User.findOne({ email }).select("-password -__v -createdAt -updatedAt"); // Exclude fields
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Error fetching user details" });
    }
  }),

  // Update or Create User Details
  updateUserDetails: asyncHandler(async (req, res) => {
    const { name, dateOfBirth, mobileNumber } = req.body;
    const email = req.params.email;
    console.log("Updating or creating user details for:", email, { name, dateOfBirth, mobileNumber });

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      // Try to find and update the user, ensuring email is also set in case it's missing
      let updatedUser = await User.findOneAndUpdate(
        { email },
        { email, name, dateOfBirth, mobileNumber }, // Ensuring email is part of the update
        { new: true, upsert: true, runValidators: true, select: "-password -__v -createdAt -updatedAt" } // Exclude fields
      );

      res.status(200).json({ updatedUser });
    } catch (error) {
      console.error("Error updating or creating user details:", error);
      res.status(500).json({ message: "Error updating or creating user details" });
    }
  }),
};

module.exports = userController;
