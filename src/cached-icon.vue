<template>
  <div v-if="loadedSvg" :key="loadedSvgKey" class="cached-icon-wrapper" v-html="loadedSvg"/>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, ref, watch } from 'vue';

import { globalCache, IconDefOrPromise, IconGetResponse, ResolvedIconGetResponse } from './cache';
import { augment } from './svg-augment';

const props = defineProps<{ name?: string }>();
const emit = defineEmits<{ (e: 'icon-loaded', name: string): void; }>();

const loadedSvg = ref('' as IconDefOrPromise);
const repoUrl = computed(() => `https://unpkg.com/ionicons@5.5.1/dist/svg/${props.name}.svg`);
const loadedSvgKey = computed(
  () => ((loadedSvg.value as IconGetResponse)?.then ? 'loading' : loadedSvg.value as string),
);

const getCache = () => globalCache.get(props.name as string);
const setCache = (value: IconDefOrPromise) => {
  globalCache.set(props.name as string, value);
  return value;
};
const setLoadedSVG = (svg: IconDefOrPromise) => {
  loadedSvg.value = svg;
  emit('icon-loaded', props.name as string);
};
const loadSVG = async () => {
  const name = props.name;

  if (!name) return; // Name is not defined, so don't render anything
  const cache = getCache();
  loadedSvg.value = '&hellip;'; // ellipsis while we're loading
  if (cache) {
    // icon is already in cache or at least there's a promise there
    if (typeof (cache as IconGetResponse).then === 'function') {
      // there's a promise there
      try {
        const res = await cache as ResolvedIconGetResponse;
        setLoadedSVG(augment(res.data));
      } catch { console.error('Failed waiting for an existing axios request to finish'); }
    } else {
      setLoadedSVG(cache as string); // icon is already in cache
    }
  } else if (name.toLowerCase().includes('<svg')) {
    setLoadedSVG(augment(name));
  } else {
    // if icon name contains a '/' character, we assume it's a local resource, otherwise an ion icon
    const url = name.indexOf('/') > -1 ? name : repoUrl.value;
    try {
      // first we set cache to axios promise
      const res1 = await setCache(axios.get(url)) as ResolvedIconGetResponse;
      setLoadedSVG(setCache(augment(res1.data))); // then to sanitized svg
    } catch (err: any) {
      console.error(`Failed loading CachedIcon. Wrong icon name or URL? (${url})`);
      console.log(err);
    }
  }
};

watch(() => props.name, () => { loadedSvg.value = ''; loadSVG(); });

loadSVG();
</script>
