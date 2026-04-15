const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 })
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 })
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body)
    const savedComment = await comment.save()
    res.status(201).json(savedComment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
    if (!comment) {
      return res.status(404).json({ message: '评论不存在' })
    }
    res.json({ message: '评论删除成功' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
