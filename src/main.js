/* jshint devel:true */
'use strict';

import Parser from 'Parser';
import SubParser from 'ETParser';
import * as machine from 'StateMachine';

var $$endStates = ['stringNode', 'endNode'];

class EtParser {
  constructor(str, mode = 'html') {
    let len, pos, i, token, _parser, _subParser , _state, subpos;
    _parser = new Parser();
    _subParser = new SubParser();
    if(!str) {
      return;
    }
    len = str.length;
    console.log(mode);
    for(i = 0; i < len; i++) {
      token = str.charAt(i);
      _state = machine.stateMachine(token);
      if(mode !== 'html') {
        if(_parser[_state]) {
          _parser[_state](token, pos);
        }else if(_subParser[_state]) {
          _subParser[_state](token);
        }else {
          // console.log(_state);
        }
      }else {
        if(_parser[_state]) {
          _parser[_state](token, pos);
        }else {
          throw 'unexpected state at: ' + token;
        }
      }
    }
    return _parser;
  }

}

export default EtParser;
