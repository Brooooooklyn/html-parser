require.config({
  paths: {
    spec: '../test/spec'
  }
});
require(['spec', 'main'], function(spec, main) {
  for(var test in spec) {
    spec[test](main);
  }
  mocha.run();
});
