const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('Docker Dev Template Project - docker-dev-express/express-4.21.0-base');
});

module.exports = router;