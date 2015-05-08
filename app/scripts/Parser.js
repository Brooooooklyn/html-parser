import TreeNode from 'TreeNode';

var Parser = {
  getTags: function() {

  },
  stringNode: function(token, pos) {
    
  },
  getNodeBegin: function(token, pos) {

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