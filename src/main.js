/* jshint devel:true */
'use strict';

import Parser from 'Parser';
import SubParser from 'ETParser';
import * as machine from 'StateMachine';
import * as submachine from 'ETStateMachine';

var $$endStates = ['stringNode', 'endNode'];

class EtParser {
  constructor(str) {
    let len, pos, i, token, _parser, _subParser , _state, subpos;
    _parser = new Parser();
    _subParser = new SubParser();
    if(!str) {
      return;
    }
    len = str.length;
    for(i = 0; i < len; i++) {
      token = str.charAt(i);
      _state = machine.stateMachine(token);
      if(_parser[_state]) {
        _parser[_state](token, pos);
      }else if(_subParser[_state]) {
        _subParser[_state](token);
      }else {
        // console.log(_state);
      }
    }
    return _parser;
  }

}

export default EtParser;
