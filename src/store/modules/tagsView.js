import appConst from '../appConst';
import storage from '@/utils/localStorage';

const setViews = (visitedViews) => {
    storage.set(appConst.tagsview.localStorage.visitedViews, visitedViews);
};

const tagsView = {
    state: {
        visitedViews: storage.get(appConst.tagsview.localStorage.visitedViews) || [],
        cachedViews: []
    },
    mutations: {
        [appConst.tagsview.motaions.ADD_VISITED_TAG]: (state, route) => {
            if (state.visitedViews.some((view) => view.name === route.name)) return;
            state.visitedViews.push({
                name: route.name,
                title: route.meta.title || 'empty-name',
                path: route.path
            });
            if (route.cache) {
                state.cachedViews.push(route.name);
            }
            setViews(state.visitedViews);
        },
        [appConst.tagsview.motaions.REMOVE_VISITED_TAG]: (state, tag) => {
            for (let [index, viewItem] of state.visitedViews.entries()) {
                if (viewItem.path === tag.path) {
                    state.visitedViews.splice(index, 1);
                    break;
                }
            }
            for (let [index, name] of state.cachedViews.entries()) {
                if (name === tag.name) {
                    state.cachedViews.splice(index, 1);
                }
            }
            setViews(state.visitedViews);
        },
        [appConst.tagsview.motaions.CLOSE_OTHER_TAG]: (state, route) => {
            const newView = new Array({
                name: route.name,
                title: route.meta.title || 'empty-name',
                path: route.path
            });
            state.visitedViews = newView;
            setViews(newView);
        },
        [appConst.tagsview.motaions.CLOSE_ALL_TAG]: (state, route) => {
            state.visitedViews = [];
            setViews([]);
        }
    },
    actions: {
        add({ commit, state }, route) {
            commit(appConst.tagsview.motaions.ADD_VISITED_TAG, route);
        },
        remove({ commit, state }, tag) {
            return new Promise((resolve) => {
                commit(appConst.tagsview.motaions.REMOVE_VISITED_TAG, tag);
                resolve(state.visitedViews);
            });
        },
        closeOther({ commit, state }, route) {
            commit(appConst.tagsview.motaions.CLOSE_OTHER_TAG, route);
        },
        closeAll({ commit, state }) {
            return new Promise((resolve) => {
                commit(appConst.tagsview.motaions.CLOSE_ALL_TAG);
                resolve();
            });
        }
    }
};

export default tagsView;
