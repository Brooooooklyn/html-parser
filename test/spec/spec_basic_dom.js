/* global describe, it, expect */
'use strict';

function basicSpec(Parser) {
  describe('public function test', function () {
    describe('Basic DOM compile test', function () {
      it('Simple div and string compile test', function () {
        var str = `<div>123</div>`,
            parser = new Parser(str),
            ast = parser.tokenTree,
            div, id, root;
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
            div, id, root, span, str;
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
        var _str = `<div class="fool around and fall  in love" x-ac id = "this-love"></div>`;
        var parser = new Parser(_str),
            ast = parser.tokenTree,
            node = ast[0];
        expect(node.nodeName).to.equal('div');
        expect(node.nodeType).to.equal(1);

        var attributes = node.attributes;
        expect(attributes.class.val).to.equal('fool around and fall  in love');
        expect(attributes['x-ac'].val).to.equal(undefined);
        expect(attributes.id.val).to.equal('this-love');
      });

      it('Complicated Attributes compile test', function () {
        var _str =`<div class= "fool" x-ac id = "sdsd">
                    <span class="in-span item item-icon-left" id="hahaha">123</span>
                    <time data-time="1023120231"></time>
                    <ion-list class="div2">
                      <span><123212></span>
                      <time>22<222</time>
                    </ion-list>
                  </div>`;
        var parser = new Parser(_str),
            ast = parser.tokenTree,
            div = ast[0],
            span = ast[1],
            ion = div.children[2],
            divAttributes = div.attributes,
            spanAttributes = span.attributes;

        expect(divAttributes.class.name).to.equal('class');
        expect(divAttributes.class.val).to.equal('fool');
        expect(divAttributes.id.name).to.equal('id');
        expect(divAttributes.id.val).to.equal('sdsd');
        expect(spanAttributes.class.name).to.equal('class');
        expect(spanAttributes.class.val).to.equal('in-span item item-icon-left');
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
        var _str = `<div class= "fool" id = "sdsd">
                      <!--12121 -->
                      <ion-list class="div2">
                        <span>123212</span>
                        <time>31212312312</time>
                      </ion-list>
                    </div>`;
        var parser = new Parser(_str),
            ast = parser.tokenTree,
            div = ast[0],
            comment = div.children[0];
        expect(comment.nodeType).to.equal(8);
        expect(comment.content).to.equal('12121 ');

        expect(comment.next.$$id).to.equal(2);
        expect(comment.prev).to.equal(null);

      });

      it('Self closed tags test', function() {
        var _str = `<div class="div">
                      <input>
                      321
                      <span>123</span>
                      <br/>
                      <br>
                      <br/>
                    </div>`;
        var parser = new Parser(_str),
            ast = parser.tokenTree,
            div = ast[0],
            input = ast[1];
        expect(div.children.length).to.equal(6);
        expect(div.children[0]).to.equal(input);
        expect(div.children[0].next.nodeType).to.equal(3);
        expect(div.children[0].next.content).to.equal('321');
        expect(div.children[0].next.next).to.equal(ast[3]);

      });

    });
  });
}
export {basicSpec};
