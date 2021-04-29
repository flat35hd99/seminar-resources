import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#E24F55'
  },
  loading: { color: '#00CD81' },
  css: [
    'katex/dist/katex.min.css'
  ],
  router: {
    base: process.env == 'PRODUCTION' ? '/seminar-resources': '/'
  },
  head: {
    base: {
      href: 'router.base'
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
