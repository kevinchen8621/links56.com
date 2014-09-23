angular.module("app.directives",[])
.directive("imgHolder",[function(){
  return{
    restrict:"A",
    link:function(scope,ele){
      return Holder.run({images:ele[0]})
    }
  }
}])
.directive("customPage",function(){
  return{
    restrict:"A",
    controller:["$scope","$element","$location",function($scope,$element,$location){
      var addBg,path;
      path=function(){return $location.path()};
      addBg=function(path){
        switch($element.removeClass("body-wide body-lock"),path){
          case"/404":
          case"/pages/404":
          case"/pages/500":
          case"/pages/signin":
          case"/pages/signup":
          case"/pages/forgot-password":
            return $element.addClass("body-wide");
          case"/pages/lock-screen":
            return $element.addClass("body-wide body-lock")
        }
      };
      addBg($location.path());
      $scope.$watch(path,function(newVal,oldVal){
        return newVal!==oldVal?addBg($location.path()):void 0
      })
    }]
  }
})
.directive("uiColorSwitch",[function(){
  return{
    restrict:"A",
    link:function(scope,ele){
      return ele.find(".color-option").on("click",function(event){
        var $this,hrefUrl,style;
        if($this=$(this),hrefUrl=void 0,style=$this.data("style"),"loulou"===style)
          hrefUrl="styles/main.css",
          $('link[href^="styles/main"]').attr("href",hrefUrl);
        else{
          if(!style)
            return!1;
          style="-"+style,
          hrefUrl="styles/main"+style+".css",
          $('link[href^="styles/main"]').attr("href",hrefUrl)
        }
        return event.preventDefault()
      })
    }
  }
}])
.directive("goBack",[function(){
  return{
    restrict:"A",
    controller:["$scope","$element","$window",function($scope,$element,$window){
      return $element.on("click",function(){
        return $window.history.back()
      })
    }]
  }
}])
.directive('selectAddress', function($http, $q, $compile) {
  var cityURL, delay, templateURL;
  delay = $q.defer();
  templateURL = '/static/admin/template/selectAddress.html';
  cityURL = '/static/admin/template/city.min.js';
  $http.get(cityURL).success(function(data) {
    return delay.resolve(data);
  });
  return {
    restrict: 'A',
    scope: {
      p: '=',
      a: '=',
      c: '=',
      d: '=',
      ngModel: '='
    },
    link: function(scope, element, attrs) {
      var popup;
      popup = {
        element: null,
        backdrop: null,
        show: function() {
          return this.element.addClass('active');
        },
        hide: function() {
          this.element.removeClass('active');
          return event.stopPropagation();
        },
        resize: function() {
          if (!this.element) {
            return;
          }
          this.element.css({
            top: -this.element.height() - 30,
            'margin-left': -this.element.width() / 2
          });
          return false;
        },
        focus: function() {
          $('[ng-model="d"]').focus();
          return false;
        },
        init: function() {
          element.on('click keydown', function() {
            popup.show();
            event.stopPropagation();
            return false;
          });
          $(window).on('click', (function(_this) {
            return function() {
              return _this.hide();
            };
          })(this));
          this.element.on('click', function() {
            return event.stopPropagation();
          });
          return setTimeout((function(_this) {
            return function() {
              _this.element.show();
              return _this.resize();
            };
          })(this), 500);
        }
      };
      return delay.promise.then(function(data) {
        $http.get(templateURL).success(function(template) {
          var $template;
          $template = $compile(template)(scope);
          $('body').append($template);
          popup.element = $($template[2]);
          scope.provinces = data;
          return popup.init();
        });
        scope.aSet = {
          p: function(p) {
            scope.p = p;
            scope.c = null;
            scope.a = null;
            return scope.d = null;
          },
          c: function(c) {
            scope.c = c;
            scope.a = null;
            return scope.d = null;
          },
          a: function(a) {
            scope.a = a;
            scope.d = null;
            return popup.focus();
          }
        };
        scope.clear = function() {
          scope.p = null;
          scope.c = null;
          scope.a = null;
          return scope.d = null;
        };
        scope.submit = function() {
          return popup.hide();
        };
        scope.$watch('p', function(newV) {
          var v, _i, _len, _results;
          if (newV) {
            _results = [];
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              v = data[_i];
              if (v.p === newV) {
                _results.push(scope.cities = v.c);
              }
            }
            return _results;
          } else {
            return scope.cities = [];
          }
        });
        scope.$watch('c', function(newV) {
          var v, _i, _len, _ref, _results;
          if (newV) {
            _ref = scope.cities;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              v = _ref[_i];
              if (v.n === newV) {
                _results.push(scope.dists = v.a);
              }
            }
            return _results;
          } else {
            return scope.dists = [];
          }
        });
        return scope.$watch(function() {
          scope.ngModel = '';
          if (scope.p) {
            scope.ngModel += scope.p;
          }
          if (scope.c) {
            scope.ngModel += " " + scope.c;
          }
          if (scope.a) {
            scope.ngModel += " " + scope.a;
          }
          if (scope.d) {
            scope.ngModel += " " + scope.d;
          }
          return popup.resize();
        });
      });
    }
  };
});
