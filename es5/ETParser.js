'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _StateMachine = require('StateMachine');

var _ETStateMachine = require('ETStateMachine');

var submachine = _interopRequireWildcard(_ETStateMachine);

var tokenStack, nodeStack, endValStack, expressionStack, squareCount;

var expression = ['if', 'else', '&&', '||', 'for', 'in', ','];

var ETParser = (function () {
  function ETParser() {
    _classCallCheck(this, ETParser);

    tokenStack = [];
    nodeStack = [];
    endValStack = [];
    expressionStack = [];
    squareCount = 0;
  }

  _createClass(ETParser, [{
    key: 'getNode',
    value: function getNode() {}
  }, {
    key: 'getNodeName',
    value: function getNodeName() {}
  }, {
    key: 'waitExpr',
    value: function waitExpr() {}
  }, {
    key: 'readExpr',
    value: function readExpr(token) {
      // read [
      if (token.charCodeAt(0) === 91) {
        squareCount++;
      }
      expressionStack.push(token);
    }
  }, {
    key: 'etEndNode',
    value: function etEndNode() {
      if (squareCount) {
        expressionStack.push(']');
        squareCount--;
        submachine.transferState('readExpr');
      } else {
        console.log('ExprStack:', expressionStack);
        (0, _StateMachine.transferState)((0, _StateMachine.readState)(), 'html');
      }
    }
  }, {
    key: 'back',
    value: function back() {}
  }, {
    key: 'buildET',
    value: function buildET() {
      console.log('buildET', (0, _StateMachine.readState)());
      (0, _StateMachine.transferState)((0, _StateMachine.readState)(), 'html');
    }
  }, {
    key: 'endValueBind',
    value: function endValueBind(token) {
      endValStack.push(token);
      if (endValStack.length === 2 && endValStack[0] === '}' && endValStack[1] === '}') {
        (0, _StateMachine.transferState)((0, _StateMachine.readState)(), 'html');
        endValStack = [];
      }
    }
  }]);

  return ETParser;
})();

exports['default'] = ETParser;
module.exports = exports['default'];