<template>

<div class="d-flex">
  <div class="align-content-center">
    <img class="image-login" src="../assets/login-image.png" alt="">
        <div class="card animate__animated animate__bounceIn">
          <div class="card-title">
            <p>“I was freshgraduate until I found toptalent and I find a suitable job here. 
              I can’t imagine what happened to my career without toptalent.oke”</p>
            <div class="footer">
              <p class="title-footer">Stephen Wibisono</p>
              <small>Lead Programmer,<br>Intermedia</small>
            </div>
          </div>
        </div>
  </div>
  <div class="p-2 align-content-center">
        <div class="container animate__animated animate__fadeInDown">
          
        <h1>Welcome back!</h1>
        <div class="form-login animate_animated animate_fadeInDown">
        <form action="" @submit.prevent="login">
                <label for="validationDefault01" class="form-label mt-4"
                  >Email</label
                >
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="floatingInput"
                  aria-describedby="emailHelp"
                  placeholder="yourcompany@mail.com"
                  required
                />
                
                <label for="floatingInput" class="form-label mt-3"
                  >Password</label
                >
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="myInput"
                  placeholder="Password123@"
                  required 
                />
                  
                  <p>
                    
                    <router-link class="forgot" to="/resetpass">Forgot Password?</router-link></p>
                    <!-- <input class="form-control" type="tel" id="phone" v-model="phone" > -->
                    <input type="submit" class="btn btn-primary" :disabled="searchDisabled" value="Login">
                    <p class="sign-up mt-4">Don't have any account?
                    <router-link class="forgot" to="/signup">Sign Up For Free!</router-link>
                    </p>
                    
                  </form>
                  
                </div>
              </div>
              
  </div>
</div>
</template>

<script>
import axios from 'axios'
// import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/intlTelInput.js';
// import "mosha-vue-toastify/dist/style.css";
// import { createToast } from "mosha-vue-toastify";

export default {
    name:'LoginView',
    
    data(){
      return{
        email:"",
        password:"",
        show:false
      }
    },
    methods:{
      showThis(){
        this.show = true
      },
      async login(){
        let response = '';
        try {
          response = await axios.post(`http://54.255.4.75:9091/api/v1/auth/recruiter/login?recruiterEmail=${this.email}&recruiterPassword=${this.password}`)
        } catch(err) {
          this.err = err.response.data.message
          console.log(err.response.data.message)
          this.$toast.error(err.response.data.message, {
            position:'top-right'
          })
          // createToast(`${err.response.data.message}`, { type: "danger" });
        }
        if(response.status == 200){
          console.log(response)
          localStorage.setItem("user-info", JSON.stringify(response.data.data.registerDTO));
          this.$router.push('/dashboard')
          this.$toast.success(`Welcome back! ${response.data.data.registerDTO.recruiterCompany}`, {
          // optional options Object
           position: 'top-right',
           pauseOnHover: true
      })
          
          // createToast(`Welcome back!! ${response.data.data.registerDTO.recruiterCompany}`, { type: "success" });
        }
      }
    },
    mounted(){
      // const input = document.querySelector("#phone");
      // intlTelInput(input,{
      //       customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
      //       return "e.g. " + selectedCountryPlaceholder,selectedCountryData;
      // },
      //   preferredCountries:["id"],
      // })
      // console.log(input)
    }
}
</script>

<style scoped>

*{
    padding-left: 0;
    padding-right: 0;
}
.container{
    margin: 100px;
    width: 500px;
}
.image-login{
    /* position: relative; */
    /* height: 750px; */
    height: 100vh;
    /* width: 760px; */
    /* width: 50vw; */
    
}
.form-control{
    padding: 10px;
    background: #EFF0F2;
    color: #838383;
}
.btn{
    margin-top: 100px;
    width: 100%;
}
.sign-up{
    text-align: center;
}
.card{
  font-size: 20px;
  font-weight: 700;
  color: white;
  padding: 30px;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 40px 50px 4px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(11px);
  position: absolute;
  width: 500px;
  height: 320px;
  top: 390px;
  left: 120px;
  /* right: 10px; */
}
.card-image{
  width: 50px;
  height: auto;
}
.footer{
  margin-top: 60px;
}
.title-footer{
  position: relative;
  font-weight: bolder;
}
small{
  position: absolute;
  top: 250px;
  width: max-content;
  font-weight: 500;
}

</style>