/* jshint devel:true */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Parser = require('Parser');

var _Parser2 = _interopRequireDefault(_Parser);

var _ETParser = require('ETParser');

var _ETParser2 = _interopRequireDefault(_ETParser);

var _StateMachine = require('StateMachine');

var machine = _interopRequireWildcard(_StateMachine);

var _ETStateMachine = require('ETStateMachine');

var submachine = _interopRequireWildcard(_ETStateMachine);

var $$endStates = ['stringNode', 'endNode'];

var EtParser = function EtParser(str) {
  _classCallCheck(this, EtParser);

  var len = undefined,
      pos = undefined,
      i = undefined,
      token = undefined,
      _parser = undefined,
      _subParser = undefined,
      _state = undefined,
      subpos = undefined;
  _parser = new _Parser2['default']();
  _subParser = new _ETParser2['default']();
  if (!str) {
    return;
  }
  len = str.length;
  for (i = 0; i < len; i++) {
    token = str.charAt(i);
    _state = machine.stateMachine(token);
    if (_parser[_state]) {
      _parser[_state](token, pos);
    } else if (_subParser[_state]) {
      _subParser[_state](token);
    } else {
      // console.log(_state);
    }
  }
  return _parser;
};

exports['default'] = EtParser;
module.exports = exports['default'];