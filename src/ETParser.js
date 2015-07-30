'use strict';

import {transferState} from 'StateMachine';
import {readState} from 'StateMachine';

var tokenStack,
    nodeStack,
    endValStack,
    expressionStack;

var expression = ['if', 'else', '&&', '||', 'for', 'in', ','];


class ETParser {
  constructor() {
    tokenStack = [];
    nodeStack = [];
    endValStack = [];
    expressionStack = [];
  }

  getNode() {

  }

  getNodeName() {

  }

  waitExpr() {

  }

  readExpr(token) {
    tokenStack.push(token);
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

  endValueBind(token) {
    endValStack.push(token);
    if(
      endValStack.length === 2 &&
      endValStack[0] === '}' &&
      endValStack[1] === '}'
    ) {
      transferState(readState(), 'html');
      endValStack = [];
    }
  }
}

export default ETParser;
