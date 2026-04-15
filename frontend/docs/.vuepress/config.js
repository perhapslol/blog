module.exports = {
  title: '我的个人博客',
  description: '记录技术成长，分享学习心得',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'vdoing',
  themeConfig: {
    nav: [
      { text: '首页', link: '/', icon: 'home' },
      { text: '技术文章', link: '/posts/', icon: 'file' },
      { text: '学习笔记', link: '/notes/', icon: 'book' },
      { text: '标签', link: '/tags/', icon: 'tag' },
      { text: '分类', link: '/categories/', icon: 'folder' },
      { text: '关于', link: '/about/', icon: 'user' },
      { text: '留言板', link: '/guestbook/', icon: 'message-circle' }
    ],
    sidebar: 'structuring',
    sidebarDepth: 2,
    updateTime: '更新于',
    author: {
      name: '博主',
      link: 'https://github.com'
    },
    social: {
      iconfontCssUrl: '',
      links: [
        { icon: 'github', link: 'https://github.com' },
        { icon: 'twitter', link: 'https://twitter.com' },
        { icon: 'email', link: 'mailto:hello@example.com' }
      ]
    },
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: '最后更新',
    footer: {
      createBy: '我的个人博客',
      copyright: 'Copyright 2024'
    }
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom',
    'vuepress-plugin-fulltext-search'
  ]
}
