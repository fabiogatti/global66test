<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F5F5F5;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.main-btn,.inactive-btn{
  border-style: none;
  background-color: #F22539;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  padding: 0.5em 1.25em;
  transition: all 0.3s ease-in-out;
}

.main-btn:hover{
  background-color: #C00E20;
}

.inactive-btn{
  background-color: #BFBFBF;
}

.inactive-btn:hover{
  background-color: #5E5E5E;
}

.main-back-color{
  background-color: #F5F5F5;
}
</style>
