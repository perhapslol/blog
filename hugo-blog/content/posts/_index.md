---
title: "文章列表"
date: 2024-01-01
---

## 所有文章

{{ range .Pages }}
- **{{ .Date.Format "2006-01-02" }}** - [{{ .Title }}]({{ .Permalink }})
{{ end }}
