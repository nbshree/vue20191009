const getters = {
  /* app */
  app: (state) => state.app,
  sidebar: (state) => state.app.sidebar,
  getSliderStateWidth: (state) => {
    return state.app.sidebar.sliderState === 'full' ? '240px' : '60px';
  },
  lockState: (state) => state.app.lock,
  debugMode: (state) => state.app.debugMode,
  /* permission */
  permission: (state) => state.permission,
  permissionRouters: (state) => state.permission.routers,
  permissionList: (state) => state.permission.permissionList,
  permissionCodeList: (state) => state.permission.permissionCodeList,
  asyncRouters: (state) => state.permission.asyncRouters,
  /* user */
  user: (state) => state.user
};
export default getters;
