const asyncHandler = require("express-async-handler");
const Rating = require("../model/ratings"); // Assuming a Rating model exists

const ratingCtrl = {
  addRating: asyncHandler(async (req, res) => {
    const {rating, comment } = req.body;

    // Validate required fields
    if (!rating) {
      return res.status(400).json({ message: "ratings are required" });
    }

    try {
      // Create and save the rating
      const newRating = await Rating.create({
        rating,
        comment: comment || "", // Default to empty string if no comment provided
      });

      res.status(201).json({ message: "Rating added successfully", rating: newRating });
    } catch (error) {
      console.error("Error adding rating:", error);
      res.status(500).json({ message: "Failed to add rating" });
    }
  }),
};

module.exports = ratingCtrl;