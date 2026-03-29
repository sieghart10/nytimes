import { API_URLS, fetchData } from "./api.js";
import {
  updateHome,
  updateSearchArticle,
  updateMarquee,
  updatePhotoMarquee,
  updateAside,
  updateTimesWire,
  updateMovies,
} from "./render.js";
import { initDarkMode } from "./darkmode.js";

(async () => {
  const marqueeData = await fetchData("world");
  const homeData = await fetchData("home");
  const mostpopularData = await fetchData("mostpopular");
  const bestsellersData = await fetchData("bestsellers");
  const bookreviewsData = await fetchData("bookreviews");
  const timesWireData = await fetchData("timeswire");
  const moviesData = await fetchData("movies");

  updateMarquee(marqueeData);
  updateHome(homeData);
  updatePhotoMarquee(mostpopularData);
  updateAside(bestsellersData, bookreviewsData);
  updateTimesWire(timesWireData);
  updateMovies(moviesData);
})();

const initializeNavigation = () => {
  const handleNavClick = (endpoint) => {
    fetchData(endpoint).then((data) => updateHome(data));
  };

  const navItems = {
    world: "world",
    us: "us",
    science: "science",
    arts: "arts",
  };

  Object.keys(navItems).forEach((item) => {
    document.getElementById(item).addEventListener("click", () => handleNavClick(navItems[item]));
  });

  fetchData("home").then((data) => updateHome(data));
};

initializeNavigation();

document.addEventListener("DOMContentLoaded", () => {
  const dayElements = document.getElementsByClassName("day");

  const getCurrentDayOfWeek = () => {
    const date = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
  };

  const currentDayOfWeek = getCurrentDayOfWeek();
  for (let i = 0; i < dayElements.length; i++) {
    dayElements[i].textContent = `${currentDayOfWeek},`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("date");

  const today = new Date();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  dateElement.textContent = formattedDate;
});

document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
});

document.querySelector(".back-to-top").addEventListener("click", function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const searchInput = document.querySelector(".search-container input");
const searchButton = document.querySelector(".search-container button");

searchButton.addEventListener("click", function () {
  const query = searchInput.value;
  if (query) {
    fetchArticles(query);
  }
});

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const query = searchInput.value;
    if (query) {
      fetchArticles(query);
    }
  }
});

async function fetchArticles(query) {
  try {
    const apiUrl = API_URLS.articlesearch(query);
    const response = await fetch(apiUrl);
    const data = await response.json();

    updateSearchArticle(data);
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}
