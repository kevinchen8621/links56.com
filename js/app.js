var sizeArray = [["151px","170px","105px"],["205px","204px","162px"]];
var HomePage = {
    
    myTimer: function() {
         currentIdx = currentIdx % 3;
         var selector = $("#ssLeftDiv > div").get(currentIdx); 
         var explainObj = $(".flashDiv").get(currentIdx);
         if(selector) { 

             var width = sizeArray[0][currentIdx];
             var height = sizeArray[1][currentIdx];

             var oldtop = $(selector).css("top");
             $(selector).css("top", "+="+height).css({'height': '0px', 'width': '1px'}).show();
             
             $(selector).animate({
                height: height,
                top   : oldtop
              }, 2000, function() {
                      $(this).animate({
                          width: width
                      },1500, function() {
                          $(explainObj).fadeIn("slow").delay(1000);
                          $(explainObj).promise().done(function(){
                                  $(selector).fadeOut(500);
                                  $(explainObj).fadeOut(500);
                          });
                      });
              });
         }
        currentIdx++;
    },
    
    bindFlash: function() {
        var myFlash;
        function startFlashAnimation() {
            HomePage.myTimer();
            myFlash=setInterval(HomePage.myTimer, 5500);
        }
        startFlashAnimation();

        $(".flashDiv").hover(function(e) {
            e.preventDefault();
            window.clearInterval(myFlash);
            $(this).clearQueue().stop();
            $("#ssLeftDiv > div:visible").clearQueue().stop();
            $(this).fadeIn();
            $("#ssLeftDiv > div:visible").fadeIn();
        },function(e) {
            $("#ssLeftDiv > div:visible").fadeOut(500);
            $(this).fadeOut(500);
            startFlashAnimation();
        });
    },
    
    updateClock: function() {
            var currentTime = new Date ( );
            var currentHours = currentTime.getHours ( );
            var currentMinutes = currentTime.getMinutes ( );

            // Choose either "AM" or "PM" as appropriate
            var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

            // Convert the hours component to 12-hour format
            currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

            // Convert an hours component of "0" to "12"
            currentHours = ( currentHours == 0 ) ? 12 : currentHours;

            // Compose the string for display
            var currentTimeString = currentHours + ":" + ((currentMinutes < 10)?"0":"") + currentMinutes;

            $("#timeOfDay").html(timeOfDay);
            $("#clock").html(currentTimeString);
    }
};

var currentIdx = 0;

$(document).ready(function() {
            HomePage.updateClock();
            setInterval(HomePage.updateClock, 1000);
            HomePage.bindFlash();
            
            $("#navigator > li > a").slice(1,3).click(function(){
                $('html, body').animate({
                    scrollTop: $( $.attr(this, 'href') ).offset().top
                }, 'slow');
                return false;
            });
            
            $("#navigator>li").hover(function() {
                var selector = $(this).data("toggle");
                selector && $(selector).slideDown();
            },function() {
                var selector = $(this).data("toggle");
                selector && $(selector).hide();
            });
            $("#zhaopinDiv").mouseenter(function(){
                !$(this).is(":visible") && $(this).show();
            }).mouseleave(function() {
                $(this).is(":visible") && $(this).slideUp();
            });
            
            $("#shipmentDiv a").hover(function(e) {
                e.preventDefault();
                var selector = $(this).data("toggle");
                $(selector).show();
            }, function(e) {
                var selector = $(this).data("toggle");
                $(selector).hide();
            });
            
            $("#imgDiv>div").mouseenter(function() {
                    var idx = $("#imgDiv>div").index(this);
                    $("#shipmentDiv li").eq(idx).children("a").addClass("onfocus");
                    $(this).show();
              }).mouseleave(function() {
                    var idx = $("#imgDiv>div").index(this);
                    $("#shipmentDiv li").eq(idx).children("a").removeClass("onfocus");
                    $(this).hide();
              });
            
            jQuery(window).scroll(function () {
				if (jQuery(this).scrollTop() >=200) {
				 	jQuery("#toTop").fadeIn();
				}
				else {
				 	jQuery("#toTop").fadeOut();
				}
			});
			jQuery("#toTop").click(function() {
				jQuery("html, body").animate({ scrollTop: 0 }, "slow");
				 return false;
			});
});

    'use strict';
    angular.module("myApp",["ui.router","ng-file-upload-shim","ui.bootstrap","ng-file-upload"])
    .factory('authInterceptor', ["$rootScope", "$q", "$window", function ($rootScope, $q, $window) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return response || $q.when(response);
            }
        };
    }])
    .filter("filterVideos", ["$window",function($window) {
          return function(items, cat) {
            if(cat == ""){
              return $window._.filter(items, function(item){ return item.cats.length == 0; });
            }else{
              return $window._.filter(items, function(item){ return item.cats.indexOf(cat) > -1; });
            }
          };
    }])
    .filter("filterSubCats", ["$window",function($window) {
          return function(items, pid) {
            var result = $window._.filter(items, function(item){return item.parent == pid;});
            return result;
          };
    }])
    .filter("subCats", ["$window",function($window) {
          return function(items) {
            var result = $window._.filter(items, function(item){return item.parent == "";});
            return result;
          };
    }])
    .config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state("sys", {url:'/sys', templateUrl: 'tpl/sys', controller:"SysCtl"})
        .state("balance", {url:'/balance', templateUrl: 'tpl/balance', controller:"BalanceCtl"})
        .state("video", {url:'/video', templateUrl: 'tpl/m_video', controller:"VideoCtl"})
        .state("article", {url:'/article', templateUrl: 'tpl/m_article', controller:"ArticleCtl"})
        .state("cat", {url:'/cat', templateUrl: 'tpl/m_cat', controller:"CatCtl"})
        .state("dashboard", {url:'/', templateUrl: 'tpl/dashboard', controller:"DashboardCtl"});
       $httpProvider.interceptors.push('authInterceptor');

    }])
    .controller("DashboardCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
      $scope.alipayurl = "https://mapi.alipay.com/gateway.do";

      $scope.buy = function(level){
        var parameter = {
          total_fee : 2380,
          subject : "VIP会员",
          body : "钱路书院VIP会员年费"
        };
            $http.post('/api/alipay/create_direct_pay_by_user_location/qianlushuyuan', parameter).success(function(data){
              $window.location.href = data.location;
            });
      };

    }])
    .controller("BalanceCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
      $scope.totalIncome = 0;
      $scope.totalOutcome = 0;
      $scope.totalPromotion = 0;
          $http.get('/api/myalipay/qianlushuyuan', $scope.parameter).success(function(data){
            $scope.alipay = data.alipay;
            $scope.alipay.forEach(function(item){
              $scope.totalOutcome += item.total_fee;
            });
          });

    }])
    .controller("CatCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
      $scope.newCat = function(){
        $scope.curCat = {parent:"",title:"",type:"video",face:"",key:"",_id:"",description:""};
      }
      $scope.newCat();
      $scope.editCat = function(cat){
        $scope.curCat = cat;
        console.log(cat);
        console.log($scope.curCat);
      }
      function getNewkey(pkey){
        var tmp, comkey, key = "1" + pkey + "00"; 
        $rootScope.cats.forEach(function(cat){
          comkey = "1" + cat.key; 
          if(key < comkey){key = comkey;}
        });
        tmp = +key + 1;
        return tmp.toString().substr(1);
      }
      $scope.saveCat = function(){
        curCat.key == curCat.key? curCat : getNewkey;
        $http.post("/api/cat", $scope.curCat).success(function(){
          $scope.msg = "分类信息 " + curCat.title + "已保存";
          $scope.newCat();
        });
      }
    }])     
    .controller("VideoCtl",["$scope","$rootScope","$http","$window",'$timeout', '$upload',function($scope,$rootScope,$http,$window,$timeout,$upload){
      var uploader = $scope.uploader = new FileUploader({url: '/api/upload/video'});
      uploader.filters.push({
          name: 'customFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              return this.queue.length < 10;
          }
      });
      uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
          console.info('onWhenAddingFileFailed', item, filter, options);
      };
      uploader.onAfterAddingFile = function(fileItem) {
          console.info('onAfterAddingFile', fileItem);
      };
      uploader.onAfterAddingAll = function(addedFileItems) {
          console.info('onAfterAddingAll', addedFileItems);
      };
      uploader.onBeforeUploadItem = function(item) {
          console.info('onBeforeUploadItem', item);
      };
      uploader.onProgressItem = function(fileItem, progress) {
          console.info('onProgressItem', fileItem, progress);
      };
      uploader.onProgressAll = function(progress) {
          console.info('onProgressAll', progress);
      };
      uploader.onSuccessItem = function(fileItem, response, status, headers) {
          console.info('onSuccessItem', fileItem, response, status, headers);
      };
      uploader.onErrorItem = function(fileItem, response, status, headers) {
          console.info('onErrorItem', fileItem, response, status, headers);
      };
      uploader.onCancelItem = function(fileItem, response, status, headers) {
          console.info('onCancelItem', fileItem, response, status, headers);
      };
      uploader.onCompleteItem = function(fileItem, response, status, headers) {
          console.info('onCompleteItem', fileItem, response, status, headers);
      };
      uploader.onCompleteAll = function() {
          console.info('onCompleteAll');
      };

      console.info('uploader', uploader);     

      $scope.selection = [ ];
      $scope.toggleSelection = function toggleSelection(item) {
        item.selected = item.selected ? false : true;
      }
      $scope.setCat = function(cat){
        var addIds = [ ], delIds = [ ];
        $rootScope.videos.forEach(function(item){
          if(item.selected){
            var idx = item.cats.indexOf(cat.key);
              if (idx > -1) {
                item.cats.splice(idx, 1);
                delIds.push(item._id);
              }else{
                item.cats.push(cat.key);
                addIds.push(item._id);
              }
              item.selected = false;
          }
        });       
      };
      $scope.curCat = "";
      $scope.selCat = function(cat){
        $scope.curCat = cat;
      }
      $scope.getCatTitle = function(key){
        if(key == ""){ return "未分类";}
        for(var i = 0;i < $rootScope.cats.length;i++){
          if($rootScope.cats[i].key == key){
            return $rootScope.cats[i].title;
            break;
          }
        }
      }
          $scope.submit = function(){
            if($rootScope.videos){
              $http.post('/api/videos', {videos: $rootScope.videos}).success(function(){
                $scope.msg = "变动已提交！";
              });
            }
          }
          $scope.reset = function(){
            $http.get('/api/videos').success(function(data){
              $rootScope.site = data;
              $rootScope.catkeys = $window._.keys($rootScope.cats);
            });
          }

    }])
    .controller("SysCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
      $scope.resetCatInfo = function(){
        $scope.newCat = "";
        $scope.newSub = "";
      }
      $scope.resetCatInfo();
      $scope.saveCatInfo = function(){
        var tags = $scope.newSub.replace(/[\s\n\t\r]+/g,"").replace(/，/g,",").split(',');
        $rootScope.cats[$scope.newCat] = tags;
      }
      $scope.removeCat = function(cat){
        delete $rootScope.cats[cat];
        Angular.forEach($scope.site.videolst, function(item){
          item.props = $window._.filter(item.props, function(p){ return p.cat !==  cat; });
        });
            $http.post('/api/site', $scope.site).success(function(){
              $scope.msg = "变动已提交！";
            });
          }
    }])
    .run(['$rootScope', '$location', '$window', '$http', function ($rootScope, $location, $window, $http) {
      if($window.sessionStorage && $window.sessionStorage.token){
        $http.get('/api/me').success(function(data){
          if(data.error){
            delete $window.sessionStorage.token;
            $window.location.href = "/sign";
          }else{
            $rootScope.user = data;
                $http.get('/api/site?attachments=slides,cats,videos').success(function(data){
                  $rootScope.site = data.site;
                  $rootScope.slides = data.slides;
                  $rootScope.cats = data.cats;
                  $rootScope.videos = data.videos;
                  console.log($rootScope.videos);
                });
          }
        }).error(function(){
          delete $window.sessionStorage.token;
          $window.location.href = "/sign";
        });
      }else{
        $window.location.href = "/sign";
      }

      $rootScope.getCatIndent = function(cat){
        return cat.parent.replace(/\d/g,'-');
      }

    }]);
    
