class TreeNode{

  constructor(
    nodeName,
    nodeType,
    parent = null,
    prev = null,
    next = null,
    $$id = 'root'
  ) {
    this.nodeName = nodeName;
    this.nodeType = nodeType;
    this.parent = parent;
    this.prev = prev;
    this.next = next;
    this.content = null;
    this.$$id = $$id;
    this.children = [];
    this.attributes = [];
  }

}

export default TreeNode;
