import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import Mermaid from './Mermaid.vue';
import PackageVersionSelector from './PackageVersionSelector.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Mermaid', Mermaid);
    app.component('PackageVersionSelector', PackageVersionSelector);
    app.component('VersionSelector', PackageVersionSelector);
  },
} satisfies Theme;
