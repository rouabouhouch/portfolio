document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".toggle-btn");
  const nav = document.querySelector("nav");

  toggleBtn.addEventListener("click", function () {
    if (nav.style.display === "block") {
      nav.style.display = "none";
    } else {
      nav.style.display = "block";
    }
  });
});

function startWave(element) {
  const text = element.textContent;
  const words = text.split(" ");
  const fragment = document.createDocumentFragment();

  words.forEach((word, wordIndex) => {
    const wordContainer = document.createElement("span");

    word.split("").forEach((char, charIndex) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("letter");
      span.style.animationDelay = `${
        (wordIndex * word.length + charIndex) * 0.05
      }s`; // Adjust delay as needed
      wordContainer.appendChild(span);
    });

    fragment.appendChild(wordContainer);

    if (wordIndex < words.length - 1) {
      const spaceSpan = document.createElement("span");
      spaceSpan.textContent = " ";
      fragment.appendChild(spaceSpan);
    }
  });

  element.innerHTML = "";
  element.appendChild(fragment);
}

function stopWave(element) {
  element.innerHTML = element.textContent;
}
window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  var opacity = scrollPosition / window.innerHeight; // Adjust window.innerHeight for more/less intense fading
  document.getElementById("hero").style.backgroundImage =
    "linear-gradient(rgba(0, 0, 0, " +
    opacity +
    "), rgba(0, 0, 0, " +
    opacity +
    ')), url("hero.png")';
});
