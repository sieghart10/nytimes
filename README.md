# The New York Times - News Aggregator

A front-end web application that aggregates and displays news from the [New York Times API](https://developer.nytimes.com/).

## Features

- **Top Stories** - Browse top news from Home, World, US, Science, and Arts sections
- **Breaking News Marquee** - Scrolling headlines from world news
- **Most Popular Stories** - Photo carousel of trending articles
- **Article Search** - Search the NYT article archive by keyword
- **Books** - Best sellers list and book reviews
- **Times Wire** - Latest stories from the NYT newswire
- **Movie Reviews** - Recent movie reviews
- **Dark Mode** - Toggle between light and dark themes (persists via localStorage)

## Tech Stack

- HTML, CSS, JavaScript (ES Modules)
- [Parcel](https://parceljs.org/) - Bundler
- [NYT API](https://developer.nytimes.com/) - Data source

## Project Structure

```
src/
  index.html    - Main HTML page
  style.css     - Styles and responsive design
  script.js     - Entry point, navigation, and event handling
  api.js        - API configuration and data fetching
  render.js     - DOM rendering for all content sections
  darkmode.js   - Dark mode toggle logic
```

## Setup

1. Get an API key from [developer.nytimes.com](https://developer.nytimes.com/)
2. Create a `.env` file in the project root:
   ```
   API_KEY=your_api_key_here
   ```
3. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
4. Open [http://localhost:1234](http://localhost:1234)

## Build

```bash
npm run build
```

Outputs to the `docs/` folder for GitHub Pages deployment.

## Disclaimer

For educational purposes only. Data provided by The New York Times.
