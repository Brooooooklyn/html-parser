'use strict';

import {transferState} from 'StateMachine';
import {readState} from 'StateMachine';

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

  getNode() {

  }

  getNodeName() {

  }

  waitExpr() {

  }

  readExpr() {

  }

  etEndNode() {
    console.log('readState:', readState());
    transferState(readState(), 'html');
  }

  back() {

  }

  buildET() {
    console.log('buildET', readState());
    transferState(readState(), 'html');
  }
}

export default ETParser;
