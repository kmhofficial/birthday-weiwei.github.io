const birthdayMonth = 3; // April
const birthdayDay = 16;
const birthYear = 2007;

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicPanel = document.querySelector(".music-panel");
const volumeSlider = document.getElementById("volumeSlider");
const volumeText = document.getElementById("volumeText");

music.volume = 0.75;

function calculateAge() {
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    const birthdayThisYear = new Date(today.getFullYear(), birthdayMonth, birthdayDay);
    if (today < birthdayThisYear) age--;
    document.getElementById("age").textContent = age;
}
calculateAge();

function updateCountdown() {
    const now = new Date();
    let nextBirthday = new Date(now.getFullYear(), birthdayMonth, birthdayDay, 0, 0, 0);
    if (nextBirthday <= now) {
        nextBirthday = new Date(now.getFullYear() + 1, birthdayMonth, birthdayDay, 0, 0, 0);
    }

    const diff = nextBirthday - now;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* Stars */
for (let i = 0; i < 180; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 1.5 + Math.random() * 3 + "s";
    const size = 1 + Math.random() * 3;
    star.style.width = size + "px";
    star.style.height = size + "px";
    document.body.appendChild(star);
}

/* Floating hearts */
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = Math.random() > .5 ? "♥" : "♡";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = 12 + Math.random() * 25 + "px";
    heart.style.animationDuration = 5 + Math.random() * 7 + "s";
    document.getElementById("hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 13000);
}
setInterval(createHeart, 800);

/* Butterflies */
function createButterfly() {
    const butterfly = document.createElement("div");
    butterfly.className = "butterfly";
    butterfly.textContent = Math.random() > .5 ? "🦋" : "✦";
    butterfly.style.top = 30 + Math.random() * 50 + "%";
    butterfly.style.animationDuration = 8 + Math.random() * 7 + "s";
    document.getElementById("butterflies").appendChild(butterfly);
    setTimeout(() => butterfly.remove(), 16000);
}
setInterval(createButterfly, 5000);

/* Shooting stars */
function createShootingStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.left = 50 + Math.random() * 50 + "%";
    star.style.top = Math.random() * 40 + "%";
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1500);
}
setInterval(createShootingStar, 4500);

/* Surprise */
document.getElementById("surpriseButton").addEventListener("click", () => {
    document.querySelector(".message-section").scrollIntoView({ behavior: "smooth" });
    createHeartBurst();
    startFireworks();
});

/* Secret message */
document.getElementById("secretButton").addEventListener("click", () => {
    const message = document.getElementById("secretMessage");
    const button = document.getElementById("secretButton");
    message.classList.toggle("show");

    if (message.classList.contains("show")) {
        button.textContent = "You found my secret 💙";
        createHeartBurst();
        startFireworks();
    } else {
        button.textContent = "There's one more thing... ♡";
    }
});

function createHeartBurst() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.textContent = "♥";
            heart.style.left = 35 + Math.random() * 30 + "%";
            heart.style.fontSize = 15 + Math.random() * 30 + "px";
            heart.style.animationDuration = 3 + Math.random() * 4 + "s";
            document.getElementById("hearts").appendChild(heart);
            setTimeout(() => heart.remove(), 8000);
        }, i * 70);
    }
}

/* Music */
let musicPlaying = false;

musicButton.addEventListener("click", async () => {
    try {
        if (music.paused) {
            await music.play();
            musicPlaying = true;
            musicButton.textContent = "❚❚";
            musicButton.classList.add("playing");
            musicPanel.classList.add("playing");
        } else {
            music.pause();
            musicPlaying = false;
            musicButton.textContent = "♪";
            musicButton.classList.remove("playing");
            musicPanel.classList.remove("playing");
        }
    } catch (error) {
        console.error(error);
        alert(
            "Music could not play.\n\n" +
            "Make sure birthday-song.mp3 is in the same folder as index.html."
        );
    }
});

volumeSlider.addEventListener("input", () => {
    music.volume = Number(volumeSlider.value);
    volumeText.textContent = Math.round(music.volume * 100) + "%";
});

music.addEventListener("play", () => {
    musicPlaying = true;
    musicButton.textContent = "❚❚";
    musicButton.classList.add("playing");
    musicPanel.classList.add("playing");
});

music.addEventListener("pause", () => {
    musicPlaying = false;
    musicButton.textContent = "♪";
    musicButton.classList.remove("playing");
    musicPanel.classList.remove("playing");
});

/* Confetti */
function createConfetti(amount = 150) {
    const symbols = ["◆", "●", "✦", "♥", "✧"];
    const colors = ["#70c7ff", "#8de8ff", "#277cff", "#ffffff", "#a6dcff"];

    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        piece.style.left = Math.random() * 100 + "%";
        piece.style.fontSize = 8 + Math.random() * 15 + "px";
        piece.style.color = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = 3 + Math.random() * 5 + "s";
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 9000);
    }
}

/* Fireworks */
const fireworksCanvas = document.getElementById("fireworksCanvas");
const fireCtx = fireworksCanvas.getContext("2d");
let fireworks = [];

function resizeFireworks() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}
resizeFireworks();
window.addEventListener("resize", resizeFireworks);

class Particle {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.life = 100;
        this.gravity = .04;
        this.color = ["#70c7ff", "#8de8ff", "#277cff", "#ffffff"][Math.floor(Math.random() * 4)];
    }
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.speed *= .97;
        this.y += this.gravity;
        this.life -= 1;
    }
    draw() {
        fireCtx.globalAlpha = this.life / 100;
        fireCtx.fillStyle = this.color;
        fireCtx.beginPath();
        fireCtx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        fireCtx.fill();
    }
}

function explode(x, y) {
    for (let i = 0; i < 80; i++) {
        fireworks.push(new Particle(
            x, y,
            Math.random() * Math.PI * 2,
            2 + Math.random() * 5
        ));
    }
}

function animateFireworks() {
    fireCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworks = fireworks.filter(p => p.life > 0);
    fireworks.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

function startFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            explode(
                0.2 * window.innerWidth + Math.random() * 0.6 * window.innerWidth,
                0.15 * window.innerHeight + Math.random() * 0.5 * window.innerHeight
            );
        }, i * 500);
    }
    createConfetti(200);
}

/* Birthday popup */
function isBirthday() {
    const today = new Date();
    return today.getMonth() === birthdayMonth && today.getDate() === birthdayDay;
}

function closeBirthdayPopup() {
    document.getElementById("birthdayPopup").classList.remove("show");
}

if (isBirthday()) {
    setTimeout(() => {
        document.getElementById("birthdayPopup").classList.add("show");
        startFireworks();
    }, 1800);
}

/* Small heart on click */
document.addEventListener("click", event => {
    if (event.target.closest("button") || event.target.closest("input")) return;

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "♥";
    heart.style.left = event.clientX + "px";
    heart.style.bottom = (window.innerHeight - event.clientY) + "px";
    heart.style.animationDuration = "3s";
    document.getElementById("hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 3500);
});
