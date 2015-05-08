define(['exports', 'TreeNode'], function (exports, _TreeNode) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _TreeNode2 = _interopRequire(_TreeNode);

  var Parser = {
    getTags: function getTags() {},
    stringNode: function stringNode(token, pos) {},
    getNodeBegin: function getNodeBegin(token, pos) {},
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