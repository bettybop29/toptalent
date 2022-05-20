<template>

    <router-view></router-view>
   
</template>
<script>



</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f3f3f3;
  color: #292929;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  }
  nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #0e2cb4;
}
nav a:hover {
  text-decoration: underline;
}

nav a.router-link-exact-active {
  color: #060684;
  text-decoration: underline;
  background: #F6F6FF;
  border-radius: 10px 0 0 10px;
  border-right: 3px solid rgba(84, 42, 199, 0.596);
  margin-right: 0px;
}

.navbar-nav {
  margin-left: 40%;
}
.logo {
  color: #0e2cb4;
}
</style>
