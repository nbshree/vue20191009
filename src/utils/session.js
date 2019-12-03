import Cookies from 'js-cookie';
const SessionKey = 'ILDWotAuthLoginInfo';
const SessionIdKey = 'ILDWotAuthSession';

export function getSession() {
    return Cookies.get(SessionKey);
}

export function setSession(sessionContent) {
    return Cookies.set(SessionKey, sessionContent);
}

export function removeSession() {
    return Cookies.remove(SessionKey);
}

export function getSessionId() {
    return Cookies.get(SessionIdKey);
}

export function setSessionId(sessionContent) {
    return Cookies.set(SessionIdKey, sessionContent);
}

export function removeSessionId() {
    return Cookies.remove(SessionIdKey);
}
