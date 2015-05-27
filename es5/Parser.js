define(['exports', 'module', 'TreeNode', 'Attribute'], function (exports, module, _TreeNode, _Attribute) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _TreeNode2 = _interopRequireDefault(_TreeNode);

  var _Attribute2 = _interopRequireDefault(_Attribute);

  var Parser = {
    $$lastNodeId: 'root',
    $$lastId: -1,
    getTags: function getTags() {
      var stringStack = Parser.stringStack,
          tokenTree = Parser.tokenTree,
          lastNode = tokenTree[Parser.$$lastNodeId];
      if (stringStack.length) {
        var str = stringStack.join(''),
            node = new _TreeNode2['default']('string', 3);
        node.content = str;
        node.parent = lastNode;
        Parser.$$lastId += 1;
        node.$$id = Parser.$$lastId;
        tokenTree[Parser.$$lastId] = node;
        lastNode.children.push(node);
        Parser.stringStack = [];
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
          node = new _TreeNode2['default'](nodeName, 1),
          tokenTree = Parser.tokenTree,
          lastNode = tokenTree[Parser.$$lastNodeId],
          length;
      Parser.$$lastId += 1;
      node.$$id = Parser.$$lastId;
      length = lastNode.children.length;
      if (length) {
        var prev = lastNode.children[length - 1];
        node.prev = prev;
        prev.next = node;
      }
      node.parent = lastNode;
      lastNode.children.push(node);
      tokenTree[Parser.$$lastId] = node;
      Parser.$$lastNodeId = Parser.$$lastId;
      Parser.nodeStack = [];
      Parser.$$nextNodePosition = 'child';
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
      }
    },
    getAttributesKey: function getAttributesKey(token) {
      Parser.attrStack.push(token);
    },
    getAttributesValBegin: function getAttributesValBegin() {
      var attrName = Parser.attrStack.join(''),
          attr = new _Attribute2['default'](attrName);
      console.log(attr);
    },
    getAttributesVal: function getAttributesVal(token) {},
    tokenTree: {
      root: new _TreeNode2['default']('root', 'root')
    },
    treeHead: 'root',
    nodeStack: [],
    attrStack: [],
    stringStack: [],
    tokenStack: []
  };

  module.exports = Parser;
});