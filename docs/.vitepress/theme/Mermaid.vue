<template>
  <div class="mermaid-diagram" v-html="svg" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useData } from 'vitepress';
import mermaid from 'mermaid';

const props = defineProps<{
  graph: string;
  id: string;
}>();

const { isDark } = useData();
const svg = ref('');
let renderIndex = 0;

async function renderDiagram() {
  const code = decodeURIComponent(props.graph);
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark.value ? 'dark' : 'default',
  });

  try {
    const renderId = `${props.id}-${++renderIndex}`;
    const { svg: renderedSvg } = await mermaid.render(renderId, code);
    svg.value = renderedSvg;
  } catch (error) {
    console.error('Mermaid render error:', error);
  }
}

onMounted(() => {
  renderDiagram();
});

watch(isDark, () => {
  renderDiagram();
});
</script>

<style>
.mermaid-diagram {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
  overflow-x: auto;
}

.mermaid-diagram svg {
  max-width: 100%;
  height: auto;
}
</style>
