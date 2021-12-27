import { createStore } from 'vuex'

export default createStore({
  state: {
    authToken : ""
  },
  mutations: {
    setAuthToken (state, token:string) {
      state.authToken = token;
    }
  },
})
