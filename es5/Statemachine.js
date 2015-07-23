'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _ETStateMachine = require('ETStateMachine');

var submachine = _interopRequireWildcard(_ETStateMachine);

var $$state = 'stringNode';
var $$ctrl = 'html';
var basicSymbol = ['<', ' ', '=', '"', '\'', '>', '/', '!', '-'];
var etStart = ['{', '['];

function transfer(state, pos) {
  var newState;
  switch (state) {
    case 'getTags':
      if (pos === 6) {
        newState = 'getEndNode';
      } else if (pos === -1) {
        newState = 'getNodeBegin';
      } else if (pos === 7) {
        newState = 'getComment';
      }
      break;
    case 'getComment':
      if (pos === 5) {
        newState = 'buildComment';
      } else {
        newState = 'getComment';
      }
      break;
    case 'buildComment':
      if (pos === -1) {
        newState = 'stringNode';
      } else if (pos === 0) {
        newState = 'getTags';
      }
      break;
    case 'getNodeBegin':
      switch (pos) {
        case -1:
        case 8:
          newState = 'getNodeBegin';
          break;
        case 0:
          newState = 'getTags';
          break;
        case 1:
          newState = 'getAttributesKey';
          break;
        case 5:
          newState = 'buildNode';
          break;
        case 6:
          newState = 'buildNode';
          break;
      }
      break;
    case 'getNodeName':
      if (pos === 1) {
        newState = 'getAttributesKey';
      }
      break;
    case 'buildNode':
      if (pos === 0) {
        newState = 'getTags';
      } else if (pos === -1) {
        newState = 'stringNode';
      } else if (pos === 5) {
        newState = 'buildNode';
      }
      break;
    case 'getEndNode':
      if (pos === -1 || pos === 8) {
        newState = 'getEndNode';
      } else if (pos === 5) {
        newState = 'endNode';
      }
      break;
    case 'endNode':
      if (pos === -1) {
        newState = 'stringNode';
      } else if (pos === 0) {
        newState = 'getTags';
      }
      break;
    case 'getAttributesKey':
      switch (pos) {
        case -1:
        case 1:
        case 7:
        case 8:
          newState = 'getAttributesKey';
          break;
        case 2:
          newState = 'getAttributesValBegin';
      }
      break;
    case 'getAttributesValBegin':
      if (pos === 1) {
        newState = 'getAttributesValBegin';
      } else if (pos === 3) {
        newState = 'getAttributesVal';
      }
      break;
    case 'getAttributesVal':
      switch (pos) {
        case -1:
        case 1:
        case 7:
        case 8:
          newState = 'getAttributesVal';
          break;
        case 3:
          newState = 'getNodeBegin';
          break;
      }
      break;
    case 'stringNode':
      if (pos === 0) {
        newState = 'getTags';
      } else {
        newState = 'stringNode';
      }
      break;
    default:
      console.log($$state, state, pos);
      break;
  }
  return newState;
}

function stateMachine(token) {
  var _state;
  var pos;
  if ($$ctrl === 'et') {
    return submachine.stateMachine(token);
  } else if ($$ctrl === 'html') {
    var etPos = undefined;
    pos = basicSymbol.indexOf(token);
    $$state = transfer($$state, pos);
    etPos = etStart.indexOf(token);
    if (etPos !== -1) {
      $$ctrl = 'et';
    }
  }
  return $$state;
}

function transferState(newState, ctrl) {
  $$state = newState;
  if (ctrl) {
    $$ctrl = ctrl;
  }
}

exports['default'] = { stateMachine: stateMachine, transferState: transferState };
module.exports = exports['default'];