define(["exports", "module"], function (exports, module) {
  "use strict";

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var TreeNode = function TreeNode(nodeName) {
    var parent = arguments[1] === undefined ? null : arguments[1];
    var prev = arguments[2] === undefined ? null : arguments[2];
    var next = arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, TreeNode);

    this.nodeName = nodeName;
    this.parent = parent;
    this.prev = prev;
    this.next = next;
    this.children = [];
  };

  module.exports = TreeNode;
});