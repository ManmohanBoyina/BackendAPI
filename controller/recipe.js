const asyncHandler = require("express-async-handler");
const Recipe = require("../model/Recipe");

const recipeCtrl = {
  //! Submit Recipe
  submitRecipe: asyncHandler(async (req, res) => {
    const { recipename, ingredientLines, imageUrl,videoUrl, instructions, email } = req.body;

    //! Validations
    if (!recipename || !ingredientLines || !instructions || !email) {
      return res.status(400).json({ message: "All fields are required, including email" });
    }

    //! Set default image URL if not provided
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/450px-Good_Food_Display_-_NCI_Visuals_Online.jpg";
    const finalImageUrl = imageUrl || defaultImageUrl;

    //! Create the recipe
    try {
      const newRecipe = await Recipe.create({
        recipename,
        ingredientLines,
        imageUrl: finalImageUrl,
        videoUrl,
        instructions,
        email,
      });

      //! Send the response
      res.status(201).json({
        message: "Recipe added successfully",
        recipe: newRecipe,
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
      res.status(500).json({ message: "Failed to add recipe" });
    }
  }),
};

module.exports = recipeCtrl;