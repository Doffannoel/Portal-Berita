// Konfigurasi API
const API_KEYS = {
  newsapi: "79031abc63ca4a7a924ffbc7c7297d6d",
  gnews: "001b321500f21ea5924ffbc2f1b73e012",
  mediastack: "4b4576bfd361ecc24fb806ad76d79c24",
};

// Normalize article data structure
function normalizeArticle(article, source) {
  let normalized = {
    title: article.title || article.headline || 'No title available',
    url: article.url || article.webUrl || article.link || '#',
    publishedAt: article.publishedAt || article.published_at || article.pubDate || new Date().toISOString(),
    image: article.urlToImage || article.image || article.urlToImage || article.thumbnail || 'img/default-news.jpg',
    source: source,
    description: article.description || article.content || article.summary || '',
    author: article.author || article.byline || 'Unknown'
  };

  // Handle different image formats
  if (normalized.image && normalized.image.startsWith('//')) {
    normalized.image = 'https:' + normalized.image;
  }

  return normalized;
}

// Fetch from NewsAPI
async function fetchNewsAPI() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=artificial intelligence&apiKey=${API_KEYS.newsapi}&pageSize=8&language=en`
    );
    const data = await response.json();
    
    if (data.status === 'ok' && data.articles) {
      return data.articles.map(article => normalizeArticle(article, 'NewsAPI'));
    }
    return [];
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return [];
  }
}

// Fetch from GNews
async function fetchGNews() {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=artificial intelligence&token=${API_KEYS.gnews}&max=8&lang=en`
    );
    const data = await response.json();
    
    if (data.articles) {
      return data.articles.map(article => normalizeArticle(article, 'GNews'));
    }
    return [];
  } catch (error) {
    console.error("Error fetching from GNews:", error);
    return [];
  }
}

// Fetch from Mediastack
async function fetchMediastack() {
  try {
    const response = await fetch(
      `https://api.mediastack.com/v1/news?access_key=${API_KEYS.mediastack}&keywords=artificial intelligence&limit=8&languages=en`
    );
    const data = await response.json();
    
    if (data.data) {
      return data.data.map(article => normalizeArticle(article, 'Mediastack'));
    }
    return [];
  } catch (error) {
    console.error("Error fetching from Mediastack:", error);
    return [];
  }
}

// Fetch from all sources
async function fetchAllNews() {
  try {
    const [newsApiArticles, gNewsArticles, mediastackArticles] = await Promise.all([
      fetchNewsAPI(),
      fetchGNews(),
      fetchMediastack()
    ]);

    // Combine and sort by date
    const allArticles = [
      ...newsApiArticles,
      ...gNewsArticles,
      ...mediastackArticles
    ].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return allArticles;
  } catch (error) {
    console.error("Error fetching all news:", error);
    return [];
  }
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Export functions for use in other files
window.NewsAPI = {
  fetchAllNews,
  formatDate,
  API_KEYS
};
