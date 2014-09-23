'use strict';

angular.module("app_front",["ngResource","ngAnimate","ui.router","ui.bootstrap","textAngular"])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state("home", {url:'/', templateUrl: '/tpl/home.html'})
    .state("signin", {url:'/signin', templateUrl: '/tpl/signin.html'})
    .state("signup", {url:'/signup', templateUrl: '/tpl/signup.html'})
    .state("signup", {url:'/signup', templateUrl: '/tpl/signup.html'})
    .state("service", {url:'/service', templateUrl: '/tpl/service.html'})
    .state("request", {url:'/request', abstract:true, templateUrl: '/tpl/request.html'})
    .state("request.ask", {url:'/ask', templateUrl: '/tpl/request.ask.html'})
    .state("request.order", {url:'/order', templateUrl: '/tpl/request.order.html'})
    .state("request.track", {url:'/track', templateUrl: '/tpl/request.track.html'})
    .state("request.book", {url:'/book', templateUrl: '/tpl/request.book.html'})
    .state("company", {url:'/company', abstract:true, templateUrl: '/tpl/company.html'})
    .state("company.about", {url:'/about', templateUrl: '/tpl/company.about.html'})
    .state("company.careers", {url:'/careers', templateUrl: '/tpl/company.careers.html'})
    .state("company.news", {url:'/news', templateUrl: '/tpl/company.news.html'})
    .state("company.contact", {url:'/contact', templateUrl: '/tpl/company.contact.html'})
    .state("site", {url:'/site', abstract:true, templateUrl: '/static/admin/public/abstract.html'})
    .state("site.list", {url:'/list', templateUrl: '/static/admin/site/list.html', controller:'SiteListCtrl'})
    .state("site.edit", {url:'/edit/:id', templateUrl: '/static/admin/site/edit.html', controller:'SiteEditCtrl'})
    .state("theme", {url:'/theme', abstract:true, templateUrl: '/static/admin/public/abstract.html'})
    .state("theme.list", {url:'/list', templateUrl: '/static/admin/theme/list.html', controller:'ThemeListCtrl'})
    .state("theme.edit", {url:'/edit/:id', templateUrl: '/static/admin/theme/edit.html', controller:'ThemeEditCtrl'})
    .state("illustrate", {url:'/illustrate', abstract:true, templateUrl: '/static/admin/public/abstract.html'})
    .state("illustrate.list", {url:'/list', templateUrl: '/static/admin/illustrate/list.html', controller:'IllustrateListCtrl'})
    .state("illustrate.edit", {url:'/edit/:id', templateUrl: '/static/admin/illustrate/edit.html', controller:'IllustrateEditCtrl'})
    .state("cat", {url:'/cat', abstract:true, templateUrl: '/static/admin/public/abstract.html'})
    .state("cat.list", {url:'/list/:plugin', templateUrl: '/static/admin/cat/list.html', controller:'CatListCtrl'})
    .state("cat.edit", {url:'/edit/:plugin/:key', templateUrl: '/static/admin/cat/edit.html', controller:'CatEditCtrl'})
    .state("block", {url:'/block', abstract:true, templateUrl: '/static/admin/public/abstract.html'})
    .state("block.list", {url:'/list', templateUrl: '/static/admin/block/list.html', controller:'BlockListCtrl'})
    .state("block.edit", {url:'/edit/:id', templateUrl: '/static/admin/block/edit.html', controller:'BlockEditCtrl'})
    .state("article", {url:'/article', abstract:true, templateUrl: '/static/admin/public/abstract.html'})
    .state("article.list", {url:'/list/:cat', templateUrl: '/static/admin/article/list.html', controller:'ArticleListCtrl'})
    .state("article.edit", {url:'/edit/:cat/:id', templateUrl: '/static/admin/article/edit.html', controller:'ArticleEditCtrl'})
    .state("article.cats", {url:'/cats', templateUrl: '/static/admin/articlecats.html'})
    .state("article.blocks", {url:'/blocks', templateUrl: '/static/admin/articleblocks.html'})
    .state("org", {url:'/org/:org_id', templateUrl: '/admin/org', controller:'OrgCtrl'})
    .state("org.info", {url:'/info', templateUrl: '/admin/org.info.html', controller:'OrgInfoCtrl'})
    .state("org.nodes", {url:'/nodes', templateUrl: '/admin/org.nodes.html', controller:'OrgNodesCtrl'})
    .state("org.themes", {url:'/themes', templateUrl: '/admin/org.themes.html', controller:'OrgThemesCtrl'})
    .state("org.domain", {url:'/domain', templateUrl: '/admin/org.domain.html', controller:'OrgThemesCtrl'})
}])
.factory('rest', ['$resource', function ($resource) {
  return {
    user: $resource('/api/user/:op',{op:'@op'}),
    org: $resource('/api/org/:op',{op:'@op'}),
    theme: $resource('/api/theme/:op',{op: '@op'}),
    page: $resource('/api/page/:op',{op: '@op'}),
    article: $resource('/api/article/:op',{op: '@op'}),
  };
}])
.run(['$rootScope', '$location', '$window', 'rest', function ($rootScope, $location, $window, rest) {
}])


;
