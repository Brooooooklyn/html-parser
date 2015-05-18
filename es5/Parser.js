define(['exports', 'module', 'TreeNode'], function (exports, module, _TreeNode) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _TreeNode2 = _interopRequire(_TreeNode);

  var Parser = {
    $$lastNodeId: 'root',
    $$nextNodePosition: 'child',
    $$lastId: -1,
    getTags: function getTags() {
      var stringStack = Parser.stringStack;
      if (stringStack.length) {
        var str = stringStack.join(''),
            node = new _TreeNode2('string', 3),
            tokenTree = Parser.tokenTree,
            lastNode = tokenTree[Parser.$$lastNodeId];
        node.content = str;
        node.parent = lastNode;
        Parser.$$lastId += 1;
        node.$$id = Parser.$$lastId;
        tokenTree[Parser.$$lastId] = node;
        lastNode.children.push(node);
        Parser.stringStack = [];
        if (node.parent.children.length) {
          Parser.$$nextNodePosition = 'next';
        } else {
          Parser.$$nextNodePosition = 'child';
        }
      }
    },
    stringNode: function stringNode(token) {
      Parser.stringStack.push(token);
    },
    getNodeBegin: function getNodeBegin(token) {
      Parser.nodeStack.push(token);
    },
    getEndNode: function getEndNode(token) {
      if (token !== '/') {
        Parser.nodeStack.push(token);
      }
    },
    buildNode: function buildNode() {
      var nodeName = Parser.nodeStack.join(''),
          node = new _TreeNode2(nodeName, 1),
          tokenTree = Parser.tokenTree,
          lastNode = tokenTree[Parser.$$lastNodeId];
      console.log(Parser.$$nextNodePosition);
      Parser.$$lastId += 1;
      node.$$id = Parser.$$lastId;
      switch (Parser.$$nextNodePosition) {
        case 'child':
          node.parent = lastNode;
          lastNode.children.push(node);
          break;
        case 'next':
          node.parent = lastNode.parent;
          node.prev = lastNode;
          lastNode.next = node;
          lastNode.parent.children.push(node);
          break;
      }
      tokenTree[Parser.$$lastId] = node;
      Parser.$$lastNodeId = Parser.$$lastId;
      Parser.nodeStack = [];
    },
    endNode: function endNode() {
      var nodeName = Parser.nodeStack.join(''),
          currentNode = Parser.tokenTree[Parser.$$lastNodeId],
          currentName = currentNode.nodeName,
          parent;
      if (nodeName !== currentName) {
        console.log(Parser);
        throw 'Tag\'s begin and tag\'s end not match';
      } else {
        Parser.nodeStack = [];
        parent = Parser.tokenTree[Parser.$$lastId - 1].parent;
        Parser.$$lastNodeId = parent.$$id;
        Parser.$$nextNodePosition = 'child';
      }
    },
    getAttributesKey: function getAttributesKey(token) {},
    getAttributesValBegin: function getAttributesValBegin() {},
    getAttributesVal: function getAttributesVal(token) {},
    tokenTree: {
      root: new _TreeNode2('root', 'root')
    },
    treeHead: 'root',
    nodeStack: [],
    attrStack: [],
    stringStack: [],
    tokenStack: []
  };

  module.exports = Parser;
});