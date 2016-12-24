'use strict';

var debug = require('debug')('board');

/**
 * Module exports.
 * @public
 */

module.exports = Board;

const EMPTY = 0;
const TIC = 1;
const TAC = 2;

/**
 * Initialize `Board`.
 *
 * @argument {String} initialState
 * @public
 */

function Board(initialState) {
    this.state = [
        EMPTY,
        EMPTY,
        EMPTY,
        EMPTY,
        EMPTY,
        EMPTY,
        EMPTY,
        EMPTY,
        EMPTY
    ];
    if (initialState) {
        for (let i = 0; i < Math.min(this.state.length, initialState.length); i++) {
            let c = parseInt(initialState.charAt(i));
            if (c === TIC) {
                this.state[i] = TIC;
            }
            if (c === TAC) {
                this.state[i] = TAC;
            }
        }
    }
}

Board.prototype.nextActions = function () {
    let result = [
    ];
    if (this.winner() !== EMPTY) {
        return result;
    }
    let as = this.actionState();
    for (let i = 0; i < this.state.length; i++) {
        if (this.state[i] === EMPTY) {
            result = result.concat("/turn/" + as + "/" + i);
        }
    }
    return result;
};

Board.prototype.actionState = function () {
    return this.state.join("");
};

Board.prototype.ticTac = function () {
    let ticCount = 0;
    let tacCount = 0;
    for (let i = 0; i < this.state.length; i++) {
        if (this.state[i] === TIC) {
            ticCount++;
        }
        if (this.state[i] === TAC) {
            tacCount++;
        }
    }
    return ticCount === tacCount ? TIC : TAC;
};

Board.prototype.turn = function (location) {
    if (location < 0) {
        return;
    }
    if (location >= this.state.length) {
        return;
    }
    this.state[location] = this.ticTac();
};

Board.prototype.winner = function () {
    const winning_combinations = [
        [
            0,
            3,
            6
        ],
        [
            1,
            4,
            7
        ],
        [
            2,
            5,
            8
        ],
        [
            0,
            1,
            2
        ],
        [
            3,
            4,
            5
        ],
        [
            6,
            7,
            8
        ],
        [
            0,
            4,
            8
        ],
        [
            2,
            4,
            6
        ]
    ];
    for (let i = 0; i < winning_combinations.length; i++) {
        let comb = winning_combinations[i];
        if (this.state[comb[0]] === this.state[comb[1]] && this.state[comb[1]] === this.state[comb[2]]) {
            return this.state[comb[0]];
        }
    }
    return EMPTY;
};
