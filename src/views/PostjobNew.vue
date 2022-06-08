<template>
  <div>
    <sidebar-component></sidebar-component>

    <div class="main">
      <nav class="navbar navbar-expand-lg navbar-light bg-white py-4 sticky-top" style="border-bottom: 5px solid whitesmoke;">
        <div class="container-fluid">
          <a class="navbar-brand">{{userName}}</a>
          <form class="d-flex">
            <button to="/addnewjob" type="button" class="btn btn-primary act px-3 py-2" data-bs-toggle="modal"
              data-bs-target="#jobModal" data-bs-whatever="@getbootstrap">
              <img class="import-icon" src="../assets/icon-postjob/add.svg" alt="">
              Create a new job
            </button> 
          </form>
        </div>
      </nav>

      <form @submit.prevent="addjob">
        <div class="modal fade" id="jobModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel1">Add job</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job Name:</label>
                  <input type="text" class="form-control" id="recipient-name" v-model="jobName" maxlength="100" required />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job salary:</label>
                  <input type="number" class="form-control" id="recipient-name" v-model="jobSalary" required />
                </div>
                <div class="mb-3">
                  <label for="inputState">Job position</label>
                  <select class="form-control" id="inputState" v-model="jobPosition" required>
                    <option>Choose..</option>
                    <option>Internship</option>
                    <option>Full time</option>
                    <option>Part time</option>
                    <option>Contractual</option>
                    <option>Freelance</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job requirement:</label>
                  <ckeditor :editor="editor" tag-name="textarea" v-model="jobRequirement" :config="editorConfig">
                  </ckeditor>

                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Job description:</label>
                  <ckeditor :editor="editor" tag-name="textarea" id="jobDesc" :model-value="jobDesc" v-model="jobDesc"
                    :config="editorConfig"></ckeditor>
                  <!-- <textarea class="form-control" id="jobdescription" v-model="jobDesc"></textarea> -->

                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Job address:</label>
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
        <listjobcomponent :count="hide"></listjobcomponent>
        <!-- <candidatejob-component></candidatejob-component>    -->
      </div>
      <!-- <job-component class="job-component" :item="item"></job-component> -->
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

  export default {
    name: "PostJobNew",
    components: {
      SidebarComponent: sidebarcomponent,
      // JobComponent: JobComponent,
      // jobcomponentnew,
      // applicantjobcomponent,
      listjobcomponent,
      // CandidatejobComponent
    },
    props:['edit'],
    data() {
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          // The configuration of the editor.
                toolbar:{
                  items:[
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
        jobSalary: "",
        jobPosition: "",
        jobRequirement: "",
        jobDesc: "",
        jobAddress: "",
        list: [],
        modalOpen: false,

        userName: "",
        hide:''
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