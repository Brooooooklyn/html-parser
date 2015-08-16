/* global describe, it, expect */
'use strict';

function ETSpec(Parser) {
  describe('Extend function test', function () {
    describe('ET Node compile test', function () {
      it('Simple if compile test', function () {
        var str = `[#if it.isTrue] <div>123</div>[/#if]`;
        var parser = new Parser(str, 'ET');

      });

      it('IF-NODE in attribute compile test', function () {
        var str = `<div class="div [#if it.isTrue]hello[/#if]">123</div>`;
        var parser = new Parser(str, 'ET');

      });

      it('Simple FOR-NODE test', function () {
        var str = `[#for item in it.list]
                    <div class="div hello">123</div>
                   [/#for]`;
        var parser = new Parser(str, 'ET');

      });

      it('Simple VALUE BIND test', function () {
        var str = `<div class="div hello">123{{it.val}}</div>`;
        var parser = new Parser(str, 'ET');

      });

      it('for loop', function() {
        var str = `[#for item, index in it.matrix[it.members[1]]]
                    it is for loop {{index}}
                   [/#for]`;
        var parser = new Parser(str, 'ET');
      });

    });
  });
}
export default ETSpec;
