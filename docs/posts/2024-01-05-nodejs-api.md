---
title: Node.js RESTful API 开发
date: 2024-01-05 00:00:00
categories: 
  - 后端开发
tags: 
  - Node.js
  - Express
  - API
permalink: /pages/dbeed4/
---

## 什么是 RESTful API

RESTful API 是一种设计风格，用于构建可扩展的 Web 服务。

## 使用 Express 构建 API

### 安装依赖

```bash
npm install express cors mongoose
```

### 创建基础服务器

```javascript
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

## 路由设计

- GET /api/posts - 获取所有文章
- GET /api/posts/:id - 获取单篇文章
- POST /api/posts - 创建文章
- PUT /api/posts/:id - 更新文章
- DELETE /api/posts/:id - 删除文章

## 总结

使用 Node.js 和 Express 可以快速构建高性能的 RESTful API。
