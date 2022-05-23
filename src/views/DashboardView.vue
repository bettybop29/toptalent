<template>

<div>
  
    <sidebar-component/>
    <sidebar-right v-if="this.sidepop == true" :view="views"></sidebar-right>
    <sidebar-right-review  v-if="this.sidepop == false & this.err == '200'"></sidebar-right-review>
    <sidebar-right-empty  v-if="this.err =='400'"></sidebar-right-empty>

   <div class="container">
        <div class="card">
          <img class="animate__animated animate__tada" src="@/assets/saly.png" alt="">
            <div class="card-title">              
              <h2 class="main-head">Hi, {{recruiters.recruiterCompany}}!</h2>
              <div class="card-text">
                <h5>Welcome Back</h5>
                <h5>you have <span class="decor">{{edit.data}}</span> new
                <br>resume.</h5> 
              </div>
              <button class="btn" v-on:click="test">See all</button>    
            </div>    
        </div>
     
        <div class="card-monitor">
          
          <div class="card-approve">
            <div class="card-title">
                <h4>Summary of approve</h4>
                <h1>{{accept.data}}<span> / {{total.data}}</span></h1>
             </div>  
              </div>
                <div class="col card-reject">
                <h4>Summary of reject</h4>
                <h1>{{reject.data}}<span> / {{total.data}}</span></h1>
             
          </div>
         
        </div>
         
    </div> 

    
    <div>
   
    
  </div> -->

  <table class="table">
  <thead>
      <h3>Resume</h3>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Contact</th>
      <th scope="col">Status</th>
      <th scope="col">Job Name</th>
      <th scope="col">Position</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(resume, index) in list" :key="resume.id">
      <td scope="row">{{index + 1}}</td>
      <td>{{resume.jobseekerName}}</td>
      <td>{{resume.jobseekerEmail}}</td>
      <td>
        <p v-if="resume.applicationStatus != 'sent'">{{resume.applicationStatus}}</p>
        <p v-else>review</p></td>
      <td>{{resume.jobName}}</td>
      <td>
        <p v-if="resume.jobPosition != 'Internship'" class="position">{{resume.jobPosition}}</p>
        <p v-else class="position2">{{resume.jobPosition}}</p>
      </td>
      <td><button class="btn-primary" @click="getView(resume.applicationId)">view</button></td>
      
    </tr>
  </tbody>  
</table>

 </div>

</template>

<script>
import axios from 'axios'
import SidebarComponent from '@/components/SidebarComponent.vue'
import SidebarRight from '@/components/SidebarRight.vue'
import SidebarRightEmpty from '@/components/SidebarRightEmpty.vue'
import SidebarRightReview from '@/components/SidebarRightReview.vue'





export default {
  components: { SidebarComponent, 
                // SidebarRightEmpty, 
                SidebarRightReview,
                SidebarRight,
                SidebarRightEmpty
              },
  name:'DashboardView',
  data(){
    return{
      path: 'http://54.255.4.75:9091',
      recruiters:[],
      accept:"",
      reject: "",
      list:[],
      total:"",
      edit:"",
      views:"",
      sidepop:'',
      dashboardEmpty:'', 
    }
  },
  methods : {
  async totalnewAplicant(){
    const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    await axios.get(`http://54.255.4.75:9091/api/v1/application/new-resume/${recruiterId}`)
    .then((data)=>{
      this.edit=data.data
    })
  },
   async w3_open(){
      await axios.get(``)
    },
  async totalAplicant(){
    const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    await axios.get(`http://54.255.4.75:9091/api/v1/application/applications/${recruiterId}`)
    .then((data)=>{
      this.total=data.data
    })
  },
  // async newResume(){
  //   const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
  //   await axios.get(`http://54.255.4.75:9091/api/v1/application/dashboard/${recruiterId}`)
  //   .then((resp)=>{
  //     this.list = resp.data.data
  //     console.log(this.list)
  //     this.dashboardEmpty = resp.data.data.errorCode;
  //     console.log(das)
  //   })
  // },
  async newResume(){
    let response = '';
    const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    try{
      response = await axios.get(`http://54.255.4.75:9091/api/v1/application/dashboard/${recruiterId}`)
      .then((resp)=>{
        this.list = resp.data.data
        console.log(resp.data.code)
        this.err = resp.data.code
        this.sidepop = false
      })
    } catch(err) {
      this.err = err.response.data.code
      console.log(err.response.data.code)
      this.sidepop = false
    }
    if(response.status == 200){
      console.log(response)
    }
  },
   async recruiter(){
   const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    await axios.get(`http://54.255.4.75:9091/api/v1/auth/recruiter/${recruiterId}`)
    .then((data)=>{
      this.recruiters=data.data
      
    })
   },
   async countAcc(){
   const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
     await axios.get(`http://54.255.4.75:9091/api/v1/application/count-accepted/${recruiterId}`)
     .then((data)=>{
      this.accept=data.data
      })
    },
    async countRejc(){
   const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
     await axios.get(`http://54.255.4.75:9091/api/v1/application/count-rejected/${recruiterId}`)
     .then((data)=>{
      this.reject=data.data
      })
    },
    async getView(applicationId){
     
       await axios.get(`http://54.255.4.75:9091/api/v1/application/applicant?applicationId=${applicationId}`)
      .then((data)=>{
        this.views=data.data.data
        this.sidepop = true
        console.log(this.sidepop)
        // console.log(data)
              
      })
    },
    test(){
      console.log('test')
      this.$toast.error('Profile saved.', {
          // optional options Object
           position: 'top-right',
           pauseOnHover: true
      })
    }
  },
  mounted(){
    this.recruiter(),
    this.countAcc(),
    this.countRejc(),
    this.newResume(),
    this.totalAplicant(),
    this.totalnewAplicant(),
    this.getView()
  },
}; 
</script>  
<style scoped>
  .main-head{
    font-weight: 600;
  }
  .table{
  border-radius: 20px;
  padding: 10%;
}
.table h3{
  margin: 15px;
  width: 30px;
  
}

.table td{
  font-weight: 500;
  overflow: auto;
}
.btn-primary{
  border-radius: 10px;
  border-style: none;
  padding: 5px;
  width: 100%;
}
.btn-primary:hover{
  background: blue;
  box-shadow: 6px 10px 15px -3px rgba(0,0,0,0.1);
}
.logo-main{
  background: url("../assets/approve.png");
}
.main {
  background-color: #F3F3F3;
}
.container {
  margin-left: 19%;
  
  text-align: left;
  /* margin-top: 30px; */
  padding-top: 30px;
  width: auto;
  display: flex;
}
.card {
  
  position: relative;
  padding: 10px;
  text-align: right;
  border-radius: 29px;
  width: 430px;
  height: 273px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.card-text {
  padding: 10px;
  margin: 0;
  padding-left: 40px;
  text-align: left;
}
img{
  z-index: 1;
  position: fixed;
  display: block;
  left: 250px;
  top: 20px;
  /* right: 1000px; */
  /* margin-left: 0; */
  /* margin-right: 40px; */
  width: 270px;
  height: 270px;
    
  
}
h5{
  padding-top: 5px;
  text-align: left;
  margin-left: 160px;
}
.decor{
  font-size: 17px;
  color: rgb(37, 37, 37);
}
.card-approve {
 background-image: url("../assets/approve.png");
  border-radius: 20px;
  height: 133px;
  width: 373px;
  display: flex;
  padding: 10px;
  
}
.card-reject{
  padding: 20px;
  background-image: url("../assets/reject.png");
  border-radius: 20px;
  height: 133px;
  width: 373px;
  margin-top: 9px;
  /* box-shadow: 6px 10px 15px -3px rgba(0,0,0,0.1); */
}
.card-title{
  padding: 10px;
  padding-left: 10px;
}
span{
  font-size: 26px;
}
.card-monitor {
  margin-left: 10px;
  color: white;
  
}
.btn{
  font-size: 12px;
  padding: 8px;
  border-radius: 30px;
  background: orange;
  color: white;
  margin-top: 30px;
  width: 190px;

}
.btn:hover{
  background: rgb(235, 153, 1);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.table{
  margin-left: 310px;
  width: 52.5%;
  background: rgb(249, 249, 249)
}
.position{
  background: #E2E3F6;
  padding: 5px;
  width: 100%;
  font-weight: bold;
  border-radius: 10px;
  color: #7D8CD1;
  font-size: 12px;
  text-align: center;
}
.position2{
  background: #e3fe9f;
  padding: 5px;
  width: 100%;
  font-weight: bold;
  border-radius: 10px;
  color: #b4bf1b;
  font-size: 11px;
  text-align: center;
}
.title-table{
  position: fixed;
  margin-left: 20.3%;
  background: white;
  width: max-content;
  padding: 8px;
  margin-top: 15px;
  border-radius: 10px 50px 10px 0px;
  padding-right: 40px;
}

</style>