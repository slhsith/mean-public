app.filter('capitalize', function() {
  return function(input, scope) {
    if (input) input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  };
});