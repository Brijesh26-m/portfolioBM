document.addEventListener("DOMContentLoaded", () => {
  const words = document.querySelectorAll(".cinematic-subline .word");
  let delay = 0;

  words.forEach(word => {
    setTimeout(() => word.classList.add("show"), delay);
    delay += 180;
  });
});

/* =========================
   DEVICE PROFILE
========================= */
const W = window.innerWidth;
const isMobile = W <= 768;
const isTablet = W > 768 && W <= 1024;
const DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

/* =========================
   VANTA CLOUDS (OPTIMIZED)
========================= */
(function () {
  if (!document.getElementById("vanta-clouds-bg")) return;

  const threeScript = document.createElement("script");
  threeScript.src = "https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js";
  threeScript.onload = () => {
    const vantaScript = document.createElement("script");
    vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js";
    vantaScript.onload = initVanta;
    document.head.appendChild(vantaScript);
  };
  document.head.appendChild(threeScript);

  function initVanta() {
    VANTA.CLOUDS({
      el: "#vanta-clouds-bg",
      mouseControls: !isMobile,
      touchControls: true,
      gyroControls: false,

      minHeight: 200,
      minWidth: 200,

      backgroundColor: 0x000000,
      backgroundAlpha: 0.0,
      skyColor: 0x000000,
      cloudShadowColor: 0x1a0c33,

      sunColor: 0x000000,
      sunGlareColor: 0x000000,
      sunlightColor: 0x000000,

      speed: isMobile ? 0.25 : isTablet ? 0.35 : 0.5,
      zoom: isMobile ? 0.65 : isTablet ? 0.8 : 0.9
    });
  }
})();



/* =========================
   PARTICLES (OPTIMIZED)
========================= */
const pCanvas = document.createElement("canvas");
pCanvas.id = "glow-particles";
document.getElementById("particles-js").appendChild(pCanvas);

const pCtx = pCanvas.getContext("2d");
let pw, ph;
let particles = [];

function resizeParticles() {
  pw = pCanvas.width = window.innerWidth * DPR;
  ph = pCanvas.height = window.innerHeight * DPR;
  pCanvas.style.width = window.innerWidth + "px";
  pCanvas.style.height = window.innerHeight + "px";
  pCtx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener("resize", resizeParticles);
resizeParticles();

function getBottomRatio() {
  if (isMobile) return 0.3;
  if (isTablet) return 0.5;
  return 0.53;
}

class GlowParticle {
  constructor() { this.reset(); }

  reset() {
    const start = getBottomRatio();
    this.x = Math.random() * pw;
    this.y = ph * start + Math.random() * (ph * (1 - start));
    this.size = Math.random() * (isMobile ? 3 : 3) + 1;
    this.speedX = (Math.random() - 0.5) * 0.25;
    this.speedY = Math.random() * 0.25 + 0.05;
    this.alpha = Math.random() * 0.6 + 0.3;
  }

  draw() {
    pCtx.beginPath();
    pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    pCtx.fillStyle = `rgba(200,220,255,${this.alpha})`;
    pCtx.fill();
  }

  update() {
    const topLimit = ph * getBottomRatio();
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > pw || this.y < topLimit || this.y > ph) this.reset();
  }
}

function initGlowParticles() {
  particles = [];
  const count = isMobile ? 40 : isTablet ? 70 : 120;
  for (let i = 0; i < count; i++) particles.push(new GlowParticle());
}

function animateGlowParticles() {
  pCtx.clearRect(0, 0, pw, ph);
  particles.forEach(p => { p.draw(); p.update(); });
  requestAnimationFrame(animateGlowParticles);
}

initGlowParticles();
animateGlowParticles();
