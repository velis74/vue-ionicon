<template>
  <div v-if="loaded_svg" :key="loaded_svg" class="ionicon-wrapper" v-html="loaded_svg"/>
</template>

<script lang="ts">
import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import { defineComponent } from 'vue';

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.hasAttribute('xlink:href') && !node.getAttribute('xlink:href').match(/^#/)) {
    node.remove();
  }
  if (node.hasAttribute('href') && !node.getAttribute('href').match(/^#/)) {
    node.remove();
  }
});

export default defineComponent({
  name: 'IonIcon',
  props: { name: { type: String, required: false, default: null } },
  emits: ['icon-loaded'],
  data() {
    return { loaded_svg: '' };
  },
  computed: {
    repo_url() {
      return `https://unpkg.com/ionicons@5.5.1/dist/svg/${this.name}.svg`;
    },
  },
  watch: {
    name() {
      this.loaded_svg = '';
      this.loadSVG();
    },
  },
  created() {
    if (!window.ionicon_cache) window.ionicon_cache = {};
  },
  mounted() {
    this.loadSVG();
  },
  methods: {
    getCache() { return window.ionicon_cache[this.name]; },
    setCache(value) {
      window.ionicon_cache[this.name] = value;
      return value;
    },
    sanitize(svg) {
      // remove the title attribute because it's messing with selenium getting element text (title is included)
      // this makes getting button text much harder, especially because this icon is lazy-loading
      let result = svg.replace(/<title>.*<\/title>/i, '');
      if (!result.includes('currentColor')) {
        // The provided icon doesn't specify its colours as currentColor. Let's try to assign them. Of course,
        // this will have zero effect if the svg actually defines its colours otherwise, e.g. by specifying fill="black"
        result = result.replace(/(<svg)(\s)(.*)/i, '$1 fill="currentColor" $3');
      }
      result = DOMPurify.sanitize(
        result, { USE_PROFILES: { svg: true }, ADD_TAGS: ['use'] },
      );
      return result;
    },
    setLoadedSVG(svg) {
      this.loaded_svg = svg;
      this.$emit('icon-loaded', true);
    },
    async loadSVG() {
      const name = this.name;

      if (!name) return; // Name is not defined, so don't render anything
      const cache = this.getCache();
      this.loaded_svg = '&hellip;'; // ellipsis while we're loading
      if (cache) {
        // icon is already in cache or at least there's a promise there
        if (typeof cache.then === 'function') {
          // there's a promise there
          try {
            const res = await cache;
            this.setLoadedSVG(this.sanitize(res.data));
          } catch { console.error('Failed waiting for an existing axios request to finish'); }
        } else {
          this.setLoadedSVG(cache); // icon is already in cache
        }
      } else if (name.toLowerCase().includes('<svg')) {
        this.setLoadedSVG(this.sanitize(name));
      } else {
        // if icon name contains a '/' character, we assume it's a local resource, otherwise an ion icon
        const url = name.indexOf('/') > -1 ? name : this.repo_url;
        try {
          const res = await this.setCache(axios.get(url)); // first we set cache to axios promise
          this.setLoadedSVG(this.setCache(this.sanitize(res.data))); // then to sanitized svg
        } catch { console.error('Failed loading IonIcon. Wrong icon name or URL?'); }
      }
    },
  },
});
</script>
