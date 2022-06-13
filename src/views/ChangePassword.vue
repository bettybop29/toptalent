<template>
  <div class="container-fluid">
    <nav class="row navbar navbar-expand-lg navbar-light bg-white">
            <div >
            <!-- <div class="navbar-nav ms-auto me-auto ms-sm-auto ms-lg-0 ms-md-auto"> -->
            <ul class="navbar-nav ms-auto me-auto  d-lg-block ">
                <!-- <div class="collapse navbar-collapse" id="navbarNavDropdown"> -->
                    
                        <li class="nav-item d-flex justify-content-center">
                            <a class="navbar-brand " href="/" style="text-align: right;">
                            <img class="logo" src="../../public/frontend/images/logo-main.png" width="30" alt="logo" />
                            </a>
                            <span class="text-muted">
                                | &nbsp; Find The Best Fit
                            </span>

                        </li>
                        
                    </ul>
                <!-- </div> -->
            <!-- </div> -->
            </div>
        </nav>
        
        <!-- test -->        

    <h1 class="mb-3">Create New Password</h1>
  <!-- <div class="position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded-3" style="width:500px;"> -->
      <section class="section-form card">
  <form @submit.prevent="resetPass">
    <div class="mb-3">
    <label for="exampleInputEmai2" class="form-label" hidden >Email</label>
    <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" v-model="decoded.email" required disabled hidden>
    
  </div>
  <div class="mb-1">
    <label for="password1" class="form-label">New Password</label>
    <input type="password" class="form-control" id="password1" aria-describedby="emailHelp" v-model="password" required placeholder="Password123@">
  </div>

  <div class="mb-4">
    <input class="show" type="checkbox" v-on:click="myFunction1" id="show"> <small class="text-muted label-show">show Password</small>
      <br>
  </div>  
    
  <div class="mb-1">
    <label for="password2" class="form-label" >Confirm Password</label>
    <input type="password" class="form-control" id="password2" v-model="password_Confirm" required placeholder="Password123@">
  </div>

  <div class="mb-3">
    <input class="show" type="checkbox" v-on:click="myFunction2" id="show2"> <small class="text-muted label-show">show Password</small>
    <!-- <label for="show2" class="form-label"><small class="text-muted">show Password</small></label> -->
      <br>
  </div>  
  <div class="password-required">
    <p>Password required:</p>
    <ul>
      <li>Minimal 8 characters</li>
      <li>1 upper-case [A-Z]</li>
      <li>1 lower-case [a-z]</li>
      <li>1 symbol/special character</li>
    </ul>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</section>
<!-- </div> -->
</div>

</template>

<script>
import axios from 'axios'
import jwt_decode from "jwt-decode";

export default {
    name:"ChangePassword",
    data(){
        return{
            password:"",
            password_Confirm:"",
            decoded:""
            
        }
    }
    ,
    methods:{
         async resetPass(){
           
           let response = '';
            try {
              response = await axios.post(`http://54.255.4.75:9091/api/v1/auth/change-password?email=${this.decoded.email}&newPassword=${this.password}&confirmPassword=${this.password_Confirm}`)

            } catch (err) {
              console.log(err.response.data.message)
              this.$toast.error(err.response.data.message)
            }
            if(response.status === 200){
              // window.alert("Password Changed");
              this.$toast.success('Password Changed', {
          // optional options Object
          
      })
              this.$router.push('/login')
            }
        },
         myFunction1() {
          var x = document.getElementById("password1");
          if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
        },
        myFunction2() {
          var x = document.getElementById("password2");
          if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
        }
    },
    mounted(){
      var token = this.$route.params.token;
      var decoded = jwt_decode(token);
      this.decoded = decoded
    }
  
} 
</script>

<style scoped>
    .container-fluid{
      min-height: 120vh;
      background: rgb(238,238,249);
      background: linear-gradient(138deg, rgba(238,238,249,1) 0%, rgba(73,186,224,1) 54%, rgba(0,212,255,1) 100%);
    }
    /* .btn{
      width: 100%;
    } */
    h1{
      text-align: center;
      /* position: absolute; */
      /* margin-left: 37%; */
      margin-top: 2%;
      
    }

    .password-required{
      margin-bottom: 40px;
    }

    .password-required p{
      font-size: 16px;
      color: #3300FF;
      margin-top: 12px;
    }

    .password-required ul{
      margin-left: 20px;
      margin-top: -10px;
      list-style: none;
      color: #828282;
      font-size: 16px;
    }

    .password-required ul li::before {
      content: "\2022";
      color: #42FF32;
      font-weight: bold;
      display: inline-block; 
      width: 1em;
      margin-left: -1em;
    }

    .section-form{
        margin: 0 auto;
        float: none;
        margin-bottom: 50px;
        width: 40vw;
        padding: 30px;
        border-radius: 10px;

    }

    .logo{
        margin-top: -20px;
    }

    /* BREAKPOINTS */
    /* MOBILE */
    @media only screen and (max-width: 576px){
      .section-form{
        width: 80vw;
      }

      h1{
        margin-top: 5%;
      }
    }


</style>