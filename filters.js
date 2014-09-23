angular.module("app.filters",[])
.filter('caption', function () {
  return function (input) {
    var result = input.split('.').pop();
    return result;
  };
});
