<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-white mt-3">
    <div class="container-fluid">
      <div class="logo">
        <!-- <router-link class="navbar-brand text-decoration-none" to="/">
        <img src="http://54.255.4.75:9091/resources/lnp4av9z3ceiw06.png" alt="" style="width:150px; height:30px;"></router-link> -->
        <a href="/"><img src="http://54.255.4.75:9091/resources/lnp4av9z3ceiw06.png" alt="" style="width:150px; height:30px;"></a>
      </div>
      <!-- <router-link class="navbar-brand" href="#" style="font-weight: 700; color: blue;">CariinKerja</router-link> -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          
        </ul>
        
        <form class="d-flex">
          <router-link class="btn btn-outline-primary" to="/login">Login</router-link>
          <router-link class="btn btn-primary"  to="/signup">Get started</router-link>
          <!-- <router-link class="btn btn-primary"  >user</router-link> -->
          <!-- <a class="btn btn-primary" href="login.html" role="button">Login</a> -->
        </form>
      </div>
    </div>
  </nav>

  


</template>

<script>
export default {
  name:"NavBasic",
  
}
</script>

<style scoped>
  .btn {
      width: 110px;
      height: auto;
      border-radius: 30px;
      margin-left: 30px;
  }
</style>