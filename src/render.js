const TopNews = document.getElementById("top-stories");
const BreakingNewsSection = document.getElementById("breaking-news");
const photoMarquee = document.getElementById("photo-marquee");
const BestSellerSection = document.getElementById("bestsellers");
const BookReviewsSection = document.getElementById("bookreviews");
const timesWireSection = document.getElementById("times-wire");
const movieSection = document.getElementById("movies-reviews");

const clearContent = () => {
  TopNews.innerHTML = "";
};

const createNewsArticle = (news) => {
  const link = document.createElement("a");
  link.href = news.url || news.web_url;
  link.target = "_blank";
  link.setAttribute("class", "article");
  link.style.textDecoration = "none";
  link.style.color = "inherit";
  link.style.display = "block";
  link.style.cursor = "pointer";

  const imageUrl = news.multimedia && news.multimedia[0] && news.multimedia[0].url ? news.multimedia[0].url : "";

  link.innerHTML = `
    <div class="article-content">
      <div class="left">
        <h2 class="news-title">${news?.title || news?.headline?.main || "No Title"}</h2>
        <p class="news-summary">${news?.abstract || "No Summary"}</p>
      </div>
      <div class="right">
        ${imageUrl ? `<img src="${imageUrl}" alt="${news?.title || news?.headline?.main}" class="news-image" />` : ""}
      </div>
    </div>
  `;

  return link;
};

const renderTopNews = (newsArray) => {
  clearContent();
  (newsArray || []).forEach((news) => {
    const newsContainer = createNewsArticle(news);
    TopNews.appendChild(newsContainer);
  });
};

export const updateHome = (data) => {
  clearContent();
  renderTopNews(data.results || data.response.docs);
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.querySelectorAll(".article").forEach((el) => el.classList.add("dark-mode"));
  }
};

const createSearchArticle = (news) => {
  const TopSearch = document.getElementById("top-news");
  TopSearch.textContent = "Top Results";

  const link = document.createElement("a");
  link.href = news.web_url;
  link.target = "_blank";
  link.setAttribute("class", "article");
  link.style.textDecoration = "none";
  link.style.color = "inherit";
  link.style.display = "block";
  link.style.cursor = "pointer";

  const imageUrl =
    news.multimedia && news.multimedia.length > 0 && news.multimedia[0].url
      ? `https://www.nytimes.com/${news.multimedia[0].url}`
      : "";

  link.innerHTML = `
    <div class="article-content">
      <div class="left">
        <h2 class="news-title">${news?.headline?.main || "No Title"}</h2>
        <p class="news-summary">${news?.abstract || "No Summary"}</p>
      </div>
      <div class="right">
        ${imageUrl ? `<img src="${imageUrl}" alt="${news?.headline?.main}" class="news-image" />` : ""}
      </div>
    </div>
  `;

  return link;
};

const renderTopSearch = (newsArray) => {
  clearContent();
  (newsArray || []).forEach((news) => {
    const newsContainer = createSearchArticle(news);
    TopNews.appendChild(newsContainer);
  });
};

export const updateSearchArticle = (data) => {
  clearContent();
  renderTopSearch(data.response.docs);
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.querySelectorAll(".article").forEach((el) => el.classList.add("dark-mode"));
  }
};

export const updateMarquee = (marqueeData) => {
  BreakingNewsSection.innerHTML = "";

  marqueeData.results.forEach((newsItem) => {
    const newsTitle = document.createElement("p");
    newsTitle.textContent = newsItem.title;
    BreakingNewsSection.appendChild(newsTitle);
  });
};

export const updatePhotoMarquee = (worldData) => {
  photoMarquee.innerHTML = "";

  (worldData.results || []).forEach((news) => {
    const media = Array.isArray(news.media) && news.media.length > 0 ? news.media : [];
    const imageUrl = media.length > 0 ? media[0]["media-metadata"][2].url : "";

    if (imageUrl) {
      const photoLink = document.createElement("a");
      photoLink.href = news.url;
      photoLink.target = "_blank";

      const photoItem = document.createElement("img");
      photoItem.src = imageUrl;
      photoItem.alt = news.title;
      photoItem.style.width = "200px";
      photoItem.style.height = "140px";
      photoItem.style.margin = "0 2rem";
      photoItem.style.border = "2px solid #aeaeae";

      photoLink.appendChild(photoItem);
      photoMarquee.appendChild(photoLink);
    }
  });
};

export const updateAside = (bestsellersData, bookreviewsData) => {
  BestSellerSection.innerHTML = "";
  BookReviewsSection.innerHTML = "";

  (bestsellersData.results.books || []).forEach((book) => {
    const bookLink = document.createElement("a");
    bookLink.href = book.amazon_product_url;
    bookLink.target = "_blank";
    bookLink.setAttribute("class", "book-item");
    bookLink.style.textDecoration = "none";
    bookLink.style.color = "inherit";
    bookLink.style.display = "block";
    bookLink.style.cursor = "pointer";

    bookLink.innerHTML = `
      <div>
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <img src="${book.book_image}" alt="${book.title}" style="width:100px;"/>
      </div>
    `;

    BestSellerSection.appendChild(bookLink);
  });

  (bookreviewsData.results || []).forEach((review) => {
    const reviewLink = document.createElement("a");
    reviewLink.href = review.url;
    reviewLink.target = "_blank";
    reviewLink.setAttribute("class", "review-item");
    reviewLink.style.textDecoration = "none";
    reviewLink.style.color = "inherit";
    reviewLink.style.display = "block";
    reviewLink.style.cursor = "pointer";

    reviewLink.innerHTML = `
      <h3>${review.book_title}</h3>
      <p>${review.summary || "No Summary..."}</p>
    `;

    BookReviewsSection.appendChild(reviewLink);
  });
};

export const updateTimesWire = (timesWireData) => {
  timesWireSection.innerHTML = "";

  (timesWireData.results || []).forEach((news) => {
    const timesWireLink = document.createElement("a");
    timesWireLink.href = news.url;
    timesWireLink.target = "_blank";
    timesWireLink.setAttribute("class", "times-wire-container");
    timesWireLink.style.textDecoration = "none";
    timesWireLink.style.color = "inherit";
    timesWireLink.style.display = "block";
    timesWireLink.style.cursor = "pointer";

    const imageUrl = news.multimedia.length > 0 ? news.multimedia[0].url : "";

    timesWireLink.innerHTML = `
      <h3>${news.title}</h3>
      ${imageUrl ? `<img src="${imageUrl}" alt="${news.title}" class="times-wire-img" />` : ""}
      <p>${news.abstract}</p>
    `;

    timesWireSection.appendChild(timesWireLink);
  });
};

export const updateMovies = (moviesData) => {
  movieSection.innerHTML = ""; // Clear the section

  (moviesData.response.docs || []).forEach((movie) => {
    const movieLink = document.createElement("a");
    movieLink.href = movie.web_url;
    movieLink.target = "_blank";
    movieLink.setAttribute("class", "movie-item");
    movieLink.style.textDecoration = "none";
    movieLink.style.color = "inherit";
    movieLink.style.display = "block";
    movieLink.style.cursor = "pointer";

    movieLink.innerHTML = `
      <h3>${movie.snippet}</h3>
      <p>${movie.lead_paragraph}</p>
    `;
    movieSection.appendChild(movieLink);
  });
};
