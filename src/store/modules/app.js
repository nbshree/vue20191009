import Cookies from 'js-cookie';
import localStorage from '@/utils/localStorage';
import appConst from '../appConst';

const app = {
  state: {
    name: process.env.VUE_APP_NAME,
    firstLogin: localStorage.get(appConst.app.cookies.firstLogin) || 'yep',
    version: process.env.VUE_APP_VERSION,
    language: Cookies.get(appConst.app.cookies.language) || 'zh',
    sidebar: {
      sliderState: localStorage.get(appConst.app.localStorage.sliderState)
    },
    lock: localStorage.get(appConst.app.localStorage.lock) || 'unlock',
    debugMode: true
  },
  mutations: {
    [appConst.app.motaions.SET_LANGUAGE]: (state, newLanguage) => {
      state.language = newLanguage;
      Cookies.set(appConst.app.cookies.language, newLanguage);
    },
    [appConst.app.motaions.SET_FIRSTLOGIN]: (state) => {
      state.firstLogin = 'nope';
      localStorage.set(appConst.app.cookies.firstLogin, 'nope');
    },
    [appConst.app.motaions.SET_SLIDERSTATE]: (state, newSliderState) => {
      state.sidebar.sliderState = newSliderState;
      localStorage.set(appConst.app.localStorage.sliderState, newSliderState);
    },
    [appConst.app.motaions.SET_LOCK_STATE]: (state, newLockState) => {
      state.lock = newLockState;
      localStorage.set(appConst.app.localStorage.lock, newLockState);
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      let state = '';
      localStorage.get(appConst.app.localStorage.sliderState) === 'full' ? (state = 'collapse') : (state = 'full');
      commit(appConst.app.motaions.SET_SLIDERSTATE, state);
    },
    setLanguage({ commit }, language) {
      commit(appConst.app.motaions.SET_LANGUAGE, language);
    },
    setFirstLogin({ commit }) {
      commit(appConst.app.motaions.SET_FIRSTLOGIN);
    },
    setSliderState({ commit }, newSliderState) {
      commit(appConst.app.motaions.SET_SLIDERSTATE, newSliderState);
    },
    setLockState({ commit }, lockstate) {
      commit(appConst.app.motaions.SET_LOCK_STATE, lockstate);
    }
  }
};

export default app;
