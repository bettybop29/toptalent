<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-white p-3">
    <div class="container-fluid">
      <div class="logo">
        
        <a href="/"><img src="https://toptalentapp.com:9091/resources/lnp4av9z3ceiw06.png" alt=""
            style="width: 150px; height: 30px" /></a>
      </div>
      <!-- <router-link class="navbar-brand" href="#" style="font-weight: 700; color: blue;">CariinKerja</router-link> -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

        <form >
          <router-link v-if="Auth == ture" class="btn btn-outline-primary fw-bold btn-login" to="/login" width>back</router-link>
          <router-link v-else class="btn btn-outline-primary fw-bold btn-login" to="/login" width>Login</router-link>
          <router-link class="btn btn-primary fw-bold btn-signup" to="/signup">Get started</router-link>
          <!-- <router-link class="btn btn-primary"  >user</router-link> -->
          <!-- <a class="btn btn-primary" href="login.html" role="button">Login</a> -->
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "NavBasic",
    data(){
      return{
        Auth:''
      }
    },
    mounted(){
      const Auth = sessionStorage.getItem('Authenticated')
      this.Auth = Auth.value
    }

  };
</script>

<style scoped>
  nav {
    margin-top: -5px;
  }

  .btn {
    width: 145px;
    padding: 12px;
    height: auto;
    border-radius: 30px;
    margin-left: 30px;
  }

  .btn-signup{
    text-decoration: none;
  }

  .btn-login{
    text-decoration: none;
  }

  /* BREAKPOINTS */
  /* MOBILE S & M*/
  @media only screen and (max-width: 375px){
    .btn-login {
      width: 145px;
      padding: 12px;
      height: auto;
      border-radius: 30px;
      margin-bottom: 20px;
    }
  }

  


</style>