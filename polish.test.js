'use strict'

const polish = require('./polish').new;

polish.debug = true;

polish.parse('1 + 2 + 3 * 4 + 5 - 6 / 7');

polish.eval();

polish.parse('x + y - x * y');

polish.eval({
    x: 5,
    y: 6
});