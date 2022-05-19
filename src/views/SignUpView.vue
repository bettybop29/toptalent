<template>
  <div class="row">
    <div class="col-md-6">
        <img class="image-login" src="../assets/signup-image.png" alt="">
        <div tag="article" class="card mb-2 card-testimony">
          <div class="text-testimony">
            <p>
              “I’ve been using this incredible job portal. They have comprehensive features that can help me build people in my company. 
              Now, I’m building my business much better than before. Thanks toptalent!”
            </p>
            <h5>Jane Doe</h5> 
            <h6>Founder, PT Karya Bangsa Nasional</h6>
          </div>
        </div>
    </div>
    <div class="col-md-6 section-right"> 
      <h1 class="animate__animated animate__fadeInLeft">Start Building Your Top Company!</h1>
      <div class="form-login">
      <form action="" @submit.prevent="signUp" class="row">
        <div class="col-12">
            <label for="email" class="form-label mt-4">Email</label>
            <input
              type="email"
              v-model="recruiterEmail"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="yourcompany@mail.com"
              required
            />
        </div>
        <div v-if="this.err == 'User already exists'">
              <b-badge variant="danger">{{err}}</b-badge>
            </div>
        
        <label for="password" class="form-label mt-3">Password</label>
        <input
          type="password"
          v-model="recruiterPassword"
          class="form-control"
          id="password"
          placeholder="Password123@"
          required
        />
        <div v-if="this.err == 'Password must be at least 8 characters'">
              <span class="badge bg-danger">{{err}}</span>
            </div>
            <div v-if="this.err == 'Password must contain at least one number, one capital letter and one special character'">
              <span class="badge bg-danger">{{err}}</span>
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

        <!-- company field -->
        <label for="company" class="form-label mt-3">Company</label>
        <input
          type="text"
          v-model="recruiterCompany"
          class="form-control"
          id="company"
          placeholder="Your Company Name"
          required
          
        />

        <!-- Industry field -->
        <label for="industry" class="form-label mt-3">Industry</label>
        <input
          type="text"
          v-model="recruiterIndustry"
          class="form-control"
          id="industry"
          placeholder="eg: Technology, Financial"
          required
          
        />
        <button type="submit" class="btn btn-primary btn-signup" :disabled="searchDisabled">Create Account</button>
          <!-- <input type="submit" class="btn btn-primary btn-signup" :disabled="searchDisabled" value="Create Account"> -->
        <p class="sign-up mt-4">Already have an account? 
          <router-link class="btn-login" to="/login">Log In</router-link>
        </p>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import "mosha-vue-toastify/dist/style.css";
import 'animate.css';


export default {
    name:'SignUpView',
    
    data(){
      return{
        recruiterEmail: "",
        recruiterPassword: "",
        recruiterCompany: "",
        recruiterIndustry: "",
        searchDisabled:false,
        err:"",
        ress:""
      }
    },
    methods:{
      async signUp() {
    
      let response = '';
      try {
        
        this.searchDisabled = true;
        // const passwordCheck = this.recruiterPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*)(+=._-]{8,}$/)
        // if (passwordCheck != null){
       
        response = await axios.post(
          `http://54.255.4.75:9091/api/v1/auth/recruiter/register?recruiterEmail=${this.recruiterEmail}&recruiterPassword=${this.recruiterPassword}&recruiterCompany=${this.recruiterCompany}&recruiterIndustry=${this.recruiterIndustry}`);
           
          
        // }else {
        //    createToast("Password must contain at least one number, one capital letter and one special character", {type: "danger"} )
        //  }
            
      } catch (err) {
        this.err = err.response.data.message
        this.searchDisabled = false;
        // console.log(this.searchDisabled)
        // console.log(err.response.data.errorCode)
        // createToast(`${err.response.data.message}`, { type: "danger" });

      }
      if(response.status == 200){
        // this.searchDisabled = true;
        // console.log(this.searchDisabled)
        this.ress = response.status
        console.log(this.ress)
        // createToast(`Signup Sukses`, { type: "success" });
        localStorage.setItem("sign-info", JSON.stringify(response.data));
        this.$router.push('/activation')
      }
    },
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

.section-right{
  padding: 50px;
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
    margin-top: 50px;
    margin-left: -10px;
}

.card-testimony{
  box-sizing: border-box;
  padding: 30px;

  position: absolute;
  width: 550px;
  max-height: 402px;
  left: 46px;
  top: 590px;

  background: rgba(255, 255, 255, 0.2);
  box-shadow: 40px 50px 4px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(50px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 32px;
}

.text-testimony{
  color: #fff;
}

.text-testimony p{
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
}

.text-testimony h5{
margin-top: 80px;
font-weight: 900;
font-size: 20px;
}

.text-testimony h6{
  font-weight: 700;
  line-height: 28px;
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

.btn-login{
  text-decoration: none;
}

.btn-login:hover{
  text-decoration: underline;
}


/* breakpoints */



</style>