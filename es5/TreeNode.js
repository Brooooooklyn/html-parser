'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TreeNode = function TreeNode(nodeName, nodeType) {
  var parent = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
  var prev = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
  var next = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
  var $$id = arguments.length <= 5 || arguments[5] === undefined ? 'root' : arguments[5];

  _classCallCheck(this, TreeNode);

  this.nodeName = nodeName;
  this.nodeType = nodeType;
  this.parent = parent;
  this.prev = prev;
  this.next = next;
  this.content = null;
  this.$$id = $$id;
  this.children = [];
  this.attributes = [];
};

exports['default'] = TreeNode;
module.exports = exports['default'];