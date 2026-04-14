---
title: 经济学
date: 2024-01-01
---

## 💹 经济学研究

包括宏观经济和微观经济的学习笔记。

### 宏观经济
{{ range where .Pages "Params.categories" "intersect" (slice "宏观经济") }}
- [{{ .Title }}]({{ .Permalink }})
{{ end }}

### 微观经济
{{ range where .Pages "Params.categories" "intersect" (slice "微观经济") }}
- [{{ .Title }}]({{ .Permalink }})
{{ end }}
