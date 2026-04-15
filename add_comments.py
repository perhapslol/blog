import os

comment_code = '''

<!-- 评论区 -->
<div id="gitalk-container" style="margin-top: 50px;"></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
<script>
var gitalk = new Gitalk({
  clientID: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  repo: "blog-comments",
  owner: "perhapslol",
  admin: ["perhapslol"],
  id: location.pathname,
  distractionFreeMode: false
});
gitalk.render("gitalk-container");
</script>
'''

post_dir = '/Users/Perhaps/Documents/学习资料/Trae-git/Post/'

for filename in os.listdir(post_dir):
    if filename.endswith('.html') and filename != 'index.html':
        filepath = os.path.join(post_dir, filename)
        with open(filepath, 'r') as f:
            content = f.read()
        
        if 'gitalk' not in content:
            content = content.replace(
                '<div class="read-more-link">\n            <a href="https://perhapslol.github.io/blog/">Back Home…</a>\n        </div>',
                '<div class="read-more-link">\n            <a href="https://perhapslol.github.io/blog/">Back Home…</a>\n        </div>' + comment_code
            )
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated: {filename}")
        else:
            print(f"Skipped (already has gitalk): {filename}")

print("Done!")