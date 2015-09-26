/*
	This is the actual game!
	It is made by me Anton!
	I will explain the code in detail below!
	I hope you like it!
	If you use any of it credit me!
*/

///***initialize canvas!

//Initialize frames per second. It is about 60.
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var canvas = document.getElementById("canvas-id");
//setting the game's width and height
canvas.width = innerWidth;
canvas.height = innerHeight;
var context = canvas.getContext("2d");

//empty array witch will hold our pixies!!
var particles = [];

//Here we will store the sliders input!
var input = {
	size:1,
	number:500,
	stickiness:3000,
	speed:0.3,
	spawntime:0,
	alpha : 0.03
}

///***init variables

var hueshift = 360/input.number;  //hueshift is the color and speed diffrence between each pixie
var spawn={x:0,y:0};  //spawn is where pixies are spawning.
var spawning=false; // is spawing
var h = 0;  //h is counter for the hueshift 
var hold;   //am i holding the mouse? (true or false)
var mouse = {x:canvas.width/2,y:canvas.height/2} //position of the mouse on the canvas


function particle(){//this is struct(class) whitch defines the pixies!!!
	this.x = spawn.x;// it has x
	this.y = spawn.y;// ...y
	this.ax = 0; // velosity x
	this.ay = 0; // velosity y
	this.hue=Math.round(h); // and color
	
	h+=360/input.number; // here we update the counter
}


///***setting up event listeners

//do function when mouse button is pressed
canvas.addEventListener("mousedown",function(e){
	if (!spawning){spawning=true;setTimeout(summon,5);} //start spawning if we click for the first time
	
	// updating variables
	spawn.x =e.layerX; 
	spawn.y = e.layerY;
	hold = true;
});

//do function when mouse button is released
canvas.addEventListener("mouseup",function(e){
	hold = false;
})

//when the mouse is moved
canvas.addEventListener("mousemove", function (args) {	
	mouse.x = args.layerX;
	mouse.y = args.layerY;
	if (hold){ // move the spawn point
		spawn.x = args.layerX;
		spawn.y = args.layerY;
	}

}, false);
 
///*** add some usefull functions

//this function resets the canvas
function reset(){
context.clearRect(0,0,canvas.width,canvas.height); // clear the canvas
particles=[]; // empty the array
spawning = false; // setting spawn to the init value so we can start spawning again 
}

// here we handle the input
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
	}
}

//this is the spawner!
function summon(){
	if (particles.length>= input.number)spawning = false // if we have spawned the particles exit the function
	if (!spawning)return;
	var count; // how many pixies should we spawn now
	
	if (input.spawntime==0) // if instant, spawn all!
		count=input.number;
	else
		count = input.number/(input.spawntime*1000/5); //calcualting
		
	if (count==0){count=input.number;} // bug fix
		for (var a=0;a<count;a++){
		 particles.push(new particle()); // RELEACE THE BEASTS!
		}
	setTimeout(summon, 5); //spawn again!
}

///*** rapid cycles! update and draw!

// this is the main cycle which controls the movement of the pixies
function update() {
	for (var a=0;a<particles.length;a++){ // for each pixie
		var angle = Math.atan2(particles[a].x-mouse.x,particles[a].y-mouse.y);// calcualte the angle between the mouse and the pixie
		speed = particles[a].hue/input.stickiness + input.speed; // calcualte the speed using the input and the color
		particles[a].ax+=-Math.sin(angle)*speed; // change the velocity 2D
		particles[a].ay+=-Math.cos(angle)*speed;
		particles[a].x+=particles[a].ax; // add the velocity to the coordinates
		particles[a].y+=particles[a].ay;
	}
	setTimeout(update, 10); // repeat this 100 times a second
}


// draw!
function draw() {
	context.globalCompositeOperation = 'source-over'; //draw the new over the old
	context.fillStyle="rgba(0,0,0,0.01)" // this is very transparent black #00000001
	context.fillRect(0,0,canvas.width,canvas.height); // apply layer of ^
	context.globalCompositeOperation = 'lighter'; // draw to combine the new and old
	
	for (var a=0;a<particles.length;a++){ // for each particle
		context.fillStyle = "hsla("+particles[a].hue+",100%,50%,"+input.alpha+")"; // get its color
		context.fillRect(particles[a].x,particles[a].y,input.size,input.size); // and draw it!
	}
    requestAnimationFrame(draw); // redraw after certan time
}
update(); // start the update function
draw(); // start the drawring function