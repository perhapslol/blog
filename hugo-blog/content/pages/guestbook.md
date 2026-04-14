---
title: 留言板
date: 2024-01-01
---

## 留言板

欢迎留下你的足迹！

<form id="guestbook-form" class="guestbook-form">
  <div class="form-group">
    <label for="nickname">昵称 *</label>
    <input type="text" id="nickname" placeholder="请输入昵称">
  </div>
  <div class="form-group">
    <label for="email">邮箱（选填）</label>
    <input type="email" id="email" placeholder="请输入邮箱">
  </div>
  <div class="form-group">
    <label for="content">留言内容 *</label>
    <textarea id="content" placeholder="请输入留言内容"></textarea>
  </div>
  <button type="submit">提交留言</button>
</form>

<div id="comments-container" class="comments-list">
  <h3>留言列表</h3>
</div>
