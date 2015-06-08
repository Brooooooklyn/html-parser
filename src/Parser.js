import TreeNode from 'TreeNode';
import Attribute from 'Attribute';

var nodeStack, attrStack, commentStack, stringStack, tokenStack, treeHead,
    $$lastNodeId, $$lastId;

class Parser {
  constructor() {
    this.tokenTree = {
      root: new TreeNode('root', 'root')
    };
    nodeStack = [];
    attrStack = [];
    stringStack = [];
    commentStack = [];
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

  getComment(token) {
    commentStack.push(token);
  }

  buildComment() {
    var node = new TreeNode('comment', 8),
        tokenTree = this.tokenTree,
        lastNode = tokenTree[$$lastNodeId],
        length = commentStack.length,
        commentStart, commentEnd;

    commentStart = commentStack.shift() + commentStack.shift() + commentStack.shift();
    commentEnd = commentStack.pop() + commentStack.pop();

    if(commentStart === '!--' && commentEnd === '--') {
      $$lastId += 1;
      node.$$id = $$lastId;
      node.content = commentStack.join('');
      length = lastNode.children.length;
      if(length) {
        let prev = lastNode.children[length - 1];
        node.prev = prev;
        prev.next = node;
      }
      node.parent = lastNode;
      lastNode.children.push(node);
      commentStack = [];
      tokenTree[$$lastId] = node;
    }else {
      console.log(commentStart);
      console.log(commentEnd);
      throw 'Illegal html comment.';
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
      console.log(this.tokenTree);
      console.log('last node name: ' + nodeName);
      console.log('current node name: ' + currentName);
      console.log('Tag\'s begin and tag\'s end not match, ignore this loop.');
    }else {
      nodeStack = [];
      parent = tokenTree[$$lastNodeId].parent;
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
