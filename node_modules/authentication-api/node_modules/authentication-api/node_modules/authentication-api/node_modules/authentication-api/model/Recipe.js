const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recipename: { type: String, required: true },
  ingredientLines: { type: [String], required: true },
  imageUrl: { type: String, required: true },
  instructions: { type: String, required: true },
  email: { type: String, required: true }, // Add email field
});

module.exports = mongoose.model("Recipe", RecipeSchema);
