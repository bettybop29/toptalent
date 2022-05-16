<template>
<b-container fluid class="bv-example-row">
  <b-row>
    <b-col>
        <img class="image-login" src="../assets/signup-image.png" alt="">
        <div class="card-testimony">
          <b-card            
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              “I’ve been using this incredible job portal. They have comprehensive features that can help me build people in my company. 
              Now, I’m building my business much better than before. Thanks toptalent!”
              <br>
              Jane Doe <br>
              Founder, PT Karya Bangsa Nasional
            </b-card-text>

          </b-card>
        </div>
    </b-col>
    <b-col>
        <div class="container">
        <h1>Start building your Top Company!</h1>
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
                <div class="password-required">
                  <p class="password-required">Password required:</p>
                  <ul>
                    <li>8 characters</li>
                    <li>1 upper-case [A-Z]</li>
                    <li>1 lower-case [a-z]</li>
                    <li>1 symbol/special character</li>
                  </ul>
                </div>

                <!-- company field -->
                <label for="company" class="form-label mt-3">Company</label>
                <input
                  type="text"
                  v-model="company"
                  class="form-control"
                  id="company"
                  placeholder="Your Company Name"
                  required
                  
                />

                <!-- Industry field -->
                <label for="industry" class="form-label mt-3">Industry</label>
                <input
                  type="text"
                  v-model="industry"
                  class="form-control"
                  id="industry"
                  placeholder="eg: Technology, Financial"
                  required
                  
                />
                
                 <input type="submit" class="btn btn-primary" :disabled="searchDisabled" value="Create Account">
                <p class="sign-up mt-4">Already have an account? 
                    <router-link class="btn-signup" to="/login">Log In</router-link>
                    </p>
                 
              </form>
              </div>
              </div>
              
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import axios from 'axios'

export default {
    name:'SignUpView',
    
    data(){
      return{
        email:"",
        password:""
      }
    },
    methods:{
      async signUp(){
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
    
}
</script>

<style scoped>

*{
    padding-left: 0;
    padding-right: 0;
    font-family: 'Montserrat';
    font-weight: 500;
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

h1{
    font-size: 32px;
    font-weight: 900;
}

.card-testimony{
  margin-top: -500px;
  margin-left: 50px;
}

</style>