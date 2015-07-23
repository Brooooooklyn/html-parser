'use strict';

import {transferState} from 'ETStateMachine';

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
