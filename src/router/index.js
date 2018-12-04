import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Search from '@/pages/Search';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'root',
      component: Home,
    },
    {
      path: '/search',
      component: Search,
    },
  ],
});
