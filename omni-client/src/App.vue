<template>
  <div id="nav">
    <router-link class="home" to="/"><img class="homeIcon" src="./assets/logo.svg"></router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/login">Login</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #f3f3f3;
}

#nav {
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items:center;
  box-shadow: 0px 5px 5px #0005;
  border-radius: 0.25rem;
  height: 2.5rem;

  > * {
    margin: 0.5rem;
  }

  > .home {
    margin: 0rem;
  }

  .homeIcon {
    width: 1.6rem;
    height: 1.6rem;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    height: 1.5rem;
    line-height: 1.5rem;
    vertical-align: middle;
    border-bottom: 0.2rem solid #0000;
    padding: 0.5rem;
    &:hover{
      background-color: #0002;
    }
    &.router-link-exact-active {
      border-bottom: 0.2rem solid #00E0FF;
    }
  }
}
</style>
