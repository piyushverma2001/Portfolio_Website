const themeFilePaths = {
  light: "/static/css/style.css",
  blue: "/static/css/blue.css",
  green: "/static/css/green.css",
  purple: "/static/css/purple.css",
};

let theme = localStorage.getItem("theme");
let themeDots = document.getElementsByClassName("theme-dot");
const themeStyleLink = document.getElementById("theme-style");

function setTheme(mode) {
  if (themeFilePaths[mode]) {
    themeStyleLink.href = themeFilePaths[mode];
    localStorage.setItem("theme", mode);
  }
}

if (theme == null) {
  setTheme("light");
} else {
  setTheme(theme);
}

for (var i = 0; themeDots.length > i; i++) {
  themeDots[i].addEventListener("click", function () {
    let mode = this.dataset.mode;
    setTheme(mode);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  updateVisitorClock();
  setInterval(updateVisitorClock, 1000);
});

function updateVisitorClock() {
  const clockElement = document.getElementById("real-time-clock-display");
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  clockElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}
