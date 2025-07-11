// Global variables for managing assets and state
let photoImages = [];
let drawingImages = [];
let bgImage;
let videos = {}; // Object to store p5.MediaElement video objects
let particles = []; // Array for background particles

// State variables for UI and animations
let currentSection = "photos"; // Current active section
let slideIndex = 0; // Current index for slideshows
let slideTimer = 0; // Timer for automatic slide transitions
let fadeAlpha = 0; // Alpha value for fade transitions (0-255)
let isTransitioning = false; // Flag to indicate if a section transition is in progress
let slideTransition = 1; // Value for image slide-in/fade-in effect (0-1)
let textReveal = 0; // Value for text reveal animation (0-1)

// Configuration object for easy tuning of parameters
const config = {
  slideInterval: 240, // Frames between automatic slide changes (approx 4 seconds at 60fps)
  transitionSpeed: 0.08, // Speed of fade-out transition
  fadeSpeed: 8, // Speed of fade-in transition
  particleCount: 30 // Number of background particles
};

// Descriptions for photography portfolio images
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

/**
 * Preloads all necessary assets (images, videos) before setup.
 * This ensures all media is available when the sketch starts.
 */
function preload() {
  bgImage = loadImage("Background.jpg"); // Load background image

  // List of photo files to load
  const photoFiles = [
    "IMG_0082.jpg", "IMG_0083.jpg", "IMG_0158.jpg", "IMG_0062.JPG",
    "IMG_0085.jpg", "IMG_0175.JPG", "IMG_0122.JPG", "IMG_2558.jpg",
    "IMG_2560.jpg", "IMG_2565.jpg", "IMG_2561.jpg", "IMG_0356.JPG"
  ];

  // Load each photo and add to the photoImages array
  photoFiles.forEach(file => {
    photoImages.push(loadImage(file));
  });

  // List of drawing files to load
  const drawingFiles = [
    "IMG_0049.jpeg", "IMG_0050.jpeg", "IMG_0052.jpeg", "IMG_0053.jpeg",
    "IMG_0055.jpeg", "IMG_0571.jpg", "IMG_0572.jpg", "IMG_1744.jpg",
    "IMG_1743.jpg", "IMG_3698.jpeg"
  ];

  // Load each drawing and add to the drawingImages array
  drawingFiles.forEach(file => {
    drawingImages.push(loadImage(file));
  });
}

/**
 * Setup function: Initializes the canvas and all necessary components.
 * Called once after preload.
 */
function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the window
  textAlign(CENTER, CENTER); // Set default text alignment
  noStroke(); // Disable drawing outlines for shapes

  // Initialize background particles
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new EnhancedParticle());
  }

  createInterface(); // Create the navigation buttons and other DOM elements
  createVideoElements(); // Create and configure video elements
  applyGlobalStyles(); // Apply custom CSS styles to the document

  // Initial state for transitions
  fadeAlpha = 255; // Start fully opaque for initial fade-in
  slideTransition = 1; // Start with full visibility for initial slide
}

/**
 * Draw function: Main animation loop.
 * Called repeatedly (typically 60 times per second).
 */
function draw() {
  updateAnimations(); // Update animation states (fades, transitions)
  renderCurrentSection(); // Draw content based on the current section
}

/**
 * Updates global animation variables for smooth transitions.
 */
function updateAnimations() {
  // Handle fade transition between sections
  if (isTransitioning) {
    fadeAlpha = lerp(fadeAlpha, 0, config.transitionSpeed); // Fade out
    if (fadeAlpha < 5) { // If almost fully faded out
      isTransitioning = false; // End transition
      fadeAlpha = 0; // Ensure it's fully transparent
    }
  } else {
    fadeAlpha = lerp(fadeAlpha, 255, config.fadeSpeed); // Fade in
  }

  // Smoothly bring in new slides/images
  slideTransition = lerp(slideTransition, 1, 0.1);

  // Gradually reveal text in "About Me" section
  textReveal = min(textReveal + 0.02, 1); // Increment up to 1
}

/**
 * Renders the content of the currently active section.
 */
function renderCurrentSection() {
  background(bgImage); // Draw the background image

  // Call the appropriate rendering function based on the current section
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

/**
 * Renders the Photography Portfolio section.
 */
function renderPhotography() {
  hideAllVideos(); // Ensure all video elements are hidden

  push(); // Save current drawing style settings
  fill(255, fadeAlpha); // Set text color with current fade alpha
  textSize(42); // Set title text size
  drawingContext.shadowColor = 'rgba(0, 173, 181, 0.5)'; // Teal shadow for photography
  drawingContext.shadowBlur = 20; // Shadow blur amount

  // Animate title position slightly
  const titleY = 80 + sin(frameCount * 0.02) * 5;
  text("Photography Portfolio", width / 2, titleY);
  pop(); // Restore previous drawing style settings

  // Render the current photo if available
  if (photoImages.length > 0) {
    updateSlideshow(); // Advance slideshow timer
    renderImageWithEffects(
      photoImages[slideIndex], // Current image
      photoDescriptions[slideIndex], // Current image description
      { r: 0, g: 173, b: 181 } // Glow color (teal)
    );
  }

  renderSignature(); // Render My signature
}

/**
 * Renders the Video Editing Showcase section.
 */
function renderVideoEditing() {
  hideAllVideos(); // Ensure all video elements are hidden

  push();
  fill(255, fadeAlpha);
  textSize(42);
  drawingContext.shadowColor = 'rgba(231, 76, 60, 0.5)'; // Reddish shadow for video editing
  drawingContext.shadowBlur = 20;

  const titleY = 80 + sin(frameCount * 0.02) * 5;
  text("Video Editing Showcase", width / 2, titleY);
  pop();

  // Show only the video editing videos
  if (videos.video1) videos.video1.show();
  if (videos.video2) videos.video2.show();
  if (videos.video3) videos.video3.show();
}

/**
 * Renders the Anime Animation Portfolio section.
 */
function renderAnimations() {
  hideAllVideos(); // Ensure all video elements are hidden

  push();
  fill(255, fadeAlpha);
  textSize(42);
  drawingContext.shadowColor = 'rgba(142, 68, 173, 0.5)'; // Purple shadow for animations
  drawingContext.shadowBlur = 20;

  const titleY = 80 + sin(frameCount * 0.02) * 5;
  text("Anime Animation Portfolio", width / 2, titleY);
  pop();

  showAnimationVideos(); // Display the animation video elements

  push();
  fill(255, fadeAlpha * textReveal); // Text fades in with textReveal
  textSize(18);
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.8)';
  drawingContext.shadowBlur = 10;
  text("Professional anime character animations created with advanced editing techniques", width / 2, height / 2 + 300);
  pop();
}

/**
 * Creates and displays the specific animation video elements.
 * This function ensures they are only created once and then toggled.
 */
function showAnimationVideos() {
  // Create animation1 video if it doesn't exist
  if (!videos.animation1) {
    videos.animation1 = createVideo("Animation1.mov");
    videos.animation1.size(400, 225);
    videos.animation1.position(windowWidth / 2 - 420, windowHeight / 2 - 100);
    videos.animation1.hide(); // Start hidden
    videos.animation1.elt.setAttribute("playsinline", ""); // For mobile compatibility
    videos.animation1.elt.setAttribute("controls", ""); // Show video controls
    videos.animation1.elt.setAttribute("muted", ""); // Start muted
    videos.animation1.elt.muted = true; // Ensure muted property is set
    videos.animation1.elt.style.borderRadius = "15px";
    videos.animation1.elt.style.boxShadow = "0 10px 30px rgba(142, 68, 173, 0.5)"; // Purple shadow
    videos.animation1.elt.style.border = "3px solid rgba(142, 68, 173, 0.3)";
    videos.animation1.elt.style.transition = "all 0.3s ease"; // Smooth CSS transitions
  }

  // Create animation2 video if it doesn't exist
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

  // Ensure only animation videos are shown and others are hidden
  hideAllVideos();
  if (videos.animation1) {
    videos.animation1.show();
    videos.animation1.elt.style.display = 'block'; // Ensure CSS display is block
  }
  if (videos.animation2) {
    videos.animation2.show();
    videos.animation2.elt.style.display = 'block';
  }
}

/**
 * Renders the "About Me" section with animated particles and text.
 */
function renderAboutMe() {
  hideAllVideos(); // Ensure all video elements are hidden

  // Update and display background particles
  particles.forEach(particle => {
    particle.update();
    particle.display();
  });

  push();
  fill(255, fadeAlpha);
  textSize(36);
  drawingContext.shadowColor = 'rgba(155, 89, 182, 0.5)'; // Purple shadow for About Me
  drawingContext.shadowBlur = 15;
  text("About Jared Acosta", width / 2, height / 2 - 200);

  // Story lines for the About Me section
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
  // Render each line with a staggered reveal animation
  story.forEach((line, index) => {
    const y = height / 2 - 100 + (index * 35);
    // Calculate reveal amount for each line
    const reveal = constrain((textReveal * 10) - index, 0, 1);
    fill(255, fadeAlpha * reveal); // Apply fade and reveal
    text(line, width / 2, y);
  });
  pop();

  renderSocialLinks(); // Render social media links
}

/**
 * Renders the Digital Art Portfolio section.
 */
function renderArtwork() {
  hideAllVideos(); // Ensure all video elements are hidden

  push();
  fill(255, fadeAlpha);
  textSize(42);
  drawingContext.shadowColor = 'rgba(243, 156, 18, 0.5)'; // Orange shadow for artwork
  drawingContext.shadowBlur = 20;

  const titleY = 80 + sin(frameCount * 0.02) * 5;
  text("Digital Art Portfolio", width / 2, titleY);
  pop();

  // Render the current drawing if available
  if (drawingImages.length > 0) {
    updateSlideshow(); // Advance slideshow timer
    renderImageWithEffects(
      drawingImages[slideIndex], // Current image
      "Original Digital Artwork", // Generic description for drawings
      { r: 243, g: 156, b: 18 } // Glow color (orange)
    );
  }
}

/**
 * Renders an image with dynamic effects like glow, animated border, and description.
 * @param {p5.Image} img - The image to render.
 * @param {string} description - Text description for the image.
 * @param {object} glowColor - RGB color object for the glow effect.
 */
function renderImageWithEffects(img, description, glowColor) {
  const imgW = 800; // Desired image width
  const imgH = 560; // Desired image height
  const x = width / 2 - imgW / 2; // X position to center image
  const y = height / 2 - imgH / 2 + 40; // Y position to center image, slightly offset

  push();
  translate(x, y); // Translate origin to image top-left corner

  // Apply shadow for the image glow effect
  drawingContext.shadowColor = `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.6)`;
  drawingContext.shadowBlur = 30;

  // Draw an animated glowing border around the image
  stroke(glowColor.r, glowColor.g, glowColor.b, 200);
  strokeWeight(4 + sin(frameCount * 0.05) * 2); // Pulsating border thickness
  fill(255, 0); // Transparent fill for the rectangle
  rect(-5, -5, imgW + 10, imgH + 10, 15); // Draw rectangle slightly larger than image, with rounded corners

  // Apply tint for fade-in effect
  tint(255, fadeAlpha * slideTransition);
  image(img, 0, 0, imgW, imgH); // Draw the image
  noTint(); // Remove tint for subsequent drawings
  noStroke(); // Disable stroke for subsequent drawings
  pop();

  push();
  fill(255, fadeAlpha); // Text color with fade alpha
  textSize(22);
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.9)'; // Dark shadow for text readability
  drawingContext.shadowBlur = 15;

  // Word wrapping for description text
  const maxWidth = width - 100;
  const words = description.split(' ');
  let line = '';
  let yPos = y - 60; // Position for the first line of description

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const testWidth = textWidth(testLine);

    if (testWidth > maxWidth && i > 0) {
      text(line, width / 2, yPos); // Draw current line
      line = words[i] + ' '; // Start new line with current word
      yPos += 30; // Move down for next line
    } else {
      line = testLine; // Add word to current line
    }
  }
  text(line, width / 2, yPos); // Draw the last line
  pop();
}

/**
 * Renders interactive social media links.
 */
function renderSocialLinks() {
  const links = [
    { text: "Follow @mystic_vx on TikTok", url: "https://www.tiktok.com/@mystic_vx", y: height / 2 + 180 },
    { text: "Check out @jared_draws", url: "https://www.tiktok.com/@jared_draws", y: height / 2 + 220 }
  ];

  links.forEach((link, index) => {
    const isHovered = isMouseOverText(link.text, link.y); // Check if mouse is over the text
    const pulse = 255 + 30 * sin(frameCount * 0.1); // Pulsating alpha effect

    push();
    if (isHovered) {
      cursor(HAND); // Change cursor to hand on hover
      fill(255, 255, 0, pulse); // Yellowish pulsating color
      textSize(22 + sin(frameCount * 0.1) * 2); // Pulsating text size
      drawingContext.shadowColor = 'rgba(255, 255, 0, 0.8)'; // Yellow shadow
      drawingContext.shadowBlur = 20;

      if (mouseIsPressed) {
        window.open(link.url, "_blank"); // Open link in new tab on click
      }
    } else {
      cursor(ARROW); // Default cursor
      fill(255, pulse); // White pulsating color
      textSize(20);
      drawingContext.shadowBlur = 0; // No shadow when not hovered
    }

    text(link.text, width / 2, link.y);
    pop();
  });
}

/**
 * Renders the artist's signature with a subtle animation.
 */
function renderSignature() {
  push();
  fill(255, 255, 0, fadeAlpha); // Yellow color with fade alpha
  textSize(22);
  drawingContext.shadowColor = 'rgba(255, 255, 0, 0.8)'; // Yellow shadow
  drawingContext.shadowBlur = 15;

  // Animate signature position slightly
  const signatureX = width - 150 + sin(frameCount * 0.03) * 3;
  const signatureY = height - 50 + cos(frameCount * 0.03) * 2;
  text("Jared Acosta", signatureX, signatureY);
  pop();
}

/**
 * Manages the automatic slideshow progression.
 */
function updateSlideshow() {
  slideTimer++;
  if (slideTimer > config.slideInterval) {
    nextSlide(); // Move to the next slide
  }
}

/**
 * Advances the slideshow to the next image/drawing.
 */
function nextSlide() {
  const maxIndex = currentSection === "photos" ? photoImages.length : drawingImages.length;
  slideIndex = (slideIndex + 1) % maxIndex; // Loop back to start if at end
  slideTimer = 0; // Reset timer
  slideTransition = 0; // Start new slide transition from 0 (fully faded out)
}

/**
 * Hides all video elements to prevent them from overlapping other sections.
 */
function hideAllVideos() {
  // Hide p5.MediaElement objects
  Object.values(videos).forEach(video => {
    if (video && video.hide) {
      video.hide();
    }
  });

  // Also hide any animation videos that might exist as raw DOM elements
  // (This is a fallback in case p5.js hide() doesn't fully remove display)
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    if (video.src && (video.src.includes('Animation1.mov') || video.src.includes('Animation2.mov'))) {
      video.style.display = 'none';
    }
  });
}

/**
 * Handles the smooth transition between different portfolio sections.
 * @param {string} sectionId - The ID of the section to transition to.
 */
function transitionToSection(sectionId) {
  if (currentSection !== sectionId) { // Only transition if changing section
    isTransitioning = true; // Start fade-out

    const fadeOut = setInterval(() => {
      fadeAlpha -= 15; // Decrease alpha
      if (fadeAlpha <= 0) {
        clearInterval(fadeOut); // Stop fade-out
        fadeAlpha = 0; // Ensure fully transparent

        currentSection = sectionId; // Change section
        slideIndex = 0; // Reset slideshow index
        slideTimer = 0; // Reset slideshow timer
        textReveal = 0; // Reset text reveal
        slideTransition = 0; // Reset slide transition for new content

        // Specific handling for animation section DOM element if needed
        const animSection = document.querySelector('#animations');
        if (animSection) {
          animSection.style.display = 'none';
        }

        // Start fade-in for the new section
        const fadeIn = setInterval(() => {
          fadeAlpha += 15; // Increase alpha
          if (fadeAlpha >= 255) {
            fadeAlpha = 255; // Ensure fully opaque
            isTransitioning = false; // End transition
            clearInterval(fadeIn); // Stop fade-in
          }
        }, 16); // ~60fps
      }
    }, 16); // ~60fps
  }
}

/**
 * Checks if the mouse cursor is over a given text element.
 * @param {string} text - The text content to check.
 * @param {number} y - The Y position of the text.
 * @returns {boolean} True if mouse is over the text, false otherwise.
 */
function isMouseOverText(text, y) {
  const txtWidth = textWidth(text); // Get width of the text
  return (
    mouseX > width / 2 - txtWidth / 2 &&
    mouseX < width / 2 + txtWidth / 2 &&
    mouseY > y - 15 && // Approximate height of text line
    mouseY < y + 15
  );
}

/**
 * Creates the navigation interface (buttons) as DOM elements.
 */
function createInterface() {
  // Define sections with their properties
  const sections = [
    { id: "photos", label: "Photography", color: "#00adb5", icon: "📸" },
    { id: "videos", label: "Video Editing", color: "#e74c3c", icon: "🎬" },
    { id: "animations", label: "Animations", color: "#8e44ad", icon: "🎞️" },
    { id: "about", label: "About Me", color: "#9b59b6", icon: "👨‍🎨" },
    { id: "drawings", label: "Artwork", color: "#f39c12", icon: "🎨" }
  ];

  const nav = document.createElement('nav');
  nav.className = 'portfolio-nav';
  // Apply inline CSS for the navigation bar
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
    background: linear-gradient(135deg, #ff6b6b, #ee5a24); /* Red-orange gradient */
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
    margin-bottom: 15px;
    flex-shrink: 0; /* Prevent shrinking */
  `;

  audioBtn.addEventListener('click', async () => {
    try {
      // Attempt to resume audio context for web audio API
      if (typeof getAudioContext === 'function') {
        await getAudioContext().resume();
      }

      // Unmute all video elements
      Object.values(videos).forEach(video => {
        if (video && video.elt) {
          video.elt.muted = false;
          video.elt.volume = 1.0; // Set volume to full
        }
      });

      audioBtn.innerHTML = '🔊 Audio Ready!'; // Change button text
      audioBtn.style.background = 'linear-gradient(135deg, #00b894, #00a085)'; // Change to green gradient

      // Hide button after a short delay
      setTimeout(() => {
        audioBtn.style.display = 'none';
      }, 2000);

    } catch (e) {
      console.log('Audio enable attempt failed or not needed:', e);
    }
  });

  nav.appendChild(audioBtn); // Add audio button to navigation

  // Create buttons for each section
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
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Custom cubic-bezier for smooth animation */
      display: flex;
      align-items: center;
      gap: 12px;
      white-space: nowrap;
      box-shadow: 0 0 20px ${section.color}80, 0 2px 10px rgba(0, 0, 0, 0.3);
      min-width: 180px;
      justify-content: flex-start;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      flex: 1; /* Allow buttons to grow/shrink */
    `;

    // Add hover effects
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateX(5px) scale(1.05)'; // Move and slightly scale
      btn.style.boxShadow = `0 0 25px ${section.color}, 0 0 35px ${section.color}60, 0 5px 20px rgba(0, 0, 0, 0.4)`; // Enhanced shadow
      btn.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8)'; // Enhanced text shadow
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateX(0) scale(1)'; // Reset transform
      btn.style.boxShadow = `0 0 15px ${section.color}80, 0 2px 10px rgba(0, 0, 0, 0.3)`; // Reset shadow
      btn.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)'; // Reset text shadow
    });

    // Add click event to transition sections and update active button
    btn.addEventListener('click', () => {
      transitionToSection(section.id);
      updateActiveButton(btn);
    });

    nav.appendChild(btn); // Add button to navigation bar

    // Set initial active button
    if (index === 0) {
      btn.classList.add('active');
      // Apply a linear gradient for the active state background
      btn.style.background = `linear-gradient(135deg, ${section.color}, ${section.color}dd)`;
    }
  });

  document.body.appendChild(nav); // Add navigation bar to the document body
}

/**
 * Creates and configures the p5.MediaElement video objects for the video editing section.
 */
function createVideoElements() {
  const videoConfigs = [
    { src: "Dante2.mov", id: "video1", position: { x: -240, y: -120 } },
    { src: "Gojo2.mov", id: "video2", position: { x: 240, y: -120 } },
    { src: "Okarun2.mov", id: "video3", position: { x: 0, y: 80 } }
  ];

  videoConfigs.forEach(config => {
    const video = createVideo(config.src);
    video.size(400, 225); // Set video size
    video.position(
      windowWidth / 2 + config.position.x - 200, // Calculate centered position with offset
      windowHeight / 2 + config.position.y
    );
    video.hide(); // Initially hide videos
    video.elt.setAttribute("playsinline", ""); // Enable inline playback for iOS
    video.elt.setAttribute("controls", ""); // Show video controls
    video.elt.removeAttribute("muted"); // Ensure muted attribute is removed
    video.elt.muted = false; // Explicitly set muted to false
    video.elt.volume = 1.0; // Set volume to full
    video.elt.style.borderRadius = "15px"; // Rounded corners
    video.elt.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)"; // Shadow effect
    video.elt.style.border = "2px solid rgba(255, 255, 255, 0.1)"; // Subtle border
    video.elt.style.transition = "all 0.3s ease"; // Smooth CSS transitions

    videos[config.id] = video; // Store video object in the global 'videos' object
  });
}

/**
 * Updates the visual state of navigation buttons to show which one is active.
 * @param {HTMLElement} activeBtn - The button element that should be marked as active.
 */
function updateActiveButton(activeBtn) {
  // Remove 'active' class and reset styles for all buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.style.transform = 'translateX(0) scale(1)'; // Reset transform
  });

  // Add 'active' class and apply active styles to the clicked button
  activeBtn.classList.add('active');
  activeBtn.style.transform = 'translateX(5px) scale(1.05)'; // Apply active transform
  // Extract color from the button's background style (assuming it's set by createInterface)
  const color = activeBtn.style.background;
  activeBtn.style.boxShadow = `0 0 30px ${color}, 0 0 50px ${color}40, 0 5px 20px rgba(0, 0, 0, 0.4)`; // Enhanced shadow for active state
}

/**
 * Applies global CSS styles to the document head.
 * This includes font imports, basic resets, and keyframe animations.
 */
function applyGlobalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    /* Basic CSS Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif; /* Modern sans-serif font */
      background: #000; /* Black background */
      overflow: hidden; /* Prevent scrollbars */
    }
    
    /* Keyframe animation for text glow (example, not directly used by p5 text) */
    @keyframes glow {
      from { text-shadow: 0 0 20px rgba(255, 107, 107, 0.5); }
      to { text-shadow: 0 0 30px rgba(78, 205, 196, 0.8); }
    }
    
    /* Keyframe animation for text reveal (used by text-reveal class) */
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
    
    /* Styles for active navigation button */
    .nav-btn.active {
      transform: translateX(5px) scale(1.05) !important; /* Override hover transform */
      box-shadow: 0 0 30px currentColor, 0 0 50px currentColor, 0 5px 20px rgba(0, 0, 0, 0.4) !important; /* Enhanced shadow */
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.8) !important; /* Enhanced text shadow */
    }
    
    /* Keyframe animation for navigation bar glow */
    .portfolio-nav {
      animation: navGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes navGlow {
      from { box-shadow: 0 0 30px rgba(0, 255, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.4); }
      to { box-shadow: 0 0 40px rgba(0, 255, 255, 0.6), 0 4px 20px rgba(0, 0, 0, 0.4); }
    }
  `;

  document.head.appendChild(style); // Append styles to the document head
}

/**
 * Class representing an enhanced background particle with life cycle and glow.
 */
class EnhancedParticle {
  constructor() {
    this.position = createVector(random(width), random(height)); // Random starting position
    this.velocity = createVector(random(-1, 1), random(-1, 1)); // Random initial velocity
    this.acceleration = createVector(0, 0); // No initial acceleration
    this.size = random(2, 6); // Random size
    this.color = { // Random bluish color
      r: random(100, 255),
      g: random(100, 255),
      b: random(200, 255)
    };
    this.alpha = random(50, 150); // Random transparency
    this.life = 1.0; // Current life (1.0 = full, 0.0 = dead)
    this.maxLife = random(300, 600); // Max frames before reset
    this.currentLife = 0; // Current frames lived
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration

    // Wrap around edges
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;

    this.currentLife++;
    this.life = 1.0 - (this.currentLife / this.maxLife); // Decrease life over time

    if (this.currentLife > this.maxLife) {
      this.reset(); // Reset particle if its life is over
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y);

    // Apply shadow for glow effect
    drawingContext.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * this.life / 255})`;
    drawingContext.shadowBlur = this.size * 2; // Shadow blur based on size

    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.alpha * this.life); // Fill with fading color
    ellipse(0, 0, this.size); // Draw particle as a circle

    pop();
  }

  reset() {
    this.position.set(random(width), random(height)); // New random position
    this.velocity.set(random(-1, 1), random(-1, 1)); // New random velocity
    this.currentLife = 0; // Reset life counter
    this.life = 1.0; // Reset life value
  }
}

/**
 * Event handler for window resize. Resizes canvas and repositions videos.
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize p5.js canvas

  // Reposition video elements to remain centered relative to new window size
  Object.values(videos).forEach((video, index) => {
    const positions = [
      { x: -240, y: -120 }, // Video 1 offset
      { x: 240, y: -120 },  // Video 2 offset
      { x: 0, y: 80 },      // Video 3 offset
      { x: -420, y: -100 }, // Animation 1 offset
      { x: 20, y: -100 }    // Animation 2 offset
    ];

    if (positions[index]) {
      // Adjust positioning logic based on whether it's a video editing video or animation video
      if (index < 3) { // First three are video editing videos
        video.position(
          windowWidth / 2 + positions[index].x - 200,
          windowHeight / 2 + positions[index].y
        );
      } else { // The rest are animation videos
        video.position(
          windowWidth / 2 + positions[index].x,
          windowHeight / 2 + positions[index].y
        );
      }
    }
  });
}

/**
 * Event handler for mouse press. Advances slideshow on click in certain sections.
 */
function mousePressed() {
  if (currentSection === "photos" || currentSection === "drawings") {
    nextSlide(); // Go to next slide
  }
}

/**
 * Event handler for key press. Allows navigation of slideshows with arrow keys.
 */
function keyPressed() {
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    if (currentSection === "photos" || currentSection === "drawings") {
      if (key === 'ArrowRight') {
        nextSlide(); // Go to next slide
      } else {
        // Go to previous slide, wrapping around
        const maxIndex = currentSection === "photos" ? photoImages.length : drawingImages.length;
        slideIndex = (slideIndex - 1 + maxIndex) % maxIndex;
        slideTimer = 0; // Reset timer
        slideTransition = 0; // Start new slide transition
      }
    }
  }
}


// -------------------- ENHANCEMENTS ADDED BELOW --------------------

// Matrix-style falling code background
let matrixSymbols = [];
let matrixCols;

function setupMatrix() {
  matrixCols = floor(width / 20);
  for (let i = 0; i < matrixCols; i++) {
    matrixSymbols[i] = new MatrixSymbol(i * 20, random(-1000, 0));
  }
}

class MatrixSymbol {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(2, 6);
    this.color = random() < 0.5 ? color(255) : color(255, 255, 0);
  }

  draw() {
    fill(this.color);
    textSize(16);
    text(String.fromCharCode(0x30A0 + int(random(0, 96))), this.x, this.y);
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-100, 0);
    }
  }
}

// Wave effect on section buttons
let waveEffects = [];

class Wave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 255;
  }

  update() {
    this.radius += 3;
    this.alpha -= 6;
  }

  show() {
    noFill();
    stroke(255, 255, 0, this.alpha);
    strokeWeight(3);
    ellipse(this.x, this.y, this.radius);
  }

  isFinished() {
    return this.alpha <= 0;
  }
}

// Override mousePressed to trigger wave effect and slide
function mousePressed() {
  waveEffects.push(new Wave(mouseX, mouseY));

  if (currentSection === "photos" || currentSection === "drawings") {
    nextSlide();
  }
}

// Override draw to include matrix and wave
const originalDraw = draw;
draw = function() {
  background(0);
  if (matrixSymbols.length > 0) {
    for (let symbol of matrixSymbols) {
      symbol.draw();
    }
  }

  // Call existing draw functionality
  originalDraw();

  // Draw wave effects
  for (let i = waveEffects.length - 1; i >= 0; i--) {
    waveEffects[i].update();
    waveEffects[i].show();
    if (waveEffects[i].isFinished()) {
      waveEffects.splice(i, 1);
    }
  }
}

// Better layout for videos
function repositionVideosImproved() {
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;

  const positions = [
    { x: centerX - 160, y: centerY - 100 }, // Video 1
    { x: centerX + 40,  y: centerY - 100 }, // Video 2
    { x: centerX - 60,  y: centerY + 80 },  // Video 3 centrado abajo
  ];

  Object.values(videos).forEach((video, index) => {
    if (positions[index]) {
      video.position(positions[index].x, positions[index].y);
    }
  });
}
  const startX = windowWidth / 2 - 300;
  const startY = windowHeight / 2 - 150;
  const spacingX = 320;
  const spacingY = 200;

  Object.values(videos).forEach((video, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    video.position(startX + col * spacingX, startY + row * spacingY);
  });


windowResized = function() {
  resizeCanvas(windowWidth, windowHeight);
  repositionVideosImproved();
}

setup = (function (originalSetup) {
  return function () {
    originalSetup();
    setupMatrix();
    repositionVideosImproved();
  }
})(setup);

