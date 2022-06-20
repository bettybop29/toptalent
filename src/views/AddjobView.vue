<template>
  <div>
      <sidebarcomponent/>
        <div class="bg-color">
            <button class="btn btn-primary new" onclick="history.back()"><i class="bi bi-chevron-left"></i>Go Back</button>

            <div class="container section-first">
                <form @submit.prevent="addjob" name="addJob">
                     <h1 class="mb-4">Create job</h1>
                        <div class="col-md-10 mb-4">
                            <label for="recipient-name" class="col-form-label">Job Name:</label>
                             <input type="text" class="form-control" id="recipient-name" v-model="jobName" maxlength="10" required/>
                        </div>
                        <div class="col-md-10 mb-4">
                           <label for="recipient-name" class="col-form-label">Job Salary:</label>
                            <input type="number" class="form-control" id="recipient-name" v-model="jobSalary" required/> 
                        </div>
                        <div class="col-md-10 mb-4">
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
                        <div class="col-md-10 mb-4">
                            <label for="recipient-name" class="col-form-label">Job Requirement:</label>
                            <ckeditor :editor="editor" tag-name="textarea" v-model="jobRequirement" :config="editorConfig" maxlength="100"></ckeditor>
                        </div>
                        <div class="col-md-10 mb-4">
                            <label for="message-text" class="col-form-label">Job Desc:</label>
                            <ckeditor :editor="editor" tag-name="textarea" id="jobDesc" :model-value="jobDesc" v-model="jobDesc" :config="editorConfig"></ckeditor>
                        </div>
                        <div class="col-md-10 mb-4">
                            <label for="message-text" class="col-form-label">Job Address:</label>
                            <textarea class="form-control" id="message-text" v-model="jobAddress" maxlength="100" required></textarea>
                            <small>max.100 characters</small>
                        </div>
                        <div class="col">
                            <button v-on:click="addjob" type="submit" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Create job</button>
                            <!-- <button class="btn btn-primary" onclick="history.back()"><i class="bi bi-chevron-left"></i>Go Back</button> -->
                            <!-- <div class="modal fade" id="exampleModal" aria-hidden="true" aria-labelledby="exampleModalLabel" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content" style="border-radius:20px; margin:auto; width:400px; margin-top:200px; padding-bottom:20px; text-align:center; padding:50px;">
                                        <h5 style="padding-bottom:30px; font-size:18px; font-weigh:bolder;">Are you sure want to<br>publish job?</h5>     
                                    <div class="select-button">
                                    
                                        <button class="btn btn-outline-danger pop" data-bs-target="#jobModal" data-bs-toggle="modal">Cancel</button>
                                        <button v-on:click="addjob" type="button" class="btn btn-primary pop" data-bs-dismiss="modal">Yes, post it!</button>
                                    </div>
                                    </div>
                                </div>
                                </div> -->
                        </div>
                </form>
            </div>
        </div>
  </div>
</template>

<script>
import sidebarcomponent from '@/components/SidebarComponent.vue'
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    components:{
        sidebarcomponent
    },
    data(){
         return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
         // The configuration of the editor.
         
        },
        }
    },
     methods: {
              
      formatPrice(value) {
        let val = (value / 1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      // func tambah job
      async addjob() {
        try {
            let x = document.forms["addJob"].value;
            console.log(x)
            if ( x == "" ){
          const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
          await axios.post(
            `https://toptalentapp.com:9091/api/v1/job/create?jobName=${this.jobName}&recruiterId=${recruiterId}&jobSalary=${this.jobSalary}&jobPosition=${this.jobPosition}&jobAddress=${this.jobAddress}&jobDesc=${this.jobDesc}&jobRequirement=${this.jobRequirement}`
            );
          // createToast("Job Successfully Created", {
          //   type: "success"
          // });
          
          location.reload(true)
            }
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
    },
    
     
    

};

</script>

<style scoped>
/* pop up styling  */
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

    .bg-color{
  background-color: #f3f3f3;
  min-height: 140vh;
  
}
  h1 {
    text-align: left;
    padding: 0;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  
  .container{
    background: white;
    padding: 20px;
    border-radius: 20px;
    /* position: absolute; */
    margin: 1.5%;
    width: 60%;
    padding-right: 0;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    margin-left: 20%;
    
  }
  .btn{
    width: 81%;
    margin-left: 10px;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .new{
    background: transparent;
    width: max-content;
    margin-left: 20%;
    color: black;
    margin-top: 20px;
    border: none;
    padding-left: 10px;
    transition: ease-in-out 1s;
  }
  .new:hover{
    background: transparent;
    color: red;
    padding-left: 0;
    transition: ease-in-out 1s;
    
  }
  .bottom{

    margin-top: 2%;
    margin-bottom: 10px;
    padding-bottom: 30px;
  }
  
  form{
    margin-left: 80px;
  }
</style>