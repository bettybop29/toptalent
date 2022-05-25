<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <div class="col-md-6">
        <img class="image-login img-fluid" src="../assets/login-image.png" alt="">
        <div class="card mb-2 card-testimony d-none d-md-block d-lg-block">
          <div class="text-testimony">
            <p>“I was freshgraduate until I found toptalent and I find a suitable job here.
              I can’t imagine what happened to my career without toptalent.oke”</p>
            <div class="footer">
              <p class="title-footer">Stephen Wibisono</p>
              <small>Lead Programmer,<br>Intermedia</small>
            </div>
          </div>
        </div>
      </div>

      <!-- right panel -->
      <div class="col-md-6 p-5">
        <h1 class="animate_animated animate_fadeInDown">Welcome Back!</h1>
        <div class="form-login animate_animated animate_fadeInDown">
          <form action="" @submit.prevent="login">
            <label for="validationDefault01" class="form-label mt-4">Email</label>
            <input type="email" v-model="email" class="form-control" id="floatingInput" aria-describedby="emailHelp"
              placeholder="yourcompany@mail.com" required />

            <label for="floatingInput" class="form-label mt-3">Password</label>
            <input type="password" v-model="password" class="form-control mb-3" id="myInput" placeholder="Password123@"
              required />
            <p>
              <router-link class="btn-forgot" to="/resetpass">Forgot Password?</router-link>
            </p>
            <!-- <input class="form-control" type="tel" id="phone" v-model="phone" > -->
            <input type="submit" class="btn btn-primary" :disabled="searchDisabled" value="Login">
            <p class="sign-up mt-4">Don't have any account?
              <router-link class="btn-signup" to="/signup">Sign Up For Free!</router-link>
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
    name: 'LoginView',

    data() {
      return {
        email: "",
        password: "",
        show: false
      }
    },
    methods: {
      showThis() {
        this.show = true
      },
      async login() {
        let response = '';
        try {
          response = await axios.post(
            `http://54.255.4.75:9091/api/v1/auth/recruiter/login?recruiterEmail=${this.email}&recruiterPassword=${this.password}`
            )
        } catch (err) {
          this.err = err.response.data.message
          console.log(err.response.data.message)
          // createToast(`${err.response.data.message}`, { type: "danger" });
        }
        if (response.status == 200) {
          console.log(response)
          localStorage.setItem("user-info", JSON.stringify(response.data.data.registerDTO));
          this.$router.push('/dashboard')
          // createToast(`Welcome back!! ${response.data.data.registerDTO.recruiterCompany}`, { type: "success" });
        }
      }
    },
    mounted() {
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
  * {
    /* padding-left: 0;
    padding-right: 0; */
    font-family: 'Montserrat';
    font-weight: 500;
  }

  h1 {
    font-size: 32px;
    font-weight: 900;
    margin-top: 50px;
  }

  .section-right {
    padding: 50px;
  }

  .image-login {
    /* position: relative; */
    /* height: 750px; */
    height: 100%;
    /* width: 760px; */
    /* width: 50vw; */

  }

  .form-control {
    padding: 10px;
    background: #EFF0F2;
    color: #838383;
  }

  /* .btn {
    margin-top: 100px;
  } */

  .sign-up {
    text-align: center;
  }

  .card-testimony {
    box-sizing: border-box;
    padding: 30px;

    /* position: absolute; */
    width: 550px;
    max-height: 500px;
    /* left: 345px;
    top: 560px; */
    margin-top: -400px;
    margin-left: 100px;

    background: rgba(255, 255, 255, 0.2);
    box-shadow: 40px 50px 4px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(50px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 32px;
  }

  .text-testimony {
    color: #fff;
  }

  .text-testimony p {
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
  }

  .text-testimony .title-footer {
    margin-top: 50px;
    font-weight: 900;
    font-size: 20px;
  }

  .text-testimony h6 {
    font-weight: 700;
    line-height: 28px;
  }

  .btn-forgot {
    text-decoration: none;
    color: #51AEFE;
  }

  .btn-forgot:hover {
    text-decoration: underline;
  }

  .btn-signup {
    text-decoration: none;
  }

  .btn-signup:hover {
    text-decoration: underline;
  }
</style>