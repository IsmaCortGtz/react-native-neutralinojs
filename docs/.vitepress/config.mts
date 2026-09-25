import { defineConfig } from 'vitepress';

export default defineConfig({
  markdown: {
    config(md) {
      const fence = md.renderer.rules.fence!.bind(md.renderer.rules);
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        if (token.info.trim() === 'mermaid') {
          const code = encodeURIComponent(token.content);
          return `<ClientOnly><Mermaid id="mermaid-${idx}" graph="${code}" /></ClientOnly>`;
        }
        return fence(tokens, idx, options, env, self);
      };
    },
  },
  title: 'React Native Neutralinojs',
  description: 'Ultra-lightweight React Native for cross-platform desktop via Neutralinojs',
  base: process.env.VITEPRESS_BASE || '/react-native-neutralinojs/',
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/react-native-neutralinojs/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#ff8c00' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'React Native Neutralinojs' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Ultra-lightweight React Native for cross-platform desktop via Neutralinojs',
      },
    ],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'RN Neutralinojs',

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Philosophy', link: '/philosophy/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Architecture', link: '/architecture/overview' },
      { text: 'Testing', link: '/architecture/testing-and-ci' },
    ],

    sidebar: {
      '/philosophy/': [
        {
          text: 'Project Philosophy',
          items: [
            { text: 'Introduction & Philosophy', link: '/philosophy/' },
            { text: 'Why Neutralinojs?', link: '/philosophy/why-neutralino' },
          ],
        },
      ],
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview & Requirements', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
          ],
        },
        {
          text: 'Core Guides',
          items: [
            { text: 'CLI Commands', link: '/guide/cli-commands' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Desktop UI & Screens', link: '/guide/desktop-ui' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          ],
        },
      ],
      '/architecture/': [
        {
          text: 'Architecture & Internals',
          items: [
            { text: 'System Architecture', link: '/architecture/overview' },
            { text: 'CLI Integration', link: '/architecture/cli-integration' },
            { text: 'Vite Pipeline & Build', link: '/architecture/vite-pipeline' },
            { text: 'Auth & Globals Proxy', link: '/architecture/auth-and-proxy' },
            { text: 'Runtime Shim', link: '/architecture/runtime-shim' },
            { text: 'NewAppScreen Internals', link: '/architecture/new-app-screen' },
            { text: 'Testing & Monorepo Tooling', link: '/architecture/testing-and-ci' },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/IsmaCortGtz/react-native-neutralinojs',
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Ismael Cortés Gutiérrez',
    },
  },
});
