'use strict';

const express = require('express');
const router = express.Router();
const url = require("url");
const Board = require("../board");

var gameBoard = new Board();

/* GET start page. */
router.get('/', function (req, res, next) {
    let state = {
        board: gameBoard,
        actions: {
            turn: gameBoard.nextActions(),
            restart: "/start"
        }
    };
    res.json(state);
});

module.exports = router;
