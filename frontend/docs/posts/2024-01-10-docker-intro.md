---
title: Docker 入门教程
date: 2024-01-10 00:00:00
categories: 
  - DevOps
tags: 
  - Docker
  - 容器化
permalink: /pages/b4bfcb/
---

## Docker 是什么

Docker 是一个开源的容器化平台，可以轻松地创建、部署和运行应用程序。

## 基本概念

### 镜像 (Image)
镜像是一个只读的模板，包含了运行应用所需的所有依赖。

### 容器 (Container)
容器是镜像的运行实例，可以被创建、启动、停止、删除。

### Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## 常用命令

```bash
# 构建镜像
docker build -t my-app .

# 运行容器
docker run -p 3000:3000 my-app

# 查看运行中的容器
docker ps

# 停止容器
docker stop <container-id>
```

## 总结

Docker 让应用部署变得更加简单和一致，是现代 DevOps 不可或缺的工具。
