class TreeNode{

  constructor(nodeName, parent = null, prev = null, next = null) {
    this.nodeName = nodeName;
    this.parent = parent;
    this.prev = prev;
    this.next = next;
    this.children = [];
  }

}

export default TreeNode;