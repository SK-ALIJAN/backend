const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Define a schema and model for programming languages
const languageSchema = new mongoose.Schema({
  name: String,
});

const Language = mongoose.model("Language", languageSchema);

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "homepage" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/languages", async (req, res) => {
  let { language } = req.query;
  try {
    // Fetch all languages from the database
    const languages = await Language.find({ category: language });
    res.status(200).json({ data: languages });
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the Express server
app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
    await mongoose.connect(process.env.database);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
});
