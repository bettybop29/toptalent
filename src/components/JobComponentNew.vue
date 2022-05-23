<template>
  <div class="card" style="width: 18rem;" >
      
    <div class="card-body">
        <div class="d-flex">
            <h5 class="card-title flex-grow-1">{{item.jobName}}</h5>
            <span class="bdge">{{item.jobPosition}} </span>
            <div class="dropdown">
            <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                aria-expanded="false"> <font-awesome-icon icon="fa-solid fa-ellipsis" class="ps-2 text-muted"/></a>
                
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li></li>
                <button v-if="item.jobStatus !='hidden'" class="dropdown-item" v-on:click="active(item.jobId)">Hidden</button>
                <button v-else disabled class="dropdown-item">Hidden</button>
                <button v-if="item.jobStatus !='visible'" class="dropdown-item"
                v-on:click="visible(item.jobId)">Visible</button>
                <button v-else disabled class="dropdown-item">Visible</button>
            </ul>
            </div>
            
        </div>
         
        <small class="card-text text-muted">Rp{{ formatPrice(item.jobSalary)}},-</small>
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        <div class="d-flex justify-content-between">
        <router-link to="/jobdetail" class="text-title align-items-center primary text-decoration-none fs-6">1 aplicant
            <font-awesome-icon icon="fa-solid fa-circle-arrow-right" class="px-1"/>
        </router-link>
            <div class="act-btn">
            <button class="act dgr"><font-awesome-icon icon="fa-solid fa-trash" /></button>
            <button class="act prm"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>
        </div>
    </div>
    </div>
</div>
<!-- hidden  -->

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
        let val = (value/1).toFixed().replace('.', ',')
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
        await axios.patch(`http://54.255.4.75:9091/api/v1/job/status/${id}?jobStatus=hidden`)
        // createToast("Job Updated", { type: "success" });
        location.reload(true)
        } catch {
          console.log(Error);
        }
      },
      
      async visible(id){
        try{
        await axios.patch(`http://54.255.4.75:9091/api/v1/job/status/${id}?jobStatus=visible`)
        // createToast("Job Updated", { type: "success" });
        location.reload(true)
        } catch {
          console.log(Error);
        }
      },
      
        async getDetail(id){
        try{
        console.log(id)
        await axios.get(`http://54.255.4.75:9091/api/v1/job/${id}`)
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
          
          await axios.patch(`http://54.255.4.75:9091/api/v1/job/${id}?jobName=${this.edit.jobName}&jobStatus=active&jobSalary=${this.edit.jobSalary}&jobPosition=${this.edit.jobPosition}&jobAddress=${this.edit.jobAddress}&jobDesc=${this.edit.jobDesc}&jobRequirement=${this.edit.jobRequirement}`)
          // createToast("Job Updated", { type: "success" });
          location.reload(true)
        } catch {
          // console.log(warn)
        }
       },
      async deleteJob(id){
      try {
       let result = await axios.put(`http://54.255.4.75:9091/api/v1/job/delete/`+id);
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

<style scope>

    .bdge{
        background: lightblue;
        border-radius: 7px;
        font-size: 12px;
        justify-content: center;
        padding: 3px;
        height: fit-content;
    }
    .text-title{
        display: flex;
        margin-top: 21px;
    }
    .act-btn{
        background: red;
        height: 0;
       
        margin-top: 15px;
    }
    .act{
        margin: 7px;
        border: none;
        background: transparent;
    }
   .dgr{
       color: red;
   }
   .prm{
       color: lightgreen;
   }
</style>