<template>
<div class="container-fluid">
  <nav class="row navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
      <ul class="navbar-nav ms-auto me-auto d-none d-lg-block ">
          <li class="nav-item d-flex justify-content-center">
              <a class="navbar-brand " href="/" >
                  <img class="logo" src="../assets/logo/logo-main.png" alt="logo" />
              </a>
              <span class="text-muted text-logo">
                  | &nbsp; Find The Best Fit
              </span>
          </li>     
                            
      </ul>
          
      </div>
  </nav>

  <h1>Create New Password</h1>
  <div class="position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded-3" style="width:500px;">
  <form @submit.prevent="resetPass">
    <div class="mb-3">
    <label for="exampleInputEmai2" class="form-label" hidden >Email</label>
    <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" v-model="decoded.email" required hidden>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">New Password</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="password" required placeholder="Password must contain at least one number, one capital letter and one special character">
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label" >Confirm Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password_Confirm" required placeholder="Password must contain at least one number, one capital letter and one special character"  >
  </div>

  <div class="password-required">
    <p>Password required:</p>
    <ul>
      <li>8 characters</li>
      <li>1 upper-case [A-Z]</li>
      <li>1 lower-case [a-z]</li>
      <li>1 symbol/special character</li>
    </ul>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  </div>  
</div>

</template>

<script>
import axios from 'axios'
import jwt_decode from "jwt-decode";
// import "mosha-vue-toastify/dist/style.css";
// import { createToast } from "mosha-vue-toastify";
export default {
    name:"ChangePassword",
    data(){
        return{
            password:"",
            password_Confirm:"",
            decoded:""
            
        }
    },
    methods:{
         async resetPass(){
           
           let response = '';
            try {
              response = await axios.post(`http://54.255.4.75:9091/api/v1/auth/change-password?email=${this.decoded.email}&newPassword=${this.password}&confirmPassword=${this.password_Confirm}`)

            } catch (err) {
              console.log(err.response.data.message)
            }
            if(response.status === 200){
              // createToast("Password Changed", { type: "Success" });
              this.$router.push('/login')
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
      height: 100vh;
      background: rgb(238,238,249);
      background: linear-gradient(138deg, rgba(238,238,249,1) 0%, rgba(73,186,224,1) 54%, rgba(0,212,255,1) 100%);
    }
    .btn{
      width: 100%;
    }
    h1{
      text-align: center;
      margin-top: 20px;
      /* position: absolute;
      margin-left: 37%;
      margin-top: 7%; */
      
    }

    .navbar-brand img{
      width: 100px;
      height: 100px;
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
</style>