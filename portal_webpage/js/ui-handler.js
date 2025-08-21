// Display main carousel news (top 3 articles)
function displayMainNews(articles) {
  const mainCarousel = document.querySelector('.main-carousel');
  if (!mainCarousel) return;

  const mainArticles = articles.slice(0, 3);
  mainCarousel.innerHTML = mainArticles.map(article => `
    <div class="position-relative overflow-hidden" style="height: 500px;">
      <img class="img-fluid h-100" src="${article.image}" style="object-fit: cover;" onerror="this.src='img/default-news.jpg'">
      <div class="overlay">
        <div class="mb-2">
          <span class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2">${article.source}</span>
          <span class="text-white">${window.NewsAPI.formatDate(article.publishedAt)}</span>
        </div>
        <a class="h2 m-0 text-white text-uppercase font-weight-bold" href="${article.url}" target="_blank" rel="noopener">${article.title}</a>
      </div>
    </div>
  `).join('');

  // Reinitialize carousel
  if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    $(".main-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      items: 1,
      dots: true,
      loop: true,
      center: true,
    });
  }
}

// Display featured news in carousel (next 5 articles)
function displayFeaturedNews(articles) {
  const newsCarousel = document.querySelector('.news-carousel');
  if (!newsCarousel) return;

  const featuredArticles = articles.slice(3, 8);
  newsCarousel.innerHTML = featuredArticles.map(article => `
    <div class="position-relative overflow-hidden" style="height: 300px;">
      <img class="img-fluid h-100" src="${article.image}" style="object-fit: cover;" onerror="this.src='img/default-news.jpg'">
      <div class="overlay">
        <div class="mb-2">
          <span class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2">${article.source}</span>
          <span class="text-white"><small>${window.NewsAPI.formatDate(article.publishedAt)}</small></span>
        </div>
        <a class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="${article.url}" target="_blank" rel="noopener">${article.title}</a>
      </div>
    </div>
  `).join('');

  // Reinitialize carousel
  if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    $(".news-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      margin: 30,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
        1200: { items: 4 },
      },
    });
  }
}

// Display latest news in the main content area
function displayLatestNews(articles) {
  const latestNewsContainer = document.getElementById('latest-news-container');
  if (!latestNewsContainer) return;

  const latestArticles = articles.slice(8, 20); // Get articles 8-20
  let latestHTML = '';

  latestArticles.forEach((article, index) => {
    if (index % 2 === 0) {
      latestHTML += `<div class="row">`;
    }

    latestHTML += `
      <div class="col-lg-6">
        <div class="position-relative mb-3">
          <img class="img-fluid w-100" src="${article.image}" style="object-fit: cover; height: 200px;" onerror="this.src='img/default-news.jpg'">
          <div class="bg-white border border-top-0 p-4">
            <div class="mb-2">
              <span class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2">${article.source}</span>
              <span class="text-body"><small>${window.NewsAPI.formatDate(article.publishedAt)}</small></span>
            </div>
            <a class="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="${article.url}" target="_blank" rel="noopener">${article.title}</a>
            <p class="m-0">${article.description.substring(0, 100)}...</p>
          </div>
          <div class="d-flex justify-content-between bg-white border border-top-0 p-4">
            <div class="d-flex align-items-center">
              <img class="rounded-circle mr-2" src="img/user.jpg" width="25" height="25" alt="">
              <small>${article.author}</small>
            </div>
            <div class="d-flex align-items-center">
              <small class="ml-3"><i class="far fa-eye mr-2"></i>${Math.floor(Math.random() * 1000) + 100}</small>
              <small class="ml-3"><i class="far fa-comment mr-2"></i>${Math.floor(Math.random() * 100) + 10}</small>
            </div>
          </div>
        </div>
      </div>
    `;

    if (index % 2 === 1 || index === latestArticles.length - 1) {
      latestHTML += `</div>`;
    }
  });

  latestNewsContainer.innerHTML = latestHTML;
}

// Display trending news in sidebar
function displayTrendingNews(articles) {
  const trendingContainer = document.querySelector('.bg-white.border.border-top-0.p-3');
  if (!trendingContainer) return;

  const trendingArticles = articles.slice(0, 5);
  trendingContainer.innerHTML = trendingArticles.map(article => `
    <div class="d-flex align-items-center bg-white mb-3" style="height: 110px">
      <img class="img-fluid" src="${article.image}" style="width: 80px; height: 80px; object-fit: cover;" onerror="this.src='img/default-news.jpg'">
      <div class="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
        <div class="mb-2">
          <span class="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2">${article.source}</span>
          <span class="text-body"><small>${window.NewsAPI.formatDate(article.publishedAt)}</small></span>
        </div>
        <a class="h6 m-0 text-secondary text-uppercase font-weight-bold" href="${article.url}" target="_blank" rel="noopener">${article.title}</a>
      </div>
    </div>
  `).join('');
}

// Update breaking news ticker
function updateBreakingNews(articles) {
  const breakingTicker = document.querySelector('.tranding-carousel');
  if (!breakingTicker) return;

  const breakingArticles = articles.slice(0, 5);
  breakingTicker.innerHTML = breakingArticles.map(article => `
    <div class="text-truncate">
      <a class="text-white text-uppercase font-weight-semi-bold" href="${article.url}" target="_blank" rel="noopener">${article.title}</a>
    </div>
  `).join('');

  // Reinitialize carousel
  if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    $(".tranding-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 2000,
      items: 1,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left"></i>',
        '<i class="fa fa-angle-right"></i>',
      ],
    });
  }
}

// Search functionality
function handleSearch() {
  const searchInput = document.querySelector('.form-control');
  const searchButton = document.querySelector('.input-group-append button');
  
  if (!searchInput || !window.allArticles) return;

  const performSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let filteredArticles = window.allArticles;

    if (searchTerm) {
      filteredArticles = window.allArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm) ||
        article.source.toLowerCase().includes(searchTerm)
      );
    }

    // Update all sections with filtered results
    displayMainNews(filteredArticles);
    displayFeaturedNews(filteredArticles);
    displayLatestNews(filteredArticles);
    displayTrendingNews(filteredArticles);
    updateBreakingNews(filteredArticles);
  };

  searchInput.addEventListener('input', performSearch);
  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

// Display all news sections
function displayAllNews(articles) {
  displayMainNews(articles);
  displayFeaturedNews(articles);
  displayLatestNews(articles);
  displayTrendingNews(articles);
  updateBreakingNews(articles);
}

// Export functions
window.UIHandler = {
  displayAllNews,
  handleSearch,
  displayMainNews,
  displayFeaturedNews,
  displayLatestNews,
  displayTrendingNews,
  updateBreakingNews
};
