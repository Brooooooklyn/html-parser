'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var $$state = 'getNode';
var symbol = [']', '}', '#', ' ', '/'];

function transfer(state, pos) {
  var newState = undefined;
  switch (state) {
    case 'getNode':
      switch (pos) {
        case 2:
          newState = 'getNodeName';
          break;
        default:
          newState = 'back';
      }
      break;
    case 'getNodeName':
      switch (pos) {
        case 3:
          newState = 'waitExpr';
          break;
        default:
          newState = 'getNodeName';
      }
      break;
    case 'waitExpr':
      switch (pos) {
        case 3:
          newState = 'waitExpr';
          break;
        default:
          newState = 'readExpr';
      }
      break;
    case 'readExpr':
      switch (pos) {
        case 0:
          newState = 'endNode';
          break;
        default:
          newState = 'readExpr';
      }
      break;
    default:
    // console.log(state, pos);
  }
  return newState;
}

function stateMachine(token) {
  var pos = symbol.indexOf(token);
  $$state = transfer($$state, pos);
  console.log($$state);
  return $$state;
}

function transferState(newState) {
  $$state = newState;
}

exports['default'] = { stateMachine: stateMachine, transferState: transferState };
module.exports = exports['default'];