/* jshint devel:true */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Parser = require('Parser');

var _Parser2 = _interopRequireDefault(_Parser);

var _StateMachine = require('StateMachine');

var _StateMachine2 = _interopRequireDefault(_StateMachine);

var basicSymbol = ['<', ' ', '=', '"', '\'', '>', '/'];
var $$endStates = ['stringNode', 'endNode'];

var EtParser = function EtParser(str) {
  _classCallCheck(this, EtParser);

  var len, pos, i, token, _parser, _state;
  _parser = new _Parser2['default']();
  if (!str) {
    return;
  }
  len = str.length;
  for (i = 0; i < len; i++) {
    token = str.charAt(i);
    pos = basicSymbol.indexOf(token);
    _state = (0, _StateMachine2['default'])(token, pos);
    if (_parser[_state]) {
      _parser[_state](token, pos);
    } else {
      console.log(_state);
    }
  }
  return _parser;
};

exports['default'] = EtParser;
module.exports = exports['default'];