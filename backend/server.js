const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../hugo-blog/static')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../hugo-blog/static/index.html'))
})

let posts = [
  {
    id: 1,
    title: 'Vue3 入门指南',
    content: 'Vue3 是 Vue.js 的最新版本，带来了许多新特性和性能改进...',
    categories: ['前端开发'],
    tags: ['Vue', 'JavaScript'],
    author: 'admin',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 2,
    title: 'Node.js RESTful API 开发',
    content: '使用 Node.js 和 Express 构建高性能的 RESTful API...',
    categories: ['后端开发'],
    tags: ['Node.js', 'Express', 'API'],
    author: 'admin',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }
]

let comments = [
  {
    id: 1,
    nickname: '访客',
    email: 'guest@example.com',
    content: '这是一篇很棒的文章！',
    createdAt: '2024-01-02'
  },
  {
    id: 2,
    nickname: '用户',
    content: '感谢分享！',
    createdAt: '2024-01-03'
  }
]

let nextPostId = 3
let nextCommentId = 3

app.get('/api/posts', (req, res) => {
  res.json(posts)
})

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id))
  if (!post) {
    return res.status(404).json({ message: '文章不存在' })
  }
  res.json(post)
})

app.post('/api/posts', (req, res) => {
  const post = {
    id: nextPostId++,
    ...req.body,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  }
  posts.push(post)
  res.status(201).json(post)
})

app.put('/api/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).json({ message: '文章不存在' })
  }
  posts[index] = {
    ...posts[index],
    ...req.body,
    updatedAt: new Date().toISOString().split('T')[0]
  }
  res.json(posts[index])
})

app.delete('/api/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).json({ message: '文章不存在' })
  }
  posts.splice(index, 1)
  res.json({ message: '文章删除成功' })
})

app.get('/api/comments', (req, res) => {
  res.json(comments)
})

app.get('/api/comments/post/:postId', (req, res) => {
  res.json(comments)
})

app.post('/api/comments', (req, res) => {
  const comment = {
    id: nextCommentId++,
    ...req.body,
    createdAt: new Date().toISOString().split('T')[0]
  }
  comments.push(comment)
  res.status(201).json(comment)
})

app.delete('/api/comments/:id', (req, res) => {
  const index = comments.findIndex(c => c.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).json({ message: '评论不存在' })
  }
  comments.splice(index, 1)
  res.json({ message: '评论删除成功' })
})

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
})
