require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Users = require('../../users/usersModel');

// LOCAL DATABASE
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

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
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// Import Data into DB
const importData = async () => {
  try {
    await Users.create(users);
    console.log('Data succesfully loaded');
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

// Delete All Data from DB
const deleteData = async () => {
  try {
    await Users.deleteMany({});
    console.log('Data succesfully deleted');
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
