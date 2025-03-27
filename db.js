const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

// Use the connection string from .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define the schema
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

// Create the model
const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo,
};
