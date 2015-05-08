define(['exports', 'Parser'], function (exports, _Parser) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  /* jshint devel:true */

  var _Parser2 = _interopRequire(_Parser);

  function stateMachine(oldstate) {
    var newState;
    switch (oldstate) {
      //匹配扫描到<符号后再扫描到/的状态，即标签开始闭合
      case 'getTags6':
        newState = 'getNodeEnd';
        break;
      //匹配扫描到<符号后再扫描到符号表外字符的状态，即即将开始获取Node节点名
      case 'getTags-1':
        newState = 'getNodeBegin';
        break;
      //匹配上一情况后跟字符串的状态，即正在获取Node节点名
      case 'getNodeBegin-1':
        newState = 'getNodeBegin';
        break;
      //匹配上一情况后再扫描到空格的状态，即开始获取attribute名
      case 'getNodeBegin1':
        newState = 'getAttributesKey';
        break;
      case 'getNodeBegin5':
        newState = 'stringNode';
        break;
      //匹配上一情况后再跟符号表外字符的状态，即正在获取attribute名
      case 'getAttributesKey-1':
        newState = 'getAttributesKey';
        break;
      //
      case 'getAttributesKey2':
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

  function autoMachine(token, pos) {
    var $$state, prestate, parser, _state;
    $$state = $$state || 'stringNode';
    prestate = pos === -1 ? $$state + pos : _state + pos;
    _state = $$state = stateMachine(prestate);
    parser = _Parser2[_state];
    parser(token, pos);
  }

  function EtParser(str) {
    var endt, len, pos, i, token;
    if (!str) {
      return;
    }
    endt = ['<', ' ', '=', '"', '\'', '>', '/'];
    for (i = 0; i < len; i++) {
      token = str.charAt(i);
      pos = token.indexOf(token);
      autoMachine(token, pos);
    }
  }

  exports.EtParser = EtParser;
});