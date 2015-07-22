'use strict';

var $$state = 'getNode';
var symbol = ['[', '{', ']', '}'];

function transfer(state, pos) {

}

function stateMachine(token, pos) {

}

function transferState(newState) {
  $$state = newState;
}

export default {stateMachine, transferState};
