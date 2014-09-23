'use strict';

angular.module("app.controllers",[])
.controller("AppCtrl",["$scope","$rootScope","$window",function($scope,$rootScope,$window){
  $scope.admin={layout:"wide",menu:"vertical",fixedHeader:true,fixedSidebar:false};
  $scope.$watch("admin",function(newVal,oldVal){
    return"horizontal"===newVal.menu&&"vertical"===oldVal.menu?void $rootScope.$broadcast("nav:reset"):newVal.fixedHeader===false&&newVal.fixedSidebar===true?(oldVal.fixedHeader===false&&oldVal.fixedSidebar===false&&($scope.admin.fixedHeader=true,$scope.admin.fixedSidebar=true),void(oldVal.fixedHeader===true&&oldVal.fixedSidebar===true&&($scope.admin.fixedHeader=false,$scope.admin.fixedSidebar=false))):(newVal.fixedSidebar===true&&($scope.admin.fixedHeader=true),void(newVal.fixedHeader===false&&($scope.admin.fixedSidebar=false)))
  },true),
  $scope.color={primary:"#1BB7A0",success:"#94B758",info:"#56BDF1",infoAlt:"#7F6EC7",warning:"#F3C536",danger:"#FA7B58"};
  //$rootScope.isAdmin =  $rootScope.currentOrg.owner.id === $rootScope.currentUser.id;
  $rootScope.catdic = {'Illustrate':'静态页面','Article':'文章类别'};
  $rootScope.pluginCaption = function(plugin){
    var dic = {'Illustrate':'静态页面','Article':'文章类别'}
    return dic[plugin];
  };
  $rootScope.isHoldCat = function(cat){
    if(cat.plugin === 'Illustrate' && $window._.contains(['home','contactus','aboutus'], cat.key)){
      return true;
    }
    return false;
  };
  $rootScope.existCat = function(cat){
    return $window._.contains($rootScope.currentTheme.cats, function(item){ return item.key === cat.key && item.plugin === cat.plugin;});
  };
}])
.controller("HeaderCtrl",["$scope",function($scope){
  return $scope.introOptions={
    steps:[
      {element:"#step1",intro:"<strong>Heads up!</strong> You can change the layout here",position:"bottom"},
      {element:"#step2",intro:"Select a different language",position:"right"},
      {element:"#step3",intro:"Runnable task App",position:"left"},
      {element:"#step4",intro:"Collapsed nav for both horizontal nav and vertical nav",position:"right"}
    ]
  }
}])
.controller("NavContainerCtrl",["$scope",function(){}])
.controller("NavCtrl",["$scope","$rootScope","filterFilter","rest",function($scope,$rootScope,filterFilter,rest){  
  console.log($rootScope.currentTheme);
  var tasks;
  tasks=$scope.tasks=[],
  $scope.taskRemainingCount=filterFilter(tasks,{completed:false}).length,
  $scope.$on("taskRemaining:changed",function(event,count){return $scope.taskRemainingCount=count})
  
}])
.controller("DashboardCtrl",["$scope",function(){}])
.controller("SiteListCtrl",["$scope","$rootScope","$filter","$stateParams","rest",function($scope,$rootScope,$filter,$stateParams,rest){
  $scope.searchKeywords="",
  $scope.sites=[],
  $scope.filteredSites=[],
  $scope.row="",
  $scope.selectPage=function(page){
    console.log(page);
    var end,start;
    start=(page-1)*$scope.numPerPage,
    end=start+$scope.numPerPage,
    $scope.currentPageSites=$scope.filteredSites.slice(start,end)
  },
  $scope.onFilterChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1,
    $scope.row=""
  },
  $scope.onNumPerPageChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.onOrderChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.search=function(){
    $scope.filteredSites=$filter("filter")($scope.sites,$scope.searchKeywords),
    $scope.onFilterChange()
  },
  $scope.order=function(rowName){
    $scope.row!==rowName?($scope.row=rowName,$scope.filteredSites=$filter("orderBy")($scope.sites,rowName),$scope.onOrderChange()):void 0
  };
  $scope.remove=function(site){
    rest.org.save({op:"remove"}, site, function(ret){
      if(ret.success){
        $rootScope._.remove($scope.sites, function(item){ return item.subdomain === site.subdomain; });
        $scope.search();
        logger.logSuccess('站点: "' + site.name + '[' + site.subdomain + ']" 已删除');
      }else{
        logger.logWarning('站点: "' + site.name + '[' + site.subdomain + ']" 无法删除,' + ret.error);
      }
    });
  };
  $scope.numPerPageOpt=[3,5,10,20];
  $scope.numPerPage=$scope.numPerPageOpt[2];
  $scope.currentPage=1;
  $scope.currentPageSites=[];
  $scope.sites = rest.org.query({op:"lstbyowner"},function(){
    $scope.search(),$scope.selectPage($scope.currentPage)
  }); 
}])
.controller("SiteEditCtrl",["$scope","$filter","$stateParams","rest",function($scope,$filter,$stateParams,rest){
  $scope.themes = ['highland'];
  var id = $stateParams.id || '';
  if(id){
    getSite(id);
  }else{
    newSite();
  }

  function getSite(id){
    $scope.site = rest.org.get({op:"onebyid",id:id}, function(){
    });
    $scope.editCaption = "修改网站";
  };

  function newSite(){
    $scope.site = {name:''};
    $scope.editCaption = "新建网站";
  };

  $scope.save=function(){
    console.log($scope.site);
    rest.org.save({op:"save"},$scope.site,function(doc){
      newSite();
    });
  };
}])
.controller("ThemeListCtrl",["$scope","$rootScope","$filter","$stateParams","rest",function($scope,$rootScope,$filter,$stateParams,rest){
  $scope.searchKeywords="",
  $scope.themes=[],
  $scope.filteredThemes=[],
  $scope.row="",
  $scope.selectPage=function(page){
    console.log(page);
    var end,start;
    start=(page-1)*$scope.numPerPage,
    end=start+$scope.numPerPage,
    $scope.currentPageThemes=$scope.filteredThemes.slice(start,end)
  },
  $scope.onFilterChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1,
    $scope.row=""
  },
  $scope.onNumPerPageChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.onOrderChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.search=function(){
    $scope.filteredThemes=$filter("filter")($scope.themes,$scope.searchKeywords),
    $scope.onFilterChange()
  },
  $scope.order=function(rowName){
    $scope.row!==rowName?($scope.row=rowName,$scope.filteredThemes=$filter("orderBy")($scope.themes,rowName),$scope.onOrderChange()):void 0
  };
  $scope.remove=function(theme){
    rest.theme.save({op:"remove"}, theme, function(ret){
      if(ret.success){
        $rootScope._.remove($scope.themes, function(item){ return item.name === theme.name; });
        $scope.search();
        logger.logSuccess('风格: "' + theme.name + '已删除');
      }else{
        logger.logWarning('风格: "' + theme.name + ' 无法删除,' + ret.error);
      }
    });
  };
  $scope.numPerPageOpt=[3,5,10,20];
  $scope.numPerPage=$scope.numPerPageOpt[2];
  $scope.currentPage=1;
  $scope.currentPageSites=[];
  $scope.themes = rest.theme.query({op:"lstall"},function(){
    $scope.search(),$scope.selectPage($scope.currentPage)
  }); 
}])
.controller("ThemeEditCtrl",["$scope","$filter","$stateParams","rest",function($scope,$filter,$stateParams,rest){
  var id = $stateParams.id || '';
  if(id){
    getTheme(id);
  }else{
    newTheme();
  }

  function getTheme(id){
    $scope.theme = rest.theme.get({op:"onebyid",id:id}, function(){
    });
    $scope.editCaption = "修改风格";
  };

  function newTheme(){
    $scope.theme = {name:''};
    $scope.editCaption = "新建风格";
  };

  $scope.save=function(){
    console.log($scope.theme);
    rest.theme.save({op:"save"},$scope.theme,function(doc){
      newTheme();
    });
  };
}])
.controller("ArticleListCtrl",["$scope","$filter","$stateParams","rest",function($scope,$filter,$stateParams,rest){
  $scope.cat = $stateParams.cat || '';
  $scope.searchKeywords="",
  $scope.articles=[],
  $scope.filteredArticles=[],
  $scope.row="",
  $scope.selectPage=function(page){
    var end,start;
    start=(page-1)*$scope.numPerPage,
    end=start+$scope.numPerPage,
    $scope.currentPageArticles=$scope.filteredArticles.slice(start,end)
  },
  $scope.onFilterChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1,
    $scope.row=""
  },
  $scope.onNumPerPageChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.onOrderChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.search=function(){
    $scope.filteredArticles=$filter("filter")($scope.articles,$scope.searchKeywords),
    $scope.onFilterChange()
  },
  $scope.order=function(rowName){
    $scope.row!==rowName?($scope.row=rowName,$scope.filteredArticles=$filter("orderBy")($scope.articles,rowName),$scope.onOrderChange()):void 0
  };
  $scope.numPerPageOpt=[3,5,10,20];
  $scope.numPerPage=$scope.numPerPageOpt[2];
  $scope.currentPage=1;
  $scope.currentPageArticles=[];
  $scope.articles = rest.article.query({op:"lstbycat",cat:$scope.cat},function(){
    $scope.search(),$scope.selectPage($scope.currentPage)
  }); 
}])
.controller("ArticleEditCtrl",["$scope","$filter","$stateParams","rest",function($scope,$filter,$stateParams,rest){
  $scope.cat = $stateParams.cat || '';
  var id = $stateParams.id || '';
  if(id){
    getArticle(id);
  }else{
    newArticle();
  }

  function getArticle(id){
    $scope.article = rest.article.get({op:"onebyid",id:id}, function(){
    });
    $scope.editCaption = "修改文章";
  };

  function newArticle(){
    $scope.article = {cat: $scope.cat, name:'', brief:'', info: '', face: '', priority: 50};
    $scope.editCaption = "新建文章";
  };

  $scope.save=function(){
    rest.article.save({op:"save"},$scope.article,function(doc){
      newArticle();
    });
  };
}])
.controller("IllustrateListCtrl",["$scope", "$rootScope", "$filter","$stateParams", "$window", "rest",function($scope, $rootScope, $filter,$stateParams,$window,rest){
  $scope.illustrates = $window._.filter($rootScope.currentTheme.cats, function(item){ return item.plugin === 'Illustrate'});
  $scope.searchKeywords="",
  $scope.filteredIllustrates=[],
  $scope.row="",
  $scope.selectPage=function(page){
    var end,start;
    start=(page-1)*$scope.numPerPage,
    end=start+$scope.numPerPage,
    $scope.currentPageIllustrates=$scope.filteredIllustrates.slice(start,end)
  },
  $scope.onFilterChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1,
    $scope.row=""
  },
  $scope.onNumPerPageChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.onOrderChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.search=function(){
    $scope.filteredIllustrates=$filter("filter")($scope.illustrates,$scope.searchKeywords),
    $scope.onFilterChange()
  },
  $scope.order=function(rowName){
    $scope.row!==rowName?($scope.row=rowName,$scope.filteredStatics=$filter("orderBy")($scope.illustrates,rowName),$scope.onOrderChange()):void 0
  };
  $scope.numPerPageOpt=[3,5,10,20];
  $scope.numPerPage=$scope.numPerPageOpt[2];
  $scope.currentPage=1;
  $scope.currentPageIllustrates=[];
  $scope.search();
  $scope.selectPage($scope.currentPage);
}])
.controller("IllustrateEditCtrl",["$scope","$rootScope","$filter","$stateParams","$window","rest",function($scope,$rootScope,$filter,$stateParams,$window,rest){
  var id = $stateParams.id || '';
  if(id){
    getIllustrate(id);
  }else{
    newIllustrate();
  }

  function getIllustrate(id){
    $scope.illustrate =  $window._.find($rootScope.currentTheme.cats, function(item){ return item.plugin === 'Illustrate' && item.name === id});
    $scope.editCaption = "修改页面";
  };

  function newIllustrate(){
    $scope.illustrate = {plugin:'Illustrate', name:'', info:'', inmenu:true, priority: 50};
    $scope.editCaption = "新建页面";
  };

  $scope.save=function(){
    $rootScope.currentTheme = rest.theme.sabve({op:"savecat"}, $scope.illustrate);
    newIllustrate();
  };
}])
.controller("CatListCtrl",["$scope","$rootScope","$filter","$stateParams","$state","logger", "$window", "rest",function($scope,$rootScope,$filter,$stateParams,$state,logger,$window,rest){
  $scope.plugin = $stateParams.plugin || '';
  $scope.title = $rootScope.catdic[$scope.plugin];
  $scope.cats = $window._.filter($rootScope.currentTheme.cats, function(item){ return item.plugin === $scope.plugin});
  $scope.searchKeywords="",
  $scope.filteredCats=[],
  $scope.row="",
  $scope.selectPage=function(page){
    var end,start;
    start=(page-1)*$scope.numPerPage,
    end=start+$scope.numPerPage,
    $scope.currentPageCats=$scope.filteredCats.slice(start,end)
  },
  $scope.onFilterChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1,
    $scope.row=""
  },
  $scope.onNumPerPageChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.onOrderChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.search=function(){
    $scope.filteredCats=$filter("filter")($scope.cats,$scope.searchKeywords),
    $scope.onFilterChange()
  },
  $scope.order=function(rowName){
    $scope.row!==rowName?($scope.row=rowName,$scope.filteredCats=$filter("orderBy")($scope.cats,rowName),$scope.onOrderChange()):void 0
  };
  $scope.remove=function(cat){
    rest.theme.save({op:"removecat"}, cat, function(ret){
      if(ret.success){
        $window._.remove($rootScope.currentTheme.cats, function(item){ return item.plugin === cat.plugin && item.key === cat.key; });  
        $window._.remove($scope.cats, function(item){ return item.plugin === cat.plugin && item.key === cat.key; });
        $scope.search();
        logger.logSuccess($scope.title + ': "' + cat.key + '[' + cat.name + ']" 已删除');
      }else{
        logger.logWarning($scope.title + ': "' + cat.key + '[' + cat.name + ']" 无法删除,' + ret.error);
      }
    });
  };
  $scope.numPerPageOpt=[3,5,10,20];
  $scope.numPerPage=$scope.numPerPageOpt[2];
  $scope.currentPage=1;
  $scope.currentPageCats=[];
  $scope.search();
  $scope.selectPage($scope.currentPage);
}])
.controller("CatEditCtrl",["$scope","$rootScope","$filter","$stateParams","logger","$window","rest",function($scope,$rootScope,$filter,$stateParams,logger,$window,rest){
  $scope.plugin = $stateParams.plugin || '';
  $scope.title = $rootScope.catdic[$scope.plugin];
  var key = $stateParams.key || '';
  if(key){
    $scope.isNew = false;
    getCat(key);
  }else{
    $scope.isNew = true;
    newCat();
  }

  function getCat(key){
    $scope.cat =  $window._.find($rootScope.currentTheme.cats, function(item){ return item.plugin === $scope.plugin && item.key === key});
    $scope.editCaption = "修改" + $scope.title;
    $scope.lockkey = $rootScope.isHoldCat($scope.cat);
  };

  function newCat(){
    $scope.cat = {plugin:$scope.plugin, key:'', name:'', tags:[], inmenu:true, priority: 50};
    $scope.editCaption = "新建" + $scope.title;
  };

  $scope.save=function(){
    if($scope.isNew && $rootScope._.contains($rootScope.currentTheme.cats, function(item){return item.key === $scope.cat.key && item.plugin === $scope.cat.plugin;})){
      return logger.logWarning($scope.title + ': "' + cat.key + '[' + cat.name + ']" 已经存在,请在原记录上修改!');
    }
    rest.theme.save({op:"savecat"}, $scope.cat,function(ret){
      if(ret.success){
        var cats = $rootScope.currentTheme.cats;
        _.remove(cats, function(item){ return item.key === $scope.cat.key && item.plugin === $scope.cat.plugin;});
        cats.push($scope.cat);
        $rootScope.currentTheme.cats = cats;
        logger.logSuccess($scope.title + ': "' + $scope.cat.key + '[' + $scope.cat.name + ']" 已提交!');
        newCat();
      }else{
        logger.logWarning($scope.title + ': "' + cat.key + '[' + cat.name + ']" 提交失败,' + ret.error);
      }
    });
  };
}])
.controller("BlockListCtrl",["$scope","$rootScope","$filter","$stateParams", "$window", "rest",function($scope,$rootScope,$filter,$stateParams,$window,rest){
  $scope.blocks = $rootScope.currentTheme.blocks;
  $scope.searchKeywords="",
  $scope.filteredBlocks=[],
  $scope.row="",
  $scope.selectPage=function(page){
    var end,start;
    start=(page-1)*$scope.numPerPage,
    end=start+$scope.numPerPage,
    $scope.currentPageBlocks=$scope.filteredBlocks.slice(start,end)
  },
  $scope.onFilterChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1,
    $scope.row=""
  },
  $scope.onNumPerPageChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.onOrderChange=function(){
    $scope.selectPage(1),
    $scope.currentPage=1
  },
  $scope.search=function(){
    $scope.filteredBlocks=$filter("filter")($scope.blocks,$scope.searchKeywords),
    $scope.onFilterChange()
  },
  $scope.order=function(rowName){
    $scope.row!==rowName?($scope.row=rowName,$scope.filteredBlocks=$filter("orderBy")($scope.cats,rowName),$scope.onOrderChange()):void 0
  };
  $scope.numPerPageOpt=[3,5,10,20];
  $scope.numPerPage=$scope.numPerPageOpt[2];
  $scope.currentPage=1;
  $scope.currentPageBlocks=[];
  $scope.search();
  $scope.selectPage($scope.currentPage);
}])
.controller("BlockEditCtrl",["$scope","$rootScope","$filter","$stateParams","$window","rest",function($scope,$rootScope,$filter,$stateParams,$window,rest){
  var id = $stateParams.id || '';
  if(id){
    getBlock(id);
  }else{
    newBlock();
  }

  function getBlock(id){
    $scope.block =  $window._.find($rootScope.currentTheme.blocks, function(item){ return item.key === id});
    $scope.editCaption = "修改区块";
  };

  function newBlock(){
    $scope.block = {key:'newblock', plugin:'Illustrate', name:'静态内容', qry:{}, sort:{}, limit:5};
    $scope.editCaption = "新建区块";
  };

  $scope.save=function(){
    $rootScope.currentTheme = rest.theme.save({op:"saveblock"}, $scope.block);
    newBlock();
  };
}])