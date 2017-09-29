var slider = document.getElementById("slider");
var gamezoneWidth = document.getElementById("gamezone").clientWidth;
var gamezoneHeight = document.getElementById("gamezone").clientHeight;
var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;
var ball = document.getElementById("ball");
var gamerunning = 0;//determines whether the game is running or not, initial value set to false
var ballspeed = 2;

//sliding of the slider along the mouse cursor
function sliding(event){
	if(!event){event = window.event;}

	var mouseX = event.clientX - ((bodyWidth - gamezoneWidth)/2) - (slider.getBoundingClientRect().width/2);
	sliderX = ((mouseX/gamezoneWidth)*100);
	slider.style.left = sliderX+"%";     

	if(gamerunning == 0){
		//setting the initial position of the ball to be along the slider
		//position left = (position-left of slider) - (external left space) + (half of slider width) - diameter of the ball
		ball.style.left = (slider.getBoundingClientRect().left + (slider.getBoundingClientRect().width/2) - ball.getBoundingClientRect().width) + "px";
		ball.style.top = ((slider.getBoundingClientRect().top - ball.getBoundingClientRect().width) - ((bodyHeight-gamezoneHeight)/2))+"px";
	}
}

function game(){
	gamerunning = 1; //value set to true for whether game is running or not

	var alltime = setInterval(function(){
		var x = document.getElementById("ball").getBoundingClientRect().left;
		var y = document.getElementById("ball").getBoundingClientRect().top;
		console.log(x+","+y);
	}, 1);

	//finding a random number between 45 and 135 for initial angle
		var initialAngle;
		function findIAngle(){
			initialAngle = Math.random()*1000;
			if(initialAngle > 135 || initialAngle < 45){
				findIAngle();
			}
		}
		findIAngle();

	//initial fire
	var move = 0;
	var initialfire = setInterval(function(){
		ball.style.transform = "rotateZ("+(-initialAngle)+"deg) translateX("+move+"px)";
		move+=ballspeed;
	}, 1);	

}



var bricks = [];
for(i=0;i<=15;i++){
	var y = document.getElementById("brick-container").appendChild(document.createElement("div"));
	y.setAttribute("class", "brick");

}
for(i=0;i<=15;i++){
	bricks[i] = {
		left: document.getElementsByClassName("brick")[i].getBoundingClientRect().left
	}
}







