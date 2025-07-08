 let ellipseBrushBool = false
let squareBrushBool = false
let imageBrushBool = false

let furby 

function preload(){
	furby = loadImage('furby.png')
}


function setup(){
	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER)

}

function draw(){
 
	if(ellipseBrushBool == true){
		ellipseBrush()
	}

	if(squareBrushBool == true){
		squareBrush()
	}

	if(imageBrushBool == true){
		imageBrush()
	}

}

function keyPressed(){
	//activates the ellipse brush
	if(key === 'q'){
		ellipseBrushBool = true
		squareBrushBool = false
		imageBrushBool = false
	}
	//activates the square brush
	if(key === 'w'){
		ellipseBrushBool = false
		squareBrushBool = true
		imageBrushBool = false
	}

	//activates the image brush
	if(key === 'e'){
		ellipseBrushBool = false
		squareBrushBool = false
		imageBrushBool = true
	}

	if(key === 'o'){
		ellipseBrushBool = false
		squareBrushBool = false
		imageBrushBool = false
	}

}

function ellipseBrush(){
	if(mouseIsPressed == true){
		fill(random(255), random(255), random(255))
		ellipse(mouseX, mouseY, 50, 50)
		stroke(random(255), random(255), random(255))
		strokeWeight(5)
		line(pmouseX, pmouseY, mouseX, mouseY)
	}
}

function squareBrush(){
	fill(random(255), random(255), random(255))
	rect(mouseX, mouseY, 80, 80)
}

function imageBrush(){
	image(furby, mouseX, mouseY, 40, 40)
}