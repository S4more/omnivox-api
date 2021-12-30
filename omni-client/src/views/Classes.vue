<template>
  <div class="classes">
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import login from '../apiBindings/login'
import store from '../store/index'

const data = {
	
}

@Options({
  components: {},
  data: function() {
    return data;
  },

  methods: {
    async loadClasses() {
      this.setMessage("", false);
    },
  }
})

export default class Classes extends Vue {};

</script>

<style lang="scss" scoped>
</style>