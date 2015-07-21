define(['exports'], function (exports) {
  /* global describe, it, expect */
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function ETSpec(Parser) {
    describe('Extend function test', function () {
      describe('ET Node compile test', function () {
        it('Simple [#if] compile test', function () {
          var str = '<>';
        });
      });
    });
  }
  exports.ETSpec = ETSpec;

  /* global describe, it, expect */
  function basicSpec(Parser) {
    describe('public function test', function () {
      describe('Basic DOM compile test', function () {
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
          var _str = '<div class= "fool" id = "sdsd">\n                    <span class="in-span item item-icon-left" id="hahaha">123</span>\n                    <time data-time="1023120231"></time>\n                    <ion-list class="div2">\n                      <span><123212></span>\n                      <time>22<222</time>\n                    </ion-list>\n                  </div>';
          var parser = new Parser(_str),
              ast = parser.tokenTree,
              div = ast[0],
              span = ast[1],
              ion = div.children[2],
              divAttributes = div.attributes,
              spanAttributes = span.attributes;
          expect(divAttributes['class'].name).to.equal('class');
          expect(divAttributes['class'].val).to.equal('fool');
          expect(divAttributes.id.name).to.equal('id');
          expect(divAttributes.id.val).to.equal('sdsd');
          expect(spanAttributes['class'].name).to.equal('class');
          expect(spanAttributes['class'].val).to.equal('in-span item item-icon-left');
          expect(spanAttributes.id.name).to.equal('id');
          expect(spanAttributes.id.val).to.equal('hahaha');

          expect(ion.nodeName).to.equal('ion-list');
          expect(ion.children.length).to.equal(2);
          expect(ion.children[0].nodeName).to.equal('span');
          expect(ion.children[0].children[0].content).to.equal('<123212>');

          expect(ion.children[1].nodeName).to.equal('time');
          expect(ion.children[1].children[0].nodeType).to.equal(3);
          expect(ion.children[1].children[0].content).to.equal('22<222');
        });

        it('Comment compile test', function () {
          var _str = '<div class= "fool" id = "sdsd">\n                      <!--12121 -->\n                      <ion-list class="div2">\n                        <span>123212</span>\n                        <time>31212312312</time>\n                      </ion-list>\n                    </div>';
          var parser = new Parser(_str),
              ast = parser.tokenTree,
              div = ast[0],
              comment = div.children[0];
          expect(comment.nodeType).to.equal(8);
          expect(comment.content).to.equal('12121 ');

          expect(comment.next.$$id).to.equal(2);
          expect(comment.prev).to.equal(null);
        });

        it('Self closed tags test', function () {
          var _str = '<div class="div">\n                      <input>\n                      321\n                      <span>123</span>\n                    </div>';
          var parser = new Parser(_str),
              ast = parser.tokenTree,
              div = ast[0],
              input = ast[1];

          expect(div.children.length).to.equal(3);
          expect(div.children[0]).to.equal(input);
          expect(div.children[0].next.nodeType).to.equal(3);
          expect(div.children[0].next.content).to.equal('321');
          expect(div.children[0].next.next).to.equal(ast[3]);
        });
      });
    });
  }
  exports.basicSpec = basicSpec;
});