---
title: Git 学习笔记
date: 2024-01-15 00:00:00
categories: 
  - 学习笔记
tags: 
  - Git
  - 版本控制
permalink: /pages/b13651/
---

## Git 基础命令

### 初始化仓库

```bash
git init
```

### 添加文件

```bash
git add .
git add filename
```

### 提交更改

```bash
git commit -m "commit message"
```

### 查看状态

```bash
git status
git log
```

## 分支管理

### 创建分支

```bash
git branch feature-branch
git checkout feature-branch
# 或者一步完成
git checkout -b feature-branch
```

### 合并分支

```bash
git checkout main
git merge feature-branch
```

## 远程仓库

```bash
git remote add origin https://github.com/user/repo.git
git push -u origin main
```
