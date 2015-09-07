var game=(function(){

	var canvas,context,animate;
	
	var input = {
		size:1,
		number:500,
		stickiness:3000,
		speed:0.3,
		spawntime:0,
		alpha : 0.03,
		light : 0
	}
	
	var particles = [];
	var hueshift = 360/input.number;
	var spawn={x:3.1415,y:-1};
	var h = 0;
	var hold;
	var mouse;
	var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	
	
	
	var init = function(){
		canvas = canvasControl.getCanvas();
		context = canvasControl.getContext();
		animate = canvasControl.requestAnimationFrame();
		
		pubsub.emit("controlReady");
		pubsub.emit("resetSet");
		
		mouse = {x:canvas.width()/2,y:canvas.height()/2}
		
		
		bindEvents();
		update();
		draw();
		
	}
	
	var bindEvents = function(){
	
		canvas.on("mousedown", function (e){
			if (spawn.x==3.1415){setTimeout(summon,5);}
				var parentOffset = $(this).offset(); 
				spawn.x = e.pageX - parentOffset.left;
				spawn.y =  e.pageY - parentOffset.top;
				hold = true;
		});
		
		canvas.on("mouseup", function() {
			hold = false;
		});
		
		canvas.on("mousemove", function(e) {
		var parentOffset = $(this).offset(); 
			mouse.x = e.pageX - parentOffset.left;
			mouse.y = e.pageY - parentOffset.top;
			if (hold){
				spawn.x =  mouse.x;
				spawn.y =  mouse.y;
			}
		});

	}
	
	function particle(){
		this.x = spawn.x;
		this.y = spawn.y;
		this.ax = 0;
		this.ay = 0;
		this.hue=Math.round(h);
		h+=360/input.number;
		//this.speed = this.hue/input.stickiness + input.speed; <--working
	}
	
	function reset(){
	
		context.clearRect(0,0,canvas.width(),canvas.height());
		console.log("hi!");
		particles=[];
		spawn.x=3.1415;
	}

	
	function summon(){
		if (particles.length>= input.number)
			return;
		var count;
		if (input.spawntime==0)
			count=input.number;
		else
			count = input.number/(input.spawntime*1000/5)
		if (count==0)
			count=input.number;
		for (var a=0;a<count;a++)
			particles.push(new particle());
		setTimeout(summon, 5);
	}
	
	function control(name,val){
		switch(name){
			case "size" :
				input.size = val;
				break;
			case "number":
				input.number = val;
				break;
			case "stickiness":
				input.stickiness = val;
				break;
			case "speed":
				input.speed = val;
				break;
			case "spawntime":
				input.spawntime = val;
				break;
			case "alpha":
				input.alpha = val;
				break;
			case "light":
				input.light = val;
				break;
		}
	}
	
	

	function update() {
		for (var a=0;a<particles.length;a++){
			var angle = Math.atan2(particles[a].x-mouse.x,particles[a].y-mouse.y);
			speed = particles[a].hue/input.stickiness + input.speed;
			particles[a].ax+=-Math.sin(angle)*speed;
			particles[a].ay+=-Math.cos(angle)*speed;
			particles[a].x+=particles[a].ax;
			particles[a].y+=particles[a].ay;
		}
		setTimeout(update, 10);
	}

	function draw() {
		if (input.light!=0){
			context.globalCompositeOperation = 'source-over';
			context.fillStyle="rgba(0,0,0,0.01)"
			context.fillRect(0,0,canvas.width(),canvas.height());
		}
		if (!is_firefox)
		context.globalCompositeOperation = 'lighter';
		for (var a=0;a<particles.length;a++){
			context.fillStyle = "hsla("+particles[a].hue+",100%,50%,"+input.alpha+")";
			context.fillRect(particles[a].x,particles[a].y,input.size,input.size);
		}
		animate(draw);
	}
	
	pubsub.on("canvasReady",init);
	
	return {
	control:control,
	reset:reset
	}
	
})()