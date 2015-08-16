'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _TreeNode = require('TreeNode');

var _TreeNode2 = _interopRequireDefault(_TreeNode);

var _Attribute = require('Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _Utils = require('Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _StateMachine = require('StateMachine');

var nodeStack, attrStack, commentStack, stringStack, tokenStack, tempStack, treeHead, $$lastNodeId, $$lastId, utils;

var utils = new _Utils2['default']();
var selfClosedTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var Parser = (function () {
  function Parser() {
    _classCallCheck(this, Parser);

    this.tokenTree = {
      root: new _TreeNode2['default']('root', 'root')
    };
    nodeStack = [];
    attrStack = {};
    stringStack = [];
    commentStack = [];
    tokenStack = [];
    tempStack = [];
    treeHead = 'root';
    $$lastNodeId = 'root';
    $$lastId = -1;
    (0, _StateMachine.transferState)('stringNode', 'html');
  }

  _createClass(Parser, [{
    key: 'getTags',
    value: function getTags() {
      var tokenTree = this.tokenTree,
          lastNode = tokenTree[$$lastNodeId];
      if (nodeStack.length) {
        nodeStack.unshift('<');
        stringStack = utils.extend(nodeStack);
        nodeStack = [];
      }
      if (stringStack.length) {
        var str = stringStack.join(''),
            node = new _TreeNode2['default']('string', 3),
            _length = undefined,
            lastChild = undefined;

        _length = lastNode.children.length;
        if (_length) {
          lastChild = lastNode.children[_length - 1];
          if (lastChild.nodeType === 3) {
            lastChild.content = lastChild.content + str;
          } else {
            node.content = str;
            node.parent = lastNode;
            $$lastId += 1;
            node.$$id = $$lastId;
            tokenTree[$$lastId] = node;
            lastNode.children.push(node);
            lastChild.next = node;
            node.prev = lastChild;
          }
        } else {
          node.content = str;
          node.parent = lastNode;
          $$lastId += 1;
          node.$$id = $$lastId;
          tokenTree[$$lastId] = node;
          lastNode.children.push(node);
        }
        stringStack = [];
      }
    }
  }, {
    key: 'getComment',
    value: function getComment(token) {
      commentStack.push(token);
    }
  }, {
    key: 'buildComment',
    value: function buildComment() {
      var node = new _TreeNode2['default']('comment', 8),
          tokenTree = this.tokenTree,
          lastNode = tokenTree[$$lastNodeId],
          length = commentStack.length,
          commentStart,
          commentEnd;

      commentStart = commentStack.shift() + commentStack.shift() + commentStack.shift();
      commentEnd = commentStack.pop() + commentStack.pop();

      if (commentStart === '!--' && commentEnd === '--') {
        $$lastId += 1;
        node.$$id = $$lastId;
        node.content = commentStack.join('');
        length = lastNode.children.length;
        if (length) {
          var prev = lastNode.children[length - 1];
          node.prev = prev;
          prev.next = node;
        }
        node.parent = lastNode;
        lastNode.children.push(node);
        commentStack = [];
        tokenTree[$$lastId] = node;
      } else {
        console.log(commentStart);
        console.log(commentEnd);
        throw 'Illegal html comment.';
      }
    }
  }, {
    key: 'stringNode',
    value: function stringNode(token) {
      var charCode = token.charCodeAt(0);
      //ignore '\n' and blankspace
      if (charCode !== 32 && charCode !== 10) {
        stringStack.push(token);
      }
    }
  }, {
    key: 'getNodeBegin',
    value: function getNodeBegin(token) {
      var charCode = token.charCodeAt(0);
      if (charCode >= 65 && charCode <= 122 || charCode === 45) {
        nodeStack.push(token);
      } else if (charCode === 34) {
        var attributeVal = tokenStack.join(''),
            lastId = attrStack.lastId,
            attribute = attrStack[lastId];
        attribute.val = attributeVal;
        tokenStack = [];
      } else {
        (0, _StateMachine.transferState)('stringNode');
        stringStack.push('<' + token);
      }
    }
  }, {
    key: 'getEndNode',
    value: function getEndNode(token) {
      if (token !== '/') {
        nodeStack.push(token);
      }
    }
  }, {
    key: 'buildNode',
    value: function buildNode() {
      var nodeName = nodeStack.join('');
      if (!nodeName) {
        return;
      }
      var node = new _TreeNode2['default'](nodeName, 1),
          tokenTree = this.tokenTree,
          lastNode = tokenTree[$$lastNodeId],
          length;
      $$lastId += 1;
      node.$$id = $$lastId;
      length = lastNode.children.length;
      if (length) {
        var prev = lastNode.children[length - 1];
        node.prev = prev;
        prev.next = node;
      }
      node.parent = lastNode;
      lastNode.children.push(node);
      node.attributes = attrStack;
      attrStack = {};
      tokenTree[$$lastId] = node;
      $$lastNodeId = $$lastId;
      nodeStack = [];
      /**
       * 如果是自闭和标签，直接闭合
       */
      if (selfClosedTags.indexOf(nodeName) !== -1) {
        $$lastNodeId = lastNode.$$id;
      }
    }
  }, {
    key: 'endNode',
    value: function endNode() {
      var tokenTree = this.tokenTree,
          nodeName = nodeStack.join(''),
          currentNode = tokenTree[$$lastNodeId],
          currentName = currentNode.nodeName,
          parent;
      if (nodeName !== currentName) {
        // console.log(this.tokenTree);
        // console.log(`last node name:  + ${nodeName}`);
        // console.log('current node name: ' + currentName);
        // console.log('Tag\'s begin and tag\'s end not match, ignore this loop.');
      } else {
          nodeStack = [];
          parent = tokenTree[$$lastNodeId].parent;
          $$lastNodeId = parent.$$id;
        }
    }
  }, {
    key: 'getAttributesKeyBegein',
    value: function getAttributesKeyBegein() {
      var attrName = tokenStack.join(''),
          attr = undefined;
      if (!attrName) {
        return;
      }
      attr = new _Attribute2['default'](attrName);
      attrStack[attrName] = attr;
      attrStack.lastId = attrName;
      tokenStack = [];
    }
  }, {
    key: 'getAttributesKey',
    value: function getAttributesKey(token) {
      var charCode = token.charCodeAt(0);
      if (charCode !== 32) {
        tokenStack.push(token);
      }
    }
  }, {
    key: 'getAttributesValBegin',
    value: function getAttributesValBegin(token) {
      if (token !== ' ') {
        var attrName = tokenStack.join(''),
            attr = undefined;
        if (!attrName) {
          return;
        }
        attr = new _Attribute2['default'](attrName);
        attrStack[attrName] = attr;
        attrStack.lastId = attrName;
        tokenStack = [];
      }
    }
  }, {
    key: 'getAttributesVal',
    value: function getAttributesVal(token) {
      if (token !== '"') {
        tokenStack.push(token);
      }
    }
  }]);

  return Parser;
})();

exports['default'] = Parser;
module.exports = exports['default'];