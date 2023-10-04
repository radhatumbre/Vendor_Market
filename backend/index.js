// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Enable CORS if needed
const Event = require("./models/Event"); // Import your Event model

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8000;
const MONGODB_URI =
  "mongodb+srv://boogeymanrt:iA7SaCXWsBykjU5s@cluster0.ycgltkb.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI

  mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

// Create a POST endpoint for submitting data
app.post("/submitFormData", async (req, res) => {
  try {
    const eventData = req.body;
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("Error saving event data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
