---
title: "学习笔记"
date: 2024-01-01
---

个人学习笔记汇总，包含编程、数学、经济学等领域的学习心得。

## 笔记列表

{{ range where .Site.RegularPages "Section" "notes" }}
- [{{ .Title }}]({{ .Permalink }}) - {{ .Date.Format "2006-01-02" }}
{{ end }}
