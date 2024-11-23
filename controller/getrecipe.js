const asyncHandler = require("express-async-handler");
const Recipe = require("../model/Recipe");
const recipeCtrll = {
    getRecipesByEmail: asyncHandler(async (req, res) => {
        const email = req.query.email;
    
        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }
    
        try {
          const recipes = await Recipe.find({ email });
          res.status(200).json({ recipes });
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      }),
    };
    
    module.exports = recipeCtrll;