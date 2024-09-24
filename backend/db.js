const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://yashasvi123yy:gxfRGR7eA7W2qIwX@cluster0.nhpqtcp.mongodb.net/zapfood?retryWrites=true&w=majority&appName=Cluster0";

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
    // console.log("Fetched data:", global.food_items);
    // console.log("Fetched data:", global.food_category);

    // const fetchedData = await mongoose.connection.db.collection("food_items");

    // await fetchedData.find({}).toArray(async function (err, data) {
    //   const foodCategory = await mongoose.connection.db.collection(
    //     "food_category"
    //   );
    //   await foodCategory.find({}).toArray(function (err, catData) {
    //     if (err) console.log(err);
    //     else {
    //       global.food_items = data;
    //       global.food_category = catData;
    //     }
    //   });
    // });
    
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;
