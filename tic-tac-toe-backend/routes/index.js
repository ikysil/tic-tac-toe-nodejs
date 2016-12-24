'use strict';

const express = require('express');
const router = express.Router();
const url = require("url");

/* GET home page. */
router.get('/', function (req, res, next) {
    let actions = {
        start: "/start"
    };
    res.json(actions);
});

module.exports = router;
