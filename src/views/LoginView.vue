<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <div class="col-md-7 px-0">
        <img class="image-login img-fluid" src="../assets/login-img.png" alt="">
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
      <div class="col-md-5 p-5 animate__animated animate__fadeInDown">
        <h1 class="">Welcome Back!</h1>
        <div class="form-login">
          <div action="">
            <label for="email" class="form-label mt-4">Email</label>
            <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp"
              placeholder="yourcompany@mail.com"
              v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(email) && emailBlured}"
              v-on:blur="emailBlured = true" />
            <div class="invalid-feedback">A valid email is required!</div>
            <label for="password" class="form-label mt-3">Password</label>
            <!-- addons -->
            <div class="input-group mb-3">
              <input :type="visibility" v-model="password" id="password" class="form-control" placeholder="Password123@"
                aria-label="password" aria-describedby="button-addon2"
                v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}"
                v-on:blur="passwordBlured = true">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="showPassword()"
                v-if="visibility == 'password' ">
                <font-awesome-icon icon="fa-solid fa-eye" width="22" height="22" icon-name="show password" />
              </button>

              <!-- hides password -->
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="hidePassword()"
                v-if="visibility == 'text' ">
                <font-awesome-icon icon="fa-solid fa-eye-slash" width="22" height="22" icon-name="hide password" />
              </button>
              <div class="invalid-feedback">Password must be 8 character!</div>
            </div>
            <p>
              <router-link class="btn-forgot" to="/resetpass">Forgot Password?</router-link>
            </p>
            <!-- <input class="form-control" type="tel" id="phone" v-model="phone" > -->
            <div class="d-grid gap-2">
              <button v-if="searchDisabled == true" class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>
              <input v-else type="submit" v-on:click="submit" class="btn btn-primary" :disabled="searchDisabled"
                value="Login">

            </div>

            <p class="sign-up mt-4">Don't have any account?
              <router-link class="btn-signup" to="/signup">Sign Up For Free!</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import 'intl-tel-input/build/css/intlTelInput.css';
  import 'intl-tel-input/build/js/intlTelInput.js';
  // import { useStore } from 'vuex'
  // import { ref } from 'vue'
 
  export default {
    name: 'LoginView',

    data() {
      return {
        email: "",
        emailBlured: false,
        password: "",
        passwordBlured: false,
        show: false,
        searchDisabled: false,
        visibility: 'password',
        valid: false,
        submitted: false
      }
    },
    methods: {
      showPassword() {
        this.visibility = 'text';
      },
      hidePassword() {
        this.visibility = 'password';
      },
      validate: function () {
        this.emailBlured = true;
        this.passwordBlured = true;
        if (this.validEmail(this.email) && this.validPassword(this.password)) {
          this.valid = true;
        }
      },
      validEmail(email) {
        var re = /(.+)@(.+){2,}\.(.+){2,}/;
        if (re.test(email.toLowerCase())) {
          return true;
        }
      },

      validPassword(password) {
        if (password.length > 7) {
          return true;
        }
      },

      submit() {
        this.validate();
        if (this.valid) {
          this.submitted = true;
          this.login()
        } else {
          this.submitted === false;

        }
      },
      showThis() {
        this.show = true
      },

      async login() {
        // const store = useStore();
        // const email = ref('')
        let response = '';
        try {
          this.searchDisabled = true
          response = await axios.post(
            `https://toptalentapp.com:9091/api/v1/auth/recruiter/login?recruiterEmail=${this.email}&recruiterPassword=${this.password}`
          )
        } catch (err) {
          this.searchDisabled = false
          this.err = err.response.data.message
          console.log(err.response.data.message)
          this.$toast.error(err.response.data.message)
          // createToast(`${err.response.data.message}`, { type: "danger" });
        }
        if (response.status == 200) {
          // location.reload(true)
          localStorage.setItem("user-info", JSON.stringify(response.data.data.registerDTO));
          sessionStorage.setItem("Authenticated", true)
          this.$router.push('/dashboard')
          // store.commit("setEmail", email.value);
          this.$toast.success(`Welcome ${response.data.data.registerDTO.recruiterCompany}!`, {
            // optional options Object
            
          })
          
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
    width: 50vw;

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

  .toggle-password {
    position: absolute;
    right: 120px;
    top: 310px;
  }

  /* breakpoint */
  /* for mobile */
  @media only screen and (max-width: 576px) {
    .toggle-password {
      position: absolute;
      right: 100px;
      top: 770px;
    }

    .image-login {

      width: 100vw;

    }


  }
</style>