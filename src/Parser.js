import TreeNode from 'TreeNode';

var Parser = {
  $$lastNodeId: 'root',
  $$nextNodePosition: 'child',
  $$lastId: -1,
  getTags: function() {
    var stringStack = Parser.stringStack;
    Parser.$$nextNodePosition = 'child';
    if(stringStack.length) {
      var str = stringStack.join(''),
          node = new TreeNode('string', 3),
          tokenTree = Parser.tokenTree,
          lastNode = tokenTree[Parser.$$lastNodeId];
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
        lastNode = tokenTree[Parser.$$lastNodeId];
    Parser.$$lastId += 1;
    node.$$id = Parser.$$lastId;
    switch(Parser.$$nextNodePosition) {
      case 'child':
        node.parent = lastNode;
        lastNode.children.push(node);
        tokenTree[Parser.$$lastId] = node;
        break;
    }
    Parser.$$lastNodeId = Parser.$$lastId;
    Parser.nodeStack = [];
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

  },
  getAttributesValBegin: function() {

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