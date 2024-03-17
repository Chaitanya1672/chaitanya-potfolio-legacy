import { Projects } from "./constants.js";

const projectsContainer = document.getElementById("projectsContainer");

Projects.forEach((project) => {
  const projectCard = createProjectCard(project);
  projectsContainer.appendChild(projectCard);
});

function createProjectCard(project) {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project");

  const image = document.createElement("img");
  image.src = project.imageSrc;
  image.alt = project.title;

  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = project.title;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");

  const githubButton = createButton("Github", project.githubLink);
  const liveDemoButton = createButton("Live Demo", project.liveDemoLink);

  buttonsContainer.append(githubButton, liveDemoButton);

  projectDiv.append(image, title, buttonsContainer);

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
