---
title: "春华夕拾"
date: 2024-01-01
---

欢迎来到我的个人博客！这里记录了我的学习历程和思考感悟。

## 最近更新

{{ range first 5 .Site.RegularPages }}
- [{{ .Title }}]({{ .Permalink }}) - {{ .Date.Format "2006-01-02" }}
{{ end }}

## 文章分类

### 📈 股票
- [上市公司分析]({{ "/posts/stocks/" | relURL }})
- [IPO 研究]({{ "/posts/ipo/" | relURL }})

### 💹 经济学
- [宏观经济]({{ "/posts/economics/macro/" | relURL }})
- [微观经济]({{ "/posts/economics/micro/" | relURL }})

### 📐 数学
- [基础数学]({{ "/posts/math/" | relURL }})

### ⚖️ 法律
- [资格考试]({{ "/posts/law/" | relURL }})

### 🧠 逻辑
- [逻辑思维]({{ "/posts/logic/" | relURL }})
