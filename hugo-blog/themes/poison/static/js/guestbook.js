document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('guestbook-form');
  const commentsContainer = document.getElementById('comments-container');
  
  if (!form || !commentsContainer) return;

  function loadComments() {
    fetch('http://localhost:3000/api/comments')
      .then(response => response.json())
      .then(comments => {
        commentsContainer.innerHTML = comments.map(comment => `
          <div class="comment-item">
            <div class="comment-header">
              <span class="comment-nickname">${comment.nickname}</span>
              <span class="comment-time">${comment.createdAt}</span>
            </div>
            <div class="comment-content">${comment.content}</div>
          </div>
        `).join('');
      })
      .catch(error => console.error('Failed to load comments:', error));
  }

  loadComments();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nickname = document.getElementById('nickname').value.trim();
    const email = document.getElementById('email').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!nickname || !content) {
      alert('请填写昵称和留言内容');
      return;
    }

    fetch('http://localhost:3000/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname, email, content })
    })
    .then(response => response.json())
    .then(() => {
      document.getElementById('nickname').value = '';
      document.getElementById('email').value = '';
      document.getElementById('content').value = '';
      loadComments();
    })
    .catch(error => console.error('Failed to submit comment:', error));
  });
});
