'use strict';

import {transferState, readState} from 'StateMachine';
import * as submachine from 'ETStateMachine';

var tokenStack,
    nodeStack,
    endValStack,
    expressionStack,
    squareCount;

var expression = ['if', 'else', '&&', '||', 'for', 'in', ','];


class ETParser {
  constructor() {
    tokenStack = [];
    nodeStack = [];
    endValStack = [];
    expressionStack = [];
    squareCount = 0;
  }

  getNode() {

  }

  getNodeName() {

  }

  waitExpr() {

  }

  readExpr(token) {
    // read [
    if(token.charCodeAt(0) === 91) {
      squareCount ++;
    }
    expressionStack.push(token);
  }

  etEndNode() {
    if(squareCount) {
      expressionStack.push(']');
      squareCount --;
      submachine.transferState('readExpr');
    } else {
      console.log('ExprStack:', expressionStack);
      transferState(readState(), 'html');
    }
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
