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
    updateUser(state, payload) {
      state.userInfo.user_first_name = payload.user_first_name;
      state.userInfo.user_last_name = payload.user_last_name;
      state.userInfo.user_phone = payload.user_phone;
      state.userInfo.user_email = payload.user_email;
      state.userInfo.user_pic = payload.user_pic;
      state.userInfo.user_role = payload.user_role;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
  },
  actions: {
    setToken({ commit }, { token, userInfo }) {
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
    updateProfile({ commit }, { user_first_name, user_last_name, user_phone, user_email, user_pic, user_role}) {
      const payload = {
        user_first_name: user_first_name,
        user_last_name: user_last_name,
        user_phone: user_phone,
        user_email: user_email,
        user_pic:user_pic,
        user_role: user_role
      };
      commit('updateUser', payload);
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
