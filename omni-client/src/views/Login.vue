<template>
  <div class="login">
    <section class="inputs">
      <span class="labelBox">
        <label>Username:</label>
        <input type="text" v-model="username">
        <label>Password:</label>
        <input type="password" v-model="password">
      </span>
      <button @click="handleLogin">
        <span class="loading" v-if="loading">
          <img src="../assets/loading.svg" alt="">
        </span>
        <span v-else>Login</span>
      </button>
      <button @click="getAllClasses">GetData</button>
    </section>
    <section :class='error ? "error message" : "message"' v-if="message">
      {{ message }}
    </section>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import login from '../apiBindings/login'
import store from '../store/index'
import getLeaClass from '../apiBindings/getLeaClass'

const data = {
  error:false,
  loading:false,
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
      getLeaClass().then(data => this.setMessage(JSON.stringify(data)));
    },

    async handleLogin() { 
      this.setMessage("", false);
      this.loading = true;
      login(this.username, this.password).then(res => {
        if(res){
          store.commit('setAuthToken', res)
          this.setMessage("Logged In!", false);
        } else {
          this.setMessage("Login Failed", true);
        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.setMessage(err, true);
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
  @keyframes loading {
    0% {transform: rotate(0deg)}
    50% {transform: rotate(180deg)}
    100% {transform: rotate(360deg)}
  }

  button > .loading > img {
    height: 1.5rem;
    margin: -0.5rem;
    animation: loading 1s linear infinite;
  }

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