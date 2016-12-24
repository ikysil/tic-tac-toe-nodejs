'use strict';

const express = require('express');
const router = express.Router();
const url = require("url");
const Board = require("../board");

/* GET turn page. */
router.get('/:boardState/:location', function (req, res, next) {
    let boardState = req.params['boardState'];
    let location = req.params['location'];
    let gameBoard = new Board(boardState);
    gameBoard.turn(location);

    let state = {
        board: gameBoard,
        ticTac: gameBoard.ticTac(),
        winner: gameBoard.winner(),
        actions: {
            turn: gameBoard.nextActions(),
            restart: "/start"
        }
    };
    res.json(state);
});

module.exports = router;
