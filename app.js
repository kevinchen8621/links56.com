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
		.state("b.service.callcenter", {url:'/callcenter',  templateUrl: 'tpl/b/service.callcenter', controller:"BServiceCtl"})
		.state("b.service.solution", {url:'/solution',  templateUrl: 'tpl/b/service.solution', controller:"BServiceCtl"})
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
		.state("b.dic.address", {url:'/address',  templateUrl: 'tpl/b/dic.address', controller:"BDicAddressCtl"})
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
.controller("BOperateCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BFinanceCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BAnalyseCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BDicCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
}])
.controller("BDicCustCtl",["$scope","$rootScope","$rest","$dist", function($scope,$rootScope,$rest,$dist){
	$scope.opt_cust_orgs = { data: 'cust_orgs',multiSelect: false, columnDefs: [
		{field:'type', displayName:'客户类型'}, 
		{field:'title', displayName:'客户简称'},
		{field:'name', displayName:'客户全称'},
		{field:'address', displayName:'具体地址'},
		{field:'tel', displayName:'电话'},
		{field:'website', displayName:'网址'},
		{field:'business', displayName:'主营业务'},
		{field:'turnover', displayName:'年营业额'},
	]};
	$rest.get_cust_orgs(function(orgs){
		$scope.cust_orgs = orgs;
	}) ;
	$scope.set_distcode = function(distcode){
		distcode = distcode || 310115;

	};
	$scope.new_custOrg = function(corg){
		corg = corg || {};
		$scope.custOrg = {
			type: corg.type || "货主",
			title: "",
			name: "",
			distcode: corg.distcode || "",
			province: corg.province || "",
			city: corg.city || "",
			area: corg.area || "",
			address: "",
			tel: "",
			website: "",
			business : "",
			turnover: "",
		};
		$scope.dists = $dist
	}
	$scope.new_custOrg();
	$scope.set_custOrg = function(){

	}


	$scope.formFields.some(function (field, index) {
		if (field.key === 'seeWhatYouType') {
			seeWhatYouTypeIndex = index;
			return true;
		}
	});	
	$scope.data_cust_orgs = [
		{name: "Moroni", age: 50},
		{name: "Tiancum", age: 43},
		{name: "Jacob", age: 27},
		{name: "Nephi", age: 29},
		{name: "Enos", age: 34}
	];

	$scope.custOrgForm = {
		_id: {type: "hidden"},
		type: {type: "text", label: "客户类型"},
		title: {type: "text", label: "公司简称"},
		name: {type: "text", label: "公司名称"},
		address : { type: "text", label: "公司地址"},
		tel : { type: "text", label: "电话"},
		website : { type: "text", label: "网址"},
		business : { type: "text", label: "主营业务"},
		turnover : { type: "text", label: "年营业额"},
		submit : { type: "submit"},
	};
	$scope.custContactForm = {
		_id: {type: "hidden"},
		org_id: {type: "hidden"},
		title: {type: "text", label: "真实姓名"},
		username: {type: "text", label: "邻客账号"},
		gender : { type: "text", label: "性别"},
		department : { type: "text", label: "所属部门"},
		position : { type: "text", label: "职位"},
		mobile : { type: "text", label: "手机号码"},
		submit : { type: "submit"},
	};
	$scope.orderWaybillForm = {
		_id: {type: "hidden"},
		trand_id : { type: "text", label: "运单号"},
		pickuptime: {type: "date", label: "要求提货时间"},
		deliverytime: {type: "date", label: "要求到达时间"},
		description:{type:"textarea", label: "内容描述"},
		status:{type:"text", label:"运单状态"},
		status_desc:{type:"text", label:"运单状态"},
		concernted: {type:"checkbox", label:"是否已关注"},
	}
	$scope.orderSubwaybillForm = {
		_id: {type: "hidden"},
		trand_id : { type: "text", label: "运单号"},
		pickuptime: {type: "date", label: "要求提货时间"},
		deliverytime: {type: "date", label: "要求到达时间"},
		description:{type:"textarea", label: "内容描述"},
	}

}])
.controller("BDicAddressCtl",["$scope","$rootScope","$http","$window", function($scope,$rootScope,$http,$window){
	$scope.formTemplate = {
		first: {type: "text", label: "First Name"},
		"last": { type: "text", label: "Last Name"},
		"submit": { type: "submit"},
	};
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
