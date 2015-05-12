define(['exports', 'module', 'TreeNode'], function (exports, module, _TreeNode) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _TreeNode2 = _interopRequire(_TreeNode);

  var Parser = {
    getTags: function getTags() {},
    stringNode: function stringNode(token) {
      Parser.stringStack.push(token);
    },
    getNodeBegin: function getNodeBegin(token) {},
    getEndNode: function getEndNode(token) {},
    buildNode: function buildNode() {},
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

  module.exports = Parser;
});