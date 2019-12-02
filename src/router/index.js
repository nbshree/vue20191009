import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const constantRoutes = [
  // {
  //   path: '',
  //   component: () => import('@/views/Exhibition1129'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About')
  },
  {
    path: '/403',
    component: () => import('@/views/errorPage/403'),
    hidden: true
  },
  {
    path: '/lock',
    component: () => import('@/views/lock/index'),
    name: 'lock',
    hidden: true
  },
  {
    path:'',
    name:'layout',
    component:()=>import('@/views/layout/index'),
    children:[
      {
        path: '/lock',
        component: () => import('@/views/lock/index'),
        name: 'lock',
        hidden: true
      },
    ]
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
//
// export function resetRouter () {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
