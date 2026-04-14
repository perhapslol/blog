document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (!searchInput || !searchResults) return;

  let searchIndex = [];

  fetch('/index.json')
    .then(response => response.json())
    .then(data => {
      searchIndex = data;
    })
    .catch(error => console.error('Failed to load search index:', error));

  searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }

    const results = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    ).slice(0, 5);

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">没有找到匹配的内容</div>';
      return;
    }

    searchResults.innerHTML = results.map(item => `
      <div class="search-result-item">
        <div class="search-result-title"><a href="${item.url}">${item.title}</a></div>
        <div class="search-result-summary">${item.summary || '点击查看详情'}</div>
      </div>
    `).join('');
  });

  document.addEventListener('click', function(e) {
    if (!searchResults.contains(e.target)) {
      searchResults.innerHTML = '';
    }
  });
});
