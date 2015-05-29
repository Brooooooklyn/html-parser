/* jshint devel:true */
import Parser from 'Parser';
import stateMachine from 'StateMachine';

var basicSymbol = ['<', ' ', '=', '"', '\'', '>', '/'];
var $$endStates = ['stringNode', 'endNode'];

class EtParser{
  constructor(str) {
    var len, pos, i, token, _parser, _state;
    _parser = new Parser();
    if(!str) {
      return;
    }
    len = str.length;
    for(i = 0; i < len; i++) {
      token = str.charAt(i);
      pos = basicSymbol.indexOf(token);
      _state = stateMachine(token, pos);
      if(_parser[_state]) {
        _parser[_state](token, pos);
      }else {
        console.log(_state);
      }
    }
    return _parser;
  }

}

export default EtParser;
