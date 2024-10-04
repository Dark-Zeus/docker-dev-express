const express = require('express');
const router = express.Router();

/* Define Your Routes Here */

router.get('/', (req, res) => {
    res.send('Hello World!');
});

const aboutRoute = require('./about.route');

router.use("/about", aboutRoute);

module.exports = router;