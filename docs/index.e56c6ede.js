const e="FE40v5xbxs1qTckbHckIT4x60JE1F6AF",t={home:`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${e}`,world:`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${e}`,us:`https://api.nytimes.com/svc/topstories/v2/us.json?api-key=${e}`,science:`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${e}`,arts:`https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${e}`,mostpopular:`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${e}`,bestsellers:`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${e}`,bookreviews:`https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=${e}`,movies:`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name%3A"Movies" AND type_of_material%3A"Review"&sort=newest&page=0&api-key=${e}`,articlesearch:t=>`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(t)}&api-key=${e}`,timeswire:`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${e}`},a=document.getElementById("top-stories"),r=document.getElementById("breaking-news"),n=document.getElementById("photo-marquee"),s=document.getElementById("bestsellers"),i=document.getElementById("bookreviews"),o=document.getElementById("times-wire"),l=document.getElementById("movies-reviews"),c=async e=>{try{let a=await fetch(t[e]);return await a.json()}catch(e){return alert("An error occurred",e),[]}},d=e=>{m(),u(e.results||e.response.docs),"enabled"===localStorage.getItem("dark-mode")&&document.querySelectorAll(".article").forEach(e=>e.classList.add("dark-mode"))},m=()=>{a.innerHTML=""},u=e=>{m(),(e||[]).forEach(e=>{let t=h(e);a.appendChild(t)})},h=e=>{let t=document.createElement("div");t.setAttribute("class","article");let a=e.multimedia&&e.multimedia[0]&&e.multimedia[0].url?e.multimedia[0].url:"";return t.innerHTML=`
    <div class="article-content">
      <div class="left">
        <h2 class="news-title">${e?.title||e?.headline?.main||"No Title"}</h2>
        <p class="news-summary">${e?.abstract||"No Summary"}</p>
        <a href="${e.url||e.web_url}" target="_blank">Read more</a>
      </div>
      <div class="right">
        ${a?`<img src="${a}" alt="${e?.title||e?.headline?.main}" class="news-image" />`:""}
      </div>
    </div>
  `,t},p=e=>{m(),y(e.response.docs),"enabled"===localStorage.getItem("dark-mode")&&document.querySelectorAll(".article").forEach(e=>e.classList.add("dark-mode"))},y=e=>{m(),(e||[]).forEach(e=>{let t=v(e);a.appendChild(t)})},v=e=>{document.getElementById("top-news").textContent="Top Results";let t=document.createElement("div");t.setAttribute("class","article");let a=e.multimedia&&e.multimedia.length>0&&e.multimedia[0].url?`https://www.nytimes.com/${e.multimedia[0].url}`:"";return t.innerHTML=`
    <div class="article-content">
      <div class="left">
        <h2 class="news-title">${e?.headline?.main||"No Title"}</h2>
        <p class="news-summary">${e?.abstract||"No Summary"}</p>
        <a href="${e.web_url}" target="_blank">Read more</a>
      </div>
      <div class="right">
        ${a?`<img src="${a}" alt="${e?.headline?.main}" class="news-image" />`:""}
      </div>
    </div>
  `,t},g=e=>{r.innerHTML="",e.results.forEach(e=>{let t=document.createElement("p");t.textContent=e.title,r.appendChild(t)})},k=e=>{n.innerHTML="",(e.results||[]).forEach(e=>{let t=Array.isArray(e.media)&&e.media.length>0?e.media:[],a=t.length>0?t[0]["media-metadata"][2].url:"";if(a){let t=document.createElement("a");t.href=e.url,t.target="_blank";let r=document.createElement("img");r.src=a,r.alt=e.title,r.style.width="200px",r.style.height="140px",r.style.margin="0 2rem",r.style.border="2px solid #aeaeae",t.appendChild(r),n.appendChild(t)}})},w=(e,t)=>{s.innerHTML="",i.innerHTML="",(e.results.books||[]).forEach(e=>{let t=document.createElement("div");t.setAttribute("class","book-item"),t.innerHTML=`
      <div>
        <h3>${e.title}</h3>
        <p>Author: ${e.author}</p>
        <img src="${e.book_image}" alt="${e.title}" style="width:100px;"/>
      </div>
      <a href="${e.amazon_product_url}" target="_blank">More Info</a>
    `,s.appendChild(t)}),(t.results||[]).forEach(e=>{let t=document.createElement("div");t.setAttribute("class","review-item"),t.innerHTML=`
      <h3>${e.book_title}</h3>
      <p>${e.summary||"No Summary..."}</p><br>
      <a href="${e.url}" target="_blank">Read Review</a>
    `,i.appendChild(t)})},E=e=>{o.innerHTML="",(e.results||[]).forEach(e=>{let t=document.createElement("div");t.setAttribute("class","times-wire-container");let a=e.multimedia.length>0?e.multimedia[0].url:"";t.innerHTML=`
      <h3>${e.title}</h3>
      ${a?`<img src="${a}" alt="${e.title}" class="times-wire-img" />`:""}
      <p>${e.abstract}</p><br>
      <a href="${e.url}" target="_blank">Read more<a>
      
    `,o.appendChild(t)})},b=e=>{l.innerHTML="",(e.response.docs||[]).forEach(e=>{let t=document.createElement("div");t.setAttribute("class","movie-item");let a=e.multimedia||[];a.length>0&&a[0].url,t.innerHTML=`
      <h3>${e.snippet}</h3>
      <p>${e.lead_paragraph}</p>
      <a href="${e.web_url}" target="_blank">More Info</a>
    `,l.appendChild(t)})};(async()=>{let e=await c("world"),t=await c("home"),a=await c("mostpopular"),r=await c("bestsellers"),n=await c("bookreviews"),s=await c("timeswire"),i=await c("movies");g(e),d(t),k(a),w(r,n),E(s),b(i)})(),(()=>{let e=e=>{c(e).then(e=>d(e))},t={world:"world",us:"us",science:"science",arts:"arts"};Object.keys(t).forEach(a=>{document.getElementById(a).addEventListener("click",()=>e(t[a]))}),c("home").then(e=>d(e))})(),document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementsByClassName("day"),t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];for(let a=0;a<e.length;a++)e[a].textContent=`${t},`}),document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("date"),t=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});e.textContent=t}),document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("dark-mode"),t=["nav","article","date","photo-marquee","book-item","review-item","times-wire-container","movie-item","footer"],a=()=>{document.body.classList.add("dark-mode"),t.forEach(e=>{document.querySelectorAll(`.${e}`).forEach(e=>{e.classList.add("dark-mode")})}),document.querySelectorAll(".article").forEach(e=>e.classList.add("dark-mode")),localStorage.setItem("dark-mode","enabled")},r=()=>{document.body.classList.remove("dark-mode"),t.forEach(e=>{document.querySelectorAll(`.${e}`).forEach(e=>{e.classList.remove("dark-mode")})}),localStorage.setItem("dark-mode","disabled")};"enabled"===localStorage.getItem("dark-mode")?(a(),e.checked=!0):r(),e.addEventListener("change",()=>{e.checked?a():r()})});const $=document.getElementById("dark-mode"),f=document.getElementById("dark-mode-label");$.addEventListener("change",function(){$.checked?f.textContent="Disable Dark Mode":f.textContent="Enable Dark Mode"}),document.querySelector(".back-to-top").addEventListener("click",function(e){e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})});const L=document.querySelector(".search-container input");async function I(e){try{let a=t.articlesearch(e),r=await fetch(a),n=await r.json();p(n)}catch(e){console.error("Error fetching articles:",e)}}document.querySelector(".search-container button").addEventListener("click",function(){let e=L.value;e&&I(e)}),L.addEventListener("keypress",function(e){if("Enter"===e.key){let e=L.value;e&&I(e)}});
//# sourceMappingURL=index.e56c6ede.js.map
