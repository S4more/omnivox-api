import { createStore } from 'vuex'

interface AuthToken {
  expires:number, 
  value:string
}

let storedToken = JSON.parse(localStorage.getItem("authToken") || "{}");
if(!storedToken) storedToken = {expires:0, value:""};

export default createStore({
  state: {
    authToken: {expires:0, value:""} as AuthToken
  },
  mutations: {
    setAuthToken (state, token:string) {
      state.authToken.value = token;
      state.authToken.expires = Date.now();
      localStorage.setItem("authToken", JSON.stringify(state.authToken));
    }
  },
  getters: {
    getAuthToken: state => {
      return (state.authToken.expires < Date.now()) ? state.authToken.value : "";
    }
  }
})
