<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter, withBase } from 'vitepress';
import { packagesConfig, resolvePackageRoute, type VersionInfo } from '../packages';

defineProps<{
  screenMenu?: boolean;
}>();

const route = useRoute();
const router = useRouter();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const resolved = computed(() => {
  return resolvePackageRoute(route.path);
});

const currentPackage = computed(() => resolved.value.pkg);
const currentVersion = computed(() => resolved.value.version);

const isLatest = computed(() => {
  if (!currentPackage.value || !currentVersion.value) return false;
  const verInfo = currentPackage.value.versions.find((v) => v.version === currentVersion.value);
  return verInfo?.isLatest ?? false;
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function getVersionUrl(versionInfo: VersionInfo): string {
  if (!currentPackage.value) return '#';
  const subpath = resolved.value.subpath;
  const baseUrl = `/guide/${currentPackage.value.id}/${versionInfo.version}/`;

  if (subpath && subpath !== 'index') {
    return withBase(`${baseUrl}${subpath}`);
  }
  return withBase(baseUrl);
}

function selectVersion(versionInfo: VersionInfo, event: MouseEvent) {
  event.preventDefault();
  isOpen.value = false;
  const targetUrl = getVersionUrl(versionInfo);
  router.go(targetUrl);
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div
    v-if="currentPackage && currentVersion"
    ref="containerRef"
    class="nav-version-selector"
    :class="{ 'is-mobile': screenMenu, 'is-open': isOpen }"
  >
    <button
      type="button"
      class="nav-version-btn"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      aria-label="Select package version"
      @click.stop="toggleDropdown"
    >
      <span class="nav-btn-icon" aria-hidden="true">📦</span>
      <span class="nav-btn-version">{{ currentVersion }}</span>
      <span v-if="isLatest" class="nav-btn-badge">latest</span>
      <svg class="nav-btn-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <Transition name="nav-menu-fade">
      <div v-if="isOpen" class="nav-version-menu" role="listbox" tabindex="-1">
        <div class="menu-header">
          <span class="menu-title">Major Versions</span>
        </div>

        <div class="menu-divider" />

        <div class="menu-list">
          <a
            v-for="ver in currentPackage.versions"
            :key="ver.version"
            :href="getVersionUrl(ver)"
            role="option"
            :aria-selected="ver.version === currentVersion"
            class="menu-option"
            :class="{ active: ver.version === currentVersion }"
            @click="selectVersion(ver, $event)"
          >
            <div class="option-left">
              <span class="option-version">{{ ver.version }}</span>
              <span v-if="ver.isLatest" class="option-badge">latest</span>
            </div>
            <span v-if="ver.version === currentVersion" class="option-check" aria-hidden="true">
              ✓
            </span>
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.nav-version-selector {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--vp-nav-height);
  padding: 0 4px;
}

.nav-version-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.nav-version-btn:hover,
.is-open .nav-version-btn {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-elv);
}

.nav-btn-icon {
  font-size: 13px;
  line-height: 1;
}

.nav-btn-version {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.nav-btn-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 1px 5px;
  border-radius: 4px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  line-height: 1.3;
}

.nav-btn-chevron {
  width: 14px;
  height: 14px;
  color: var(--vp-c-text-2);
  transition: transform 0.2s ease;
  margin-left: 2px;
}

.is-open .nav-btn-chevron {
  transform: rotate(180deg);
  color: var(--vp-c-brand-1);
}

/* Dropdown menu */
.nav-version-menu {
  position: absolute;
  top: calc(100% - 10px);
  right: 4px;
  z-index: 100;
  min-width: 160px;
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-3);
  padding: 8px;
  display: flex;
  flex-direction: column;
}

.menu-header {
  padding: 2px 6px 4px;
}

.menu-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  letter-spacing: 0.04em;
}

.menu-divider {
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 4px 0 6px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.menu-option:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.menu-option.active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.option-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.option-version {
  font-family: var(--vp-font-family-mono);
}

.option-badge {
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 1px 4px;
  border-radius: 3px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.option-check {
  font-size: 13px;
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

/* Mobile Screen Menu (in hamburger drawer) */
.nav-version-selector.is-mobile {
  width: 100%;
  height: auto;
  padding: 12px 0;
  display: block;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 8px;
}

.nav-version-selector.is-mobile .nav-version-btn {
  width: 100%;
  height: 38px;
  justify-content: space-between;
}

.nav-version-selector.is-mobile .nav-version-menu {
  position: static;
  margin-top: 8px;
  box-shadow: none;
  border-color: var(--vp-c-divider);
}

/* Animations */
.nav-menu-fade-enter-active,
.nav-menu-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.nav-menu-fade-enter-from,
.nav-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
