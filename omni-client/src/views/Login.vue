<template>
  <div class="login">
    <section class="inputs">
      <span class="labelBox">
        <label>Username:</label>
        <input type="text" v-model="username">
        <label>Password:</label>
        <input type="password" v-model="password">
      </span>
      <button @click="handleLogin">Login</button>
      <button @click="getAllClasses">GetData</button>
    </section>
    <section :class='error ? "error message" : "message"' v-if="message">
      {{message}}
    </section>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import login from '../apiBindings/login'
import store from '../store/index'

const data = {
  error:false,
  message: "",
  password: "",
  username: ""
}

@Options({
  components: {},
  data: function() {
    return data;
  },

  methods: {
    async getAllClasses() {
      // getAllClasses().then(res => res.json().then(data => console.log(data)))
      console.log(store.state.authToken);
    },
    async handleLogin() { 
      this.setMessage("", false);
      login(this.username, this.password).then(res => {
        if(res){
          store.commit('setAuthToken', res)
          this.setMessage("Logged In!", false);
        } else {
          this.setMessage("Login Failed", true);
        }
      })
    },

    setMessage(message:string, error:boolean) {
      this.error = error;
      this.message = message;
    }
  }
})

export default class Login extends Vue {};

</script>

<style lang="scss" scoped>
.login {
  padding:3rem;
  > * {
    max-width: 400px;
    margin:1rem;
    margin-left: auto;
    margin-right:auto;
  }

  .message {
    background: #fff;
    border-radius:0.5rem;
    box-shadow: var(--b-shadow-1);
    padding:1rem;
    
    border:2px solid green;
    background-color:rgb(209, 255, 209);
    
    &.error {
      border:2px solid red;
      background-color:rgb(255, 209, 209);
    }
  }

  .inputs {
    .labelBox {
      display:grid;
      grid-template-columns: auto 1fr;
      grid-gap: 1rem;
      label {
        text-align: center;
        line-height: 2rem;
        vertical-align: middle;
      }
    }

    > * {
      margin: 0.5rem;
    }

    background: #fff;
    display: flex;
    flex-direction: column;
    padding:2rem;
    border-radius:0.5rem;
    box-shadow: var(--b-shadow-1);
  }
}

</style>