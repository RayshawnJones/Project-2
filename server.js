const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const { JSDOM } = require("jsdom");
const methodOverride = require("method-override");
const morgan = require("morgan");
const { render } = require("ejs");

// Set up body parser middleware to handle the data in POST and PUT requests
app.use(express.json());  // To support JSON-encoded bodies


// new code below this line
app.use(express.static(path.join(__dirname, "public")));

// new code above this line
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { userName: `${userName}` }); // Pass `userName` to the EJS template
  });
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


// GET - Read Data
app.get('/data', async (req, res) => {
    const dataPath = path.join(__dirname, 'views', 'data.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Data not found');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// POST - Create a new timecard entry
app.post('/timecards', async (req, res) => {
    // Simulated database insert function
    const newData = req.body; // assuming body has timecard data
    console.log("Creating new timecard:", newData);
    res.status(201).send('Timecard created');
});

app.post('/create-user', async (req, res) => {
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        // other user fields
      });
      res.render('newuser', { user: newUser });
    } catch (error) {
      res.status(500).send("Error creating user");
    }
  });
  
// PUT - Update an existing timecard
app.put('/timecards/:id', async (req, res) => {
    const timecardId = req.params.id;
    const updatedData = req.body;
    console.log(`Updating timecard ${timecardId} with data:`, updatedData);
    res.send(`Timecard ${timecardId} updated`);
});

app.put('/timecards/:id', async (req, res) => {
    const timecardId = req.params.id;
    // Timecard update logic
  });
  
// DELETE - Remove a timecard
app.delete('/timecards/:id', async(req, res) => {
    const timecardId = req.params.id;
    console.log(`Deleting timecard ${timecardId}`);
    res.send(`Timecard ${timecardId} deleted`);
});

// Start the server

mongoose.connection.on("connected", () => {
    console.log(`MongoDB ${mongoose.connection.name} connected`);
});

app.listen(3000)