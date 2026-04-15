document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('guestbook-form');
  const commentsList = document.getElementById('comments-list');
  
  if (!form || !commentsList) return;
  
  function loadComments() {
    fetch('/api/comments')
      .then(response => response.json())
      .then(data => {
        commentsList.innerHTML = data.map(comment => `
          <div class="comment">
            <span class="author">${comment.nickname}</span>
            <span class="date">${comment.createdAt}</span>
            <div class="content">${comment.content}</div>
          </div>
        `).join('');
      })
      .catch(err => {
        console.error('Failed to load comments:', err);
        commentsList.innerHTML = '<p>暂时无法加载留言，请稍后再试</p>';
      });
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const content = document.getElementById('content').value;
    
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname, email, content })
    })
    .then(response => response.json())
    .then(() => {
      form.reset();
      loadComments();
    })
    .catch(err => {
      console.error('Failed to submit comment:', err);
      alert('留言提交失败，请稍后再试');
    });
  });
  
  loadComments();
});
