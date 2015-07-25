'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _StateMachine = require('StateMachine');

var tokenStack, nodeStack, expressionStack;

var expression = ['if', 'else', '&&', '||', 'for', 'in', ','];

var ETParser = (function () {
  function ETParser() {
    _classCallCheck(this, ETParser);

    tokenStack = [];
    nodeStack = [];
    expressionStack = [];
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
    value: function readExpr() {}
  }, {
    key: 'etEndNode',
    value: function etEndNode() {
      console.log('readState:', (0, _StateMachine.readState)());
      (0, _StateMachine.transferState)((0, _StateMachine.readState)(), 'html');
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
  }]);

  return ETParser;
})();

exports['default'] = ETParser;
module.exports = exports['default'];