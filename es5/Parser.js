define(['exports', 'TreeNode'], function (exports, _TreeNode) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _TreeNode2 = _interopRequire(_TreeNode);

  var Parser = {
    getTags: function getTags() {},
    stringNode: function stringNode(token) {
      var stringStack;
      stringStack = Parser.stringStack;
      stringStack.push(token);
      return 'stringNode';
    },
    getNodeBegin: function getNodeBegin(token) {
      var nodeName, node, tokenStack, nodeStack;
      tokenStack = Parser.tokenStack;
      nodeStack = Parser.nodeStack;
      if (token === '00') {
        nodeName = tokenStack.toString();
        node = new _TreeNode2(nodeName);
        nodeStack.push(node);
        return;
      }
      tokenStack.push(token);
    },
    getNodeEnd: function getNodeEnd(token) {},
    getAttributesKey: function getAttributesKey(token) {},
    getAttributesValBegin: function getAttributesValBegin() {},
    getAttributesVal: function getAttributesVal(token) {},
    tokenTree: {
      root: new _TreeNode2('root')
    },
    treeHead: 'root',
    nodeStack: [],
    attrStack: [],
    stringStack: [],
    tokenStack: []
  };

  exports.Parser = Parser;
});