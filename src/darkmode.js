const darkModeClasses = [
  "nav",
  "article",
  "date",
  "photo-marquee",
  "book-item",
  "review-item",
  "times-wire-container",
  "movie-item",
  "footer",
];

const enableDarkMode = () => {
  document.body.classList.add("dark-mode");
  darkModeClasses.forEach((className) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((element) => {
      element.classList.add("dark-mode");
    });
  });

  document.querySelectorAll(".article").forEach((el) => el.classList.add("dark-mode"));
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-mode");
  darkModeClasses.forEach((className) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((element) => {
      element.classList.remove("dark-mode");
    });
  });
  localStorage.setItem("dark-mode", "disabled");
};

export const initDarkMode = () => {
  const toggle = document.getElementById("dark-mode");
  const label = document.getElementById("dark-mode-label");

  if (localStorage.getItem("dark-mode") === "enabled") {
    enableDarkMode();
    toggle.checked = true;
  } else {
    disableDarkMode();
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      enableDarkMode();
      label.textContent = "Disable Dark Mode";
    } else {
      disableDarkMode();
      label.textContent = "Enable Dark Mode";
    }
  });
};
