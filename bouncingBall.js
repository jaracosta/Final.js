let xPos
let yPos


let xSpeed = 2
let ySpeed = 2

let ballDiameter = 100

let furby

function preload(){
 furby = loadImage('furby.png')
}

function setup(){
	createCanvas(windowWidth, windowHeight)
	xPos = windowWidth/2
	yPos = windowHeight/2
	background(0)
	imageMode(CENTER)

}

function draw(){
	background(0)
	fill(255)
	text('Bouncing Ball Screensaver', 100, 100)

	xPos = xPos + xSpeed
	yPos = yPos + ySpeed

	
	ellipse(xPos, yPos, ballDiameter, ballDiameter)
	//image(furby, xPos, yPos, ballDiameter, ballDiameter )
	
	if(xPos >= windowWidth - ballDiameter/2 || xPos <= ballDiameter/2){
		xSpeed = xSpeed * -1
	
	
	}

	if(yPos >= windowHeight - ballDiameter/2  || yPos <= ballDiameter/2){
		ySpeed = ySpeed * -1
		
		
	}
}


function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
	background(0)
}










