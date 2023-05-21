import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  },
  getters: {
    getToken: state => state.token,
    getUserInfo: state => state.userInfo
  },
  mutations: {
    login(state, payload) {
      if (!payload.editable) {
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
        state.userInfo = payload.userInfo;
        localStorage.setItem('userInfo', JSON.stringify(payload.userInfo));
      }
    },
    logout(state) {
      state.token = '';
      state.userInfo = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    },
    initializeStore(state, payload) {
      if (!payload.editable && localStorage.getItem('token')) {
        state.token = localStorage.getItem('token');
      }
    },

  },
  actions: {
    setToken({ commit },  { token, userInfo }) {
      const payload = {
        token: token,
        userInfo: userInfo,
        editable: false,
      };
      commit('login', payload);
    },
    initializeStore({ commit }) {
      const payload = {
        editable: false
      };
      commit('initializeStore', payload);
    },
    logout({ commit }) {
      commit('logout');
    },

  },
  plugins: [
    store => {
      window.addEventListener('storage', event => {
        if (event.key === 'token' || event.key === 'userInfo') {
          const prevtoken = store.state.token
          const prevuserInfo = store.state.userInfo
          const payload = {
            token: prevtoken,
            userInfo: prevuserInfo,
            editable: false,
          };
          store.commit('login', payload);
        }

      });
    }

  ],
  modules: {}
});
