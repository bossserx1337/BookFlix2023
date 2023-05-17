import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem('token') || '', // เก็บค่า token จาก localStorage หรือเป็นค่าว่างถ้าไม่มี
    userInfo: null,
  },
  getters: {
    getToken: state => state.token // getter เพื่อเรียกใช้ค่า token จาก state
  },
  mutations: {
    login(state, payload) {
      // mutation เพื่อกำหนดค่า token ใน state และ localStorage โดย payload จะมีพร็อพเพอร์ตี้ editable เพื่อตรวจสอบความสามารถในการแก้ไขค่า token
      if (!payload.editable) {
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
      }
    },
    logout(state) {
      // mutation เพื่อล้างค่า token ใน state และ localStorage
      state.token = '';
      localStorage.removeItem('token');
    },
    initializeStore(state, payload) {
      // mutation เพื่อกำหนดค่าเริ่มต้นให้กับ state.token จาก localStorage โดย payload จะมีพร็อพเพอร์ตี้ editable เพื่อตรวจสอบความสามารถในการแก้ไขค่า token
      if (!payload.editable && localStorage.getItem('token')) {
        state.token = localStorage.getItem('token');
      }
    }
  },
  actions: {
    setToken({ commit }, token) {
      // action เพื่อเรียกใช้ mutation 'login' เพื่อกำหนดค่า token ใน state และ localStorage
      const payload = {
        token: token,
        editable: false
      };
      commit('login', payload);
    },
    initializeStore({ commit }) {
      // action เพื่อเรียกใช้ mutation 'initializeStore' เพื่อกำหนดค่าเริ่มต้นให้กับ state.token จาก localStorage
      const payload = {
        editable: false
      };
      commit('initializeStore', payload);
    },
    logout({ commit }) {
      // action เพื่อเรียกใช้ mutation 'logout' เพื่อล้างค่า token ใน state และ localStorage
      commit('logout');
    }
  },
  plugins: [
    store => {
      // plugin เพื่อตรวจสอบการเปลี่ยนแปลงใน localStorage เพื่ออัปเดต store
      window.addEventListener('storage', event => {
        if (event.key === 'token') {
          const newToken = event.newValue || ''; // ค่า token ใหม่ที่มาจากการเปลี่ยนแปลงใน localStorage
          const payload = {
            token: newToken,
            editable: true
          };
          store.commit('login', payload); // เรียกใช้ mutation 'login' เพื่อกำหนดค่า token ใน state และ localStorage
        }
      });
    }
  ],
  modules: {}
});
