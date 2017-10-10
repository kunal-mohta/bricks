

var slider = document.getElementById("slider");
var gamezoneWidth = document.getElementById("gamezone").clientWidth;
var gamezoneHeight = document.getElementById("gamezone").clientHeight;
var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;
var ball = document.getElementById("ball");
var gamerunning = 0;//determines whether the game is running or not, initial value set to false
var ballspeed = 2;//maybe given by the user or maybe increased as the game proceeds
var bricknumber = 32;
var currentAngle;
var bricks = [];

function brickmaking(){
	//making all the bricks as objects
	for(i=0;i<=(bricknumber - 1);i++){
		var y = document.getElementById("brick-container").appendChild(document.createElement("div"));
		y.setAttribute("class", "brick");

	}
	//setting the properties of all the bricks
	for(i=0;i<=(bricknumber - 1);i++){
		bricks[i] = {
			element: document.getElementsByClassName("brick")[i],
			left: document.getElementsByClassName("brick")[i].getBoundingClientRect().left,
			right: (document.getElementsByClassName("brick")[i].getBoundingClientRect().left + document.getElementsByClassName("brick")[i].getBoundingClientRect().width),
			top: document.getElementsByClassName("brick")[i].getBoundingClientRect().top,
			bottom: (document.getElementsByClassName("brick")[i].getBoundingClientRect().top + document.getElementsByClassName("brick")[i].getBoundingClientRect().height),
		}
	}
}
brickmaking();

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

	if(gamerunning == 1){return false;}//not allow further calling of click function when game is already running

	else{
		gamerunning = 1; //value set to true for whether game is running or not
		

		//finding a random number between 45 and 135 for initial angle
			var initialAngle;
			function findIAngle(){
				initialAngle = Math.random()*1000;
				if(initialAngle > 135 || initialAngle < 45){
					findIAngle();
				}
			}
			findIAngle();
			initialAngle = 120;
		//initial fire
		var move = 0;
		var initialfire = setInterval(function(){
			ball.style.transform = "rotateZ("+(-initialAngle)+"deg) translateX("+move+"px)";
			move+=ballspeed;
		}, 1);	
	
			//function occuring every 1 millisecond
			var alltime = setInterval(function ingame(){
				console.log(initialAngle);
				//getting real time position of the ball
				var x = document.getElementById("ball").getBoundingClientRect().left;
				var y = document.getElementById("ball").getBoundingClientRect().top;

				currentAngle = initialAngle;
				//creating an object that manages all the rebound angles
				if(currentAngle>0){
					var rebound = {
						horizontalangle: (-currentAngle),
						verticalangle: (180 - currentAngle),
					}
				}
				else{
					var rebound = {
						horizontalangle: (-currentAngle),
						verticalangle: (-180 - currentAngle),
					}
				}

				//checking for collision with right or left wall
				if(x>=((bodyWidth + gamezoneWidth)/2 - ball.getBoundingClientRect().width) || x<=((bodyWidth - gamezoneWidth)/2)){
					if(x<=((bodyWidth - gamezoneWidth)/2)){
						ball.style.left = (x - ((bodyWidth - document.getElementById("gamezone").getBoundingClientRect().width)/2 - 4.8))+"px";
					}
					else{
						ball.style.left = (x - ((bodyWidth - document.getElementById("gamezone").getBoundingClientRect().width)/2 + 4.8))+"px";	
					}
					ball.style.top = (y)+"px";
					ball.style.transform = "";
					initialAngle = (rebound.verticalangle);
					move = 0;
				}

				//checking collision with the floor
				else if(y>=((bodyHeight + gamezoneHeight)/2)){
					ball.style.left = (x - ((bodyWidth - document.getElementById("gamezone").getBoundingClientRect().width)/2))+"px";
					ball.style.top = (y - ((bodyHeight - document.getElementById("gamezone").getBoundingClientRect().height)/2))+"px";
					ball.style.transform = "";
					move = 0;
					clearInterval(alltime);
					clearInterval(initialfire);
					var restart = confirm("gameover, replay?");

					if(restart == 1){
						location.reload();
					}
					else{
						alert("In the name Father, Son and the Holy Spirit, I condemn you to play forever");
						location.reload();
					}
				}

				//checking collision with the slider
				else if(y>=((bodyHeight + gamezoneHeight)/2 - slider.getBoundingClientRect().height - ball.getBoundingClientRect().height + 10) && x<=(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width) && x>(slider.getBoundingClientRect().left - ball.getBoundingClientRect().width + 1)){
					
					ball.style.left = (x - ((bodyWidth - document.getElementById("gamezone").getBoundingClientRect().width)/2))+"px";
					ball.style.top = (y - ((bodyHeight - document.getElementById("gamezone").getBoundingClientRect().height)/2))+"px";
					ball.style.transform = "";
					move = 0;

					//collision at the right end of the slider
					if(x>=(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width*0.8)){
						initialAngle = 30;
					}

					//collision at the left end of the slider
					else if(x<(slider.getBoundingClientRect().left - ball.getBoundingClientRect().width + slider.getBoundingClientRect().width*0.2)){
						initialAngle = 150;
					}

					//collision at the middle part of the slider
					else if(x<=(slider.getBoundingClientRect().left - ball.getBoundingClientRect().width + slider.getBoundingClientRect().width*0.7) && x>=(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width*0.3)){
						console.log("abs");
						if(initialAngle < -90){
							initialAngle = 100;
						}
						else{
							initialAngle = 80;
						}
					}

					else{
						initialAngle = rebound.horizontalangle;
					}
				}

				//checking collision with the roof
				else if(y<=((bodyHeight - gamezoneHeight)/2)){
					ball.style.left = (x - ((bodyWidth - document.getElementById("gamezone").getBoundingClientRect().width)/2))+"px";
					ball.style.top = (y - ((bodyHeight - document.getElementById("gamezone").getBoundingClientRect().height)/2) + 5)+"px";
					ball.style.transform = "";
					move = 0;
					initialAngle = rebound.horizontalangle;
				}

				//checking collision with any brick
				else
				{
					var brickcount = 0;
					for(i=0;i<=(bricknumber - 1);i++){

						//checking collision from the side
						if(y>=bricks[i].top && y<(bricks[i].bottom-4) && x>=(bricks[i].left - ball.getBoundingClientRect().width) && x<=(bricks[i].right) && window.getComputedStyle(bricks[i].element).getPropertyValue("opacity") != 0){
							bricks[i].element.style.opacity = "0";
							ball.style.left = (x - ((bodyWidth - document.getElementById("gamezone").getBoundingClientRect().width)/2))+"px";
							ball.style.top = (y - ((bodyHeight - document.getElementById("gamezone").getBoundingClientRect().height)/2))+"px";
							ball.style.transform = "";
							initialAngle = (rebound.verticalangle);
							move = 0;
							break;	
						}//not working!!!!!!!

						//checking collision from below the brick
						else if(x>=(bricks[i].left-ball.getBoundingClientRect().width) && x <= bricks[i].right && y <= bricks[i].bottom && window.getComputedStyle(bricks[i].element).getPropertyValue("opacity") != 0){
							bricks[i].element.style.opacity = "0";
							ball.style.left = (x - ((bodyWidth - document.getElementById("gamezone").getBoundingClientRect().width)/2))+"px";
							ball.style.top = (y - ((bodyHeight - document.getElementById("gamezone").getBoundingClientRect().height)/2))+"px";
							ball.style.transform = "";
							initialAngle = (rebound.horizontalangle);
							move = 0;
							break;
						}



						//counting number of bricks destroyed
						if(window.getComputedStyle(bricks[i].element).getPropertyValue("opacity") == 0){
							brickcount++;
						}

					}
					//checking whether player has won
					if(brickcount == bricknumber){
						clearTimeout(alltime);
						clearTimeout(initialfire);
						
						var restart = confirm("You won, play again?");
						if(restart == 1){
							location.reload();
						}
						else{
							alert("In the name Father, Son and the Holy Spirit, I condemn you to play forever");
							location.reload();
						}
					}
				}
			},1);
	}
	
	//increasing the speed of the ball to a certain threshold
	var increase_speed = setInterval(function(){
		ballspeed+=0.1;
		if(ballspeed >= 5){
			clearTimeout(increase_speed);
		}
	}, 1000);
}














