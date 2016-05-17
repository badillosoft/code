'use strict'

const polish = require('./polish').new;

polish.debug = true;

polish.parse('123 + xyz + 456 + 3 * 4 + 5 - 6 / 7');