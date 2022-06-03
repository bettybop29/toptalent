<template>

<div class="row m-1 pt-4 px-3 animate__animated animate__fadeIn">
    <div class="col-md-2">
        <img v-if="item.jobseekerImage != null" :src="'http://54.255.4.75:9091/resources/'+ item.jobseekerImage" class="img-thumbnail" alt="..." width="100px">
         <img v-else src="http://54.255.4.75:9091/resources/r5jr7e3qf8f5uhr.png" class="img-thumbnail" alt="..." width="100px">
    </div>
    <div class="col-md-7">

          <h6 class="fw-bold">{{item.jobseekerName}}</h6>
        
        <p>{{item.jobseekerProfession}}</p>
        <p>{{item.jobseekerAddress}}</p>
    </div>
    <div class="col-md-3">
      <button class="btn">
        <img class="pt-4" src="../assets/icon-postjob/view-applicant.svg" alt="">
      </button>
      <button class="btn">  
        <img class="pt-4 ms-5" src="../assets/icon-postjob/cancel-applicant.svg" alt="">
      </button> 
    </div>
    <div class="col-md-2">
    </div>
    <div class="col-md-7">
        <div class="d-flex">
          <button class="btn ict" v-on:click="getResume(item.jobseekerResume)">
            <font-awesome-icon class=" mt-1" icon="fa-solid fa-file-lines"/> View CV
          </button>
          <button class="btn ict" v-on:click="getLink(item.jobseekerPortfolio)">
            <font-awesome-icon class="ms-3 me-2 mt-1" icon="fa-solid fa-link" /> Portofolio
          </button>            
        </div>
    </div>
    <div class="col-md-3">
        <span class="text-muted" style="font-size: 12px">Applied on DD-MM-YYYY</span>
    </div>
    <hr class="mt-4" />
</div>
</template>

<script>
  import axios from 'axios'
  // import "mosha-vue-toastify/dist/style.css";
  // import { createToast } from "mosha-vue-toastify";
  // import { warn } from '@vue/runtime-core';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  
  export default {
    name: "JobComponent",
    props: ['item'],
    data() {
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          // The configuration of the editor.
        },
        edit: []
      }
    },
    methods: {
      async getLink(jobseekerPortofolio) {
        window.open(`https://${jobseekerPortofolio}`);
      },
      async getResume(jobseekerResume){
        window.open(`http://54.255.4.75:9091/resources/${jobseekerResume}`, '_blank');

        //  await axios({
        //   url: `http://54.255.4.75:9091/resources/${jobseekerResume}`,
        //   methods: 'GET',
        //   responseType: 'blob',
        // }).then((res) => {
        //   var FILE = window.URL.createObjectURL(new Blob([res.data]));
        //   var docUrl = document.createElement('x');
        //   docUrl.href = FILE;
        //   docUrl.setAttribute('download', 'resume.pdf');
        //   document.body.appendChild(docUrl);
        //   docUrl.click();

        // })
      },
      formatPrice(value) {
        let val = (value / 1).toFixed().replace('.', ',')
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
      async active(id) {
        try {
          await axios.patch(`http://54.255.4.75:9091/api/v1/job/status/${id}?jobStatus=hidden`)
          // createToast("Job Updated", { type: "success" });
          location.reload(true)
        } catch {
          console.log(Error);
        }
      },
      async visible(id) {
        try {
          await axios.patch(`http://54.255.4.75:9091/api/v1/job/status/${id}?jobStatus=visible`)
          // createToast("Job Updated", { type: "success" });
          location.reload(true)
        } catch {
          console.log(Error);
        }
      },
      async getDetail(id) {
        try {
          console.log(id)
          await axios.get(`http://54.255.4.75:9091/api/v1/job/${id}`)
            .then((data) => {
              this.edit = data.data.data
              console.log(data.data)
            })
        } catch {
          console.log(Error)
        }
      },
      async updateJobData(id) {
        try {
          await axios.patch(
            `http://54.255.4.75:9091/api/v1/job/${id}?jobName=${this.edit.jobName}&jobStatus=active&jobSalary=${this.edit.jobSalary}&jobPosition=${this.edit.jobPosition}&jobAddress=${this.edit.jobAddress}&jobDesc=${this.edit.jobDesc}&jobRequirement=${this.edit.jobRequirement}`
          )
          // createToast("Job Updated", { type: "success" });
          location.reload(true)
        } catch {
          // console.log(warn)
        }
      },
      async deleteJob(id) {
        try {
          let result = await axios.put(`http://54.255.4.75:9091/api/v1/job/delete/` + id);
          console.warn(result)
          //  createToast("Job Deleted!", { type: "danger" });
          location.reload(true)
        } catch {
          console.warn
        }
      },
      
      
      
    },
    mounted() {
      this.getDetail();
    }

  }
</script>

<style scope>
.link-appl{
  text-decoration: none;
}
.ict{
  color:blue ;
}
.ict:hover{
  transition: color 0.5s;
  color: rgb(115, 115, 255);
  text-decoration: underline;
}

  .bdge {
    background: lightblue;
    border-radius: 7px;
    font-size: 12px;
    justify-content: center;
    padding: 3px;
    height: fit-content;
  }
  
  .text-title {
    display: flex;
    margin-top: 21px;
  }

  .ict-btn {
    background: red;
    height: 0;
    margin-top: 15px;
  }

  .ict {
    margin: 7px;
    border: none;
    background: transparent;
  }

  .dgr {
    color: red;
  }

  .prm {
    color: lightgreen;
  }
</style>