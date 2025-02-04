const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');


app.use(cors()); 
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});