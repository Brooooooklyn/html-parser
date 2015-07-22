'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var $$state = 'getNode';
var symbol = ['[', '{', ']', '}'];

function transfer(state, pos) {}

function stateMachine(token, pos) {}

function transferState(newState) {
  $$state = newState;
}

exports['default'] = { stateMachine: stateMachine, transferState: transferState };
module.exports = exports['default'];