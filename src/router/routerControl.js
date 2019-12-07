import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { getSession } from '@/utils/session'
import * as tools from '@/utils/tools'

const hasRouter = (toPath, parentPath, routers) => {
  return routers.some((router) => {
    let realPath = parentPath + '/' + router.path;
    if (realPath.indexOf(toPath) !== -1) return true;
    else if (router.children != undefined && router.children != null && router.children.length > 0) {
      return hasRouter(toPath, realPath, router.children);
    } else return false;
  });
};

const hasPermission = (permissionCode, permissionList) => {
  // if (roles.indexOf('admin') !== -1) return true
  // if (!permissionRoles) return true
  // return roles.some(role => permissionRoles.indexOf(role) !== -1)
  if (!permissionList) return true;
  return permissionList.some((permission) => permission.indexOf(permissionCode) !== -1);
}

const whiteList = ['/403', '/404', '/500', '/login', '/lock'];
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  if (store.getters.lockState === 'lock' && to.name !== 'lock') {
    next({
      replace: true,
      name: 'lock'
    })
  } else if (store.getters.lockState === 'unlock' && to.name === 'lock') {
    next(false)
  } else if (getSession()) {
    // 如果登录过后访问登录页面则跳回主页
    if (to.path === '/login') {
      next({ path: '/' })
      nprogress.done()
    } else {
      // 如果尚未构建授权路由，则获取用户信息，并构建授权路由表
      if (!store.getters.permission.authorization) {
        try {
          const response = await store.dispatch('getUserPermission');
          if (response.status === 1) {
            // 根据 roles 权限生成路由表
            await store.dispatch('getAuthorizationRoutes', response.permissionCodeList);
            // 动态新生成的路由表
            router.addRoutes(store.getters.asyncRouters);
            next({ ...to, replace: true });
          } else {
            await store.dispatch('logoutForError');
            tools.notify({
              type: 'error',
              message: '授权认证失败，请重新登录!'
            });
            next({ path: '/login' });
          }
        } catch (error) {
          await store.dispatch('logoutForError');
          tools.notify({
            type: 'error',
            message: '授权认证失败，请重新登录!'
          });
          next({ path: '/login' });
        }
      }
      // 如已构建授权路由，则判断是否有访问该路由的权限
      else {
        // 如果是转跳，直接放行
        if (to.path.indexOf('/redirect') !== -1) {
          next();
        }
        // 依次判断路由是否具有合法权限访问
        else if (whiteList.indexOf(to.path) !== -1) {
          next();
        }
        // 判断访问路径是否在路由表中
        else if (hasRouter(to.path, '', store.getters.permission.routers)) {
          if (hasPermission(to.meta.permission, store.getters.permissionCodeList)) {
            next();
          } else {
            next({ path: '/403', replace: true, query: { noGoBack: true } });
          }
        } else {
          next({ path: '/404' });
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      nprogress.done() // 如果当前页是 login 则路由不会触发 after 钩子函数，需要手动处理
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
