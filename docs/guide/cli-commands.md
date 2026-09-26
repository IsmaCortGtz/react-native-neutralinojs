---
layout: page
---

# Redirecting...

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();
onMounted(() => {
  router.go('/guide/react-native-neutralinojs/v2/cli-commands');
});
</script>

This page has moved to [CLI Commands (react-native-neutralinojs v2)](/guide/react-native-neutralinojs/v2/cli-commands).
