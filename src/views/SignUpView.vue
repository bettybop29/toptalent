<template>
  <div class="container-fluid min-vh-100 d-flex flex-column ">
    <div class="row flex-grow-1">
      <div class="col-md-7 section-left">
        <img class="image-login " src="../assets/signup-img.png" alt="">
        <div class="card mb-2 card-testimony d-none d-md-none d-lg-block">
          <div class="text-testimony">
            <p>
              “I’ve been using this incredible job portal. They have comprehensive features that can help me build
              people in my company.
              Now, I’m building my business much better than before. Thanks toptalent!”
            </p>
            <h5>Jane Doe</h5>
            <h6>Founder, PT Karya Bangsa Nasional</h6>
          </div>
        </div>
      </div>
      <div class="col-md-5 section-right">
        <h1 class="animate__animated animate__fadeInDown">Start Building Your Top Company!</h1>
        <div class="form-login">
          <form action="" @submit.prevent="signUp" class="row">
            <div>
              <label for="email" class="form-label mt-4">Email</label>
              <input type="email" v-model="recruiterEmail" class="form-control" id="email" aria-describedby="emailHelp"
                placeholder="yourcompany@mail.com"
                v-bind:class="{'form-control':true, 'is-invalid' : !validrecruiterEmail(recruiterEmail) && recruiterEmailBlured}"
                v-on:blur="recruiterEmailBlured = true" />
              <div class="invalid-feedback">A valid email is required!</div>
            </div>

            <!-- <div v-if="this.err == 'User already exists'">
              <b-badge variant="danger">{{err}}</b-badge>
            </div> -->



            <label for="password" class="form-label mt-3">Password</label>
            <!-- addons -->
            <div class="input-group mb-3">
              <input :type="visibility" v-model="recruiterPassword" id="password" class="form-control"
                placeholder="Password123@" aria-label="password" aria-describedby="button-addon2"
                v-bind:class="{'form-control':true, 'is-invalid' : !validrecruiterPassword(recruiterPassword) && recruiterPasswordBlured}"
                v-on:blur="recruiterPasswordBlured = true">
              <button class="btn btn-outline-secondary btn-eye" type="button" id="button-addon2" @click="showPassword()"
                v-if="visibility == 'password' ">
                <font-awesome-icon icon="fa-solid fa-eye" width="22" height="22" icon-name="show password" />
              </button>
              <!-- hides password -->
              <button class="btn btn-outline-secondary btn-eye" type="button" id="button-addon2" @click="hidePassword()"
                v-if="visibility == 'text' ">
                <font-awesome-icon icon="fa-solid fa-eye-slash" width="22" height="22" icon-name="hide password" />
              </button>
              <div class="invalid-feedback">A valid password is required!</div>
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
            <div>
              <label for="company" class="form-label mt-3">Company</label>
              <input type="text" v-model="recruiterCompany" class="form-control" id="company"
                placeholder="Your Company Name"
                v-bind:class="{'form-control':true, 'is-invalid' : !validrecruiterCompany(recruiterCompany) && recruiterCompanyBlured}"
                v-on:blur="recruiterCompanyBlured = true" />
              <div class="invalid-feedback">Please fill blank form</div>

            </div>
            <!-- Industry field -->
            <div>
              <label for="industry" class="form-label mt-3">Industry</label>
              <input type="text" v-model="recruiterIndustry" class="form-control" id="industry"
                placeholder="eg: Technology, Financial"
                v-bind:class="{'form-control':true, 'is-invalid' : !validrecruiterIndustry(recruiterIndustry) && recruiterIndustryBlured}"
                v-on:blur="recruiterIndustryBlured = true" />
              <div class="invalid-feedback">Please fill blank form</div>

            </div>
            <button v-if="searchDisabled == true" class="btn btn-primary btn-signup" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
            <input v-else type="submit" value="Create Account" v-on:click="submit" class="btn btn-primary btn-signup" :disabled="searchDisabled">
            <!-- <input type="submit" class="btn btn-primary btn-signup" :disabled="searchDisabled" value="Create Account"> -->
            <p class="sign-up mt-4">Already have an account?
              <router-link class="btn-login" to="/login">Log In</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import 'animate.css';


  export default {
    name: 'SignUpView',

    data() {
      return {
        recruiterEmail: "",
        recruiterEmailBlured: false,
        recruiterPassword: "",
        recruiterPasswordBlured: false,
        recruiterCompany: "",
        recruiterCompanyBlured: false,
        recruiterIndustry: "",
        recruiterIndustryBlured: false,
        searchDisabled: false,
        err: "",
        ress: "",
        valid: false,
        submitted: false,
        visibility: 'password'
      }
    },
    methods: {
      showPassword() {
        this.visibility = 'text';
      },
      hidePassword() {
        this.visibility = 'password';
      },
      validate() {
        this.recruiterEmailBlured = true;
        this.recruiterPasswordBlured = true;
        this.recruiterCompanyBlured = true;
        this.recruiterIndustryBlured = true;
        if (this.validrecruiterEmail(this.recruiterEmail) &&
          this.validrecruiterPassword(this.recruiterPassword) &&
          this.validrecruiterCompany(this.recruiterCompany) &&
          this.validrecruiterIndustry(this.recruiterIndustry)) {
          this.valid = true;
        }
      },

      validrecruiterEmail: function (recruiterEmail) {
        var re = /(.+)@(.+){2,}\.(.+){2,}/;
        if (re.test(recruiterEmail.toLowerCase())) {
          return true;
        }
      },
      validrecruiterPassword: function (recruiterPassword) {
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*)(+=._-]{8,}$/;
        if (re.test(recruiterPassword)) {
          return true;
        }
      },
      validrecruiterCompany: function (recruiterCompany) {
        if (recruiterCompany.length > 1) {
          return true;
        }
      },
      validrecruiterIndustry: function (recruiterIndustry) {
        if (recruiterIndustry.length > 1) {
          return true;
        }
      },


      submit() {
        this.validate();
        if (this.valid) {
          this.submitted = true;
          this.signUp()
        } else {
          this.submitted === false;
        }
      },
      async signUp() {

        let response = '';
        try {

          this.searchDisabled = true;
          // const passwordCheck = this.recruiterPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*)(+=._-]{8,}$/)
          // if (passwordCheck != null){

          response = await axios.post(
            `http://54.255.4.75:9091/api/v1/auth/recruiter/register?recruiterEmail=${this.recruiterEmail}&recruiterPassword=${this.recruiterPassword}&recruiterCompany=${this.recruiterCompany}&recruiterIndustry=${this.recruiterIndustry}`
          );


          // }else {
          //    createToast("Password must contain at least one number, one capital letter and one special character", {type: "danger"} )
          //  }

        } catch (err) {
          this.err = err.response.data.message
          this.searchDisabled = false;
          // console.log(this.searchDisabled)
          // console.log(err.response.data.errorCode)
          // createToast(`${err.response.data.message}`, { type: "danger" });
          this.$toast.error(`${err.response.data.message}`, {
            // optional options Object
            position: 'top-right',
            pauseOnHover: true
          })

        }
        if (response.status == 200) {
          // this.searchDisabled = true;
          // console.log(this.searchDisabled)
          this.ress = response.status
          console.log(this.ress)
          // createToast(`Signup Sukses`, { type: "success" });
          this.$toast.success('Sign Up Successful', {
            // optional options Object
            position: 'top-right',
            pauseOnHover: true
          })
          localStorage.setItem("sign-info", JSON.stringify(response.data));
          this.$router.push('/activation')
        }
      },
    },

  }
</script>

<style scoped>
  * {
    /* padding-left: 0;
    padding-right: 0; */
    margin: 0;
    padding: 0;
    font-family: 'Montserrat';
    font-weight: 500;
    /* max-width: 100%; */
  }

  .section-right {
    padding: 50px;
  }

  .image-login {
    height: 1024px;
    max-width: 100%;
  }

  .form-control {
    padding: 10px;
    background: #EFF0F2;
    color: #838383;
  }

  .btn-signup {
    margin-top: 100px;
    padding: 8px;
  }

  .sign-up {
    text-align: center;
  }

  h1 {
    font-size: 32px;
    font-weight: 900;
    margin-top: 50px;
    margin-left: -10px;
  }

  .card-testimony {
    box-sizing: border-box;
    padding: 30px;

    /* position: absolute; */
    width: 550px;
    max-height: 402px;
    /* left: 46px;
  top: 590px; */
    margin-top: -800px;
    margin-left: 100px;

    background: rgba(255, 255, 255, 0.2);
    box-shadow: 40px 50px 4px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(50px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 32px;
  }

  .text-testimony {
    color: rgb(88, 88, 88);
  }

  .text-testimony p {
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
  }

  .text-testimony h5 {
    margin-top: 80px;
    font-weight: 900;
    font-size: 20px;
  }

  .text-testimony h6 {
    font-weight: 700;
    line-height: 28px;
  }

  .password-required p {
    font-size: 16px;
    color: #3300FF;
    margin-top: 12px;
    margin-bottom: 10px;
  }

  .password-required ul {
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

  .btn-login {
    text-decoration: none;
  }

  .btn-login:hover {
    text-decoration: underline;
  }

  .btn-eye {
    padding: 0.375rem 0.75rem;
  }


  /* breakpoints */
  /* for mobile */
  @media only screen and (max-width: 576px) {

    .image-login {
      height: 100%;
      width: 100%;
    }

    .text-testimony {
      color: rgb(88, 88, 88);
    }

    .text-testimony p {
      font-weight: 700;
      font-size: 20px;
      line-height: 32px;
    }

    .text-testimony h5 {
      margin-top: 80px;
      font-weight: 900;
      font-size: 20px;
    }

    .text-testimony h6 {
      font-weight: 700;
      line-height: 28px;
    }

    .password-required p {
      font-size: 16px;
      color: #3300FF;
      margin-top: 12px;
    }

    .password-required ul {
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

    .btn-login {
      text-decoration: none;
    }

    .btn-login:hover {
      text-decoration: underline;
    }


    /* breakpoints */
    /* for mobile */
    @media only screen and (max-width: 576px) {

      .image-login {
        height: 80vh;
        width: 100%;
      }

      .card-testimony {
        box-sizing: border-box;
        padding: 30px;
        width: 300px;
        max-height: 402px;
        box-shadow: 5px 10px 4px rgba(0, 0, 0, 0.15);
        margin-top: -500px;
        margin-left: 50px;

      }

      h1 {
        margin-top: -10px;
      }

    }

    @media only screen and (max-width: 768px) {
      .image-login {
        height: 100%;
      }
    }

    h1 {
      margin-top: 80px;
    }
  }
</style>