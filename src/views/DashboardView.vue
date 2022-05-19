<template>

<div>
    <sidebar-component></sidebar-component>
    <b-container class="bv-example-row">
      <img class="animate__animated animate__jackInTheBox" src="http://54.255.4.75:9091/resources/qnry9dzt9q8lym8.png" alt="">
      <b-row style="width:max-content;">
        <b-col>
          <div class="card">
            <div class="card-title animate__animated animate__fadeIn">              
              <h2>Hi, {{recruiters.recruiterCompany}}!</h2>
              <div class="card-text animate__animated animate__fadeIn">
                <h5>Welcome</h5>
                <h5>you have <span class="decor">{{edit.data}}</span> new
                <br>resume.</h5>  
              </div>
              <button class="btn animate__animated animate__fadeIn">See all</button>    
            </div>    
        </div>
        </b-col>
        <b-col>
          <div class="card-monitor">
          
          <div class="card-approve">
            <div class="card-title">
                <h4>Summary of approve</h4>
                <h1>{{accept.data}}<span> / 10</span></h1>
             </div>  
              </div>
                <div class="col card-reject">
                <h4>Summary of reject</h4>
                <h1>{{reject.data}}<span> / 10</span></h1> 
          </div>         
        </div>            
        </b-col>
                
      </b-row>
      
    </b-container>
    
    <div>
    <b-table sticky-header :items="item" :lists="list" head-variant="light" 
    style="width:840px; margin-left:308px; margin-top:30px; border-radius:30px;">
     <template #cell(index)="list">
        {{ list.index + 1 }}
      </template>
      <template #cell(name)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
      </template>
    </b-table>
    
  </div>

 </div>
</template>

<script>
import axios from 'axios'
import SidebarComponent from '@/components/SidebarComponent.vue'



export default {
  components: { SidebarComponent },
  name:'DashboardView',
  component:{
    SidebarComponent,
  },
  data(){
    return{
      list:[],
      item: [
          { Judul: 'table cell', 
          heading2: 'table cell', 
          heading3: 'table cell', 
          heading4: 'table cell', 
          heading5: 'table cell', 
          heading6: 'table cell', 
          heading7: 'table cell' },
          
        ],


      path: 'http://54.255.4.75:9091',
      recruiters:[],
      accept:"",
      reject: "",
      total:"",
      edit:"",
      views:""  
    }
  },
  methods : {
  async totalnewAplicant(){
    const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    await axios.get(`http://54.255.4.75:9091/api/v1/application/new-resume/${recruiterId}`)
    .then((data)=>{
      this.edit=data.data
      console.log(data)
    })
  },
  async totalAplicant(){
    const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    await axios.get(`http://54.255.4.75:9091/api/v1/application/applications/${recruiterId}`)
    .then((data)=>{
      this.total=data.data
    })
  },
  async newResume(){
    const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    await axios.get(`http://54.255.4.75:9091/api/v1/application/dashboard/${recruiterId}`)
    .then((resp)=>{
      this.list = resp.data.data
      
    })
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
        // console.log(data)
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
}
</script>

<style scoped>
  .table{
  border-radius: 20px;
  padding: 10%;
}
.table h3{
  margin: 15px;
  width: 30px;
  
}
.table td{
  
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
  top: 50px;
  margin-left: 0;
  margin-right: 40px;
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
  margin-top: 60px;
  width: 52.5%;
  background: white;
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