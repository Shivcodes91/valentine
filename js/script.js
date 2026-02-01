/* =========================
   ELEMENT REFERENCES
========================= */
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const buttonArea = document.getElementById("buttonArea");

const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");
const heartsContainer = document.querySelector(".hearts");

/* =========================
   STATE VARIABLES
========================= */
let musicPlaying = false;
let noCount = 0;
let yesScale = 1;
let showingFirstBg = true;

/* =========================
   BACKGROUND IMAGES
========================= */
const backgrounds = [
  "assets/bg1.jpg",
  "assets/bg2.jpg",
  "assets/bg3.jpg"
];

let bgIndex = 1;

/* =========================
   BACKGROUND ROTATION
========================= */
setInterval(() => {
  const nextBg = backgrounds[bgIndex % backgrounds.length];

  if (showingFirstBg) {
    bg2.style.backgroundImage = `url(${nextBg})`;
    bg2.style.opacity = 1;
    bg1.style.opacity = 0;
  } else {
    bg1.style.backgroundImage = `url(${nextBg})`;
    bg1.style.opacity = 1;
    bg2.style.opacity = 0;
  }

  showingFirstBg = !showingFirstBg;
  bgIndex++;
}, 6000);

/* =========================
   FLOATING HEARTS
========================= */
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 14 + "px";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 400);

/* =========================
   MUSIC TOGGLE
========================= */
musicToggle.addEventListener("click", () => {
  if (!musicPlaying) {
    bgMusic.play();
    musicToggle.textContent = "🔈";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🔊";
  }
  musicPlaying = !musicPlaying;
});

/* Start music on first user interaction (browser safe) */
function startMusicOnce() {
  if (!musicPlaying) {
    bgMusic.play().catch(() => {});
    musicPlaying = true;
    musicToggle.textContent = "🔈";
  }
  document.removeEventListener("click", startMusicOnce);
}

document.addEventListener("click", startMusicOnce);

/* =========================
   YES BUTTON → WHATSAPP
========================= */
yesBtn.addEventListener("click", () => {
  const phoneNumber = "919140710892"; // NO +, NO spaces
  const messageText = "I tried saying NO… but YES won 💖😌";

  const whatsappURL =
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodeURIComponent(messageText);

  window.open(whatsappURL, "_blank");
});


/* =========================
   NO BUTTON ESCAPE LOGIC
========================= */
function moveNoButton() {
  noCount++;

  const maxX = buttonArea.clientWidth - noBtn.clientWidth;
  const maxY = buttonArea.clientHeight - noBtn.clientHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  // YES grows & glows
  yesScale += 0.08;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.classList.add("glow");

  const teaseMessages = [
    "Try YES 😌💖",
    "You know you want to 😏",
    "Wrong button 👀",
    "YES is glowing for a reason 💕",
    "No escape now 😘",
    "Destiny says YES 💖"
  ];

  message.textContent = teaseMessages[noCount % teaseMessages.length];
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);
