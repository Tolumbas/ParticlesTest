$(function() {
	
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
	
	function handler(event, ui){
	//console.log($(this).attr("id"),$(this).slider("option", "value"))
	control($(this).attr("id"),$(this).slider("option", "value"))
	}
	
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
});