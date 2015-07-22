'use strict';

import {transferState} from 'SubStateMachine';

var tokenStack,
    nodeStack,
    expressionStack;

var expression = ['if', 'else', '&&', '||', 'for', 'in', ','];

class ETParser {
  constructor() {
    tokenStack = [];
    nodeStack = [];
    expressionStack = [];
  }
}
