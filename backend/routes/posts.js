const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: '文章不存在' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body)
    const savedPost = await post.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    )
    if (!post) {
      return res.status(404).json({ message: '文章不存在' })
    }
    res.json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
      return res.status(404).json({ message: '文章不存在' })
    }
    res.json({ message: '文章删除成功' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
