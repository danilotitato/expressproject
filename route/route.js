const express = require('express');
const router = express.Router();

router.get('/word', (req, res) => {
    res.send({future:'Get Word and Definition'});
})

module.exports = router;
