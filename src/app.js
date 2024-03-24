require('dotenv').config();
const express = require('express');
const app = express();
const port = 2727;
const mongoose = require('mongoose');
const morgan = require('morgan');

app.use(express.json());
const adminsRoutes = require('./routes/admin/index.routes')
app.use('/api/admin',adminsRoutes);

app.listen(port, (async) => {
    // mongoose.connect('mongodb://127.0.0.1:27017/project')
     mongoose.connect(process.env.Mongo_DB_URL)
.then(()=>console.log('DB is Connected....'))
.catch(err => console.log(err.message));
console.log(`Server running at http://localhost:2727`);
});