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
    .catch(err => {
      console.error('Failed to load search index:', err);
    });
  
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }
    
    const results = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
      searchResults.innerHTML = '<li>没有找到匹配的内容</li>';
      return;
    }
    
    searchResults.innerHTML = results.slice(0, 10).map(item => 
      `<li><a href="${item.url}">${item.title}</a></li>`
    ).join('');
  });
});
