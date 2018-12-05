import Vue from 'vue';
import Router from 'vue-router';
import operation from './operation/operation';
import maintain from './maintain/maintain';
import statistics from './statistics/statistics';
import supervision from './supervision/supervision';
Vue.use(Router);

export default new Router({
	mode: 'hash',
  	routes: [
		{
			path: '/',
			meta:{
				title:"互联网医院管理系统"
			},
	      	redirect: '/index/operation/index'
    	},
		{
			path: '/index',
			name:'home',
			meta:{
				title:"互联网医院管理系统"
			},
			component:()=>import('@/pages/index'),
			redirect:'/index/operation/index',
			children:[
				//运营端路由
				operation.reviewList,
				operation.reviewList1,
				operation.reviewList2,
				operation.reviewList3,
				operation.kindeditorTest,

				//运维端路由
				maintain.reviewList,
				//统计端路由
				statistics.reviewList,
				//监管端路由
				supervision.reviewList,
			]
		},
		{
			path: '/login',
			name:'login',
			meta:{
				title:"登陆"
			},
			component:()=>import('@/pages/login')
		},
  		{
		    path: '*',
		    name: '404',
	      	component: () => import(/* webpackChunkName: 'not-found' */'@/pages/404')
		}
  	]
});
