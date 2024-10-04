if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Default port if environment variable is not set
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.use(express.json());

const routes = require('./routes/index.route');

app.use('/', routes);

app.use((req, res, next) => {
    res.status(404).send('Error 404 - Cannot find the requested URL');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error 500 - Unknown Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});