


let currentSection = "photos";
let fadeAlpha = 0;
let images = [];
let brushes = [];
let bg;
let slideIndex = 0;
let slideTimer = 0;
let video, video2, video3

function preload() {
  bg = loadImage("Background.jpg");
  images.push(loadImage("IMG_0082.jpg"));
  images.push(loadImage("IMG_0083.jpg"));
  images.push(loadImage("IMG_0158.jpg"));
  images.push(loadImage("IMG_0062.JPG"));
  images.push(loadImage("IMG_0085.jpg"));
  images.push(loadImage("IMG_0175.JPG"));
  images.push(loadImage("IMG_0122.JPG"));
  images.push(loadImage("IMG_2558.jpg"));
  images.push(loadImage("IMG_2560.jpg"));
  images.push(loadImage("IMG_2565.jpg"));
  images.push(loadImage("IMG_2561.jpg"));
  images.push(loadImage("IMG_0356.JPG"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(20);
  noStroke();
  fadeAlpha = 0;

  createButtons();

  for (let i = 0; i < 50; i++) {
    brushes.push(new Brush(random(width), random(height)));
  }
  //Video

  video = createVideo("Dante2.mov");
  video.size(640, 360);
  video.position((windowWidth - 1300) / 2, (windowHeight - 600) / 2 + 40);
  video.hide();
  video.elt.setAttribute("playsinline", "");
  video.elt.setAttribute("controls", "");

  //video2
  video2 = createVideo("Gojo2.mov");
  video2.size(640, 360);
  video2.position((windowWidth - 10) / 2, (windowHeight - 600) / 2 + 40);
  video2.hide();
  video2.elt.setAttribute("playsinline", "");
  video2.elt.setAttribute("controls", "");

  //video3
  video3 = createVideo("Okarun2.mov");
  video3.size(640, 360);
  video3.position((windowWidth - 130) / 3, (windowHeight - -20) / 2 + 60);
  video3.hide();
  video3.elt.setAttribute("playsinline", "");
  video3.elt.setAttribute("controls", "");
}

function draw() {
  background(bg);
  fill(255, fadeAlpha);
  fadeAlpha = min(fadeAlpha + 10, 255);

  if (currentSection === "photos") {
    video.hide();
    video2.hide();
    video3.hide();
    text("My Work As An Photojournalism Editor", width / 2, 80);
    let imgW = 920;
    let imgH = 640;
    let x = width / 2 - imgW / 2;
    let y = height / 2 - imgH / 2 + 20;

    slideTimer++;
    if (slideTimer > 180) {
      slideIndex = (slideIndex + 1) % images.length;
      slideTimer = 0;
    }

    push();
    translate(x, y);
    tint(255, fadeAlpha);
    stroke(0, 255, 255);
    strokeWeight(6);
    drawingContext.shadowColor = color(0, 255, 255);
    drawingContext.shadowBlur = 25;
    image(images[slideIndex], 0, 0, imgW, imgH);
    pop();
  } else if (currentSection === "videos") {
    text("My Work As An Editor", width / 2, 80);
    video.show();
    video2.show();
    video3.show();
  } else if (currentSection === "about") {
    video.hide();
    video2.hide();
    video3.hide();
    text("About Me", width / 2, height / 2 - 40);
    text("I'm Acosta Jared.", width / 2, height / 2);
    text("Editor, storyteller.", width / 2, height / 2 + 30);

    for (let brush of brushes) {
      brush.update();
      brush.show();
    }
  } else {
    video.hide();
    video2.hide();
    video3.hide();
  }
}

function createButtons() {
  let y = 20;
  const sections = ["photos", "videos", "about"];

  sections.forEach((sec, i) => {
    let btn = createButton(sec.charAt(0).toUpperCase() + sec.slice(1));
    btn.position(20 + i * 130, y);
    btn.mousePressed(() => {
      currentSection = sec;
      fadeAlpha = 0;
      if (sec !== "videos") video.hide();
      if (sec !== "videos") video2.hide();
      if (sec !== "videos") video3.hide();
    });
    btn.style("padding", "10px 20px");
    btn.style("font-size", "16px");
    btn.style("background", "#00adb5");
    btn.style("color", "white");
    btn.style("border", "none");
    btn.style("border-radius", "8px");
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //video.position((windowWidth - 640) / 2, (windowHeight - 360) / 2 + 40);
}

class Brush {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(3, 8);
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  show() {
    noStroke();
    fill(0, 255, 255, 100);
    ellipse(this.x, this.y, this.r * 2);
  }
}