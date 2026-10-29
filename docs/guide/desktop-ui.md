---
layout: page
---

# Redirecting...

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();
onMounted(() => {
  router.go('/guide/new-app-screen/v1/');
});
</script>

This page has moved to [Desktop UI & Screens (@react-native-neutralinojs/new-app-screen v1)](/guide/new-app-screen/v1/).
