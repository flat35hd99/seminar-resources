import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#00CD81'
  },
  loading: { color: '#00CD81' },
  i18n: {
    locale: () => [{
      code: 'ja',
      iso: 'ja-JP',
      file: 'ja-JP.js',
      name: '日本語'
    }, {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }]
    ,
    dafaultLocale: 'ja'
  },
  css: [
    'katex/dist/katex.min.css'
  ],
  router: {
    base: process.env.NODE_ENV == 'production' ? '/seminar-resources/': '/'
  },
  head: {
    base: {
    }
  },
  content: {
    markdown: {
      remarkPlugins: [
        'remark-math'
      ],
      rehypePlugins: [
        'rehype-katex'
      ]
    }
  }
})
