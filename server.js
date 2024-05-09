const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Plant = require('./models/plant.js');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.set("views", path.join(__dirname, "views"));

app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.get('/plants/new', (req, res) => {
  res.render('plants/new.ejs');
});

app.post('/plants', async (req, res) => {
  if (req.body.isReadyToChoose === 'on') {
    req.body.isReadyToChoose = true;
  } else {
    req.body.isReadyToChoose = false;
  }
  await Plants.create(req.body);
  res.redirect('/plants');
});

app.get('/plants', async (req, res) => {
  const foundPlants = await Plant.find();
  res.render('index.ejs', {
    plants: foundPlants,
  });
});

app.get('/plants/:plantId', async (req, res) => {
  const foundPlant = await Plant.findById(req.params.plantId);
  res.render('plants/show.ejs', {
    plant: foundPlant,
  });
});

app.delete('/plants/:plantId', async (req, res) => {
  await Plant.findByIdAndDelete(req.params.plantId);
  res.redirect('/plants');
});

app.get('/plants/:plantId/edit', async (req, res) => {
  const foundPlant = await Plant.findById(req.params.plantId);
  res.render('plants/edit.ejs', {
    plant: foundPlant,
  });
});

app.put('/plants/:plantId', async (req, res) => {
  if (req.body.isReadyToChoose === 'on') {
    req.body.isReadyToChoose = true;
  } else {
    req.body.isReadyToChoose = false;
  }
  await Plant.findByIdAndUpdate(req.params.plantId, req.body);
  res.redirect(`/plants/${req.params.plantId}`);
});

app.listen(3000, () => {
  console.log('The express app is ready!');
});