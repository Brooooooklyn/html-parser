import TreeNode from 'TreeNode';

var Parser = {
  getTags: function() {

  },
  stringNode: function(token) {
    var stringStack;
    stringStack = Parser.stringStack;
    stringStack.push(token);
    return 'stringNode';
  },
  getNodeBegin: function(token) {
    var nodeName, node, tokenStack, nodeStack;
    tokenStack = Parser.tokenStack;
    nodeStack = Parser.nodeStack;
    if(token === '00') {
      nodeName = tokenStack.toString();
      node = new TreeNode(nodeName);
      nodeStack.push(node);
      return;
    }
    tokenStack.push(token);
  },
  getNodeEnd: function(token) {

  },
  getAttributesKey: function(token) {

  },
  getAttributesValBegin: function() {

  },
  getAttributesVal: function(token) {

  },
  tokenTree: {
    root: new TreeNode('root')
  },
  treeHead: 'root',
  nodeStack: [],
  attrStack: [],
  stringStack: [],
  tokenStack: []
};

export {Parser};