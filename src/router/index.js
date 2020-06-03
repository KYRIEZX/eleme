import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    //name: 'index',
    component: index,
    children:[{
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      name:'home',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
      path:'/me',
      name:'me',
      component: () => import(/* webpackChunkName: "about" */ '../views/Me.vue')
    },
    {
      path:'/order',
      name:'order',
      component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue')
    },
    {
      path:'/address',
      name:'address',
      component: () => import(/* webpackChunkName: "about" */ '../views/Address.vue')
    },
    {
      path:'/city',
      name:'city',
      component: () => import(/* webpackChunkName: "about" */ '../views/City.vue')
    },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.ele_login?true:false;
  if(to.path=='/login'){
    next();
  }else{
    isLogin?next():next('/login');
  }
})

export default router
