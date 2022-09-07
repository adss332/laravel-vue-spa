

import './bootstrap';

import {createApp} from 'vue';
import {createRouter,createWebHistory} from 'vue-router';
import useVuelidate from '@vuelidate/core'

import app from './components/app.vue';
import Home from './components/home.vue';
import About from './components/about.vue';
import Desks from './components/desks/desks.vue';
import ShowDesk from './components/desks/ShowDesk.vue';

let appka=createApp ({});


const routes = [{
		path:'/',
		name:'home',
		component:Home
	},
    {
    	path:'/about',
    	name:'about',
    	component:About  
    },
    {
		path:'/desks',
		name:'desks',
		component:Desks
	},
	{
		path:'/desks/:deskId',
		name:'ShowDesk',
		component:ShowDesk,
		props:true
	},
	]

const router = new createRouter({
	history:createWebHistory(),
	routes
})


appka.use(router);
appka.use(useVuelidate);

appka.component('app' , app);

appka.mount("#app")