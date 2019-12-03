import Vue from 'vue'
import VueRouter from 'vue-router'
import _import from "@/utils/import";
const Layout = _import('layout/index');

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: _import('redirect/index')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // component: () => import(/* webpackChunkName: "about" */ '@/views/About')
    component: _import("About")
  },
  {
    path: '/403',
    component: _import('errorPage/403'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },
  {
    path: '/500',
    component: _import('errorPage/500'),
    hidden: true
  },
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/lock',
    component: _import("lock/index"),
    name: 'lock',
    hidden: true
  },
  {
    path:'',
    component:Layout,
    redirect:'dashboard',
    children:[
      {
        path: 'dashboard',
        name: 'dashboard',
        component: _import("dashboard/index"),
        meta: {
          title: '控制面板',
          icon: 'icon-dashboard',
          permission: 'dashboard'
        }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()
//
// export function resetRouter () {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
