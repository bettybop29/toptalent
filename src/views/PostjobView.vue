<template>
<div>
  <sidebar-component></sidebar-component>
  <div class="container">
  <div class="main">
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#jobModal"
      data-bs-whatever="@getbootstrap">
      <i class="bi bi-plus-circle me-2"></i>
      Add New Job
    </button>
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
                <input type="text" class="form-control" id="recipient-name" v-model="jobName" required/>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Job Salary:</label>
                <input type="number" class="form-control" id="recipient-name" v-model="jobSalary" required/>
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
                <ckeditor :editor="editor" tag-name="textarea" v-model="jobRequirement" :config="editorConfig"></ckeditor>
                
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Job Desc:</label>
                <ckeditor :editor="editor" tag-name="textarea" id="jobDesc" :model-value="jobDesc" v-model="jobDesc" :config="editorConfig"></ckeditor>
                <!-- <textarea class="form-control" id="jobdescription" v-model="jobDesc"></textarea> -->
              
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Job Address:</label>
                <textarea class="form-control" id="message-text" v-model="jobAddress" maxlength="100" required></textarea>
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
    
    <div class="modal fade" v-if="this.modalOpen = true" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content" style="border-radius:20px; margin:auto; width:400px; margin-top:200px; padding-bottom:20px; text-align:center; padding:50px;">
        <h5 style="padding-bottom:30px; font-size:18px; font-weigh:bolder;">Are you sure want to<br>publish job?</h5>     
     <div class="select-button">
      
        <button class="btn btn-outline-danger pop" data-bs-target="#jobModal" data-bs-toggle="modal">Cancel</button>
         <button v-on:click="addjob" type="button" class="btn btn-primary pop" data-bs-dismiss="modal">Yes, post it!</button>
      </div>
    </div>
  </div>
</div>
</form>
  
    <div class="row">
     
      <div class="col-md-3 mt-3 col-12" v-for="item in list" v-bind:key="item.id">
        <transition name="fade">
        <job-component class="job-component" :item="item"></job-component>
        <!-- <jobcomponentnew class="job-component" :item="item"></jobcomponentnew> -->
        </transition>
      </div>
      
    </div>
    
  </div>
  </div>
  </div>
</template>
<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import JobComponent from '../components/JobComponent.vue';
//   import jobcomponentnew from '../components/JobComponentNew.vue';
  import sidebarcomponent from '../components/SidebarComponent.vue'
  import axios from "axios";
//   import {createToast} from "mosha-vue-toastify";
//   import 'boxicons';

  
  export default {
    name: "PostJob",
    components: {
      SidebarComponent: sidebarcomponent,
      JobComponent: JobComponent,
    //   jobcomponentnew

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
        modalOpen:false

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
            `https://toptalentapp.com:9091/api/v1/job/create?jobName=${this.jobName}&recruiterId=${recruiterId}&jobSalary=${this.jobSalary}&jobPosition=${this.jobPosition}&jobAddress=${this.jobAddress}&jobDesc=${this.jobDesc}&jobRequirement=${this.jobRequirement}`
            );
        //   createToast("Job Successfully Created", {
        //     type: "success"
        //   });
          this.modalOpen = true;
          location.reload(true)

        } catch (error) {
        //   createToast("please, fill blank form", {
        //     type: "danger"
        //   });
          console.log(error);
        }
      },
      logout() {
        try {
          localStorage.removeItem("user-info")
          this.$router.push("/login");
        //   createToast("logout success!", {
        //     type: "success"
        //   });
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

    }

  };
</script>
<style scoped>
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
  .job-component{
    margin-top: 15px;
  }

   .pop{
      padding: 10px;
      text-align: center;
      margin: 0;
      width: 125px;
    }
    .select-button{
      display: flex;
      text-align: center;
      justify-content: space-between;
      margin: 10px;
      padding-top: 30px;
    }

  /* transition */

  .fade-enter-from{
    opacity: 0;
  }
  .fade-enter-to{
    opacity: 1;
  }
  .fade-enter-active{
    transition: all 2s ease;
  }
  .fade-leave-from{
    opacity: 1;
  }
  .fade-leave-to{
    opacity: 0;
  }
  .fade-leave-active{
    transition: all 2s ease;
  }
</style>