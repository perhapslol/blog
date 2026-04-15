---
title: "文章列表"
date: 2024-01-01
---

## 所有文章

{{ range .Pages }}
- [{{ .Title }}]({{ .Permalink }}) - {{ .Date.Format "2006-01-02" }}
{{ end }}
