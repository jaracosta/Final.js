let photoImages = [];
let drawingImages = [];
let bg;
let fadeAlpha = 0;
let slideIndex = 0;
let slideTimer = 0;
let currentSection = "photos";
let video, video2, video3;
let brushes = [];
let tiktokHovered = false;

function preload() {
  bg = loadImage("Background.jpg");

  // Photos
  photoImages.push(loadImage("IMG_0082.jpg"));
  photoImages.push(loadImage("IMG_0083.jpg"));
  photoImages.push(loadImage("IMG_0158.jpg"));
  photoImages.push(loadImage("IMG_0062.JPG"));
  photoImages.push(loadImage("IMG_0085.jpg"));
  photoImages.push(loadImage("IMG_0175.JPG"));
  photoImages.push(loadImage("IMG_0122.JPG"));
  photoImages.push(loadImage("IMG_2558.jpg"));
  photoImages.push(loadImage("IMG_2560.jpg"));
  photoImages.push(loadImage("IMG_2565.jpg"));
  photoImages.push(loadImage("IMG_2561.jpg"));
  photoImages.push(loadImage("IMG_0356.JPG"));

  // Drawings
  drawingImages.push(loadImage("IMG_0049.jpeg"));
  drawingImages.push(loadImage("IMG_0050.jpeg"));
  drawingImages.push(loadImage("IMG_0052.jpeg"));
  drawingImages.push(loadImage("IMG_0053.jpeg"));
  drawingImages.push(loadImage("IMG_0055.jpeg"));
  drawingImages.push(loadImage("IMG_0571.jpg"));
  drawingImages.push(loadImage("IMG_0572.jpg"));
  drawingImages.push(loadImage("IMG_1744.jpg"));
  drawingImages.push(loadImage("IMG_1743.jpg"));
  drawingImages.push(loadImage("IMG_3698.jpeg"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(20);
  noStroke();
  fadeAlpha = 0;

  createButtons();

  video = createVideo("Dante2.mov");
  video.size(640, 360);
  video.position((windowWidth - 1300) / 2, (windowHeight - 600) / 2 + 40);
  video.hide();
  video.elt.setAttribute("playsinline", "");
  video.elt.setAttribute("controls", "");

  video2 = createVideo("Gojo2.mov");
  video2.size(640, 360);
  video2.position((windowWidth - 10) / 2, (windowHeight - 600) / 2 + 40);
  video2.hide();
  video2.elt.setAttribute("playsinline", "");
  video2.elt.setAttribute("controls", "");

  video3 = createVideo("Okarun2.mov");
  video3.size(640, 360);
  video3.position((windowWidth - 130) / 3, (windowHeight - -20) / 2 + 60);
  video3.hide();
  video3.elt.setAttribute("playsinline", "");
  video3.elt.setAttribute("controls", "");

  for (let i = 0; i < 50; i++) {
    brushes.push(new Brush(random(width), random(height)));
  }
}

function draw() {
  background(bg);
  fill(255, fadeAlpha);
  fadeAlpha = min(fadeAlpha + 10, 255);

  if (currentSection === "photos") {
    video.hide(); video2.hide(); video3.hide();
    text("My Work As A Photojournalism Editor", width / 2, 80);
    let imgW = 920;
    let imgH = 640;
    let x = width / 2 - imgW / 2;
    let y = height / 2 - imgH / 2 + 20;

    slideTimer++;
    if (slideTimer > 180) {
      slideIndex = (slideIndex + 1) % photoImages.length;
      slideTimer = 0;
    }

    push();
    translate(x, y);
    tint(255, fadeAlpha);
    stroke(0, 255, 255);
    strokeWeight(6);
    drawingContext.shadowColor = color(0, 255, 255);
    drawingContext.shadowBlur = 25;
    image(photoImages[slideIndex], 0, 0, imgW, imgH);
    pop();

  } else if (currentSection === "videos") {
    text("My Work As An Editor", width / 2, 80);
    video.show(); video2.show(); video3.show();

  } else if (currentSection === "about") {
    video.hide(); video2.hide(); video3.hide();
    text("About Me", width / 2, height / 2 - 40);
    text("I'm Acosta Jared. My name is Jared Acosta. My passion is editing and taking photos.", width / 2, height / 2);
    text("How did I know this was something I loved? Over time, when I was younger—like any normal kid—I liked playing video games.", width / 2, height / 2 + 30);
    text("But one day I saw videos and editors working on their favorite games, anime, or movies, and I loved how they did it. That was around 2018.", width / 2, height / 2 + 60);
    text("So I downloaded a basic editing app. As time went on, I started making really good videos, and that’s when I felt it was my passion.", width / 2, height / 2 + 90);
    text("I gained more than 20k followers. Sadly, I lost the account and had to start over.", width / 2, height / 2 + 120);
    text("Even after that, I grew a good following again, and now I use even better software. I also discovered my love for photography.", width / 2, height / 2 + 150);
    text("Every time I went somewhere—or even to my backyard—I would take pictures. Eventually, I took photojournalism and photo editing classes to improve my skills.", width / 2, height / 2 + 180);
    text("Now, I plan to share my photo edits on TikTok too.", width / 2, height / 2 + 210);

    tiktokHovered = (
      mouseX > width / 2 - 150 &&
      mouseX < width / 2 + 150 &&
      mouseY > height / 2 + 230 &&
      mouseY < height / 2 + 250
    );

    if (tiktokHovered) {
      cursor(HAND);
      drawingContext.shadowColor = "yellow";
      drawingContext.shadowBlur = 20;
      if (mouseIsPressed) {
        window.open("https://www.tiktok.com/@mystic_vx", "_blank");
      }
    } else {
      cursor(ARROW);
      drawingContext.shadowBlur = 0;
    }

    let pulse = 255 + 30 * sin(frameCount * 0.1);
    textSize(20 + 2 * sin(frameCount * 0.1));
    fill(tiktokHovered ? color(255, 255, 0, pulse) : color(255, pulse));
    
    text("Click here to visit my TikTok: @mystic_vx", width / 2, height / 2 + 240);

    // Segundo TikTok link @jared_draws
    let secondLinkY = height / 2 + 270;
    let secondHovered = (
      mouseX > width / 2 - 200 &&
      mouseX < width / 2 + 200 &&
      mouseY > secondLinkY - 10 &&
      mouseY < secondLinkY + 10
    );

    if (secondHovered) {
      cursor(HAND);
      drawingContext.shadowColor = "yellow";
      drawingContext.shadowBlur = 20;
      if (mouseIsPressed) {
        window.open("https://www.tiktok.com/@jared_draws", "_blank");
      }
    } else {
      drawingContext.shadowBlur = 0;
    }

    let secondPulse = 255 + 30 * sin(frameCount * 0.1);
    textSize(20 + 2 * sin(frameCount * 0.1));
    fill(secondHovered ? color(255, 255, 0, secondPulse) : color(255, secondPulse));
    text("Or check out my art on TikTok: @jared_draws", width / 2, secondLinkY);
    textSize(20);
    
    textSize(20);

    for (let brush of brushes) {
      brush.update();
      brush.show();
    }

  } else if (currentSection === "Drawings") {
    video.hide(); video2.hide(); video3.hide();
    text("My work as an artist", width / 2, 80);
    let imgW = 920;
    let imgH = 640;
    let x = width / 2 - imgW / 2;
    let y = height / 2 - imgH / 2 + 20;

    slideTimer++;
    if (slideTimer > 180) {
      slideIndex = (slideIndex + 1) % drawingImages.length;
      slideTimer = 0;
    }

    push();
    translate(x, y);
    tint(255, fadeAlpha);
    stroke(255, 255, 0);
    strokeWeight(6);
    drawingContext.shadowColor = color(255, 255, 0);
    drawingContext.shadowBlur = 25;
    image(drawingImages[slideIndex], 0, 0, imgW, imgH);
    pop();
  }
}

function createButtons() {
  let y = 20;
  const sections = ["photos", "videos", "about", "Drawings"];
  sections.forEach((sec, i) => {
    let btn = createButton(sec.charAt(0).toUpperCase() + sec.slice(1));
    btn.position(20 + i * 130, y);
    btn.mousePressed(() => {
      currentSection = sec;
      fadeAlpha = 0;
      video.hide(); video2.hide(); video3.hide();
    
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // prevents the white thing

});
    btn.style("padding", "10px 20px");
    btn.style("font-size", "16px");
    btn.style("background", sec === "Drawings" ? "#ffd600" : "#00adb5");
    btn.style("color", sec === "Drawings" ? "black" : "white");
    btn.style("border", "none");
    btn.style("border-radius", "8px");
  
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // prevents the white thing

});
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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


window.addEventListener("DOMContentLoaded", () => {

// Crear botón en el menú para Animations
const menu = document.querySelector("#menu") || document.createElement("nav");
if (!document.querySelector("#menu")) {
  menu.id = "menu";
  menu.style.display = "flex";
  menu.style.justifyContent = "center"; // horizontal centering
  menu.style.gap = "20px";
  menu.style.margin = "20px";
menu.style.background = "black";
menu.style.padding = "10px 0";
  document.body.insertBefore(menu, document.body.firstChild);
}

const animBtn = document.createElement("button");
animBtn.innerText = "Animations";
animBtn.style.padding = "10px 15px";
animBtn.style.borderRadius = "10px";
animBtn.style.border = "none";
animBtn.style.cursor = "pointer";
animBtn.style.background = "#222";
animBtn.style.color = "white";
animBtn.style.boxShadow = "0 0 10px white";
animBtn.addEventListener("click", () => {
  const animSection = document.querySelector("#animations");
  if (animSection) {
    animSection.style.display = "block";
    animSection.scrollIntoView({ behavior: "smooth"});
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // prevents the white thing


  }

document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // prevents the white thing

});
menu.appendChild(animBtn);

// Crear sección ANIMATIONS justo después de Drawings
const drawingsSection = document.querySelector("#drawings") || document.querySelector("#Drawing");
const animationsSection = document.createElement("section");
animationsSection.style.display = "none";
animationsSection.id = "animations";
animationsSection.style.backgroundImage = "url('Fondo1.jpg')";
animationsSection.style.backgroundSize = "cover";
animationsSection.style.backgroundPosition = "center";
animationsSection.style.backgroundRepeat = "no-repeat";
animationsSection.style.color = "white";
animationsSection.style.padding = "50px 20px";

const title = document.createElement("h2");
title.innerText = "My work as an Anime Animator";
title.style.textAlign = "center";
title.style.fontSize = "2em";
title.style.marginBottom = "30px";

const videoContainer = document.createElement("div");
videoContainer.style.display = "flex";
videoContainer.style.justifyContent = "center";
videoContainer.style.flexWrap = "wrap";
videoContainer.style.gap = "30px";

const videos = ["Animation1.mov", "Animation2.mov"];
videos.forEach((src) => {
  const video = document.createElement("video");
  video.src = src;
  video.controls = true;
  video.style.border = "4px solid white";
  video.style.boxShadow = "0 0 20px white";
  video.style.width = "300px";
  video.style.borderRadius = "20px";
  videoContainer.appendChild(video);

document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // prevents the white thing

});

animationsSection.appendChild(title);

const dividerLine = document.createElement("div");
dividerLine.style.height = "4px";
dividerLine.style.background = "linear-gradient(to right, yellow, white, yellow)";
dividerLine.style.margin = "0";
animationsSection.appendChild(dividerLine);

animationsSection.appendChild(videoContainer);

if (drawingsSection && drawingsSection.parentNode) {
  
const dividerLine = document.createElement("div");
dividerLine.style.height = "4px";
dividerLine.style.background = "linear-gradient(to right, yellow, white, yellow)";
dividerLine.style.margin = "0";

drawingsSection.parentNode.insertBefore(dividerLine, drawingsSection.nextSibling);
drawingsSection.parentNode.insertBefore(animationsSection, drawingsSection.nextSibling);
} else {
  document.body.appendChild(animationsSection);
}


document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // prevents the white thing

});

// Ocultar sección animations al hacer clic en otros botones
document.querySelectorAll("#menu button").forEach(btn => {
  if (btn.innerText !== "Animations") {
    btn.addEventListener("click", () => {
      const animSection = document.querySelector("#animations");
      if (animSection) animSection.style.display = "none";
    
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // prevents the white thing

});
  }

document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // prevents the white thing

});
