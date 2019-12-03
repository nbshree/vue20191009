const appConst = {
    app: {
        cookies: {
            firstLogin: 'ildwotsupport-firstLogin',
            language: 'ildwotsupport-language',
            sliderState: 'ildwotsupport-sliderState',
            lock: 'ildwotsupport-lock'
        },
        localStorage: {
            sliderState: 'ildwotsupport-sliderState',
            lock: 'ildwotsupport-lockState'
        },
        motaions: {
            SET_LANGUAGE: 'SET_LANGUAGE',
            SET_FIRSTLOGIN: 'SET_FIRSTLOGIN',
            SET_SLIDERSTATE: 'SET_SLIDERSTATE',
            SET_LOCK_STATE: 'SET_LOCK_STATE'
        }
    },
    user: {
        cookies: {
            userInfo: 'ildwotsupport-userInfo'
        },
        motaions: {
            SET_SESSION_ID: 'SET_SESSION_ID',
            SET_USER_INFO: 'SET_USER_INFO',
            SET_PERMISSION: 'SET_PERMISSION',
            SET_AVATAR: 'SET_AVATAR',
            SET_INTRODUCTION: 'SET_INTRODUCTION'
        }
    },
    permission: {
        motaions: {
            SET_ROUTERS: 'SET_ROUTERS',
            SET_PERMISSION_LIST: 'SET_PERMISSION_LIST',
            SET_PERMISSION_CODE_LIST: 'SET_PERMISSION_CODE_LIST'
        }
    },
    tagsview: {
        motaions: {
            ADD_VISITED_TAG: 'ADD_VISITED_TAG',
            REMOVE_VISITED_TAG: 'REMOVE_VISITED_TAG',
            CLOSE_OTHER_TAG: 'CLOSE_OTHER_TAG',
            CLOSE_ALL_TAG: 'CLOSE_ALL_TAG'
        },
        localStorage: {
            visitedViews: 'ildwotsupport-visitedViews'
        }
    }
};

export default appConst;
