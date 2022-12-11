import {getUserInfo, login, logout} from "@/api/auth";
import {getToken, getUserName, removeToken, setToken, setUserName} from "@/utils/auth";

const state = {
    token: getToken(), // token
    user: "", // 用户对象
    userName: getUserName(), // 用户名
};

const mutations = {
    SET_TOKEN_STATE: (state, token) => {
        state.token = token;
    },
    SET_USER_STATE: (state, user) => {
        state.user = user;
    },
    SET_USERNAME_STATE: (state, username) => {
        state.userName = username;
    }
};

const actions = {
    async login({ commit, state }, userInfo) {
        console.log(userInfo);
        const { name, pass, rememberMe } = userInfo;
        return new Promise((resolve, reject) => {
            login({ username: name.trim(), password: pass, rememberMe: rememberMe })
                .then((response) => {
                    const { data } = response;
                    commit("SET_USERNAME_STATE", name);
                    setUserName(name);
                    commit("SET_TOKEN_STATE", data.token);
                    setToken(data.token);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async getInfo({ commit, state }) {
        console.log("user:" + state.userName);
        return new Promise((resolve, reject) => {
            getUserInfo(state.userName)
                .then((response) => {
                    const { data } = response;
                    console.log(data);
                    if (!data) {
                        commit("SET_TOKEN_STATE", "");
                        commit("SET_USER_STATE", "");
                        removeToken();
                        resolve();
                        reject("Verification failed, please Login again.");
                    }
                    commit("SET_USER_STATE", data);
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token)
                .then((response) => {
                    console.log(response);
                    commit("SET_TOKEN_STATE", "");
                    commit("SET_USER_STATE", "");
                    commit("SET_USERNAME_STATE", "");
                    removeToken();
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};