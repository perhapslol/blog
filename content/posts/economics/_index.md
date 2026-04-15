---
title: "经济学"
date: 2024-01-01
---

## 经济学文章

{{ range .Pages }}
- [{{ .Title }}]({{ .Permalink }}) - {{ .Date.Format "2006-01-02" }}
{{ end }}
