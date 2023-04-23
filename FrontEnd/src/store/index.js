import { createStore } from "vuex";
const storagePlugin = store => {
    // Listen for changes to the local storage and update the store
    window.addEventListener('storage', event => {
      if (event.key === 'email') {
        const prevId = store.state.email
        store.commit('login',prevId)
      }
    })
  }
export default  createStore({
    state:{
        email:"",
        prevId: ''
    },
    getters:{

    },
    mutations:{
        login(state,email){
            state.email = email;
            localStorage.setItem('email',email);

        },logout(state){
            state.email="";
            localStorage.removeItem("email");

        },
        initializeStore(state){
            if(localStorage.getItem('email')){
                state.email = localStorage.getItem('email');
            }
        }
    },
    actions:{

    },  plugins: [storagePlugin],
    modules:{

    }
})
