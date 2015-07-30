'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var $$state = 'getNode';
var symbol = [']', '{', '}', '#', ' ', '/', '['];

var transfer = function transfer(state, pos) {
  var newState = undefined;
  switch (state) {
    case 'getNode':
      switch (pos) {
        case 1:
          newState = 'valueBind';
          break;
        case 3:
          newState = 'getNodeName';
          break;
        case 5:
          newState = 'etClosed';
          break;
        default:
          newState = 'back';
      }
      break;
    case 'valueBind':
      switch (pos) {
        case 1:
          newState = 'valueBind';
          break;
        case -1:
          newState = 'readExpr';
          break;
        case 4:
          newState = 'waitExpr';
          break;
        default:
          newState = 'back';
      }
      break;
    case 'getNodeName':
      switch (pos) {
        case 4:
          newState = 'waitExpr';
          break;
        default:
          newState = 'getNodeName';
      }
      break;
    case 'waitExpr':
      switch (pos) {
        case 0:
          newState = 'etEndNode';
          break;
        case 2:
          newState = 'endValueBind';
          break;
        case 4:
          newState = 'waitExpr';
          break;
        case 6:
          newState = 'readSquare';
          break;
        default:
          newState = 'readExpr';
      }
      break;
    case 'readExpr':
      switch (pos) {
        case 0:
          newState = 'etEndNode';
          break;
        case 2:
          newState = 'endValueBind';
          break;
        case 4:
          newState = 'waitExpr';
          break;
        default:
          newState = 'readExpr';
      }
      break;
    case 'endValueBind':
      switch (pos) {
        case 2:
          newState = 'endValueBind';
          break;
        default:
          newState = 'back';
      }
      break;
    case 'etClosed':
      switch (pos) {
        case -1:
        case 4:
          newState = 'getCloseTag';
          break;
        case 3:
          newState = 'etClosed';
          break;
        default:
          newState = 'back';
      }
      break;
    case 'getCloseTag':
      switch (pos) {
        case -1:
          newState = 'getCloseTag';
          break;
        case 0:
          newState = 'buildET';
          break;
        case 4:
          newState = 'waitEnd';
          break;
        default:
          newState = 'back';
      }
      break;
    case 'waitEnd':
      switch (pos) {
        case 4:
          newState = 'waitEnd';
          break;
        default:
          newState = 'back';
      }
      break;
    default:
    // console.log(state, pos);
  }
  return newState;
};

var stateMachine = function stateMachine(token) {
  var pos = symbol.indexOf(token);
  $$state = transfer($$state, pos);
  // console.log('ETStateMachine', $$state);
  return $$state;
};

var transferState = function transferState(newState) {
  if (newState) {
    $$state = newState;
  } else {
    throw 'transfer state error';
  }
};

exports['default'] = { stateMachine: stateMachine, transferState: transferState };
module.exports = exports['default'];