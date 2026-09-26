---
layout: page
---

# Redirecting...

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();
onMounted(() => {
  router.go('/guide/react-native-neutralinojs/v2/troubleshooting');
});
</script>

This page has moved to [Troubleshooting (react-native-neutralinojs v2)](/guide/react-native-neutralinojs/v2/troubleshooting).
