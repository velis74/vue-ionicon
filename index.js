import Vue from 'vue';

import IonIcon from './ion-icon';

new Vue({
  el: '#app',
  components: { IonIcon },
  render: (r) => r(IonIcon, { props: { name: 'warning' } }),
}).$mount('body');
