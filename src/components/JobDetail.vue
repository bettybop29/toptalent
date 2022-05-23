<template><div>
  <sidebar-component></sidebar-component>
  
  <!-- <h1>{{jobName}}</h1>
            <h1>{{jobSalary}}</h1>
            <h1>{{jobPosition}}</h1> -->
  <!-- <div class="back">
    <router-link class="link-back" to="/post  job"><i class="bi bi-arrow-left-circle-fill"></i>Post job</router-link>
  </div> -->
  <div class="main">
   
    <button class="btn btn-primary new" onclick="history.back()"><i class="bi bi-chevron-left"></i>Go Back</button>
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-3" style="max-width: 1240px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img v-if="job.recruiterImage != null" :src="'http://54.255.4.75:9091/resources/'+job.recruiterImage" class="img-fluid rounded-start img-thumbnail"
                alt="...">
                  <img v-else src="http://54.255.4.75:9091/resources/meta.png" class="img-fluid rounded-start img-thumbnail"
                  alt="...">
                
            </div>
            <div class="col-md-8">
                <div class="card-body">
                      <h4 class="card-title1">{{job.jobName}}</h4>
                      <h6 class="card-title">{{job.jobPosition}} | Rp{{formatPrice(job.jobSalary)}}</h6>
                      <label class="label mt-3">Description job : </label>
                      <p class="card-text" v-html="job.jobDesc"></p>
                      <label class="label">Job Requirement :</label>
                      <p class="card-text" v-html="job.jobRequirement"></p>
                      <label class="label">Address :</label>
                      <p class="card-text">{{job.jobAddress}}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small>
                   
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <h2 class="fw-bold mb-4">Applicants</h2>
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Resume</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="item.id" class="text-center">
              <th scope="row">{{index +1}}</th>
              <td>{{item.jobseekerName}}</td>
              <td>{{item.jobseekerEmail}}</td>
              <td><button class="btn btn-primary" v-on:click="getResume(item.jobseekerResume)">Download</button></td>

              <td>
                <p v-if="item.applicationStatus != 'sent'">{{item.applicationStatus}}</p>
                <p v-else>review</p>
              </td>

              <td><button v-if="item.applicationStatus == 'sent'" class="btn btn-success"
                  v-on:click="accepted(item.applicationId)" id="button" name="button">Accept</button>
                <button v-else disabled class="btn btn-success" v-on:click="accepted(item.applicationId)" id="button"
                  name="button">Accept</button>
                <button v-if="item.applicationStatus == 'sent'" class="btn btn-danger"
                  v-on:click="rejected(item.applicationId)" id="button">Reject</button>
                <button v-else disabled class="btn btn-danger" v-on:click="rejected(item.applicationId)"
                  id="button">Reject</button>
                <router-link class="btn btn-primary" :to="{name:'aplicantdetail', params:{id:item.applicationId}}">view
                </router-link>
              </td>


            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>

    <!-- <table border="1">
          <tr v-for="item in list" :key="item.id">
            <td>{{item.jobseekerName}}</td>
            <td>{{item.jobseekerEmail}}</td>
            <td>{{item.jobseekerResume}}</td>
          </tr>
        </table> -->


    <!-- <JlDatatable
        :url='datatable.url'
        :columns="datatable.columns"  

        :requestOptions="datatable.requestOptions"
        :lengthMenu="datatable.lengthMenu"
        :isLengthMenu="datatable.isLengthMenu"
        :pageLength="datatable.pageLength"
        :isSearch="datatable.isSearch"
        :isSort="datatable.isSort"
        :sortDt="datatable.sortDt"

        @countPageChanged="onCountPageChanged"
        @search="onSearch"

        @gettingEntries="onGettingEntries"
        @entriesFetched="onEntriesFetched"

        @columnClicked="onColumnClicked"

        @prevPaginated="onPaginate"
        @nextPaginated="onPaginate"
        @paginated="onPaginate"

        @error="error"
      /> -->
</div>
</template>

<script>
  // import "mosha-vue-toastify/dist/style.css";
  // import { createToast } from "mosha-vue-toastify";
  // import JlDatatable from 'jl-datatable';
  import sidebarcomponent from '../components/SidebarComponent.vue'
  import axios from 'axios'
  
      var codeHTML = document.getElementsByClassName('code-html')

    for (var i = 0; i < codeHTML.length; i+=1) {

        codeHTML[i].replace('<', '&lt;')
    }



  export default {
    components: {
      // JlDatatable
      SidebarComponent: sidebarcomponent
    },
    props: ['id'],
    data() {
      return {
        // datatable: {
        //   url: 'https://www.jhonpride.ybdweb.com/api/users',
        //   requestOptions: {
        //     method: 'GET',
        //     headers: {
        //       "Accept": "application/json",                
        //     }
        //   },
        //   lengthMenu: [10, 15, 20, 50, 120],
        //   pageLength: 10,
        //   isSearch: true,
        //   isLengthMenu: true,
        //   isSort: true,
        //   sortDt:{
        //     sortBy: 'name',
        //     sort: 'ASC'
        //   },
        //   columns: [       
        //       {
        //       title: 'ID',
        //       key: 'id',
        //       isSort: true,            
        //       width: '5%'
        //     },   
        //     {
        //       title: 'Name',
        //       key: 'name',
        //       isSort: true,
        //       isSearch: true,
        //       // width: '10%'
        //     },
        //     {
        //       title: 'Last Name',
        //       key: 'last_name',
        //       isSort: false,
        //       isSearch: false,
        //       // width: '10%'
        //     },
        //     {
        //       title: 'Email',
        //       key: 'email',
        //       isSort: false,
        //       isSearch: true,
        //       // width: '10%'
        //     },
        //     {
        //       title: 'Address',
        //       key: 'address',                        
        //     },
        //     {
        //       title: 'Cell Phone',
        //       key: 'cell_phone',  
        //       width: '10%'                      
        //     },
        //     {
        //       title: 'Actions',            
        //       key: 'id',
        //       isAction: true,

        //     }
        //   ]
        // },
        index: 1,
        job: [],
        list: []
      }
    },

    methods: {
      // onCountPageChanged(countPage){
      //   alert(countPage);
      // },
      // onSearch(search){
      //   alert(search);
      // },
      // onGettingEntries(request){
      //   console.log(request);
      // },
      // onEntriesFetched(fetched){
      //   console.log(fetched.request);
      //   console.log(fetched.data);
      // },
      // onColumnClicked(data){
      //   console.log(data);
      // },
      // onPaginate(url){
      //   console.log(url);
      // },
      // error(err){
      //   console.log(err);
      // },
          
      formatPrice(value) {
        let val = (value / 1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      // escapeHtml(text) {
      //   var map = {
      //     '&': '&amp;',
      //     '<': '&lt;',
      //     '>': '&gt;',
      //     '"': '&quot;',
      //     '<p>': '&nbsp',
      //     '</p>': '&nbsp',
      //     "'": '&#039;'
      //   };
        
      //   return text.replace(/[&<>"']/g, function(m) { return map[m]; });
      // },
      async fetchData() {
        // const url = this.apiUrl + this.id
        await axios.get(`http://54.255.4.75:9091/api/v1/job/` + this.$route.params.id)
          .then((data) => {
            this.job = data.data.data
           console.log(this.job)
          })
      },
      async getResume(jobseekerResume) {
        await axios({
          url: `http://54.255.4.75:9091/resources/${jobseekerResume}`,
          methods: 'GET',
          responseType: 'blob',
        }).then((res) => {
          var FILE = window.URL.createObjectURL(new Blob([res.data]));
          var docUrl = document.createElement('x');
          docUrl.href = FILE;
          docUrl.setAttribute('download', 'resume.pdf');
          document.body.appendChild(docUrl);
          docUrl.click();

        })
      },
      async accepted(id) {
        await axios.post(`http://54.255.4.75:9091/api/v1/application/status/accepted/?applicationId=${id}`)
        location.reload(true)
        console.log(id)
      },
      async rejected(id) {
        await axios.post(`http://54.255.4.75:9091/api/v1/application/status/rejected/?applicationId=${id}`)
        location.reload(true)
        console.log(id)
      }

    },
    mounted() {
      this.fetchData()

      axios.get(`http://54.255.4.75:9091/api/v1/application/applicants/` + this.$route.params.id)
        .then((resp) => {
          this.list = resp.data
        })
    }
  }
</script>

<style scoped>
  .main{
    margin-top: 10px;
    margin-left: 18%;
  }
  .container {
    background: #f3f3f3;
    background-attachment: fixed;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    padding: 20px;
    border-radius: 20px;
    margin-left: 16%;
  }

  .card {
    padding: 10px;
    border-radius: 20px;
  }

  .btn {
    margin-left: 10px;
  }

  i {
    margin-right: 10px;
  }

  .card-title1 {
    font-weight: bold;
  }

  .label {
    font-weight: 600;
  }

  .table {
    background-color: white;
    padding: 20px;
  }

  .resume {
    padding-left: 35px;
  }

  .action {
    padding-left: 70px;
  }

  .back {
    padding: 20px;
    margin: 0;
  }

  .link-back {
    text-decoration: none;
    color: rgb(33, 33, 33);
  }

  .link-back:hover {
    text-decoration: underline;
  }
  .new{
    background: transparent;
    margin: 10px;
    border: none;
    color: black;
    
  }
  .new:hover{
    transition: color 1s;
    background: transparent;
    color: red;
    
  }
  
  
</style>