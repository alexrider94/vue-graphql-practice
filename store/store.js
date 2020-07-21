import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken : null
    },
    getter : {

    },
    mutations : {
        LOGIN(state,accessToken){
            state.accessToken = accessToken

            localStorage.accessToken = accessToken
            
            const enhanceAccessToeken = () => {
                const {accessToken} = localStorage
                if (!accessToken) return
                Axios.defaults.headers.common['Authorization'] = `${accessToken}`;
              }
            enhanceAccessToeken()
        },

        LOGOUT(state) {
            state.accessToken = null
            delete localStorage.accessToken
        }
    },

    actions: {
        LOGIN ({commit},token) {
            commit('LOGIN',token);
            Axios.defaults.headers.common['Authorization'] = `${token}`;
        },
        LOGOUT ({commit}){
            Axios.defaults.headers.common['Authorization'] = undefined
            commit('LOGOUT');
        }
    }

    
});