var sizeArray = [["151px","170px","105px"],["205px","204px","162px"]];
var topArray = [];
var currentIdx = 0;
var HomePage = {
    
    myTimer: function() {
         currentIdx = currentIdx % 3;
         var selector = $("#ssLeftDiv > div").get(currentIdx); 
         var explainObj = $(".flashDiv").get(currentIdx);
         if(selector) { 

             var width = sizeArray[0][currentIdx];
             var height = sizeArray[1][currentIdx];

             $(selector).css("top", topArray[currentIdx]);
             $(selector).css("top", "+="+height).css({'height': '0px', 'width': '1px'}).show();
             
             $(selector).animate({
                height: height,
                top   : topArray[currentIdx]
              }, 1500, function() {
                      $(this).animate({
                          width: width
                      },1500, function() {
                          $(explainObj).fadeIn("slow").delay(1000);
                          $(explainObj).promise().done(function(){
                                  $(selector).fadeOut("slow");
                                  $(explainObj).fadeOut("slow");
                          });
                      });
              });
         }
        currentIdx++;
    },
    
    bindFlash: function() {
        for(var i=0; i<3; i++) {
            topArray.push($("#ssLeftDiv > div").eq(i).css("top"));
        }
        var myFlash;
        function startFlashAnimation() {
            HomePage.myTimer();
            myFlash=setInterval(HomePage.myTimer, 5000);
        }
        startFlashAnimation();

        $(".flashDiv").hover(function(e) {
            e.preventDefault();
            window.clearInterval(myFlash);
            $(this).clearQueue().stop();
            $("#ssLeftDiv > div:visible").clearQueue().stop();
            $(this).show();
            $("#ssLeftDiv > div:visible").show()
        },function(e) {
            $("#ssLeftDiv > div:visible").fadeOut();
            $(this).fadeOut();
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

$(document).ready(function() {
            HomePage.updateClock();
            setInterval(HomePage.updateClock, 1000);
            HomePage.bindFlash();
            
            $("#navigator").hover(function() {
                $(this).animate({
                    opacity:1});
            },function() {
                if($(window).scrollTop()>0)
                    $(this).animate({
                        opacity:0});
            });
            
            $("#navigator > div > ul:first-child > li > a").slice(1,3).click(function(){
                $('html, body').animate({
                    scrollTop: $( $.attr(this, 'href') ).offset().top
                }, 'slow');
                return false;
            });
            
            $("#navigator > div > ul:first-child > li").hover(function() {
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
            
            $(window).scroll(function () {
				if ($(this).scrollTop() >=$("#shipmentDiv").offset().top) {
				 	$("#toTop").fadeIn();
				}
				else {
				 	$("#toTop").fadeOut();
                    if($(this).scrollTop() >0 )
                        $("#navigator").css("opacity", 0);
                    else
                        $("#navigator").css("opacity", 1);
				}
			});
			$("#toTop").click(function() {
				$("html, body").animate({ scrollTop: 0 }, "slow");
				 return false;
			});
    
            //expand & collapse search inputbox
            $("#navigator .navbar-form>input").eq(0).click(function(e){
                e.preventDefault();
                var selector = $(this).prev();
                if(selector.width()) {
                    selector.animate({width: "0px"});
                    $("#navigator .navbar-nav > li:last-child").show();
                } else {
                    $("#navigator .navbar-nav > li:last-child").hide();
                    selector.animate({width: "270px"});
                }
            });
    
});