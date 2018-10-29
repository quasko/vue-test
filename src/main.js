import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { mapActions } from 'vuex';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  mounted () {
    document.addEventListener("keyup", this.nextItem);
  },
  methods: {
    ...mapActions(['keyPress']),
    nextItem (e) {
      this.keyPress(e.keyCode);
    }
  }
}).$mount('#app')
