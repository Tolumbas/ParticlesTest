var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var canvas = document.getElementById("canvas-id");
canvas.width = innerWidth;
canvas.height = innerHeight;
var context = canvas.getContext("2d");

var particles = [];

var input = {
	size:1,
	number:500,
	stickiness:3000,
	speed:0.3,
	spawntime:0
}

var hueshift = 360/input.number;
var spawn={x:3.1415,y:-1};
var h = 0;
var hold;
var mouse = {x:canvas.width/2,y:canvas.height/2}

canvas.addEventListener("mousedown",function(e){
if (spawn.x==3.1415){setTimeout(summon,5);}
spawn.x =e.layerX;
spawn.y = e.layerY;
hold = true;
})
canvas.addEventListener("mouseup",function(e){
hold = false;
})

function reset(){
context.clearRect(0,0,canvas.width,canvas.height);
particles=[];
spawn.x=3.1415;
}

function particle(){
	this.x = spawn.x;
	this.y = spawn.y;
	this.ax = 0;
	this.ay = 0;
	this.hue=Math.round(h);
	h+=360/input.number;
	this.color = "hsla("+this.hue+",100%,50%,0.2)";
	//this.speed = (this.hue/300)*input.stickiness + input.speed;
	this.speed = this.hue/input.stickiness + input.speed;
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

}

}

function summon(){
	if (particles.length>= input.number)return;
	var count = input.number/(input.spawntime*1000);
	count = input.number;
	if (count==0){count=input.number;}
		for (var a=0;a<count;a++){
		particles.push(new particle());
		}
	setTimeout(summon, 1);
}

window.addEventListener("mousemove", function (args) {	
	mouse.x = args.layerX;
	mouse.y = args.layerY;
	if (hold){
	spawn.x = args.layerX;
	spawn.y = args.layerY;
	}

}, false);


function update() {
	for (var a=0;a<particles.length;a++){
		var angle = Math.atan2(particles[a].x-mouse.x,particles[a].y-mouse.y);
		particles[a].ax+=-Math.sin(angle)*particles[a].speed;
		particles[a].ay+=-Math.cos(angle)*particles[a].speed;
		particles[a].x+=particles[a].ax;
		particles[a].y+=particles[a].ay;
	}
	setTimeout(update, 10);
}
context.globalCompositeOperation = 'lighter';
function draw() {
	for (var a=0;a<particles.length;a++){
		context.fillStyle = particles[a].color;
		//context.beginPath();
		//context.arc(particles[a].x,particles[a].y,input.size,0,Math.PI*2);
		context.fillRect(particles[a].x,particles[a].y,input.size,input.size);
		//context.fill();
	}
    requestAnimationFrame(draw);
}
update();
draw();