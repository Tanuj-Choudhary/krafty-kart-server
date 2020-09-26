// Third Party Imports
require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

// Project Imports
const app = require('./src/app');

const PORT = process.env.PORT || 8000;

// LOCAL DATABASE
const DB = process.env.DATABASE_LOCAL;

// Connect to database
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

// Start server
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    console.log('Listening at port 8000');
  }
});
