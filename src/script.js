// TODO: enable this and remove line 5
// const API_URL =
// 'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key={token}';

const apiKey = 'FE40v5xbxs1qTckbHckIT4x60JE1F6AF';

const API_URLS = {
  home: `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`,
  world: `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${apiKey}`,
  us: `https://api.nytimes.com/svc/topstories/v2/us.json?api-key=${apiKey}`,
  science: `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${apiKey}`,
  arts: `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${apiKey}`,
  mostpopular: `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`,
  bestsellers: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`,
  bookreviews: `https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=${apiKey}`,
  movies: `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name%3A"Movies" AND type_of_material%3A"Review"&sort=newest&page=0&api-key=${apiKey}`,
  articlesearch: (query) => `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${apiKey}`,
  timeswire: `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`,
};


const TopNews = document.getElementById('top-stories');
const BreakingNewsSection = document.getElementById('breaking-news');
const photoMarquee = document.getElementById('photo-marquee');
const BestSellerSection = document.getElementById('bestsellers');
const BookReviewsSection = document.getElementById('bookreviews');
const timesWireSection = document.getElementById('times-wire');
const movieSection = document.getElementById('movies-reviews');

const fetchData = async (endpoint) => {
  try {
    const res = await fetch(API_URLS[endpoint]);
    const data = await res.json();
    return data;
  } catch (e) {
    alert('An error occurred', e);
    return [];
  }
};

const updateHome = (data) => {
  clearContent();
  renderTopNews(data.results || data.response.docs);
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.querySelectorAll('.article').forEach(el => el.classList.add('dark-mode'));
  }
};

const clearContent = () => {
  TopNews.innerHTML = '';
};

const renderTopNews = (newsArray) => {
  clearContent();
  (newsArray || []).forEach((news) => {
    const newsContainer = createNewsArticle(news);
    TopNews.appendChild(newsContainer);
  });
};

const createNewsArticle = (news) => {
  const newsContainer = document.createElement('div');
  newsContainer.setAttribute('class', 'article');

  const imageUrl =
    news.multimedia && news.multimedia[0] && news.multimedia[0].url
      ? news.multimedia[0].url
      : '';

  newsContainer.innerHTML = `
    <div class="article-content">
      <div class="left">
        <h2 class="news-title">${
          news?.title || news?.headline?.main || 'No Title'
        }</h2>
        <p class="news-summary">${news?.abstract || 'No Summary'}</p>
        <a href="${news.url || news.web_url}" target="_blank">Read more</a>
      </div>
      <div class="right">
        ${
          imageUrl
            ? `<img src="${imageUrl}" alt="${
                news?.title || news?.headline?.main
              }" class="news-image" />`
            : ''
        }
      </div>
    </div>
  `;

  return newsContainer;
};

const updateSearchArticle = (data) => {
  clearContent();
  renderTopSearch(data.response.docs);
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.querySelectorAll('.article').forEach(el => el.classList.add('dark-mode'));
  }
};

const renderTopSearch = (newsArray) => {
  clearContent();
  (newsArray || []).forEach((news) => {
    const newsContainer = createSearchArticle(news);
    TopNews.appendChild(newsContainer);
  });
};

const createSearchArticle = (news) => {
  const TopSearch = document.getElementById('top-news');
  TopSearch.textContent = 'Top Results';

  const newsContainer = document.createElement('div');
  newsContainer.setAttribute('class', 'article');

  const imageUrl =
    news.multimedia && news.multimedia.length > 0 && news.multimedia[0].url
      ? `https://www.nytimes.com/${news.multimedia[0].url}`
      : '';

  newsContainer.innerHTML = `
    <div class="article-content">
      <div class="left">
        <h2 class="news-title">${news?.headline?.main || 'No Title'}</h2>
        <p class="news-summary">${news?.abstract || 'No Summary'}</p>
        <a href="${news.web_url}" target="_blank">Read more</a>
      </div>
      <div class="right">
        ${
          imageUrl
            ? `<img src="${imageUrl}" alt="${news?.headline?.main}" class="news-image" />`
            : ''
        }
      </div>
    </div>
  `;

  return newsContainer;
};

const updateMarquee = (marqueeData) => {
  BreakingNewsSection.innerHTML = '';

  marqueeData.results.forEach((newsItem) => {
    const newsTitle = document.createElement('p');
    newsTitle.textContent = newsItem.title;
    BreakingNewsSection.appendChild(newsTitle);
  });
};

const updatePhotoMarquee = (worldData) => {
  photoMarquee.innerHTML = '';

  (worldData.results || []).forEach((news) => {
    const media =
      Array.isArray(news.media) && news.media.length > 0 ? news.media : [];
    const imageUrl = media.length > 0 ? media[0]['media-metadata'][2].url : '';

    if (imageUrl) {
      const photoLink = document.createElement('a');
      photoLink.href = news.url;
      photoLink.target = '_blank';

      const photoItem = document.createElement('img');
      photoItem.src = imageUrl;
      photoItem.alt = news.title;
      photoItem.style.width = '200px';
      photoItem.style.height = '140px';
      photoItem.style.margin = '0 2rem';
      photoItem.style.border = '2px solid #aeaeae';

      photoLink.appendChild(photoItem);
      photoMarquee.appendChild(photoLink);
    }
  });
};

const updateAside = (bestsellersData, bookreviewsData) => {
  BestSellerSection.innerHTML = '';
  BookReviewsSection.innerHTML = '';

  (bestsellersData.results.books || []).forEach((book) => {
    const bookItemContainer = document.createElement('div');
    bookItemContainer.setAttribute('class', 'book-item');

    bookItemContainer.innerHTML = `
      <div>
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <img src="${book.book_image}" alt="${book.title}" style="width:100px;"/>
      </div>
      <a href="${book.amazon_product_url}" target="_blank">More Info</a>
    `;

    BestSellerSection.appendChild(bookItemContainer);
  });

  (bookreviewsData.results || []).forEach((review) => {
    const reviewItem = document.createElement('div');
    reviewItem.setAttribute('class', 'review-item');

    reviewItem.innerHTML = `
      <h3>${review.book_title}</h3>
      <p>${review.summary || 'No Summary...'}</p><br>
      <a href="${review.url}" target="_blank">Read Review</a>
    `;

    BookReviewsSection.appendChild(reviewItem);
  });
};

const updateTimesWire = (timesWireData) => {
  timesWireSection.innerHTML = '';

  (timesWireData.results || []).forEach((news) => {
    const timesWireContainer = document.createElement('div');
    timesWireContainer.setAttribute('class', 'times-wire-container');

    const imageUrl = news.multimedia.length > 0 ? news.multimedia[0].url : '';

    timesWireContainer.innerHTML = `
      <h3>${news.title}</h3>
      ${
        imageUrl
          ? `<img src="${imageUrl}" alt="${news.title}" class="times-wire-img" />`
          : ''
      }
      <p>${news.abstract}</p><br>
      <a href="${news.url}" target="_blank">Read more<a>
      
    `;

    timesWireSection.appendChild(timesWireContainer);
  });
};

const updateMovies = (moviesData) => {
  movieSection.innerHTML = ''; // Clear the section

  (moviesData.response.docs || []).forEach((movie) => {
    const movieItem = document.createElement('div');
    movieItem.setAttribute('class', 'movie-item');

    const multimedia = movie.multimedia || [];
    const imageUrl = multimedia.length > 0 ? multimedia[0].url : '';

    movieItem.innerHTML = `
      <h3>${movie.snippet}</h3>
      <p>${movie.lead_paragraph}</p>
      <a href="${movie.web_url}" target="_blank">More Info</a>
    `;
    movieSection.appendChild(movieItem);
  });
};

(async () => {
  const marqueeData = await fetchData('world');
  const homeData = await fetchData('home');
  const mostpopularData = await fetchData('mostpopular');
  const bestsellersData = await fetchData('bestsellers');
  const bookreviewsData = await fetchData('bookreviews');
  const timesWireData = await fetchData('timeswire');
  const moviesData = await fetchData('movies');

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
    world: 'world',
    us: 'us',
    science: 'science',
    arts: 'arts',
  };

  Object.keys(navItems).forEach((item) => {
    document
      .getElementById(item)
      .addEventListener('click', () => handleNavClick(navItems[item]));
  });

  fetchData('home').then((data) => updateHome(data));
};

initializeNavigation();

document.addEventListener('DOMContentLoaded', () => {
  const dayElements = document.getElementsByClassName('day');

  const getCurrentDayOfWeek = () => {
    const date = new Date();
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return daysOfWeek[date.getDay()];
  };

  const currentDayOfWeek = getCurrentDayOfWeek();
  for (let i = 0; i < dayElements.length; i++) {
    dayElements[i].textContent = `${currentDayOfWeek},`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const dateElement = document.getElementById('date');

  const today = new Date();

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  dateElement.textContent = formattedDate;
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('dark-mode');

  const darkModeClasses = [
    'nav',
    'article',
    'date',
    'photo-marquee',
    'book-item',
    'review-item',
    'times-wire-container',
    'movie-item',
    'footer',
  ];

  const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    darkModeClasses.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => {
        element.classList.add('dark-mode');
      });
    });

    document.querySelectorAll('.article').forEach(el => el.classList.add('dark-mode'));
    localStorage.setItem('dark-mode', 'enabled');
  };

  const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    darkModeClasses.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => {
        element.classList.remove('dark-mode');
      });
    });
    localStorage.setItem('dark-mode', 'disabled');
  };

  if (localStorage.getItem('dark-mode') === 'enabled') {
    enableDarkMode();
    toggle.checked = true;
  } else {
    disableDarkMode();
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
});


const checkbox = document.getElementById('dark-mode');
const label = document.getElementById('dark-mode-label');

checkbox.addEventListener('change', function () {
  if (checkbox.checked) {
    label.textContent = 'Disable Dark Mode'; //🌞
  } else {
    label.textContent = 'Enable Dark Mode'; //🌝
  }
});

document
  .querySelector('.back-to-top')
  .addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  const searchInput = document.querySelector('.search-container input');
  const searchButton = document.querySelector('.search-container button');
  
  searchButton.addEventListener('click', function () {
    const query = searchInput.value;
    if (query) {
      fetchArticles(query);
    }
  });
  
  // Add event listener for the Enter key
  searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
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

    updateSearchArticle(data)
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}
