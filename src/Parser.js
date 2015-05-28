import TreeNode from 'TreeNode';
import Attribute from 'Attribute';

var nodeStack, attrStack, stringStack, tokenStack, treeHead,
    $$lastNodeId, $$lastId;

class Parser {
  constructor() {
    this.tokenTree = {
      root: new TreeNode('root', 'root')
    };
    nodeStack = [];
    attrStack = [];
    stringStack = [];
    tokenStack = [];
    treeHead = 'root';
    $$lastNodeId = 'root';
    $$lastId = -1;
  }
  getTags() {
    var tokenTree = this.tokenTree,
        lastNode = tokenTree[$$lastNodeId];
    if(stringStack.length) {
      let str = stringStack.join(''),
          node = new TreeNode('string', 3);
      node.content = str;
      node.parent = lastNode;
      $$lastId += 1;
      node.$$id = $$lastId;
      tokenTree[$$lastId] = node;
      lastNode.children.push(node);
      stringStack = [];
    }
  }

  stringNode(token) {
    stringStack.push(token);
  }

  getNodeBegin(token) {
    if(token !== '"') {
      nodeStack.push(token);
    }else {
      let attributeVal = tokenStack.join(''),
          lastId = attrStack.length - 1,
          attribute = attrStack[lastId];
      attribute.val = attributeVal;
      tokenStack = [];
    }
  }

  getEndNode(token) {
    if(token !== '/') {
      nodeStack.push(token);
    }
  }

  buildNode() {
    var nodeName = nodeStack.join(''),
        node = new TreeNode(nodeName, 1),
        tokenTree = this.tokenTree,
        lastNode = tokenTree[$$lastNodeId],
        length, tempAttrStack;
    $$lastId += 1;
    node.$$id = $$lastId;
    length = lastNode.children.length;
    if(length) {
      let prev = lastNode.children[length - 1];
      node.prev = prev;
      prev.next = node;
    }
    node.parent = lastNode;
    lastNode.children.push(node);
    tempAttrStack = [];
    node.attributes = tempAttrStack.concat(attrStack);
    attrStack = [];
    tokenTree[$$lastId] = node;
    $$lastNodeId = $$lastId;
    nodeStack = [];
  }

  endNode() {
    var tokenTree = this.tokenTree,
        nodeName = nodeStack.join(''),
        currentNode = tokenTree[$$lastNodeId],
        currentName = currentNode.nodeName,
        parent;
    if(nodeName !== currentName) {
      console.log(nodeName);
      console.log(currentName);
      throw 'Tag\'s begin and tag\'s end not match';
    }else {
      nodeStack = [];
      parent = tokenTree[$$lastId - 1].parent;
      $$lastNodeId = parent.$$id;
    }
  }

  getAttributesKey(token) {
    if(token !== ' '){
      tokenStack.push(token);
    }
  }

  getAttributesValBegin(token) {
    if (token !== ' ') {
      let tokenTree = this.tokenTree,
          attrName = tokenStack.join(''),
          attr = new Attribute(attrName);
      attrStack.push(attr);
      tokenStack = [];
    }
  }

  getAttributesVal(token) {
    if(token !== '"') {
      tokenStack.push(token);
    }
  }

}


export default Parser;
