'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ETStateMachine = require('ETStateMachine');

var tokenStack, nodeStack, expressionStack;

var expression = ['if', 'else', '&&', '||', 'for', 'in', ','];

var ETParser = function ETParser() {
  _classCallCheck(this, ETParser);

  tokenStack = [];
  nodeStack = [];
  expressionStack = [];
};