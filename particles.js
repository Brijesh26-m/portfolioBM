/* =========================================
   VANTA.NET – 3D WIRE BACKGROUND (PORTFOLIO)
   Transparent, Depth, All Devices
========================================= */

(function () {
  if (!document.getElementById("vanta-net-bg")) return;

  // Load Three.js
  const three = document.createElement("script");
  three.src = "https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js";
  three.onload = loadVanta;
  document.head.appendChild(three);

  function loadVanta() {
    const vanta = document.createElement("script");
    vanta.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js";
    vanta.onload = initNet;
    document.head.appendChild(vanta);
  }

  function initNet() {
  const w = window.innerWidth;

  const isMobile = w <= 768;
  const isTablet = w > 768 && w <= 1200; // include big tablets & small laptops
  const isLaptop = w > 1200;

  const netEffect = VANTA.NET({
    el: "#vanta-net-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    backgroundColor: 0x000000,

    // Brand neon colors
    color: 0x45e3ff,       // cyan
    highlightColor: 0xff5bd7, // pink

    // Density control
    points: isLaptop ? 7.0 : isTablet ? 5.0 : 4.0,
    maxDistance: isLaptop ? 30.0 : isTablet ? 42.0 : 55.0,
    spacing: isLaptop ? 24.0 : isTablet ? 34.0 : 45.0,

    // Field spread
    scale: 1.0,
    scaleMobile: isLaptop ? 1.0 : isTablet ? 1.4 : 1.8,

    speed: 0.6
  });

  // Smooth Cyan ⇄ Pink breathing
  let t = 0;
  function animateNetColor() {
    t += 0.0025;

    const cyan = { r: 69, g: 227, b: 255 };
    const pink = { r: 255, g: 91, b: 215 };

    const lerp = (a, b, t) =>
      Math.round(a + (b - a) * (0.5 + 0.5 * Math.sin(t)));

    const r = lerp(cyan.r, pink.r, t);
    const g = lerp(cyan.g, pink.g, t + 1);
    const b = lerp(cyan.b, pink.b, t + 2);

    const color = (r << 16) | (g << 8) | b;

    netEffect.setOptions({
      color,
      highlightColor: color
    });

    requestAnimationFrame(animateNetColor);
  }

  animateNetColor();
}

})();
