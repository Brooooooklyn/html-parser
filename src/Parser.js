import TreeNode from 'TreeNode';
import Attribute from 'Attribute';
import Utils from 'Utils';
import {transferState} from 'StateMachine';

var nodeStack,
    attrStack,
    commentStack,
    stringStack,
    tokenStack,
    tempStack,
    treeHead,
    $$lastNodeId,
    $$lastId,
    utils;

var utils = new Utils();
var selfClosedTags = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
];

class Parser {
  constructor() {
    this.tokenTree = {
      root: new TreeNode('root', 'root')
    };
    nodeStack = [];
    attrStack = {};
    stringStack = [];
    commentStack = [];
    tokenStack = [];
    tempStack = [];
    treeHead = 'root';
    $$lastNodeId = 'root';
    $$lastId = -1;
    transferState('stringNode', 'html');
  }
  getTags() {
    var tokenTree = this.tokenTree,
        lastNode = tokenTree[$$lastNodeId];
    if(nodeStack.length) {
      nodeStack.unshift('<');
      stringStack = utils.extend(nodeStack);
      nodeStack = [];
    }
    if(stringStack.length) {
      let str = stringStack.join(''),
          node = new TreeNode('string', 3),
          length, lastChild;

      length = lastNode.children.length;
      if(length) {
        lastChild = lastNode.children[length - 1];
        if(lastChild.nodeType === 3) {
          lastChild.content = lastChild.content + str;
        }else {
          node.content = str;
          node.parent = lastNode;
          $$lastId += 1;
          node.$$id = $$lastId;
          tokenTree[$$lastId] = node;
          lastNode.children.push(node);
          lastChild.next = node;
          node.prev = lastChild;
        }
      }else {
        node.content = str;
        node.parent = lastNode;
        $$lastId += 1;
        node.$$id = $$lastId;
        tokenTree[$$lastId] = node;
        lastNode.children.push(node);
      }
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
    let charCode = token.charCodeAt(0);
    //ignore '\n' and blankspace
    if(charCode !== 32 && charCode !== 10) {
      stringStack.push(token);
    }
  }

  getNodeBegin(token) {
    let charCode = token.charCodeAt(0);
    if(
      ((charCode >= 65 && charCode <= 122) ||
      charCode === 45)
    ) {
      nodeStack.push(token);
    }else if(charCode === 34) {
      let attributeVal = tokenStack.join(''),
          lastId = attrStack.lastId,
          attribute = attrStack[lastId];
      attribute.val = attributeVal;
      tokenStack = [];
    }else {
      transferState('stringNode');
      stringStack.push('<' + token);
    }
  }

  getEndNode(token) {
    if(token !== '/') {
      nodeStack.push(token);
    }
  }

  buildNode() {
    var nodeName = nodeStack.join('');
    if(!nodeName) {
      return;
    }
    var node = new TreeNode(nodeName, 1),
        tokenTree = this.tokenTree,
        lastNode = tokenTree[$$lastNodeId],
        length;
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
    node.attributes = attrStack;
    attrStack = {};
    tokenTree[$$lastId] = node;
    $$lastNodeId = $$lastId;
    nodeStack = [];
    /**
     * 如果是自闭和标签，直接闭合
     */
    if(selfClosedTags.indexOf(nodeName) !== -1) {
      $$lastNodeId = lastNode.$$id;
    }
  }

  endNode() {
    var tokenTree = this.tokenTree,
        nodeName = nodeStack.join(''),
        currentNode = tokenTree[$$lastNodeId],
        currentName = currentNode.nodeName,
        parent;
    if(nodeName !== currentName) {
      // console.log(this.tokenTree);
      // console.log(`last node name:  + ${nodeName}`);
      // console.log('current node name: ' + currentName);
      // console.log('Tag\'s begin and tag\'s end not match, ignore this loop.');
    }else {
      nodeStack = [];
      parent = tokenTree[$$lastNodeId].parent;
      $$lastNodeId = parent.$$id;
    }
  }

  getAttributesKeyBegein() {
    let attrName = tokenStack.join(''),
        attr;
    if(!attrName) {
      return;
    }
    attr = new Attribute(attrName);
    attrStack[attrName] = attr;
    attrStack.lastId = attrName;
    tokenStack = [];
  }

  getAttributesKey(token) {
    let charCode = token.charCodeAt(0);
    if(charCode !== 32) {
      tokenStack.push(token);
    }
  }

  getAttributesValBegin(token) {
    if (token !== ' ') {
      let attrName = tokenStack.join(''),
          attr;
      if(!attrName) {
        return;
      }
      attr = new Attribute(attrName);
      attrStack[attrName] = attr;
      attrStack.lastId = attrName;
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
