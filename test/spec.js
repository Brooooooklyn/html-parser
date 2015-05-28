define(['exports'], function (exports) {
  /* global describe, it, expect */
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function mainSpec(main) {
    var Parser = main;
    describe('public function test', function () {
      describe('AST function test', function () {
        it('Simple div and string compile test', function () {
          var str = '<div>123</div>',
              parser = new Parser(str),
              ast = parser.tokenTree,
              div,
              id,
              root;
          div = ast.root.children[0];
          id = div.$$id;
          root = ast.root;
          expect(root).to.have.property('nodeName');
          expect(root.nodeName).to.equal('root');
          expect(root.children.length).to.equal(1);
          expect(div).to.equal(ast[id]);
          expect(div.children[0].content).to.equal('123');
        });

        it('More tags and string compile test', function () {
          var _str = '<div><span>123</span></div>',
              parser = new Parser(_str),
              ast = parser.tokenTree,
              div,
              id,
              root,
              span,
              str;
          div = ast.root.children[0];
          span = div.children[0];
          str = span.children[0];
          id = div.$$id;
          root = ast.root;
          expect(root).to.have.property('nodeName');
          expect(root.nodeName).to.equal('root');
          expect(root.children.length).to.equal(1);
          expect(div).to.equal(ast[id]);
          expect(str.content).to.equal('123');
        });

        it('Attributes compile test', function () {
          var _str = '<div class= "fool"   id = "sdsd"><span class="in-span item item-icon-left" id="hahaha">123</span></div>',
              parser = new Parser(_str),
              ast = parser.tokenTree,
              div = ast[0],
              span = ast[1],
              divAttributes = div.attributes,
              spanAttributes = span.attributes;
          expect(divAttributes[0].name).to.equal('class');
          expect(divAttributes[0].val).to.equal('fool');
          expect(divAttributes[1].name).to.equal('id');
          expect(divAttributes[1].val).to.equal('sdsd');
          expect(spanAttributes[0].name).to.equal('class');
          expect(spanAttributes[0].val).to.equal('in-span item item-icon-left');
          expect(spanAttributes[1].name).to.equal('id');
          expect(spanAttributes[1].val).to.equal('hahaha');
        });
      });
    });
  }
  exports.mainSpec = mainSpec;
});