// Professional Portfolio 
// Author: Jared Acosta

let photoImages = [];
let drawingImages = [];
let bgImage;
let videos = {};
let particles = [];

let currentSection = "photos";
let slideIndex = 0;
let slideTimer = 0;
let fadeAlpha = 0;
let isTransitioning = false;
let slideTransition = 1;
let textReveal = 0;

const config = {
  slideInterval: 240,
  transitionSpeed: 0.08,
  fadeSpeed: 8,
  particleCount: 30
};

const photoDescriptions = [
  "Father and Daughter: A heartwarming moment captured during a playful game of hide-and-seek.",
  "Natural Architecture: An enduring structure that has become part of the park's identity, spanning a unique lagoon.",
  "Julia Traweck: A dedicated park visitor who walks her dog Backer here five times weekly.",
  "Golf Course: The symbolic and beautiful golf course that defines Audubon Park's landscape.",
  "Lagoon Serenity: A peaceful lagoon with surface vegetation and crystal-clear center waters.",
  "Gumbel Fountain: Dedicated to Sophie and Simon Gumbel, featuring bronze sculptures by Isidore Konti.",
  "Cecile W Memorial: Honoring Cecile's memory through her beloved Crepe Myrtle Grove, dedicated November 20, 1996.",
  "Evening Monument: A carefully composed and color-corrected view showcasing the park's evening beauty.",
  "Golden Afternoon: Capturing the interplay of sunlight and grass in the city park.",
  "Couple's Joy: A happy moment shared on the bridge during a beautiful afternoon.",
  "Perfect Reflection: Sun's reflection dancing on water, creating a perfect photographic moment.",
  "Karma Sculpture: Symbolizing life's cyclical nature and our interconnectedness, from the City Park museum."
];

function preload() {
  bgImage = loadImage("Background.jpg");
  
  const photoFiles = [
    "IMG_0082.jpg", "IMG_0083.jpg", "IMG_0158.jpg", "IMG_0062.JPG",
    "IMG_0085.jpg", "IMG_0175.JPG", "IMG_0122.JPG", "IMG_2558.jpg",
    "IMG_2560.jpg", "IMG_2565.jpg", "IMG_2561.jpg", "IMG_0356.JPG"
  ];
  
  photoFiles.forEach(file => {
    photoImages.push(loadImage(file));
  });
  
  const drawingFiles = [
    "IMG_0049.jpeg", "IMG_0050.jpeg", "IMG_0052.jpeg", "IMG_0053.jpeg",
    "IMG_0055.jpeg", "IMG_0571.jpg", "IMG_0572.jpg", "IMG_1744.jpg",
    "IMG_1743.jpg", "IMG_3698.jpeg"
  ];
  
  drawingFiles.forEach(file => {
    drawingImages.push(loadImage(file));
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  noStroke();
  
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new EnhancedParticle());
  }
  
  createInterface();
  createVideoElements();
  applyGlobalStyles();
  
  fadeAlpha = 255;
  slideTransition = 1;
}

function draw() {
  updateAnimations();
  renderCurrentSection();
}

function updateAnimations() {
  if (isTransitioning) {
    fadeAlpha = lerp(fadeAlpha, 0, config.transitionSpeed);
    if (fadeAlpha < 5) {
      isTransitioning = false;
      fadeAlpha = 0;
    }
  } else {
    fadeAlpha = lerp(fadeAlpha, 255, config.fadeSpeed);
  }
  
  slideTransition = lerp(slideTransition, 1, 0.1);
  textReveal = min(textReveal + 0.02, 1);
}

function renderCurrentSection() {
  background(bgImage);
  
  if (currentSection === "photos") {
    renderPhotography();
  } else if (currentSection === "videos") {
    renderVideoEditing();
  } else if (currentSection === "animations") {
    renderAnimations();
  } else if (currentSection === "about") {
    renderAboutMe();
  } else if (currentSection === "drawings") {
    renderArtwork();
  }
}

function renderPhotography() {
  hideAllVideos();
  
  push();
  fill(255, fadeAlpha);
  textSize(42);
  drawingContext.shadowColor = 'rgba(0, 173, 181, 0.5)';
  drawingContext.shadowBlur = 20;
  
  const titleY = 80 + sin(frameCount * 0.02) * 5;
  text("Photography Portfolio", width / 2, titleY);
  pop();
  
  if (photoImages.length > 0) {
    updateSlideshow();
    renderImageWithEffects(
      photoImages[slideIndex],
      photoDescriptions[slideIndex],
      { r: 0, g: 173, b: 181 }
    );
  }
  
  renderSignature();
}

function renderVideoEditing() {
  hideAllVideos();
  
  push();
  fill(255, fadeAlpha);
  textSize(42);
  drawingContext.shadowColor = 'rgba(231, 76, 60, 0.5)';
  drawingContext.shadowBlur = 20;
  
  const titleY = 80 + sin(frameCount * 0.02) * 5;
  text("Video Editing Showcase", width / 2, titleY);
  pop();
  
  // Show only video editing videos
  if (videos.video1) videos.video1.show();
  if (videos.video2) videos.video2.show();
  if (videos.video3) videos.video3.show();
}

function renderAnimations() {
  hideAllVideos();
  
  push();
  fill(255, fadeAlpha);
  textSize(42);
  drawingContext.shadowColor = 'rgba(142, 68, 173, 0.5)';
  drawingContext.shadowBlur = 20;
  
  const titleY = 80 + sin(frameCount * 0.02) * 5;
  text("Anime Animation Portfolio", width / 2, titleY);
  pop();
  
  showAnimationVideos();
  
  push();
  fill(255, fadeAlpha * textReveal);
  textSize(18);
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.8)';
  drawingContext.shadowBlur = 10;
  text("Professional anime character animations created with advanced editing techniques", width / 2, height / 2 + 300);
  pop();
}

function showAnimationVideos() {
  if (!videos.animation1) {
    videos.animation1 = createVideo("Animation1.mov");
    videos.animation1.size(400, 225);
    videos.animation1.position(windowWidth / 2 - 420, windowHeight / 2 - 100);
    videos.animation1.hide();
    videos.animation1.elt.setAttribute("playsinline", "");
    videos.animation1.elt.setAttribute("controls", "");
    videos.animation1.elt.setAttribute("muted", "");
    videos.animation1.elt.muted = true;
    videos.animation1.elt.style.borderRadius = "15px";
    videos.animation1.elt.style.boxShadow = "0 10px 30px rgba(142, 68, 173, 0.5)";
    videos.animation1.elt.style.border = "3px solid rgba(142, 68, 173, 0.3)";
    videos.animation1.elt.style.transition = "all 0.3s ease";
  }
  
  if (!videos.animation2) {
    videos.animation2 = createVideo("Animation2.mov");
    videos.animation2.size(400, 225);
    videos.animation2.position(windowWidth / 2 + 20, windowHeight / 2 - 100);
    videos.animation2.hide();
    videos.animation2.elt.setAttribute("playsinline", "");
    videos.animation2.elt.setAttribute("controls", "");
    videos.animation2.elt.setAttribute("muted", "");
    videos.animation2.elt.muted = true;
    videos.animation2.elt.style.borderRadius = "15px";
    videos.animation2.elt.style.boxShadow = "0 10px 30px rgba(142, 68, 173, 0.5)";
    videos.animation2.elt.style.border = "3px solid rgba(142, 68, 173, 0.3)";
    videos.animation2.elt.style.transition = "all 0.3s ease";
  }
  
  // Show only animation videos and hide others
  hideAllVideos();
  if (videos.animation1) {
    videos.animation1.show();
    videos.animation1.elt.style.display = 'block';
  }
  if (videos.animation2) {
    videos.animation2.show();
    videos.animation2.elt.style.display = 'block';
  }
}

function renderAboutMe() {
  hideAllVideos();
  
  particles.forEach(particle => {
    particle.update();
    particle.display();
  });
  
  push();
  fill(255, fadeAlpha);
  textSize(36);
  drawingContext.shadowColor = 'rgba(155, 89, 182, 0.5)';
  drawingContext.shadowBlur = 15;
  text("About Jared Acosta", width / 2, height / 2 - 200);
  
  const story = [
    "I'm Acosta Jared. My name is Jared Acosta. My passion is editing and taking photos, and also Draw.",
    "My journey began in 2018 when I discovered the art of video editing through gaming content.",
    "What started as a hobby became my calling, leading to over 20k followers on social media.",
    "Despite setbacks, I've continued to grow and evolve, now using professional-grade software.",
    "Photography became my second passion, capturing moments wherever I go.",
    "Through dedicated study in photojournalism and photo editing, I've honed my craft.",
    "Now I'm excited to share my visual stories across multiple platforms."
  ];
  
  textSize(18);
  story.forEach((line, index) => {
    const y = height / 2 - 100 + (index * 35);
    const reveal = constrain((textReveal * 10) - index, 0, 1);
    fill(255, fadeAlpha * reveal);
    text(line, width / 2, y);
  });
  pop();
  
  renderSocialLinks();
}

function renderArtwork() {
  hideAllVideos();
  
  push();
  fill(255, fadeAlpha);
  textSize(42);
  drawingContext.shadowColor = 'rgba(243, 156, 18, 0.5)';
  drawingContext.shadowBlur = 20;
  
  const titleY = 80 + sin(frameCount * 0.02) * 5;
  text("Digital Art Portfolio", width / 2, titleY);
  pop();
  
  if (drawingImages.length > 0) {
    updateSlideshow();
    renderImageWithEffects(
      drawingImages[slideIndex],
      "Original Digital Artwork",
      { r: 243, g: 156, b: 18 }
    );
  }
}

function renderImageWithEffects(img, description, glowColor) {
  const imgW = 800;
  const imgH = 560;
  const x = width / 2 - imgW / 2;
  const y = height / 2 - imgH / 2 + 40;
  
  push();
  translate(x, y);
  
  drawingContext.shadowColor = `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.6)`;
  drawingContext.shadowBlur = 30;
  
  stroke(glowColor.r, glowColor.g, glowColor.b, 200);
  strokeWeight(4 + sin(frameCount * 0.05) * 2);
  fill(255, 0);
  rect(-5, -5, imgW + 10, imgH + 10, 15);
  
  tint(255, fadeAlpha * slideTransition);
  image(img, 0, 0, imgW, imgH);
  noTint();
  noStroke();
  pop();
  
  push();
  fill(255, fadeAlpha);
  textSize(22);
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.9)';
  drawingContext.shadowBlur = 15;
  
  const maxWidth = width - 100;
  const words = description.split(' ');
  let line = '';
  let yPos = y - 60;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const testWidth = textWidth(testLine);
    
    if (testWidth > maxWidth && i > 0) {
      text(line, width / 2, yPos);
      line = words[i] + ' ';
      yPos += 30;
    } else {
      line = testLine;
    }
  }
  text(line, width / 2, yPos);
  pop();
}

function renderSocialLinks() {
  const links = [
    { text: "Follow @mystic_vx on TikTok", url: "https://www.tiktok.com/@mystic_vx", y: height / 2 + 180 },
    { text: "Check out @jared_draws", url: "https://www.tiktok.com/@jared_draws", y: height / 2 + 220 }
  ];
  
  links.forEach((link, index) => {
    const isHovered = isMouseOverText(link.text, link.y);
    const pulse = 255 + 30 * sin(frameCount * 0.1);
    
    push();
    if (isHovered) {
      cursor(HAND);
      fill(255, 255, 0, pulse);
      textSize(22 + sin(frameCount * 0.1) * 2);
      drawingContext.shadowColor = 'rgba(255, 255, 0, 0.8)';
      drawingContext.shadowBlur = 20;
      
      if (mouseIsPressed) {
        window.open(link.url, "_blank");
      }
    } else {
      cursor(ARROW);
      fill(255, pulse);
      textSize(20);
      drawingContext.shadowBlur = 0;
    }
    
    text(link.text, width / 2, link.y);
    pop();
  });
}

function renderSignature() {
  push();
  fill(255, 255, 0, fadeAlpha);
  textSize(22);
  drawingContext.shadowColor = 'rgba(255, 255, 0, 0.8)';
  drawingContext.shadowBlur = 15;
  
  const signatureX = width - 150 + sin(frameCount * 0.03) * 3;
  const signatureY = height - 50 + cos(frameCount * 0.03) * 2;
  text("Jared Acosta", signatureX, signatureY);
  pop();
}

function updateSlideshow() {
  slideTimer++;
  if (slideTimer > config.slideInterval) {
    nextSlide();
  }
}

function nextSlide() {
  const maxIndex = currentSection === "photos" ? photoImages.length : drawingImages.length;
  slideIndex = (slideIndex + 1) % maxIndex;
  slideTimer = 0;
  slideTransition = 0;
}

function hideAllVideos() {
  Object.values(videos).forEach(video => {
    if (video && video.hide) {
      video.hide();
    }
  });
  
  // Also hide any animation videos that might exist as DOM elements
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    if (video.src && (video.src.includes('Animation1.mov') || video.src.includes('Animation2.mov'))) {
      video.style.display = 'none';
    }
  });
}

function transitionToSection(sectionId) {
  if (currentSection !== sectionId) {
    isTransitioning = true;
    
    const fadeOut = setInterval(() => {
      fadeAlpha -= 15;
      if (fadeAlpha <= 0) {
        clearInterval(fadeOut);
        
        currentSection = sectionId;
        slideIndex = 0;
        slideTimer = 0;
        textReveal = 0;
        slideTransition = 0;
        
        const animSection = document.querySelector('#animations');
        if (animSection) {
          animSection.style.display = 'none';
        }
        
        const fadeIn = setInterval(() => {
          fadeAlpha += 15;
          if (fadeAlpha >= 255) {
            fadeAlpha = 255;
            isTransitioning = false;
            clearInterval(fadeIn);
          }
        }, 16);
      }
    }, 16);
  }
}

function isMouseOverText(text, y) {
  const txtWidth = textWidth(text);
  return (
    mouseX > width / 2 - txtWidth / 2 &&
    mouseX < width / 2 + txtWidth / 2 &&
    mouseY > y - 15 &&
    mouseY < y + 15
  );
}

function createInterface() {
  const sections = [
    { id: "photos", label: "Photography", color: "#00adb5", icon: "📸" },
    { id: "videos", label: "Video Editing", color: "#e74c3c", icon: "🎬" },
    { id: "animations", label: "Animations", color: "#8e44ad", icon: "🎞️" },
    { id: "about", label: "About Me", color: "#9b59b6", icon: "👨‍🎨" },
    { id: "drawings", label: "Artwork", color: "#f39c12", icon: "🎨" }
  ];
  
  const nav = document.createElement('nav');
  nav.className = 'portfolio-nav';
  nav.style.cssText = `
    position: fixed;
    top: 15%;
    left: 20px;
    bottom: 15%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.9);
    padding: 35px 25px;
    border-radius: 35px;
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: stretch;
  `;
  
  // Add audio enable button
  const audioBtn = document.createElement('button');
  audioBtn.innerHTML = '🔊 Enable Audio';
  audioBtn.style.cssText = `
    padding: 16px 20px;
    border: none;
    border-radius: 25px;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
    margin-bottom: 15px;
    flex-shrink: 0;
  `;
  
  audioBtn.addEventListener('click', async () => {
    try {
      // Enable audio context
      if (typeof getAudioContext === 'function') {
        await getAudioContext().resume();
      }
      
      // Unmute all videos
      Object.values(videos).forEach(video => {
        if (video && video.elt) {
          video.elt.muted = false;
          video.elt.volume = 1.0;
        }
      });
      
      audioBtn.innerHTML = '🔊 Audio Ready!';
      audioBtn.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
      
      setTimeout(() => {
        audioBtn.style.display = 'none';
      }, 2000);
      
    } catch (e) {
      console.log('Audio enable attempt');
    }
  });
  
  nav.appendChild(audioBtn);
  
  sections.forEach((section, index) => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.innerHTML = `<span class="icon">${section.icon}</span><span class="text">${section.label}</span>`;
    btn.style.cssText = `
      padding: 20px 24px;
      border: none;
      border-radius: 30px;
      background: ${section.color};
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 12px;
      white-space: nowrap;
      box-shadow: 0 0 20px ${section.color}80, 0 2px 10px rgba(0, 0, 0, 0.3);
      min-width: 180px;
      justify-content: flex-start;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      flex: 1;
    `;
    
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateX(5px) scale(1.05)';
      btn.style.boxShadow = `0 0 25px ${section.color}, 0 0 35px ${section.color}60, 0 5px 20px rgba(0, 0, 0, 0.4)`;
      btn.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateX(0) scale(1)';
      btn.style.boxShadow = `0 0 15px ${section.color}80, 0 2px 10px rgba(0, 0, 0, 0.3)`;
      btn.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    });
    
    btn.addEventListener('click', () => {
      transitionToSection(section.id);
      updateActiveButton(btn);
    });
    
    nav.appendChild(btn);
    
    if (index === 0) {
      btn.classList.add('active');
      btn.style.background = `linear-gradient(135deg, ${section.color}, ${section.color}dd)`;
    }
  });
  
  document.body.appendChild(nav);
}

function createVideoElements() {
  const videoConfigs = [
    { src: "Dante2.mov", id: "video1", position: { x: -240, y: -120 } },
    { src: "Gojo2.mov", id: "video2", position: { x: 240, y: -120 } },
    { src: "Okarun2.mov", id: "video3", position: { x: 0, y: 80 } }
  ];
  
  videoConfigs.forEach(config => {
    const video = createVideo(config.src);
    video.size(400, 225);
    video.position(
      windowWidth / 2 + config.position.x - 200,
      windowHeight / 2 + config.position.y
    );
    video.hide();
    video.elt.setAttribute("playsinline", "");
    video.elt.setAttribute("controls", "");
    video.elt.removeAttribute("muted");
    video.elt.muted = false;
    video.elt.volume = 1.0;
    video.elt.style.borderRadius = "15px";
    video.elt.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    video.elt.style.border = "2px solid rgba(255, 255, 255, 0.1)";
    video.elt.style.transition = "all 0.3s ease";
    
    videos[config.id] = video;
  });
}

function updateActiveButton(activeBtn) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.style.transform = 'translateX(0) scale(1)';
  });
  
  activeBtn.classList.add('active');
  activeBtn.style.transform = 'translateX(5px) scale(1.05)';
  const color = activeBtn.style.background;
  activeBtn.style.boxShadow = `0 0 30px ${color}, 0 0 50px ${color}40, 0 5px 20px rgba(0, 0, 0, 0.4)`;
}

function applyGlobalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background: #000;
      overflow: hidden;
    }
    
    @keyframes glow {
      from { text-shadow: 0 0 20px rgba(255, 107, 107, 0.5); }
      to { text-shadow: 0 0 30px rgba(78, 205, 196, 0.8); }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .text-reveal {
      animation: fadeInUp 0.8s ease-out;
    }
    
    .nav-btn.active {
      transform: translateX(5px) scale(1.05) !important;
      box-shadow: 0 0 30px currentColor, 0 0 50px currentColor, 0 5px 20px rgba(0, 0, 0, 0.4) !important;
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.8) !important;
    }
    
    .portfolio-nav {
      animation: navGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes navGlow {
      from { box-shadow: 0 0 30px rgba(0, 255, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.4); }
      to { box-shadow: 0 0 40px rgba(0, 255, 255, 0.6), 0 4px 20px rgba(0, 0, 0, 0.4); }
    }
  `;
  
  document.head.appendChild(style);
}

class EnhancedParticle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.size = random(2, 6);
    this.color = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(200, 255)
    };
    this.alpha = random(50, 150);
    this.life = 1.0;
    this.maxLife = random(300, 600);
    this.currentLife = 0;
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
    
    this.currentLife++;
    this.life = 1.0 - (this.currentLife / this.maxLife);
    
    if (this.currentLife > this.maxLife) {
      this.reset();
    }
  }
  
  display() {
    push();
    translate(this.position.x, this.position.y);
    
    drawingContext.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * this.life / 255})`;
    drawingContext.shadowBlur = this.size * 2;
    
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.alpha * this.life);
    ellipse(0, 0, this.size);
    
    pop();
  }
  
  reset() {
    this.position.set(random(width), random(height));
    this.velocity.set(random(-1, 1), random(-1, 1));
    this.currentLife = 0;
    this.life = 1.0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  Object.values(videos).forEach((video, index) => {
    const positions = [
      { x: -240, y: -120 },
      { x: 240, y: -120 },
      { x: 0, y: 80 },
      { x: -420, y: -100 },
      { x: 20, y: -100 }
    ];
    
    if (positions[index]) {
      if (index < 3) {
        video.position(
          windowWidth / 2 + positions[index].x - 200,
          windowHeight / 2 + positions[index].y
        );
      } else {
        video.position(
          windowWidth / 2 + positions[index].x,
          windowHeight / 2 + positions[index].y
        );
      }
    }
  });
}

function mousePressed() {
  if (currentSection === "photos" || currentSection === "drawings") {
    nextSlide();
  }
}

function keyPressed() {
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    if (currentSection === "photos" || currentSection === "drawings") {
      if (key === 'ArrowRight') {
        nextSlide();
      } else {
        const maxIndex = currentSection === "photos" ? photoImages.length : drawingImages.length;
        slideIndex = (slideIndex - 1 + maxIndex) % maxIndex;
        slideTimer = 0;
        slideTransition = 0;
      }
    }
  }
}