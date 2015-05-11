require.config({
  paths: {
    spec: './spec'
  }
})
require(['spec'], function(spec) {
  for(var test in spec) {
    spec[test]();
  }
  mocha.run();
});