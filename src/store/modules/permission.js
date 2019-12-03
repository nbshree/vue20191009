import { constantRouterMap } from '@/router';
import { asyncRouterMap } from '@/router/asyncRouterMap';
import getters from '../getters';
import appConst from '../appConst';

const routeAuthentication = (route, permissionCodeList) => {
    if (route.meta && route.meta.permission) {
        return permissionCodeList.some((permission) => route.meta.permission.indexOf(permission) > -1);
    } else {
        return true;
    }
};

const filterAsyncRouter = (asyncRouterMap, permissionCodeList) => {
    const routers = asyncRouterMap.filter((route) => {
        if (routeAuthentication(route, permissionCodeList)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, permissionCodeList);
            }
            return true;
        }
        return false;
    });
    return routers;
};

const permission = {
    state: {
        authorization: false,
        permissionList: [],
        permissionCodeList: [],
        routers: constantRouterMap,
        asyncRouters: []
    },
    mutations: {
        [appConst.permission.motaions.SET_ROUTERS]: (state, routers) => {
            state.asyncRouters = routers;
            // 最后手工加入404的路由
            state.routers = constantRouterMap.concat(routers).concat({
                path: '*',
                redirect: '/404',
                hidden: true
            });
            state.authorization = true;
        },
        [appConst.permission.motaions.SET_PERMISSION_LIST]: (state, permissionList) => {
            state.permissionList = permissionList;
        },
        [appConst.permission.motaions.SET_PERMISSION_CODE_LIST]: (state, permissionCodeList) => {
            state.permissionCodeList = permissionCodeList;
        }
    },
    actions: {
        getAuthorizationRoutes({ commit }, permissionCodeList) {
            return new Promise((resolve) => {
                let routers = null;
                // 如果是Debug模式则直接返回所有路由, 否则进行路由过滤
                if (getters.debugMode) {
                    routers = asyncRouterMap;
                } else {
                    routers = filterAsyncRouter(asyncRouterMap, permissionCodeList);
                }
                commit(appConst.permission.motaions.SET_ROUTERS, routers);
                resolve();
            });
        }
    }
};

export default permission;
