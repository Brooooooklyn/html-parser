/* global describe, it, expect */
function mainSpec(main) {
  var parser = main;
  describe('public function test', function () {
    describe('AST function test', function () {
      it('Root node name test', function () {
        var str = '<div>123</div>',
            Ast = parser(str),
            ast = Ast.tokenTree;
        expect(ast.root).to.have.property('nodeName');
        expect(ast.root.nodeName).to.equal('root');
        console.log(Ast);
      });

    });
  });
}
export {mainSpec};