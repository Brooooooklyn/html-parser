'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var $$state = 'stringNode';

function transfer(oldstate) {
  var newState;
  switch (oldstate) {
    case 'getTags6':
      newState = 'getEndNode';
      break;
    case 'getTags-1':
      newState = 'getNodeBegin';
      break;
    case 'getTags7':
    case 'getComment-1':
    case 'getComment0':
    case 'getComment1':
    case 'getComment2':
    case 'getComment3':
    case 'getComment4':
    case 'getComment6':
    case 'getComment7':
    case 'getComment8':
      newState = 'getComment';
      break;
    case 'getComment5':
      newState = 'buildComment';
      break;
    case 'buildComment-1':
      newState = 'stringNode';
      break;
    case 'buildComment0':
      newState = 'getTags';
      break;
    case 'getNodeBegin-1':
      newState = 'getNodeBegin';
      break;
    case 'getNodeBegin1':
      newState = 'getAttributesKey';
      break;
    case 'getNodeBegin5':
      newState = 'buildNode';
      break;
    case 'getNodeName1':
      newState = 'getAttributesKey';
      break;
    case 'buildNode0':
      newState = 'getTags';
      break;
    case 'buildNode-1':
      newState = 'stringNode';
      break;
    case 'getEndNode-1':
      newState = 'getEndNode';
      break;
    case 'getEndNode5':
      newState = 'endNode';
      break;
    case 'endNode-1':
      newState = 'stringNode';
      break;
    case 'endNode0':
      newState = 'getTags';
      break;
    case 'getAttributesKey-1':
    case 'getAttributesKey1':
      newState = 'getAttributesKey';
      break;
    case 'getAttributesKey2':
      newState = 'getAttributesValBegin';
      break;
    case 'getAttributesValBegin1':
      newState = 'getAttributesValBegin';
      break;
    case 'getAttributesValBegin3':
      newState = 'getAttributesVal';
      break;
    case 'getAttributesVal-1':
    case 'getAttributesVal1':
      newState = 'getAttributesVal';
      break;
    case 'getAttributesVal3':
      newState = 'getNodeBegin';
      break;
    case 'stringNode0':
      newState = 'getTags';
      break;
    case 'stringNode-1':
    case 'stringNode1':
    case 'stringNode2':
    case 'stringNode3':
    case 'stringNode4':
    case 'stringNode5':
    case 'stringNode6':
      newState = 'stringNode';
      break;
  }
  return newState;
}

function stateMachine(token, pos) {
  var prestate, _state;
  _state = $$state = transfer($$state + pos);
  return _state;
}

exports['default'] = stateMachine;
module.exports = exports['default'];