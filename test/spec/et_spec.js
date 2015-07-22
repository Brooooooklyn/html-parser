/* global describe, it, expect */
'use strict';

function ETSpec(Parser) {
  describe('Extend function test', function () {
    describe('ET Node compile test', function () {
      it('Simple [#if] compile test', function () {
        var str = `[#if it.isTrue] <div>123</div>[/#if]`;
        var parser = new Parser(str);
      });

    });
  });
}
export {ETSpec};
