<template>
  <div>
    <sidebar-component></sidebar-component>

    <div class="main">
      <nav class="navbar navbar-expand-lg navbar-light bg-white py-4 sticky-top" style="border-bottom: 5px solid whitesmoke;">
        <div class="container-fluid">
          <a class="navbar-brand">{{userName}}</a>
          <form class="d-flex">
            <router-link to="/addnewjob" type="button" class="btn btn-primary act px-3 py-2" data-bs-toggle="modal"
              data-bs-target="#jobModal" data-bs-whatever="@getbootstrap">
              <img class="import-icon" src="../assets/icon-postjob/add.svg" alt="">
              Create a new job
            </router-link>
          </form>
        </div>
      </nav>

      <form @submit.prevent="addjob">
        <div class="modal fade" id="jobModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel1">Add Job</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job Name:</label>
                  <input type="text" class="form-control" id="recipient-name" v-model="jobName" required />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job Salary:</label>
                  <input type="number" class="form-control" id="recipient-name" v-model="jobSalary" required />
                </div>
                <div class="mb-3">
                  <label for="inputState">Job Position</label>
                  <select class="form-control" id="inputState" v-model="jobPosition" required>
                    <option selected>Choose..</option>
                    <option>Internship</option>
                    <option>Full time</option>
                    <option>Part Time</option>
                    <option>Contractual</option>
                    <option>Freelance</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job Requirement:</label>
                  <ckeditor :editor="editor" tag-name="textarea" v-model="jobRequirement" :config="editorConfig">
                  </ckeditor>

                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Job Desc:</label>
                  <ckeditor :editor="editor" tag-name="textarea" id="jobDesc" :model-value="jobDesc" v-model="jobDesc"
                    :config="editorConfig"></ckeditor>
                  <!-- <textarea class="form-control" id="jobdescription" v-model="jobDesc"></textarea> -->

                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Job Address:</label>
                  <textarea class="form-control" id="message-text" v-model="jobAddress" maxlength="100"
                    required></textarea>
                  <small>max.100 characters</small>
                </div>


              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">X</button>
                <!-- <button v-on:click="addjob" type="button" class="btn btn-primary" data-bs-dismiss="modal">Add</button> -->
                <button type="submit" class="btn btn-primary">Create</button>
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
        <div class="col-md-5">
          <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                role="tab" aria-controls="home" aria-selected="true">Visible</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                role="tab" aria-controls="profile" aria-selected="false">Hidden</button>
            </li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
             <div class="mx-3 mb-4 pt-4 px-3">
                <h5 class="fw-bold">xx Jobs is Visible</h5>
              </div>

              <div v-for="item in list" v-bind:key="item.id">
                <jobcomponentnew :item="item" v-if="item.jobStatus == 'visible'"></jobcomponentnew>
              </div>
            </div>
            <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="mx-3 mb-4 pt-4 px-3">
                <h5 class="fw-bold">xx Jobs is Hidden</h5>
              </div>
              
              <div v-for="item in list" v-bind:key="item.id">
                <jobcomponentnew :item="item" v-if="item.jobStatus == 'hidden'"></jobcomponentnew>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-7">
          <div class="candidates p-4 mb-4">
            <h5 class="fw-bold">Candidates</h5>

            <div class="row justify-content-between mt-4">
              <div class="col-6 d-flex align-items-center">
                <h6 class="fw-bold">jobName</h6>
              </div>
              <div class="col-6 d-flex justify-content-end align-items-center">
                <button class="ict">
                  <img class="import-icon" src="../assets/icon-postjob/see-all.svg" alt="">
                </button>
                <button class="ict prm">
                  <img class="import-icon" src="../assets/icon-postjob/edit.svg" alt="">
                </button>
                <button class="ict dgr">
                  <img class="import-icon" src="../assets/icon-postjob/delete.svg" alt="">
                </button>
              </div>
              <div class="col-12">
                <small class="text-muted">Visible on </small>
              </div>
            </div>

          </div>

          <div class="applicantDetail">
            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="unreview-tab" data-bs-toggle="tab" data-bs-target="#unreview"
                  type="button" role="tab" aria-controls="unreview" aria-selected="true">Unreviewed</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="accept-tab" data-bs-toggle="tab" data-bs-target="#accept" type="button"
                  role="tab" aria-controls="accept" aria-selected="false">Accepted</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="reject-tab" data-bs-toggle="tab" data-bs-target="#reject" type="button"
                  role="tab" aria-controls="reject" aria-selected="false">Rejected</button>
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane active" id="unreview" role="tabpanel" aria-labelledby="unreview-tab">
                <div v-for="item in list" v-bind:key="item.id">
                  <applicantjobcomponent :item="item" v-if="item.jobStatus == 'visible'"></applicantjobcomponent>
                </div>
              </div>
              <div class="tab-pane" id="accept" role="tabpanel" aria-labelledby="accept-tab">
                <div v-for="item in list" v-bind:key="item.id">
                  <applicantjobcomponent :item="item" v-if="item.jobStatus == 'hidden'"></applicantjobcomponent>
                </div>
              </div>
              <div class="tab-pane" id="reject" role="tabpanel" aria-labelledby="reject-tab">
                <div v-for="item in list" v-bind:key="item.id">
                  <applicantjobcomponent :item="item" v-if="item.jobStatus == 'hidden'"></applicantjobcomponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <job-component class="job-component" :item="item"></job-component> -->
    </div>
  </div>
</template>
<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  // import JobComponent from '../components/JobComponent.vue';
  import jobcomponentnew from '../components/JobComponentNew.vue';
  import applicantjobcomponent from '../components/ApplicantJobComponent.vue';
  import sidebarcomponent from '../components/SidebarComponent.vue'
  import axios from "axios";
  // import {createToast} from "mosha-vue-toastify";
  export default {
    name: "PostJobNew",
    components: {
      SidebarComponent: sidebarcomponent,
      // JobComponent: JobComponent,
      jobcomponentnew,
      applicantjobcomponent
    },
    data() {
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          // The configuration of the editor.
        },
        jobName: "",
        jobSalary: "",
        jobPosition: "",
        jobRequirement: "",
        jobDesc: "",
        jobAddress: "",
        list: [],
        modalOpen: false,
        userName: ""
      };
    },
    methods: {
      formatPrice(value) {
        let val = (value / 1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      // func tambah job
      async addjob() {
        try {
          const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
          await axios.post(
            `http://54.255.4.75:9091/api/v1/job/create?jobName=${this.jobName}&recruiterId=${recruiterId}&jobSalary=${this.jobSalary}&jobPosition=${this.jobPosition}&jobAddress=${this.jobAddress}&jobDesc=${this.jobDesc}&jobRequirement=${this.jobRequirement}`
          );
          // createToast("Job Successfully Created", {
          //   type: "success"
          // });
          this.modalOpen = true;
          location.reload(true)
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
      axios.get(`http://54.255.4.75:9091/api/v1/jobs/${recruiterId}`)
        .then((resp) => {
          this.list = resp.data
          localStorage.setItem("job-info", JSON.stringify(resp.data));
        })
      //header PT render
      const user = JSON.parse(localStorage.getItem("user-info")).recruiterCompany
      this.userName = user
      console.log(this.userName)
    },
  };
</script>

<style scoped>
  .main {
    margin-left: 250px;
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