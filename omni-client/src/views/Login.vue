<template>
  <div class="login">
    <img alt="Omni Logo" src="../assets/logo.png">
    <section class="error" v-if="hasError">
      <p class="errorMsg">
        {{errorMsg}}
      </p>
    </section>
    <section class="inputs">
      <input type="text" v-model="username">
      <input type="password" v-model="password">
      <button @click="login">Login</button>
    </section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';


const data = {
  hasError:false,
  errorMsg:"",
  password: "",
  username: ""
}

@Options({
  components: {},
  data: function() {
    return data;
  },
  methods: {
    login() {
      // TOOD Handle login
    },

    error(message:string) {
      this.hasError = true;
      this.errorMsg = message;
    }
  }
})

export default class Login extends Vue {};

</script>
