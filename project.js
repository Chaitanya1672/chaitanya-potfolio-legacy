import { Projects, FrontEndImages, BackEndImages, Others, ProfessionalProjects, projectsToShow as prjShowCount, profProjectsToShow as profPrjShowCount, prjIncreaseByCount } from "./constants.js";

const projectsContainer = document.getElementById("projectsContainer");
const profProjectsContainer = document.getElementById("prof-projectsContainer");
const frontEndLngLogos = document.querySelector(".front-end");
const backEndLngLogos = document.querySelector(".back-end");
const otherTechnologiesLogos = document.querySelector(".others");
const form = document.getElementById('myForm');

const loadMoreButton = document.querySelector('#load-more-button')
const showLessButton = document.querySelector('#show-less-button')
let projectsToShow = prjShowCount;
let profProjectsToShow = profPrjShowCount;

Projects.slice(0, projectsToShow).forEach((project) => {
  if (projectsToShow >= Projects.length) loadMoreButton.style.display = "none"
  const projectCard = createProjectCard(project);
  projectsContainer.appendChild(projectCard);
});


// Commented for time being
// ProfessionalProjects.slice(0, profProjectsToShow).forEach((project) => {
//   if (profProjectsToShow >= Projects.length) loadMoreButton.style.display = "none"
//   const projectCard = createProjectCard(project, true);
//   profProjectsContainer.appendChild(projectCard);
// });

loadMoreButton.addEventListener("click", () => {
  projectsToShow += prjIncreaseByCount;
  if (projectsToShow >= Projects.length) {
    loadMoreButton.style.display = "none"
    showLessButton.style.display = "block"
  }
  renderProjects();
});

showLessButton.addEventListener("click", () => {
  projectsToShow = prjShowCount;
  if (projectsToShow <= 6) {
    loadMoreButton.style.display = "block"
    showLessButton.style.display = "none"
  }
  renderProjects();
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    form.reset();
    alert("Thank you for contacting me, I will surely get back to you")
  })
  .catch(error => {
    alert('Something went wrong, please fill the form again!')
    console.error('Form submission error:', error);
  });
});

function createProjectCard(project, isProfProject) {
  const projectDiv = document.createElement("div");
  if(isProfProject) projectDiv.classList.add("profProject");
  else projectDiv.classList.add("project");

  const image = document.createElement("img");
  image.src = project.imageSrc;
  image.alt = project.title;

  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = project.title;

  if (isProfProject) {
    const description = document.createElement("div");
    const descSpan = document.createElement('span')
    descSpan.classList.add("small-description")
    descSpan.textContent = project.description
    description.append(descSpan)
    if (project.role) {
      description.innerHTML += "<br><br>Role: " + project.role;
    }
    if (project.tech && project.tech.length > 0) {
      const skillsText = project.tech.join(" | ");
      description.innerHTML += "<br>Tech: " + skillsText;
    }
    projectDiv.append(image, title, description);
  } else {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    const githubButton = createButton("Github", project.githubLink);
    const liveDemoButton = createButton("Live Demo", project.liveDemoLink);
    buttonsContainer.append(githubButton, liveDemoButton);
  
    projectDiv.append(image, title, buttonsContainer);
  }


  return projectDiv;
}

function createButton(label, link) {
  const button = document.createElement("button");
  button.classList.add(label.toLowerCase().replace(/\s/g, '-'));

  const anchor = document.createElement("a");
  anchor.href = link;
  anchor.target = "_blank"

  const icon = document.createElement("i");
  if(label.toLowerCase().replace(/\s/g, '-') === "github"){
    icon.classList.add("fa-brands", "fa-github", 'project-icon');
  }else {
    icon.classList.add( "fa-solid", "fa-link", "project-icon");
  }

  const buttonText = document.createTextNode(label);
  anchor.append(icon, buttonText);
  button.appendChild(anchor);

  return button;
}

function renderProjects() {
  projectsContainer.innerHTML = "";
  Projects.slice(0, projectsToShow).forEach((project) => {
    const projectCard = createProjectCard(project);
    projectsContainer.appendChild(projectCard);
  });
}

FrontEndImages.forEach(imageName => {
  const img = document.createElement("img");
  img.src = `Images/skills/${imageName}`;
  img.alt = imageName.replace(/\.(png|webp|svg)$/, "");
  img.title = imageName.replace(/\.(png|webp|svg)$/, "");
  frontEndLngLogos.appendChild(img);
});

BackEndImages.forEach(imageName => {
  const img = document.createElement("img");
  img.src = `Images/skills/${imageName}`;
  img.alt = imageName.replace(/\.(png|webp|svg)$/, "");
  img.title = imageName.replace(/\.(png|webp|svg)$/, "");
  backEndLngLogos.appendChild(img);
});

Others.forEach(imageName => {
  const img = document.createElement("img");
  img.src = `Images/skills/${imageName}`;
  img.alt = imageName.replace(/\.(png|webp|svg)$/, "");
  img.title = imageName.replace(/\.(png|webp|svg)$/, "");
  otherTechnologiesLogos.appendChild(img);
});