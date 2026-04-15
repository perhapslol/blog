---
title: "留言板"
date: 2024-01-01
type: "page"
---

## 欢迎留言

<form id="guestbook-form">
  <div>
    <label>昵称</label>
    <input type="text" id="nickname" placeholder="请输入昵称" required>
  </div>
  <div>
    <label>邮箱</label>
    <input type="email" id="email" placeholder="选填">
  </div>
  <div>
    <label>留言内容</label>
    <textarea id="content" rows="4" placeholder="请输入留言内容" required></textarea>
  </div>
  <button type="submit">提交留言</button>
</form>

## 留言列表

<div id="comments-list">
  <!-- 留言将通过 JavaScript 动态加载 -->
</div>
