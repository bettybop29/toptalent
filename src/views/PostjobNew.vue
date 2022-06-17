<template>
  <div>
    <page-loader/>
  <div>
    
    <sidebar-component></sidebar-component>
    <nav-mobile></nav-mobile>

    <div class="main">
      <nav class="navbar navbar-expand-lg navbar-light bg-white py-4 sticky-top"
        style="border-bottom: 5px solid whitesmoke;">
        <div class="container-fluid">
          <a class="navbar-brand">{{userName}}</a>
          <form class="d-flex">
            <div>
              <button v-if="this.profile == '' || this.profile == null" type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                <img class="import-icon" src="../assets/icon-postjob/add.svg" alt="">
                Create a new job
              </button>
              <button v-else to="/addnewjob" type="button" class="btn btn-primary act px-3 py-2" data-bs-toggle="modal"
                data-bs-target="#jobModal" data-bs-whatever="@getbootstrap">
                <img class="import-icon" src="../assets/icon-postjob/add.svg" alt="">
                Create a new job
              </button>

              <!-- Button trigger modal -->

            </div>
          </form>
        </div>
      </nav>


      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content" style="border-radius:20px;">
            <div class="modal-header">
              
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body content2">
              <h4>You must complete your profile to post a job.</h4>
              
            </div>
            <div class="modal-footer justify-content-center">
              <!-- <a :to="{name: 'updateprofile', params:{id:idRecruiter}}" type="button" class="btn btn-primary">
                Update Profile</a> -->
              <!-- <a href="/about" type="button" class="btn btn-primary">Update Profile</a> -->
              <a class="btn btn-primary " v-bind:href="'/updateprofile/'+ idRecruiter">Update Profile</a>
              <button type="button" class="btn btn-outline-danger" style="width:139px;" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <form class="needs-validation">
        <div class="modal fade" id="jobModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel1">Add job</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="form-data" v-if="!submitted">

                  <div class="forms-inputs mb-4"> <span>Job name:</span>
                    <input type="text" v-model="jobName"
                      v-bind:class="{'form-control':true, 'is-invalid' : !validjobName(jobName) && jobnameBlured}"
                      v-on:blur="jobnameBlured = true">
                    <div class="invalid-feedback">Please fill blank form</div>
                  </div>
                  <div class="forms-inputs mb-4"> <span>Job salary:</span>
                    <input type="number" v-model="jobSalary"
                      v-bind:class="{'form-control':true, 'is-invalid' : !validjobSalary(jobSalary) && jobsalaryBlured}"
                      v-on:blur="jobsalaryBlured = true">
                    <div class="invalid-feedback">Please fill blank form</div>
                  </div>
                  <div class="forms-inputs mb-4">
                    <label for="inputState">Job position</label>
                    <select class="form-control" id="inputState" v-model="jobPosition"
                      v-bind:class="{'form-control':true, 'is-invalid' : !validJobPosition(jobPosition) && jobpositionBlured}"
                      v-on:blur="jobpositionBlured = true">
                      <option selected disabled>Choose..</option>
                      <option>Internship</option>
                      <option>Full time</option>
                      <option>Part time</option>
                      <option>Contractual</option>
                      <option>Freelance</option>
                    </select>
                    <div class="invalid-feedback">Please fill blank form</div>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Job requirement:</label>
                    <ckeditor :editor="editor" tag-name="textarea" v-model="jobRequirement" :config="editorConfig"
                      v-bind:class="{'form-control':true, 'is-invalid' : !validJobRequirement(jobRequirement) && jobrequirementBlured}"
                      v-on:blur="jobrequirementBlured = true">
                    </ckeditor>
                    <div class="invalid-feedback">Please fill blank form
                      <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">Job description:</label>
                    <ckeditor :editor="editor" tag-name="textarea" id="jobDesc" :model-value="jobDesc" v-model="jobDesc"
                      :config="editorConfig"
                      v-bind:class="{'form-control':true, 'is-invalid' : !validJobDesc(jobDesc) && jobdescBlured}"
                      v-on:blur="jobdescBlured = true"></ckeditor>
                    <div class="invalid-feedback">Please fill blank form
                      <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                    </div>
                    <!-- <textarea class="form-control" id="jobdescription" v-model="jobDesc"></textarea> -->
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">Job address:</label>
                    <textarea class="form-control" id="message-text" v-model="jobAddress" maxlength="100"
                      v-bind:class="{'form-control':true, 'is-invalid' : !validJobAddress(jobAddress) && jobaddressBlured}"
                      v-on:blur="jobaddressBlured = true">
                      </textarea>
                    <div class="invalid-feedback">Please fill blank form</div>
                    <small>max.100 characters</small>
                  </div>
                  <div class="mb-3"> <button v-on:click.stop.prevent="submit"
                      class="btn btn-primary w-100">Create</button> </div>
                </div>
                <div class="success-data" v-else>
                  <div class="text-center d-flex flex-column"> <i class='bx bxs-badge-check'></i> <span
                      class="text-center fs-3">Are you sure want to post <br> this job?</span>
                    <div class="col text-center fs-3">
                      <button class="btn btn-primary valid-pop m-1" type="submit" v-on:click.prevent="addjob">Yes, post
                        it!</button>
                      <button class="btn btn-outline-danger valid-pop m-1" data-bs-dismiss="modal"
                        aria-label="Close">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" v-if="this.modalOpen = true" id="exampleModalToggle2" aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content"
              style="border-radius:20px; margin:auto; width:400px; margin-top:200px; padding-bottom:20px; text-align:center; padding:50px;">
              <h5 style="padding-bottom:30px; font-size:18px; font-weigh:bolder;">Are you sure want to<br>publish job?
              </h5>
              <div class="select-button">

                <button class="btn btn-outline-danger pop" data-bs-target="#jobModal"
                  data-bs-toggle="modal">Cancel</button>
                <button v-on:click="addjob" type="button" class="btn btn-primary pop" data-bs-dismiss="modal">Yes,
                  post it!</button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div class="row">
        <listjobcomponent :count="hide"></listjobcomponent>
        <!-- <candidatejob-component></candidatejob-component>    -->
      </div>
      <!-- <job-component class="job-component" :item="item"></job-component> -->
    </div>
  </div>
</div>
</template>
<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  // import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
  import axios from "axios";
  // import Editor from 'ckeditor5-custom-build/build/ckeditor';
  import sidebarcomponent from '../components/SidebarComponent.vue'
  import listjobcomponent from '@/components/ListjobComponent.vue'
  // import CandidatejobComponent from '@/components/CandidatejobComponent.vue';
  // import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
  import NavMobile from '../components/NavMobile.vue'
    import PageLoader from '@/components/PageLoader.vue'





  export default {
    name: "PostJobNew",
    components: {
      SidebarComponent: sidebarcomponent,
      // JobComponent: JobComponent,
      // jobcomponentnew,
      // applicantjobcomponent,
      listjobcomponent,
      NavMobile,
      PageLoader

      // CandidatejobComponent
    },
    props: ['edit'],
    data() {
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          // The configuration of the editor.
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'bulletedList',
              'undo',
              'redo'
            ]
          }
        },
        jobName: "",
        jobnameBlured: false,
        jobSalary: "",
        jobsalaryBlured: false,
        jobPosition: "",
        jobpositionBlured: false,
        jobRequirement: "",
        jobrequirementBlured: false,
        jobDesc: "",
        jobdescBlured: false,
        jobAddress: "",
        jobaddressBlured: false,
        list: [],
        modalOpen: false,
        userName: "",
        hide: '',
        profile: '',
        idRecruiter: '',


        valid: false,
        submitted: false,
      };
    },
    methods: {
      validate: function () {
        this.jobnameBlured = true;
        this.jobsalaryBlured = true;
        this.jobpositionBlured = true;
        this.jobaddressBlured = true;
        this.jobdescBlured = true;
        this.jobrequirementBlured = true;
        if (this.validjobName(this.jobName) && this.validjobSalary(this.jobSalary) &&
          this.validJobPosition(this.jobPosition) && this.validJobAddress(this.jobAddress) &&
          this.validJobDesc(this.jobDesc) && this.validJobRequirement(this.jobRequirement)) {
          this.valid = true;

        }
      },

      validjobName: function (jobName) {
        if (jobName.length > 0) {
          return true;
        }
      },

      validjobSalary: function (jobSalary) {
        if (jobSalary.length > 0) {
          return true;
        }
      },

      validJobPosition: function (jobPosition) {

        if (jobPosition.length > 0) {
          return true;
        }
      },

      validJobAddress: function (jobAddress) {
        if (jobAddress.length > 0) {
          return true;
        }
      },

      validJobDesc: function (jobDesc) {
        if (jobDesc.length > 0) {
          return true;
        }
      },

      validJobRequirement: function (jobRequirement) {
        if (jobRequirement.length > 0) {
          return true;
        }
      },

      submit: function () {
        this.validate();
        if (this.valid) {
          this.submitted = true;
        }
      },





      formatPrice(value) {
        let val = (value / 1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      // func tambah job
      async addjob() {
        try {
          const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
          await axios.post(
            `https://toptalentapp.com:9091/api/v1/job/create?jobName=${this.jobName}&recruiterId=${recruiterId}&jobSalary=${this.jobSalary}&jobPosition=${this.jobPosition}&jobAddress=${this.jobAddress}&jobDesc=${this.jobDesc}&jobRequirement=${this.jobRequirement}`
          );
          // createToast("Job Successfully Created", {
          //   type: "success"
          // });
          this.$toast.success("Job Successfully Created")
          this.modalOpen = true;
          location.reload(true)
          // document.getElementsByClassName("active");
        } catch (error) {
          // createToast("please, fill blank form", {
          //   type: "danger"
          // });
          console.log(error);
        }
      },
      logout() {
        try {
          localStorage.removeItem("user-info")
          this.$router.push("/login");
          // createToast("logout success!", {
          //   type: "success"
          // });
        } catch (error) {
          console.log(error);
        }
      }
    },
    // func tampilin data
    //monted render
    mounted() {
      const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
      axios.get(`https://toptalentapp.com:9091/api/v1/jobs/${recruiterId}`)
        .then((resp) => {
          this.list = resp.data
          localStorage.setItem("job-info", JSON.stringify(resp.data));
        })
      //header PT render
      const user = JSON.parse(localStorage.getItem("user-info")).recruiterCompany
      this.userName = user
      console.log(this.userName)

      const profile = JSON.parse(localStorage.getItem("user-profile"))
      this.profile = profile
      console.warn(this.profile)

      const idRecruiter = JSON.parse(localStorage.getItem("user-info")).recruiterId
      this.idRecruiter = idRecruiter
      console.warn(this.idRecruiter)
    },
  };
</script>

<style scoped>
  .main {
    margin-left: 250px;
  }
  .content2{
    text-align: center;
  }

  /* BREAKPOINTS */
  /* MOBILE */
  @media only screen and (max-width: 576px) {
    .main {
      margin-left: 10px;
      margin-top: 60px;
    }
  }

  .valid-pop {
    border-radius: 10px;
    width: 195px;
    padding: 9px;
  }
</style>

<!-- <style scoped>
  .act {
    margin-right: 123px;
  }

  /* .main {
    margin-left: 16%;
    padding: 20px;
    background-color: #F3F3F3;
  } */
  .btn:hover {
    box-shadow: 0 2px 10px rgb(0 0 0 / 0.5);
  }

  .container {
    margin-left: 20%;
    margin-top: 3%;
  }

  .job-component {
    margin-top: 15px;
  }

  .pop {
    padding: 10px;
    text-align: center;
    margin: 0;
    width: 125px;
  }

  .select-button {
    display: flex;
    text-align: center;
    justify-content: space-between;
    margin: 10px;
    padding-top: 30px;
  }

  /* transition */
  .fade-enter-from {
    opacity: 0;
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-enter-active {
    transition: all 2s ease;
  }
  .fade-leave-from {
    opacity: 1;
  }
  .fade-leave-to {
    opacity: 0;
  }

  .fade-leave-active {
    transition: all 2s ease;
  }
</style> -->