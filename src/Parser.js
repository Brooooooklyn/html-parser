import TreeNode from 'TreeNode';
import Attribute from 'Attribute';

var Parser = {
  $$lastNodeId: 'root',
  $$lastId: -1,
  getTags: function() {
    var stringStack = Parser.stringStack,
        tokenTree = Parser.tokenTree,
        lastNode = tokenTree[Parser.$$lastNodeId];
    if(stringStack.length) {
      var str = stringStack.join(''),
          node = new TreeNode('string', 3);
      node.content = str;
      node.parent = lastNode;
      Parser.$$lastId += 1;
      node.$$id = Parser.$$lastId;
      tokenTree[Parser.$$lastId] = node;
      lastNode.children.push(node);
      Parser.stringStack = [];
    }
  },
  stringNode: function(token) {
    Parser.stringStack.push(token);
  },
  getNodeBegin: function(token) {
    Parser.nodeStack.push(token);
  },
  getEndNode: function(token) {
    if(token !== '/') {
      Parser.nodeStack.push(token);
    }
  },
  buildNode: function() {
    var nodeName = Parser.nodeStack.join(''),
        node = new TreeNode(nodeName, 1),
        tokenTree = Parser.tokenTree,
        lastNode = tokenTree[Parser.$$lastNodeId],
        length;
    Parser.$$lastId += 1;
    node.$$id = Parser.$$lastId;
    length = lastNode.children.length;
    if(length) {
      let prev = lastNode.children[length - 1];
      node.prev = prev;
      prev.next = node;
    }
    node.parent = lastNode;
    lastNode.children.push(node);
    tokenTree[Parser.$$lastId] = node;
    Parser.$$lastNodeId = Parser.$$lastId;
    Parser.nodeStack = [];
    Parser.$$nextNodePosition = 'child';
  },
  endNode: function() {
    var nodeName = Parser.nodeStack.join(''),
        currentNode = Parser.tokenTree[Parser.$$lastNodeId],
        currentName = currentNode.nodeName,
        parent;
    if(nodeName !== currentName) {
      console.log(Parser);
      throw 'Tag\'s begin and tag\'s end not match';
    }else {
      Parser.nodeStack = [];
      parent = Parser.tokenTree[Parser.$$lastId - 1].parent;
      Parser.$$lastNodeId = parent.$$id;
    }
  },
  getAttributesKey: function(token) {
    Parser.attrStack.push(token);
  },
  getAttributesValBegin: function() {
    var attrName = Parser.attrStack.join(''),
        attr = new Attribute(attrName);
    console.log(attr);
  },
  getAttributesVal: function(token) {

  },
  tokenTree: {
    root: new TreeNode('root', 'root')
  },
  treeHead: 'root',
  nodeStack: [],
  attrStack: [],
  stringStack: [],
  tokenStack: []
};


export default Parser;
