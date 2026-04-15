---
title: "留言板"
date: 2024-01-01
---

欢迎留下你的足迹！

<form id="guestbook-form">
  <div>
    <label>昵称</label>
    <input type="text" id="nickname" placeholder="请输入昵称" required>
  </div>
  <div>
    <label>邮箱（选填）</label>
    <input type="email" id="email" placeholder="请输入邮箱">
  </div>
  <div>
    <label>留言内容</label>
    <textarea id="content" rows="4" placeholder="请输入留言内容" required></textarea>
  </div>
  <button type="submit">提交留言</button>
</form>

<div id="comments-list"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('guestbook-form');
  const commentsList = document.getElementById('comments-list');
  
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
      .catch(() => {
        commentsList.innerHTML = '<p>暂无留言</p>';
      });
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
      nickname: document.getElementById('nickname').value,
      email: document.getElementById('email').value,
      content: document.getElementById('content').value
    };
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(() => {
      form.reset();
      loadComments();
    });
  });
  
  loadComments();
});
</script>
