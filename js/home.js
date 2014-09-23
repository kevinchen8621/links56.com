var defaults={tabs:{},moduleClass:".tabbed-content-section",tabClass:".tab",sectionClass:".column",activeClassName:"active",initialTab:1,nextText:"",previousText:"",mobileBreakPoint:800,scrollTo:!0,speed:300},tabs={init:function(a){a.tabClass=a.moduleClass+" "+a.tabClass,a.sectionClass=a.moduleClass+" "+a.sectionClass,a.activeClass=a.moduleClass+" ."+a.activeClassName,a.initLoad=!0,$(a.tabClass).each(function(b){b+=1,a.tabs[b]={tab:$(this).find("a").attr("href"),visible:b==a.initialTab?!0:!1}}),$(a.moduleClass+" .nextTab").text(a.nextText).on("click",function(){tabs.switchTab(a,"next")}),$(a.moduleClass+" .previousTab").text(a.previousText).on("click",function(){tabs.switchTab(a,"previous")}),$.each(a.tabs,function(b,c){1==c.visible&&tabs.activate(a,c.tab)}),$(a.tabClass).find("a").on("click",function(){return tabs.update(a,this.hash),!1}),$(window).resize(function(){window.innerWidth>a.mobileBreakPoint&&$(a.sectionClass).removeAttr("style")})},update:function(a,b){$.each(a.tabs,function(a,c){c.visible=c.tab==b?!0:!1}),tabs.activate(a,b)},activate:function(a,b){""!=a.mobileBreakPoint&&a.mobileBreakPoint>=window.innerWidth?($(a.activeClass).removeClass(a.activeClassName),$.each(a.tabs,function(b,c){1==c.visible?$(c.tab).slideDown(a.speed):$(c.tab).slideUp(a.speed)}),1==a.scrollTo&&1!=a.initLoad&&tabs.scrollTo(a.moduleClass,a.speed),$('a[href="'+b+'"], '+b+", "+a.moduleClass).addClass(a.activeClassName)):($(a.activeClass).removeClass(a.activeClassName),tabs.toggleTab(a),$('a[href="'+b+'"], '+b+", "+a.moduleClass).addClass(a.activeClassName)),a.initLoad=!1},toggleTab:function(a){$.each(a.tabs,function(a,b){0==b.visible?$(b.tab).hide():$(b.tab).show()})},switchTab:function(a,b){var c;$.each(a.tabs,function(a,b){1==b.visible&&(c=$(b.tab))});var d=$(a.tabClass).first().find("a").attr("href"),e=$(a.tabClass).last().find("a").attr("href"),f=c.next(a.tabClass).find("a").attr("href"),g=c.prev(a.tabClass).prevAll(a.tabClass).find("a").attr("href");"next"==b&&(void 0==f?tabs.update(a,d):tabs.update(a,f)),"previous"==b&&(void 0==g?tabs.update(a,e):tabs.update(a,g))},scrollTo:function(a,b){$("html,body").animate({scrollTop:$(a).offset().top},b)}};$(function(){var a={moduleClass:"#product-tabs"},b=$.extend({},defaults,a);tabs.init(b);var c=$(".customer-story-content").find(".overlay");c.remove(),$("#customer-story").prepend(c);var d=$(".overlay").find("iframe").attr("src"),e=$(".close");$(".overlay").find("iframe").attr("src",""),$(".video a").on("click",function(a){a.preventDefault(),setTimeout(function(){$(".overlay").find("iframe").attr("src",d)},150),$(".overlay").addClass("visible")}),e.on("click",function(){$(".overlay").removeClass("visible"),setTimeout(function(){$(".overlay").find("iframe").attr("src","")},150)})});