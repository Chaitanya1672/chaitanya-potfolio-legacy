const dynamicTexts = [" Technology Enthusiast", " Full-Stack Developer (MERN)"];
let dynamicTextIndex = 0;
let dynamicTextElement = document.getElementById("dynamic-text");

function toggleThemeIcon() {
  themeIcon.classList.toggle("fa-sun");
  themeIcon.classList.toggle("fa-moon");
}

function typeDynamicText() {
  let currentText = dynamicTexts[dynamicTextIndex];
  let currentIndex = 0;

  function typeCharacter() {
    if (currentIndex < currentText.length) {
      dynamicTextElement.textContent += currentText.charAt(currentIndex);
      currentIndex++;
      setTimeout(typeCharacter, 100);
    } else {
      setTimeout(eraseDynamicText, 300);
    }
  }

  function eraseDynamicText() {
    if (dynamicTextElement.textContent.length > 0) {
      dynamicTextElement.textContent = dynamicTextElement.textContent.slice(
        0,
        -1
      );
      setTimeout(eraseDynamicText, 50);
    } else {
      dynamicTextIndex = (dynamicTextIndex + 1) % dynamicTexts.length;
      setTimeout(typeDynamicText, 200);
    }
  }

  typeCharacter();
}

window.onload = typeDynamicText;
