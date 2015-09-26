/*

Here I use jQuery magic to create the controls.
jQuery is JavaScript library for easier code.
Much improvement could be done.
 

*/
$(function() {
	
	//making the buttons
	
	$("#size").slider({
	min:1, // min value
	max:20, // max value
	step:1, // step
	value:1, // init value 
	change: handler // handler
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
	
	function handler(event, ui){ // handler
		
		//call the game.js function "control" sending the id and the value of the slider
		control($(this).attr("id"),$(this).slider("option", "value")) 
	}
	
	
	// hiding the controls
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

	
	//open or close the controls when asked
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