---
title: 留言板
date: 2024-01-01
permalink: /guestbook/
---

## 留言板

欢迎留下你的足迹！

<template>
  <div class="guestbook">
    <form @submit.prevent="submitComment">
      <div class="form-group">
        <label>昵称</label>
        <input v-model="nickname" type="text" placeholder="请输入昵称">
      </div>
      <div class="form-group">
        <label>邮箱</label>
        <input v-model="email" type="email" placeholder="请输入邮箱（选填）">
      </div>
      <div class="form-group">
        <label>留言内容</label>
        <textarea v-model="content" rows="4" placeholder="请输入留言内容"></textarea>
      </div>
      <button type="submit" class="btn">提交留言</button>
    </form>
    
    <div class="comments-list">
      <h3>留言列表</h3>
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <span class="nickname">{{ comment.nickname }}</span>
          <span class="time">{{ comment.time }}</span>
        </div>
        <div class="comment-content">{{ comment.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
      email: '',
      content: '',
      comments: []
    }
  },
  mounted() {
    this.loadComments()
  },
  methods: {
    async loadComments() {
      try {
        const response = await fetch('http://localhost:3000/api/comments')
        this.comments = await response.json()
      } catch (error) {
        console.error('加载评论失败:', error)
      }
    },
    async submitComment() {
      if (!this.nickname || !this.content) {
        alert('请填写昵称和留言内容')
        return
      }
      try {
        await fetch('http://localhost:3000/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nickname: this.nickname,
            email: this.email,
            content: this.content
          })
        })
        this.nickname = ''
        this.email = ''
        this.content = ''
        this.loadComments()
      } catch (error) {
        console.error('提交评论失败:', error)
      }
    }
  }
}
</script>

<style scoped>
.guestbook {
  max-width: 800px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  background: #3eaf7c;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comments-list {
  margin-top: 2rem;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.nickname {
  font-weight: bold;
}

.time {
  color: #999;
  font-size: 0.8rem;
}
</style>
