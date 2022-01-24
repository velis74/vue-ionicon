import Vue from 'vue';

import DemoApp from './index.vue';

new Vue({
  el: '#app',
  components: { DemoApp },
  render: (r) => r(DemoApp),
}).$mount('body');
