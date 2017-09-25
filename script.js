var slider = document.getElementById("slider");
var gamezoneWidth = document.getElementById("gamezone").clientWidth;
var bodyWidth = document.body.clientWidth;


function sliding(event){
var sliderProp = slider.getBoundingClientRect(); 
	if(!event){event = window.event;}

	var mouseX = event.clientX - ((bodyWidth - gamezoneWidth)/2) - (sliderProp.width/2);
	sliderX = ((mouseX/(document.getElementById("gamezone").clientWidth))*100);
	slider.style.left = sliderX+"%";     
}

setInterval(function(){
	var x = document.getElementById("ball").getBoundingClientRect().left;
	var y = document.getElementById("ball").getBoundingClientRect().top;
	console.log(x+","+y);
}, 1);
