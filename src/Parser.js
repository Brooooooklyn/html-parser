import TreeNode from 'TreeNode';

var Parser = {
  getTags: function() {

  },
  stringNode: function(token) {
    Parser.stringStack.push(token);
  },
  getNodeBegin: function(token) {

  },
  getEndNode: function(token) {
    
  },
  buildNode: function() {

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

export default Parser;