define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  /* global describe, it */
  function mainSpec() {
    return describe('public function test', function () {
      describe('core function test', function () {
        it('version should be 0.1.0', function () {});
      });

      describe('utils function test', function () {});
    });
  }
  exports.mainSpec = mainSpec;
});