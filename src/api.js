const apiKey = process.env.API_KEY;

export const API_URLS = {
  home: `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`,
  world: `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${apiKey}`,
  us: `https://api.nytimes.com/svc/topstories/v2/us.json?api-key=${apiKey}`,
  science: `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${apiKey}`,
  arts: `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${apiKey}`,
  mostpopular: `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`,
  bestsellers: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`,
  bookreviews: `https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=${apiKey}`,
  movies: `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name%3A"Movies" AND type_of_material%3A"Review"&sort=newest&page=0&api-key=${apiKey}`,
  articlesearch: (query) =>
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${apiKey}`,
  timeswire: `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`,
};

export const fetchData = async (endpoint) => {
  try {
    const res = await fetch(API_URLS[endpoint]);
    const data = await res.json();
    return data;
  } catch (error) {
    // alert("An error occurred", error);
    return [];
  }
};
