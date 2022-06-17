<template>

  <div class="card">
    <div class="dropdown">
      <a class="bi bi-three-dots-vertical" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
        aria-expanded="false"></a>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li></li>
        <button v-if="item.jobStatus !='hidden'" class="dropdown-item" v-on:click="active(item.jobId)">Hidden</button>
        <button v-else disabled class="dropdown-item">Hidden</button>
        <button v-if="item.jobStatus !='visible'" class="dropdown-item"
          v-on:click="visible(item.jobId)">Visible</button>
        <button v-else disabled class="dropdown-item">Visible</button>
      </ul>
    </div>
  <div class="card-body dark" v-if="item.jobStatus !='visible'">
    <img v-if="item.recruiterImage != null" :src="'https://toptalentapp.com:9091/resources/'+item.recruiterImage" class="card-img-top dark" style="filter: grayscale(100%)"  alt="...">
    <img v-else src="https://toptalentapp.com:9091/resources/meta.png" class="card-img-top dark" alt="...">

    
    <!-- html for hidden job component -->
    
      <h5 class="card-title">{{item.jobName}}</h5>
      <span class="badge bg-secondary">{{item.jobStatus}}</span>
      <p class="card-text"><i class="bi-clock" style="color:grey;"></i> {{ item.jobPosition }}</p>
      <p class="card-text"><i class="bi-cash" style="color:grey;"></i> Rp. {{ formatPrice(item.jobSalary) }}</p>
      <p class="card-text"><i class="bi-geo-alt" style="color:grey;"></i> {{ item.jobAddress }}</p>
      <!-- <router-link class="btn btn-primary" to="/jobdetail">Detail</router-link> -->
      <router-link class="btn btn-primary" :to="{name: 'jobdetail', params:{id:item.jobId}}">Detail</router-link>
      <button class="btn btn-danger" v-on:click="deleteJob(item.jobId)">Delete</button>

      <div class="modal fade" :id="'exampleModalToggle' + item.jobId" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">Edit Jobs</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job Name tes:</label>
                  <input type="text" class="form-control" id="" v-model="edit.jobName">
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job Position edit: </label>
                  <input type="text" class="form-control" id="" v-model="edit.jobPosition">
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job Address: </label>
                  <input type="text" class="form-control" id="recipient-name" v-model="edit.jobAddress">
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Job Requirement: </label>
                  <!-- <input type="text" class="form-control" id="recipient-name" v-model="edit.jobRequirement"> -->
                  <ckeditor :editor="editor" tag-name="textarea" :model-value="jobDesc" v-model="edit.jobRequirement" :config="editorConfig"></ckeditor>
                </div>

                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Job Description:</label>
                  <!-- <textarea class="form-control" id="message-text" v-model="edit.jobDesc" /> -->
                  <ckeditor :editor="editor" tag-name="textarea" :model-value="jobDesc" v-model="edit.jobDesc" :config="editorConfig"></ckeditor>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-success" v-on:click="updateJobData(edit.jobId)">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-success" data-bs-toggle="modal" :data-bs-target="'#exampleModalToggle' + item.jobId" role="button" v-on:click="getDetail(item.jobId)">Edit</button>
    </div>
    
    <div class="card-body" v-else> 
      <img v-if="item.recruiterImage != null" :src="'https://toptalentapp.com:9091/resources/'+item.recruiterImage" class="card-img-top dark"  alt="...">
    <img v-else src="https://toptalentapp.com:9091/resources/meta.png" class="card-img-top dark" alt="..."> 
      <h5 class="card-title">{{item.jobName}}</h5>
      <span class="badge bg-primary">{{item.jobStatus}}</span>
      <p class="card-text"><i class="bi-clock"></i> {{ item.jobPosition }}</p>
      <p class="card-text"><i class="bi-cash"></i> Rp. {{ formatPrice(item.jobSalary) }}</p>
      <p class="card-text"><i class="bi-geo-alt"></i> {{ item.jobAddress }}</p>
          <!-- <router-link class="btn btn-primary" to="/jobdetail">Detail</router-link> -->
      <router-link class="btn btn-primary" :to="{name: 'jobdetail', params:{id:item.jobId}}">Detail</router-link>
      <button class="btn btn-danger" v-on:click="deleteJob(item.jobId)">Delete</button>
          
      <div class="modal fade" :id="'exampleModalToggle' + item.jobId" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">Edit Jobs</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Job Name:</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="edit.jobName">
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Job Position: </label>
                    <input type="text" class="form-control" id="recipient-name" v-model="edit.jobPosition">
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Job Address: </label>
                    <input type="text" class="form-control" id="recipient-name" v-model="edit.jobAddress">
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Job Requirement: </label>
                    <ckeditor :editor="editor" tag-name="textarea" :model-value="jobDesc" v-model="edit.jobRequirement" :config="editorConfig"></ckeditor>
                    <!-- <input type="text" class="form-control" id="recipient-name" v-model="edit.jobRequirement"> -->
                  </div>
                  
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">Job Description:</label>
                    <ckeditor :editor="editor" tag-name="textarea" :model-value="jobDesc" v-model="edit.jobDesc" :config="editorConfig"></ckeditor>
                    <!-- <textarea class="form-control" id="message-text" v-model="edit.jobDesc"/> -->
                  </div>
                  <div class="modal-footer">
                
                <button class="btn btn-primary" v-on:click="updateJobData(edit.jobId)">Update</button>
              </div>
                </form>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-success" data-bs-toggle="modal" :data-bs-target="'#exampleModalToggle' + item.jobId" role="button" v-on:click="getDetail(item.jobId)">Edit</button>
    </div>
  </div>

  <!-- </router-link> -->
</template>
<script>

import axios from 'axios'
// import "mosha-vue-toastify/dist/style.css";
// import { createToast } from "mosha-vue-toastify";
// import { warn } from '@vue/runtime-core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default {
    name:"JobComponent",
    props:['item','id',],
    
    data(){
      return {
         editor: ClassicEditor,
        editorData: '',
        editorConfig: {
         // The configuration of the editor.
         
        },
        edit:[]
      }
    },
    methods:{
       
       formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
     escapeHtml(text) {
      return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    },
       async active(id){
        try{
        await axios.patch(`https://toptalentapp.com:9091/api/v1/job/status/${id}?jobStatus=hidden`)
        // createToast("Job Updated", { type: "success" });
        location.reload(true)
        } catch {
          console.log(Error);
        }
      },
      
      async visible(id){
        try{
        await axios.patch(`https://toptalentapp.com:9091/api/v1/job/status/${id}?jobStatus=visible`)
        // createToast("Job Updated", { type: "success" });
        location.reload(true)
        } catch {
          console.log(Error);
        }
      },
      
        async getDetail(id){
        try{
        console.log(id)
        await axios.get(`https://toptalentapp.com:9091/api/v1/job/${id}`)
        .then((data)=>{
          this.edit=data.data.data
          console.log(data.data)
        })
        } catch{
          console.log(Error)
        }
      },
     async updateJobData(id){
        try{
          
          await axios.patch(`https://toptalentapp.com:9091/api/v1/job/${id}?jobName=${this.edit.jobName}&jobStatus=active&jobSalary=${this.edit.jobSalary}&jobPosition=${this.edit.jobPosition}&jobAddress=${this.edit.jobAddress}&jobDesc=${this.edit.jobDesc}&jobRequirement=${this.edit.jobRequirement}`)
          // createToast("Job Updated", { type: "success" });
          location.reload(true)
        } catch {
          // console.log(warn)
        }
       },
      async deleteJob(id){
      try {
       let result = await axios.put(`https://toptalentapp.com:9091/api/v1/job/delete/`+id);
        console.warn(result)
        
          //  createToast("Job Deleted!", { type: "danger" });
           location.reload(true)
      
      }catch{
        console.warn
        
        }     
      }
    },
    
   
      mounted(){
        this.getDetail();
      }
    
    
}
</script>

<style scoped>
  .card {
    background: rgb(243, 244, 255);
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 20;
    text-align: left;
    margin: 0px;
  }
  .card img{
    width: 50%;
    height: 50%;
      display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  }
  .card-title {
    font-weight: bold;
  }
  .card {
    border-radius: 20px;
    padding: 10px;
  }
  .card-text {
    padding: 0;
    margin: 3px;
    
  }
  .dropdown{
    /* float: right; */
    /* position: absolute; */
    margin: 10px;
    margin-left:85%;
  }
  .card-link {
    text-decoration: none;
    color: black;
  }
  .btn{
    margin: 5px;
  }
  .container {
    background-color: #f3f3f3;
    height: 100%;
  }

  .dark {
    color: rgb(139, 139, 139);
  }
  .span{
    background: blue;
    color: white;
    padding: 5px;
    border-radius: 4px; 
    margin-bottom: 10px;
    width: max-content;
  }
  .label{
     background:rgb(139, 139, 139); 
  }

  .card-img-top{
    margin-top: -30px;
  }

  .card-body h5{
    margin-bottom: 20px;
  }

  .card-body span{
    margin-bottom: 10px;
  }

  .card-body p{
    padding-bottom: 10px;
  }

  .card-body p i{
    
    color: blue;
  }
  .hidden{
    color: grey;
  }

</style>