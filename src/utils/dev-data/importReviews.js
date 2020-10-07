require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Reviews = require('../../reviews/reviewModel');

// LOCAL DATABASE
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      console.log('database connected');
    }
  })
  .catch((err) => {
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      console.log(err);
    }
  });

// Read JSON file
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// Import Data into DB
const importData = async () => {
  try {
    await Reviews.create(reviews);
    console.log('Data succesfully loaded');
  } catch (error) {
    console.log(error);
  }
};

// Delete All Data from DB
const deleteData = async () => {
  try {
    await Reviews.deleteMany({});
    console.log('Data succesfully deleted');
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
