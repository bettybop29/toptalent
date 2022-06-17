<template>
  <nav id="sidebar" class="navbar fixed-top d-md-none navbar-light bg-white p-3">
    <div class="container-fluid">
      <div class="logo">
        <!-- <router-link class="navbar-brand text-decoration-none" to="/">
        <img src="https://toptalentapp.com:9091/resources/lnp4av9z3ceiw06.png" alt="" style="width:150px; height:30px;"></router-link> -->
        <a href="/"><img src="https://toptalentapp.com:9091/resources/lnp4av9z3ceiw06.png" alt=""
            style="width: 150px; height: 30px" /></a>
      </div>
      <!-- <router-link class="navbar-brand" href="#" style="font-weight: 700; color: blue;">CariinKerja</router-link> -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="list-unstyled components">
                
                <li>
                    <router-link class="" to="/dashboard"><font-awesome-icon icon="fa-solid fa-house" class="icn" /> Dashboard</router-link>
                </li>
                <li>
                   <router-link class="" to="/postjobNew"><font-awesome-icon icon="fa-solid fa-list" class="icn"/> Post Job</router-link>
                </li>
                <li>
                   <router-link class="" to="/about"><font-awesome-icon icon="fa-solid fa-user" class="icn"/> Company Profile</router-link>
                </li>
                <!-- <li>
                   <router-link class="" to="/credit"><i class="bi bi-newspaper"></i>Credit</router-link>
                </li> -->
                
            </ul>

        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

        <form class="d-flex flex-row align-items-center">
          <!-- <router-link class="btn btn-outline-primary fw-bold btn-login" to="/login" width>Login</router-link> -->
          <button v-on:click="logout" class="btn btn-danger mt-5"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket"/> Logout</button>
          <!-- <router-link class="btn btn-primary"  >user</router-link> -->
          <!-- <a class="btn btn-primary" href="login.html" role="button">Login</a> -->
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "NavMobile",
    methods:{
        logout(){
        try {
        localStorage.removeItem("user-info")
        localStorage.removeItem("job-info")
        localStorage.removeItem("sign-info")
       
        this.$router.push("/login");
        // createToast("logout success!", { type: "success" });
        }
        catch (error) {
          console.log(error);
        }
    
        }
    },
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

  /* breakpoints */
  /* mobile */
  @media only screen and (max-width: 576px){
    .components li{
      padding: 10px 0;
      
    }

    .components li .icn{
      text-decoration: none;
      
    }

    #sidebar ul li a {
    padding: 10px;
    font-weight: 500;
    display: block;
    text-decoration: none;
}
  }
</style>