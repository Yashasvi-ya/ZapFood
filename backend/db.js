require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.connectionString
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Successfully connected to MongoDB");


    const fetchedData = await mongoose.connection.db.collection("food_items");
    const data = await fetchedData.find({}).toArray();
  
    const foodCategory = await mongoose.connection.db.collection("food_category");
    const catData = await foodCategory.find({}).toArray();
  
    global.food_items = data;
    global.food_category = catData;
    
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;
