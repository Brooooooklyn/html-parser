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

        it('More tags and string compile test', function () {
          var _str = '<div class="fool" id="sdsd"><span class="in-span item item-icon-left" id="hahaha">123</span></div>',
              parser = new Parser(_str),
              ast = parser.tokenTree,
              div,
              id,
              root,
              span,
              str;
          console.log(ast);
        });
      });
    });
  }
  exports.mainSpec = mainSpec;
});