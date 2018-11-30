import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'hash',
  	routes: [
		{
	    	path: '/',
	      	redirect: '/index'
    	},
  		{
		    path: '*',
		    name: '404',
	      	component: () => import(/* webpackChunkName: 'not-found' */'@/pages/404')
    	}
  	]
});