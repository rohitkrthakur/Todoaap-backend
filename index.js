const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Test route to check server status
app.get("/", (req, res) => res.send("Server is running!"));

// POST route to create a todo
app.post("/todo", async (req, res) => {
    const { title, description } = req.body;

    // Validation: Check if title and description are provided
    if (!title || !description) {
        return res.status(400).json({ msg: "Title and description are required" });
    }

    try {
        await todo.create({
            title,
            description,
            completed: false,
        });

        res.json({ msg: "Todo created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error creating todo", error });
    }
});


// GET route to fetch todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await todo.find({});
        res.json({ todos });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching todos", error });
    }
});

// PUT route to mark a todo as completed
app.put("/completed", async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ msg: "Todo ID is required" });
    }

    try {
        const updatedTodo = await todo.findByIdAndUpdate(
            id, // The ID of the todo to update
            { completed: true }, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.json({ msg: "Todo marked as completed", todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ msg: "Error updating todo", error });
    }
});
// DELETE route to delete a todo by ID
app.delete("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the request params
      await todo.deleteOne({ _id: id }); // Delete the todo with the given ID
      res.json({ msg: "Todo deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Error deleting todo", error });
    }
  });
  

// Start the server
const PORT = 4000; // Change port to avoid conflicts
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
