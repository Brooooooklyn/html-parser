define(["exports", "module"], function (exports, module) {
  "use strict";

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var TreeNode = function TreeNode(nodeName, nodeType) {
    var parent = arguments[2] === undefined ? null : arguments[2];
    var prev = arguments[3] === undefined ? null : arguments[3];
    var next = arguments[4] === undefined ? null : arguments[4];
    var $$id = arguments[5] === undefined ? null : arguments[5];

    _classCallCheck(this, TreeNode);

    this.nodeName = nodeName;
    this.nodeType = nodeType;
    this.parent = parent;
    this.prev = prev;
    this.next = next;
    this.content = null;
    this.$$id = $$id;
    this.children = [];
  };

  module.exports = TreeNode;
});