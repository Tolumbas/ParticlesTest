$(document).ready( function(){
	window.canvasControl=(function(){
	
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;
		var c=$('#canvas-id');
		var context= c.get(0).getContext('2d');
		var container= $(c).parent();
		var respondCanvas=function(e){ 
			c.attr('width', $(container).width() );
			c.attr('height', $(container).height() ); 

		}
		var init=function(){
			bindEvents();
			respondCanvas();
		}
		
		var bindEvents=function(){
			$(window).on("resize", respondCanvas);
			pubsub.on("canvasDestroy",destroy);
		}
		var destroy=function(){
			$(window).off("resize", respondCanvas);
			pubsub.off("canvasDestroy",destroy)
		}
		var getContext=function(){
			return context;
		}
		var getAnimationFrame=function(){
			return requestAnimationFrame;
		}
		var getCanvas=function(){
			return c;
		}
		init();
		
		return{
			getContext:getContext,
			requestAnimationFrame:getAnimationFrame,
			getCanvas:getCanvas,
			destroy:destroy
		}
	})()
	
	pubsub.on("controlReady",function(){
		function handler(event, ui){
			game.control($(this).attr("id"),$(this).slider("option", "value"))
		}
	
		$("#size").slider({
		min:1,
		max:20,
		step:1,
		value:1,
		change: handler
		});
		$("#number").slider({
		min:1,
		max:2000,
		step:10,
		value:500,
		change: handler
		});
		$("#stickiness").slider({
		min:500,
		max:10000,
		step:100,
		value:3000,
		change: handler
		});
		$("#speed").slider({
		min:0.1,
		max:2,
		step:0.01,
		value:0.3,
		change: handler
		});
		$("#spawntime").slider({
		min:0,
		max:5,
		value:0,
		step:0.5,
		change: handler
		});
		$("#alpha").slider({
		min:0,
		max:1,
		value:0.03,
		step:0.01,
		change: handler
		});
		$("#light").slider({
		min:0,
		max:1,
		value:0,
		step:0.01,
		change: handler
		});
		
		pubsub.on("resetSet",function(){
			$("#cls").button().click(game.reset);;
		});
		
	});
		var full = false;
		$("#fullscreen").on("click",function(){
			if (!full){
				full=true;
				var element = document.documentElement;
				  if(element.requestFullscreen) {
					element.requestFullscreen();
				  } else if(element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				  } else if(element.webkitRequestFullscreen) {
					element.webkitRequestFullscreen();
				  } else if(element.msRequestFullscreen) {
					element.msRequestFullscreen();
				  }
			}
			else{
				full=false;
				 if(document.exitFullscreen) {
					document.exitFullscreen();
				  } else if(document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				  } else if(document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				  }
			}
		});
	
		$(".controls").hide();
		var r= $(".controls").is(":visible")?90:270
		var rotate = 'rotate(' + r + 'deg)';
			$(".open > img").css({ 
				'-webkit-transform': rotate,
				'-moz-transform': rotate,
				'-o-transform': rotate,
				'-ms-transform': rotate,
				'transform': rotate 
		});

	$(".open").click(function(){
		$(".controls").toggle();
		var r= $(".controls").is(":visible")?90:270
		var rotate = 'rotate(' + r + 'deg)';
		$(".open > img").css({ 
			'-webkit-transform': rotate,
			'-moz-transform': rotate,
			'-o-transform': rotate,
			'-ms-transform': rotate,
			'transform': rotate 
		});
	});
	pubsub.emit("canvasReady");
	
}); 