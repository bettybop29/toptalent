<template>
<b-container fluid class="bv-example-row">
  <b-row>
    <b-col>
        <img class="image-login" src="../assets/login-image.png" alt="">
    </b-col>
    <b-col>
        <div class="container">
        <h1>Welcome back!</h1>
        <div class="form-login">
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
                
                <p><router-link class="forgot" to="/resetpassword">Forgot Password?</router-link></p>
                 <input type="submit" class="btn btn-primary" :disabled="searchDisabled" value="Login">
                <p class="sign-up mt-4">Don't have any account?
                    <router-link class="forgot" to="/signup">Sign Up For Free!</router-link>
                    </p>
                    <input type="tel" id="phone">
                 
              </form>
              </div>
              </div>
              
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import axios from 'axios'
import intlTelInput from 'intl-tel-input';

export default {
    name:'LoginView',
    
    data(){
      return{
        email:"",
        password:""
      }
    },
    methods:{
      async login(){
        let response = '';
        try {
          response = await axios.post(`http://54.255.4.75:9091/api/v1/auth/recruiter/login?recruiterEmail=${this.email}&recruiterPassword=${this.password}`)
        } catch(err) {
          this.err = err.response.data.message
          console.log(err.response.data.message)
        }
        if(response.status == 200){
          console.log(response)
          localStorage.setItem("user-info", JSON.stringify(response.data.data.registerDTO));
        }
      }
    },
    mounted(){
      const input = document.querySelector("#phone");
      intlTelInput(input,{
        preferredCountries:["in","id"]
      })
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
    height: 1024px;
}
.form-control{
    padding: 10px;
    background: #EFF0F2;
    color: #838383;
}
.btn{
    margin-top: 100px;
}
.sign-up{
    text-align: center;
}

</style>