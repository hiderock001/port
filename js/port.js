		
		$(document).ready(function(){

			$(".port-category li a").addOn();
			$(".port-category li:first a").addClass("on");
			if($(window).width() >= 1100){
				intro();
			}else{
				$(".intro").remove();
				$("#wrap").show();
			}
							
			//포트폴리오 ajax
			$.get("/port/port.json", function(json){
				var list = json.list.all.reverse();	
				var _list = '';
				for(var i = 0; i<list.length; i++){
					_list += '<li><div class="list-wrap"><a href='+list[i].link+' target="_blank"><img src='+list[i].img+ '><div class="point"><p>click</p></div></a><p>'+list[i].title+'</p></div></li>';

				}
				$(".port-list").html(_list);
			},"json");

			$(".all").on("click",function(){
				$.get("/port/port.json", function(json){
					var list = json.list.all.reverse();	
					var _list = '';
					for(var i = 0; i<list.length; i++){
						_list += '<li><div class="list-wrap"><a href='+list[i].link+' target="_blank"><img src='+list[i].img+ '><div class="point"><p>click</p></div></a><p>'+list[i].title+'</p></div></li>';
					}
					$(".port-list").html(_list);
					return scroll();
				},"json");	
			});
			$(".web").on("click",function(){
				$.get("/port/port.json", function(json){
					var list = json.list.web.reverse();	
					var _list = '';
					for(var i = 0; i<list.length; i++){
						_list += '<li><div class="list-wrap"><a href='+list[i].link+' target="_blank"><img src='+list[i].img+ '><div class="point"><p>click</p></div></a><p>'+list[i].title+'</p></div></li>';
					}
					$(".port-list").html(_list);
					return scroll();
				},"json");	
			});
			$(".mobile").on("click",function(){
				$.get("/port/port.json", function(json){
					var list = json.list.mobile.reverse();	
					var _list = '';
					for(var i = 0; i<list.length; i++){
						_list += '<li><div class="list-wrap"><a href='+list[i].link+' target="_blank"><img src='+list[i].img+ '><div class="point"><p>click</p></div></a><p>'+list[i].title+'</p></div></li>';
					}
					$(".port-list").html(_list);
					return scroll();
				},"json");	
			});
			port();
		});

		$(window).load(function(){
			scroll();	
		});
		$(window).resize(function(){
			scroll();
		});


		$.fn.addOn = function(options){
			$(this).on("click",function(){
				$(this).parent().parent().find("a").removeClass("on");
				$(this).addClass("on");
				return false;
			});
		}

		var scroll = function(){
			var artLen = $("article").length;
			var off =[];
			for(var i=1;i<=artLen;i++){
				off.push($("#sec"+i).offset().top - 200);
			};
			$(window).scroll(function(){
				var scrollHeight = $(window).scrollTop();
				var about = $(".about-info").offset().top - 300;
				for(var sectionLen=0;sectionLen<off.length;sectionLen++){
					if(off[sectionLen]<=scrollHeight){
						$("#sec"+(sectionLen+1)).addClass("on");
						$(".gnb-list li a").removeClass("on");
						$(".gnb-list li").eq(sectionLen).find("a").addClass("on");
					}else{
						$("#sec"+(sectionLen+1)).removeClass("on");
						$(".gnb-list li").eq(sectionLen).find("a").removeClass("on");
					}
				}

				if(scrollHeight >= about){
					$(".about-info").addClass("on");
				}else{
					$(".about-info").removeClass("on");
				}
				

				if(/Android|iPhone/i.test(navigator.userAgent)){
					$(".header").animate({
						marginTop : -scrollHeight	
					},0,function(){
						if(scrollHeight > 90){
							$(this).css("margin-top","-90px");	
						}
					});
					
				}
			});
			$(document).on("keydown",function(){
				if(event.keyCode == 116){
					$("html,body").scrollTop(0);
				}			
			});
		
		}


		var port = function(){
			var _width = $(window).width(); 
			var _secHeight = $(window).height();
			$("#sec1,#sec4").css("height",_secHeight);
			$(".opacity").css("height",_secHeight);
			
			$(window).scroll(function(){
				var _scroll = $(this).scrollTop();	
				if(_width >= 768){
					if(_scroll > 100){
						$(".header").addClass("on");
					}else{
						$(".header").removeClass("on");
					}	
				}
			});
			
			var _acDt = $(".accordion dl dt:not(:animated)");
			$(".accordion dl:first dt").addClass("on");
			$(".accordion dl dd").css("height","0px");
			$(".accordion dl:first dd").css("height","100px");
			if(_width < 768){
				$(".accordion dl:first dd").css("height","200px");
			}
			_acDt.on("click",function(){
				if($(this).hasClass("on")){
					_acDt.removeClass("on");
					$(this).removeClass("on");
					$(this).next().stop().animate({height:0},500,"easeOutQuint");
				}else{
					_acDt.removeClass("on");
					$(this).addClass("on");
					$(".accordion dl dd").css("height","0px");
					if(_width < 768){
						$(this).next().stop().animate({height:200+"px"},500,"easeOutQuint");
					}else{
						$(this).next().stop().animate({height:100+"px"},500,"easeOutQuint");
					}
				}
			})	
			
			var _gnb = $(".gnb-list li a");
			_gnb.on("click",function(){
				var _idx = $(this).parent().index();
				var targetOffset= $("#sec"+(_idx+1)).offset().top;
				if(_width > 767){
					$('html, body:not(:animated)').animate({scrollTop: targetOffset - 79+"px"}, 500);
				}else{
					$(".m-btn div").removeClass("on");
					$(".gnb:not(:animated)").slideUp();
					$('html, body:not(:animated)').animate({scrollTop: targetOffset - 67+"px"}, 500);
				}
				return false;
			});	

			

			$(".m-btn div").on("click",function(){
				if($(this).hasClass("on")){
					$(".gnb:not(:animated)").slideUp();
					$(this).removeClass("on");
				}else{
					$(".gnb:not(:animated)").slideDown();
					$(this).addClass("on");
				}
			});
			

			
		}
		var intro = function(){
			var  _width = $(window).width(); 
			var top = $(".caTop");
			var bottom = $(".caBottom");
			var title = $(".title");
			var cir1 = $(".circle1");
			var cir2 = $(".circle2");
			var cir3 = $(".circle3");
			$(top).delay(1000).animate({
				top : "0"	
			},300);
			$(bottom).delay(1000).animate({
				bottom : "0"	
			},300,function(){
				$(title).css("display","block");	
			});
			$(title).delay(1400).animate({
				top : "50%", left : "50%", fontSize : "40px", marginLeft : "-166px"	, marginTop : "-30px"
			},300,"easeInQuint",function(){
				$(cir1).css("display","block");
				$(cir2).css("display","block");
				$(cir3).css("display","block");
			});
			$(cir1).delay(1600).animate({
				width : "200px",height : "200px", marginLeft : "-100px" , marginTop : "-100px",
				opacity : 0	
			},400);
			$(cir2).delay(1600).animate({
				width : "100px",height : "100px", marginLeft : "-50px" , marginTop : "-50px",
				opacity : 0	
			},800);
			$(cir3).delay(1600).animate({
				width : "250px",height : "250px", marginLeft : "-100px" , marginTop : "-100px",
				opacity : 0	
			},1000);
			$(title).delay(1700).animate({
				marginTop : "-100px"
			},500,function(){
				$(".name").css("display","block");	
			});
			$(".name").delay(3700).animate({
				left : "50%", marginLeft :"-160px"	
			},1000,"easeOutElastic",function(){
				$(".final,.final1,.final2,.final3").css("display","block");
			});
			$(".play").delay(4800).animate({
				zoom : 0.9	
			},300,function(){
				$(this).animate({
					zoom: 1.5
				},500);	
			});
			$(".final").delay(5000).animate({
				width : "1000px", height : "1000px"	, marginLeft : "-500px", marginTop : "-500px"
			},600,function(){
				$(".curtain1").css("display","block");	
			});
			$(".curtain1").delay(6500).animate({
				left : "-200%"	
			},800,function(){
				$(".curtain2").css("display","block");	
			});
			$(".curtain2").delay(7500).animate({
				left : "-50%"	
			},500,function(){
				$(".intro").remove();	
				$("#wrap").show();
				$("#sec1").addClass("on");
			});			
		}
			
		
		
		
	



