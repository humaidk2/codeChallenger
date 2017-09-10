import Vue from 'vue';
import VueCodeMirror from 'vue-codemirror';
import Router from 'vue-router';
import Hello from '@/components/Hello';

import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/mark-selection';
// eslint-disable-next-line
Vue.use(Router);
Vue.use(VueCodeMirror);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
  ],
});
