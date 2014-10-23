'use strict';

mo.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
		.state("f", {abstract: true, templateUrl: 'tpl/f/layout', controller:"FCtl"})
		.state("f.home", {url:'/',  templateUrl: 'tpl/f/home', controller:"FHomeCtl"})
		.state("f.jobs", {url:'/jobs',  templateUrl: 'tpl/f/jobs', controller:"FJobCtl"})
		.state("f.job", {url:'/job/:id',  templateUrl: 'tpl/f/job', controller:"FJobCtl"})
		.state("f.contact", {url:'/contact',  templateUrl: 'tpl/f/contact', controller:"FContactCtl"})
		.state("b", {abstract:true, url:'/b',  templateUrl: 'tpl/b/layout', controller:"BCtl"})
		.state("b.home", {url:'/home',  templateUrl: 'tpl/b/home', controller:"BHomeCtl"})
		.state("b.service", {abstract:true, url:'/service',  templateUrl: 'tpl/b/service', controller:"BServiceCtl"})
		.state("b.service.callcenter", {url:'/callcenter',  templateUrl: 'tpl/b/service.callcenter', controller:"BServiceCallcenterCtl"})
		.state("b.service.solution", {url:'/solution',  templateUrl: 'tpl/b/service.solution', controller:"BServiceSolutionCtl"})
		.state("b.operate", {abstract:true, url:'/operate',  templateUrl: 'tpl/b/operate', controller:"BOperateCtl"})
		.state("b.operate.home", {url:'/home',  templateUrl: 'tpl/b/operate.home', controller:"BOperateCtl"})
		.state("b.operate.dispatch", {url:'/dispatch',  templateUrl: 'tpl/b/operate.dispatch', controller:"BOperateCtl"})
		.state("b.operate.status", {url:'/status',  templateUrl: 'tpl/b/operate.status', controller:"BOperateCtl"})
		.state("b.finance", {abstract:true, url:'/finance',  templateUrl: 'tpl/b/finance', controller:"BFinanceCtl"})
		.state("b.finance.home", {url:'/home',  templateUrl: 'tpl/b/finance.home', controller:"BFinanceCtl"})
		.state("b.finance.account", {url:'/account',  templateUrl: 'tpl/b/finance.account', controller:"BFinanceCtl"})
		.state("b.finance.operate", {url:'/operate',  templateUrl: 'tpl/b/finance.operate', controller:"BFinanceCtl"})
		.state("b.finance.statement", {url:'/statement',  templateUrl: 'tpl/b/finance.statement', controller:"BFinanceCtl"})
		.state("b.analyse", {abstract:true, url:'/analyse',  templateUrl: 'tpl/b/analyse', controller:"BAnalyseCtl"})
		.state("b.analyse.home", {url:'/home',  templateUrl: 'tpl/b/analyse.home', controller:"BAnalyseCtl"})
		.state("b.analyse.profit", {url:'/profit',  templateUrl: 'tpl/b/analyse.profit', controller:"BAnalyseCtl"})
		.state("b.analyse.risk", {url:'/risk',  templateUrl: 'tpl/b/analyse.risk', controller:"BAnalyseCtl"})
		.state("b.analyse.market", {url:'/market',  templateUrl: 'tpl/b/analyse.market', controller:"BAnalyseCtl"})
		.state("b.analyse.cost", {url:'/cost',  templateUrl: 'tpl/b/analyse.cost', controller:"BAnalyseCtl"})
		.state("b.dic", {abstract:true, url:'/dic',  templateUrl: 'tpl/b/dic', controller:"BDicCtl"})
		.state("b.dic.cust", {url:'/cust',  templateUrl: 'tpl/b/dic.cust', controller:"BDicCustCtl"})
		.state("b.dic.custaddr", {url:'/custaddr',  templateUrl: 'tpl/b/dic.custaddr', controller:"BDicCustAddrCtl"})
		.state("b.dic.custmem", {url:'/custmem',  templateUrl: 'tpl/b/dic.custmem', controller:"BDicCustMemCtl"})
		.state("b.dic.service", {url:'/service',  templateUrl: 'tpl/b/dic.service', controller:"BDicCtl"})
		.state("b.dic.request", {url:'/request',  templateUrl: 'tpl/b/dic.request', controller:"BDicCtl"})
		.state("b.dic.partner", {url:'/partner',  templateUrl: 'tpl/b/dic.partner', controller:"BDicCtl"})
		.state("b.site", {abstract:true, url:'/site',  templateUrl: 'tpl/b/site', controller:"BSiteCtl"})
		.state("b.site.home", {url:'/home',  templateUrl: 'tpl/b/site.home', controller:"BSiteCtl"})
		.state("b.site.cat", {url:'/cat',  templateUrl: 'tpl/b/site.cat', controller:"BSiteCtl"})
		.state("b.site.job", {url:'/job',  templateUrl: 'tpl/b/site.job', controller:"BSiteCtl"})
		.state("b.site.d3", {url:'/d3',  templateUrl: 'tpl/b/site.d3', controller:"BSiteCtl"})
		.state("b.office", {abstract:true, url:'/office',  templateUrl: 'tpl/b/office', controller:"BOfficeCtl"})
		.state("b.office.sns", {url:'/sns',  templateUrl: 'tpl/b/office.sns', controller:"BOfficeCtl"})
		.state("b.office.kbs", {url:'/kbs',  templateUrl: 'tpl/b/office.kbs', controller:"BOfficeCtl"})
		.state("b.office.bbs", {url:'/bbs',  templateUrl: 'tpl/b/office.bbs', controller:"BOfficeCtl"})
	$httpProvider.interceptors.push('authInterceptor');
}])
.controller("AppCtl",["$state", function($state){
	$state.transitionTo('f.home');
}])
.controller("FCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("FHomeCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){

}])
.controller("FJobCtl",["$scope","$rootScope","$window", function($scope,$rootScope,$window){
	$scope.curJobCat =  "";
	$scope.curJobId =  $rootScope.toParams.id || "";
	$scope.setJobCat = function(cat){
		$scope.curJobCat = cat;
	}
}])
.controller("FContactCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){

}])
.controller("SignCtl",["$scope","$rootScope","$http","$window","$state", function($scope,$rootScope,$http,$window,$state){
	if($rootScope.user){$state.go("b.home");}
	$scope._id="";
	$scope.username="";
	$scope.password="";
	$scope.sms="";
	$scope.smsCaption="发送验证码";
	$scope.smsDisable = false;
	$scope.interval = 60;
	$scope.rememberme = false;
	$scope.activeBox = "signup-box";
	$scope.show_box = function(box){
		$scope.activeBox = box;
	};
	function leftCount(){
		$scope.interval--;
		if($scope.interval < 0){
			$scope.smsCaption = "发送验证码";
			$scope.smsDisable = false;
		}else{
			$scope.smsCaption = $scope.interval + " 秒后再次发送";
			$scope.smsDisable = true;
			$timeout(leftCount, 1000);
		}
	}
	$scope.sendSms = function(){
		//这里调用sms发送验证码
		$http.post('/api/signsms',{_id:$scope._id, org:'钱路书院'}).success(function(data){
			//这里设定倒计时
			$scope.interval = 6;
			leftCount();	
		})
	};
	$scope.signup = function(){
		$http.post('/api/signup',{_id:$scope._id, username:$scope.username, sms:$scope.sms, password:$scope.password}).success(function(data){
			console.log(data);
			if(data.error){
				$scope.msg = data.error;
			}else{
				$rootScope.user = data.user;
				$window.sessionStorage.token = data.token;
				$window.sessionStorage.user = JSON.stringify(data.user);
				$state.go("b.home");
			}
		})
	};
	$scope.signin = function(){
		$http.post('/api/signin',{username:$scope.username, password:$scope.password}).success(function(data){
			console.log(data);
			if(data.error){
				$scope.msg = data.error;
			}else{
				$rootScope.user = data.user;
				var storage = $scope.rememberme ? $window.localStorage : $window.sessionStorage;
				storage.token = data.token;
				storage.user = JSON.stringify(data.user);
				$state.go('b.home');
			}
		})
	}
	$scope.forget = function(){
		$http.forget('/api/forget',{username:$scope.username, password:$scope.password}).success(function(data){
			console.log(data);
			if(data.error){
				$scope.msg = data.error;
			}else{
				$window.sessionStorage.token = data.token;
				$state.go('b.home');
			}
		})
	}
}])
.controller("BCtl",["$scope", "$rootScope","$state", function($scope,$rootScope,$state){
	if(!$rootScope.user){$state.go("f.sign");}
	$scope.summary = {
		orders_count_latest: 0,
		orders_money_latest: 0,
		orders_count_top: 0,
		orders_money_top: 0,
		waybills_count_latest: 0,
		waybills_count_top: 0,
		waybills_count_get: 0,
		waybills_progress_get: 0,
		waybills_isincrease_get: false,
		waybills_count_carry: 0,
		waybills_progress_carry: 0,
		waybills_isincrease_carry: false,
		waybills_count_warehouse: 0,
		waybills_progress_warehouse: 0,
		waybills_isincrease_warehouse: false,
		waybills_count_finance: 0,
		waybills_rate_well:100,
	};
	$scope.customer_derivatives = [
		{org_name:"客户1", slope: 0.34, derivative:-0.23, suggest:"深入整合"},
		{org_name:"客户1", slope: 0.34, derivative:-0.23, suggest:"深入整合"},
		{org_name:"客户1", slope: 0.34, derivative:-0.23, suggest:"深入整合"},
		{org_name:"客户1", slope: 0.34, derivative:-0.23, suggest:"深入整合"},
		{org_name:"客户1", slope: 0.34, derivative:-0.23, suggest:"深入整合"},
	];
	$scope.tasks = [
		{title:"飞利浦 上海发武汉 30吨棉花 需报价！", progress: 30, },
		{title:"飞利浦 上海发武汉 30吨棉花 需报价！", progress: 30, },
		{title:"飞利浦 上海发武汉 30吨棉花 需报价！", progress: 30, },
		{title:"飞利浦 上海发武汉 30吨棉花 需报价！", progress: 30, },
	];
	$scope.alerts = [
		{color:"pink", icon:"comment", title:"您的订单处理已超时！", num:"3"},
		{color:"pink", icon:"comment", title:"您的订单处理已超时！", num:"3"},
		{color:"pink", icon:"comment", title:"您的订单处理已超时！", num:"3"},
		{color:"pink", icon:"comment", title:"您的订单处理已超时！", num:"3"},
	];
	$scope.msgs = [
		{from:{username:"叶辛", avatar:"assets/avatars/avatar.png"}, title:"帮我找几个9米6的车跑洛阳的！", create_at: Date.now()},
		{from:{username:"叶辛", avatar:"assets/avatars/avatar.png"}, title:"帮我找几个9米6的车跑洛阳的！", create_at: Date.now()},
		{from:{username:"叶辛", avatar:"assets/avatars/avatar.png"}, title:"帮我找几个9米6的车跑洛阳的！", create_at: Date.now()},
	];
	$scope.custs = [
		{name: "上海邻客物流有限公司", contact:"刘德华", tel:"13041666292", area:"江苏 南京 浦口区", addr:"化工大道501弄14号"},
		{name: "上海邻客物流有限公司", contact:"刘德华", tel:"13041666292", area:"江苏 南京 浦口区", addr:"化工大道501弄14号"},
		{name: "上海邻客物流有限公司", contact:"刘德华", tel:"13041666292", area:"江苏 南京 浦口区", addr:"化工大道501弄14号"},
		{name: "上海邻客物流有限公司", contact:"刘德华", tel:"13041666292", area:"江苏 南京 浦口区", addr:"化工大道501弄14号"},
		{name: "上海邻客物流有限公司", contact:"刘德华", tel:"13041666292", area:"江苏 南京 浦口区", addr:"化工大道501弄14号"},
		{name: "上海邻客物流有限公司", contact:"刘德华", tel:"13041666292", area:"江苏 南京 浦口区", addr:"化工大道501弄14号"},
	];
	//Socket.connect(host,port,data._id,$rootScope.token);
}])
.controller("BHomeCtl",["$rootScope","$state", function($scope,$rootScope,$state){
	$scope.chartData1 = {
		series: ['Sales', 'Income', '<i>Expense</i>', 'Laptops', 'Keyboards'],
		data: [
			{x: "北京",y: [100, 500, 0]}, {x: "南京",y: [300, 100, 100]}, 
			{x: "成都",y: [351]}, 
			{x: "其他",y: [54, 0, 879]}
		]
	};
	$scope.chartType1 = 'pie';
	$scope.chartConfig1 = {
		labels: false,
		title: "发运地区",
		legend: {display: true,position: 'left'},
		innerRadius: 0
	};
	$scope.chartData2 = {
		series: ['客户1', '客户2', '客户3', '客户4', '客户5'],
		data: [
			{x: "5月",y: [100, 500, 345, 453, 123]}, 
			{x: "6月",y: [300, 100, 100, 200, 300]}, 
			{x: "7月",y: [351, 220, 320, 340, 310]}, 
			{x: "8月",y: [540, 450, 379, 350, 320]},
			{x: "9月",y: [542, 430, 420, 340, 550]},
			{x: "10月",y: [254, 230, 179, 320, 150]},
		]
	};
	$scope.chartType2 = 'line';
	$scope.chartConfig2 = {
		labels: false,
		title: "发运地区",
		legend: {display: true,position: 'left'},
		innerRadius: 0
	};
	$scope.waybills = [
		{title: "上海-武汉，9.6米， 最大20吨，实装13吨", progress: 40, tag: "orange"},
		{title: "上海-武汉，9.6米， 最大20吨，实装13吨", progress: 10, tag: "red"},
		{title: "上海-武汉，9.6米， 最大20吨，实装13吨", progress: 30, tag: "default"},
		{title: "上海-武汉，9.6米， 最大20吨，实装13吨", progress: 80, tag: "blue"},
		{title: "上海-武汉，9.6米， 最大20吨，实装13吨", progress: 90, tag: "grey"},
		{title: "上海-武汉，9.6米， 最大20吨，实装13吨", progress: 50, tag: "green"},
		{title: "上海-武汉，9.6米， 最大20吨，实装13吨", progress: 30, tag: "pink"},
	];
	$scope.carriers = [
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", status:"GPS监控"},
	];
	$scope.tracks = [
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", content:"系统GPS监控，司机13167168586异常偏离行驶路径，请网管及时跟进。"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", content:"系统GPS监控，司机13167168586异常偏离行驶路径，请网管及时跟进。"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", content:"系统GPS监控，司机13167168586异常偏离行驶路径，请网管及时跟进。"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", content:"系统GPS监控，司机13167168586异常偏离行驶路径，请网管及时跟进。"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", content:"系统GPS监控，司机13167168586异常偏离行驶路径，请网管及时跟进。"},
		{_id: "13041666292", realname:"13041666292", avatar:"assets/avatars/avatar.png", reportTime:"20分钟前", content:"系统GPS监控，司机13167168586异常偏离行驶路径，请网管及时跟进。"},
	];
	$scope.bbs = [
		{user:{_id:"13041666292", realname:"陈亮", avatar:"assets/avatars/avatar.png"},content:"今天我手机卡坏掉了，今天我手机卡坏掉了，换了临时号码13066666666，这俩天用零时号码！"},
		{user:{_id:"13041666292", realname:"陈亮", avatar:"assets/avatars/avatar.png"},content:"今天我手机卡坏掉了，今天我手机卡坏掉了，换了临时号码13066666666，这俩天用零时号码！"},
		{user:{_id:"13041666292", realname:"陈亮", avatar:"assets/avatars/avatar.png"},content:"今天我手机卡坏掉了，今天我手机卡坏掉了，换了临时号码13066666666，这俩天用零时号码！"},
		{user:{_id:"13041666292", realname:"陈亮", avatar:"assets/avatars/avatar.png"},content:"今天我手机卡坏掉了，今天我手机卡坏掉了，换了临时号码13066666666，这俩天用零时号码！"},
	];
}])
.controller("BServiceCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
	$scope.custShowMode = 0;
	$scope.changeCustShow = function(){ $scope.custShowMode ++; if($scope.custShowMode > 3){ $scope.custShowMode = 0; } };
}])
.controller("BServiceCallcenterCtl",["$scope","$rootScope","$rest", "$dist", "utils", function($scope,$rootScope,$rest, $dist, utils){
	$scope.distObj = {};
	$scope.cust = {title: "", contact: "", tel: ""};
	$scope.addr = {company: "",distcode: 310115, dist: "上海 上海市 浦东新区",address: "",tel: "",contact: ""};
	$scope.set_distcode = function(distcode){_.extend($scope.distObj, $dist.get_by_code(distcode)); console.log($scope.distObj);};
	$scope.set_distcode($scope.addr.distcode);
	$rest.get_custs(function(custs){$scope.custs = custs;});
	$rest.get_orders(function(orders){$scope.orders = orders;});

	$scope.sel_order = function(order){
		order = order || {type:"整车", title: "",description: "", cust: {}, infos: { from: {}, to: {}, goods:[]}, status:"询价"};
		$scope.order = order;
		$scope.filter_addrs(order.cust._id);
	}
	$scope.filter_addrs = function(cid){
		if(cid){
			$rest.get_addrs_by_owner(cid, function(addrs){
				$scope.addrs = addrs;
			});
		}else{
			$scope.addrs = [ ];
		}
	};
	$scope.sel_cust = function(cust){
		console.log(cust);
		$scope.order.cust = cust;
		$scope.filter_addrs(cust._id);
	};
	$scope.set_cust = function(){
		var cust = {
			type:"货主",
			title: $scope.cust.title || "",
			name: $scope.cust.title || "",
			distcode: "1", 
			dist: "中国",
			address: "",
			contact: $scope.cust.contact || "",
			tel: $scope.cust.tel || "",
			website: "",
			business : "",
			turnover: ""
		};
		$rest.set_cust(cust, function(item){
			$scope.cust = {title: "", contact: "", tel: ""};
			utils.applyToSet($scope.custs, item);
			$scope.order.cust = item;
		});
	};
	$scope.sel_from = function(addr){$scope.order.infos.from = addr;};
	$scope.sel_to = function(addr){$scope.order.infos.to = addr;};
	$scope.del_order_from = function(){$scope.order.infos.from = {};};
	$scope.del_order_to = function(){$scope.order.infos.to = {};};
	$scope.new_goods = function(){
		$scope.goods = {title: "", pkgholder:"", pkgmaterial: "",pkgvolume:"0,0,0",weight:0,piece:1,rmk:""}
	}
	$scope.set_goods = function(){
		if(!$scope.goods.title){return;}
		$scope.goods.piece = +$scope.goods.piece || 1;
		$scope.goods.pkgweight = +$scope.goods.pkgweight || 0;
		var sl = $scope.goods.pkgvolume.split(',');
		if(sl.length == 3){
			$scope.goods.pkgl = +sl[0] || 0;
			$scope.goods.pkgw = +sl[1] || 0;
			$scope.goods.pkgh = +sl[2] || 0;
			$scope.goods.pkgv = $scope.goods.pkgl * $scope.goods.pkgw * $scope.goods.pkgh / 1000000;
			$scope.goods.volume = $scope.goods.piece * $scope.goods.pkgv;
		}else{
			$scope.goods.pkgl =  0;
			$scope.goods.pkgw =  0;
			$scope.goods.pkgh =  0;
			$scope.goods.pkgv = 0;
			$scope.goods.volume = 0;
		}
		$scope.goods.weight = $scope.goods.piece * $scope.goods.pkgweight / 1000;
		$scope.order.infos.goods.push(_.pick($scope.goods,"title","pkgholder","pkgmaterial","pkgl","pkgw","pkgh","pkgv","pkgweight","piece","volume","weight"));
		console.log($scope.order.infos.goods);
		$scope.new_goods();
	}
	$scope.del_goods = function(goods){
		var idx = _.findIndex($scope.order.infos.goods, function(item){return item.title == goods.title;});
		if(idx !== -1){$scope.order.infos.goods.splice(idx, 1);}
	}
	$scope.set_addr = function(){
		$scope.addr.distcode = $scope.distObj.town || $scope.distObj.city || $scope.distObj.province || $scope.distObj.country;
		$scope.addr.dist = $dist.caption_by_code($scope.addr.distcode);
		$scope.addr.owner_id = $scope.order.cust._id;
		$rest.set_addr($scope.addr, function(addr){
			utils.applyToSet($scope.addrs, addr);
			if(!$scope.order.infos.from._id){ $scope.order.infos.from = addr; }
			if(!$scope.order.infos.to._id){ $scope.order.infos.to = addr; }
		});
		$scope.addr = {company: "",distcode: "310115", dist: "上海 上海市 浦东新区",address: "",tel: "",contact: ""};
	}
	$scope.set_order = function(){
		$scope.order.infos.piece = 0; $scope.order.infos.goods.forEach(function(item){$scope.order.infos.piece += item.piece;});
		$scope.order.infos.weight = 0; $scope.order.infos.goods.forEach(function(item){$scope.order.infos.weight += item.weight;});
		$scope.order.infos.volume = 0; $scope.order.infos.goods.forEach(function(item){$scope.order.infos.volume += item.volume;});
		$rest.set_order($scope.order, function(){
			$scope.order = {type:"整车", title: "",description: "", cust: {}, infos: { from: {}, to: {}, goods:[]}, status:"询价"};
		});
	}
	$scope.cancel_order = function(){
		$scope.order.status = "撤销";
		$rest.set_order($scope.order, function(){
			$scope.order = {type:"整车", title: "",description: "", cust: {}, infos: { from: {}, to: {}, goods:[]}, status:"询价"};
		});
	}
	$scope.sel_order();
	$scope.new_goods();
}])
.controller("BServiceSolutionCtl",["$scope","$rootScope","$rest", "$dist", "utils", function($scope,$rootScope,$rest, $dist, utils){
	$rest.get_orders(function(orders){$scope.orders = orders;});
	$rest.get_logistics_cars(function(cars){$scope.cars = cars;});
	$scope.sel_order = function(item){
		$scope.order = item;
		$scope.solution = {
			car: {},
			goods: item.infos.goods,
		};
	};
	$scope.add_solution = function(){
		$scope.order.infos.solutions = $scope.order.infos.solutions || [];
		$scope.order.infos.solutions.push($scope.solution);
		$scope.solution = {
			car: {},
			goods: $scope.order.infos.goods,
		};
	};

}])
.controller("BOperateCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BFinanceCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BAnalyseCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BDicCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BDicCustCtl",["$scope","$rootScope","$rest","$dist","utils", function($scope,$rootScope,$rest,$dist,utils){
	$scope.distObj = {};
	$scope.distObj2 = {};
	$rest.get_custs(function(custs){
		$scope.custs = custs;
	}) ;
	$scope.set_distcode = function(distcode){
		_.extend($scope.distObj, $dist.get_by_code(distcode));
	};
	$scope.sel_cust = function(cust){
		cust = cust || {type:"货主",title: "",name: "",distcode: "310115", dist: "上海 上海市 浦东新区",address: "",tel: "",website: "",business : "",turnover: ""};
		$scope.cust = cust;
		$scope.set_distcode(cust.distcode);
		$scope.filter_addrs(cust._id);
	};
	$scope.set_cust = function(){
		$scope.cust.distcode = $scope.distObj.town || $scope.distObj.city || $scope.distObj.province || $scope.distObj.country;
		console.log($scope.cust.distcode);
		$scope.cust.dist = $dist.caption_by_code($scope.cust.distcode);
		console.log($scope.cust.dist);
		$rest.set_cust($scope.cust, function(cust){
			$scope.cust = cust;
			utils.applyToSet($scope.custs, cust);
		});
	}
	$scope.del_cust = function(cid){
		$rest.del_cust(cid, function(){
			utils.delFromSet($scope.custs, cid);
		});
	}
	$scope.filter_addrs = function(cid){
		if(cid){
			$rest.get_addrs_by_owner(cid, function(addrs){
				$scope.addrs = addrs;
			});
		}else{
			$scope.addrs = [ ];
		}
		$scope.sel_addr();
	};
	$scope.set_distcode2 = function(distcode){
		_.extend($scope.distObj2, $dist.get_by_code(distcode));
	};
	$scope.sel_addr = function(addr){
		addr = addr || {company: "",distcode: "310115", dist: "上海 上海市 浦东新区",address: "",tel: "",contact: ""};
		$scope.addr = addr;
		$scope.set_distcode2(addr.distcode);
	};
	$scope.set_addr = function(){
		$scope.addr.distcode = $scope.distObj2.town || $scope.distObj2.city || $scope.distObj2.province || $scope.distObj2.country;
		$scope.addr.dist = $dist.caption_by_code($scope.addr.distcode);
		$scope.addr.owner_id = $scope.cust._id;
		console.log()
		$rest.set_addr($scope.addr, function(addr){
			$scope.addr = addr;
			utils.applyToSet($scope.addrs, addr);
		});
	}
	$scope.del_addr = function(aid){
		$rest.del_addr(aid, function(){
			utils.delFromSet($scope.addrs, aid);
		});
	}
	$scope.sel_cust();
}])
.controller("BDicCustAddrCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
	$scope.distObj = {};
	$rest.get_custs(function(custs){
		$scope.custs = custs;
	}) ;
	$scope.set_distcode = function(distcode){
		_.extend($scope.distObj, $dist.get_by_code(distcode));
	};
	$scope.sel_addr = function(addr){
		addr = addr || {type:"货主",title: "",name: "",distcode: "310115", dist: "上海 上海市 浦东新区",address: "",tel: "",website: "",business : "",turnover: ""};
		$scope.cust_addr = addr;
		$scope.set_distcode(cust.distcode);
	};
	$scope.sel_cust();
	$scope.set_cust = function(){
		$rest.set_cust_org($scope.cust_org, function(org){
			console.log(org);
			$scope.cust_org = org;
			utils.applyToSet($scope.cust_orgs, org);
		});
	}
}])
.controller("BSiteCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BOfficeCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BD3Ctl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
	$scope.data1 = {
		series: ['Sales', 'Income', '<i>Expense</i>', 'Laptops', 'Keyboards'],
		data: [{
			x: "Sales",
			y: [100, 500, 0],
			tooltip: "this is tooltip"
		}, {
			x: "Not Sales",
			y: [300, 100, 100]
		}, {
			x: "Tax",
			y: [351]
		}, {
			x: "Not Tax",
			y: [54, 0, 879]
		}]
	};

	$scope.data2 = {
		series: ['<em>500</em> Keyboards', '<em>105</em> Laptops', '<em>100</em> TVs'],
		data: [{
			x: "Sales",
			y: [100, 500, 0],
			tooltip: "this is tooltip"
		}, {
			x: "Income",
			y: [300, 100, 100]
		}, {
			x: "Expense",
			y: [351, 50, 25]
		}]
	}

	$scope.chartType = 'bar';

	$scope.config1 = {
		labels: false,
		title: "Products",
		legend: {
			display: true,
			position: 'left'
		},
		innerRadius: 0
	};

	$scope.config2 = {
		labels: false,
		title: "HTML-enabled legend",
		legend: {
			display: true,
			htmlEnabled: true,
			position: 'right'
		},
		lineLegend: 'traditional'
	}
}])
.run(['$rootScope', '$location', '$window', '$http','$state', function ($rootScope, $location, $window, $http, $state) {
	$rootScope.user = JSON.parse($window.sessionStorage.user || $window.localStorage.user || "{}");
	$rootScope.signout = function () {
		delete $rootScope.user;
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.user;
		delete $window.localStorage.token;
		delete $window.localStorage.user;
		$state.transitionTo('s.sign');
	};
	$http.get("/api/site?attachments=jobs,cats").success(function(data){
		angular.forEach(data, function(value, key){
			$rootScope[key] = value;			
		});
	});
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		$rootScope.toState = toState;
		$rootScope.toParams = toParams;
		$rootScope.fromState = fromState;
		$rootScope.fromParams = fromParams;
		$rootScope.bodycss = $rootScope.toState.name.substr(0,2) == 's.' ? "login-layout" : "";
	});
}]);
