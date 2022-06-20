<template>
  <div class="sidebar-right d-none d-md-none d-lg-block">
    <div class="side-content" v-if="this.openTab == false">
      <ul class="hide">
        <li class="li-title mt-5">
          <img src="https://toptalentapp.com:9091/resources/mb3.png" alt=""></li>  
        <li style="text-align:center;">
          <p>Some candidates<br>need to be reviewed!</p>
          <button  class="btn btn-primary" v-on:click="openSidebar">Review Now</button>
        </li>
      </ul>
    </div>
      <!-- ============================================ -->
    <div class="side-content" v-else>
      <ul v-for="item in list" :key="item.id">
        <li class="li-foto">
            <img v-if="item.jobseekerImage == null" src="https://toptalentapp.com:9091/resources/pfekimaggdc7k9r.png" alt="">
            <img v-else :src="'https://toptalentapp.com:9091/resources/'+ item.jobseekerImage" alt="">
          </li>
          <li class="li-header fw-bold fw-normal">
            <p v-if="item.jobseekerName == null">---</p>
            <p v-else>{{item.jobseekerName}}</p>
            <p v-if="item.jobseekerProfession == null" class="fw-normal">---</p>
            <p v-else class="fw-normal">{{item.jobseekerProfession}}</p>
          </li>
           <li class="li-title" style="text-align:left;">Basic Information</li>
          <!-- tabel untuk data jobseeker -->
           <table class="jobseeker-informations mb-4">
            <tbody>
              
              <tr>
                <th style="width: 25%;">Birthdate</th>
                <td v-if="item.jobseekerDateOfBirth == null" class="text-side text-muted">-</td>
                <td v-else class="text-side mt-4">{{item.jobseekerDateOfBirth}}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td v-if="item.jobseekerPhone == null" class="text-side text-muted">-</td>
                <td class="text-side mt-4">{{item.jobseekerPhone}}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td v-if="item.jobseekerEmail == null" class="text-side text-muted">-</td>
                <td class="text-side mt-4 ">{{item.jobseekerEmail}}</td>
              </tr>
              
            </tbody>
          </table>
          
          <!-- <li><button class="btn-resume act" v-on:click="getResume(item.jobseekerResume)">Resume <font-awesome-icon :icon="['fas','download']"/></button></li> -->
            <li>
              <button v-if="item.jobseekerResume == ''" v-on:click="ToastResume" class="btn-resume act lnk text-muted">No data resume <font-awesome-icon :icon="['fas','download']"/></button>
              <a v-else v-bind:href="'https://toptalentapp.com:9091/resources/' + item.jobseekerResume"  target="_blank" download class="btn-resume act lnk">Resume <font-awesome-icon :icon="['fas','download']"/></a>
            </li>
          <li>
            <!-- <button v-on:click="test">test</button> -->
            <button v-if="item.jobseekerPortfolio == '' || item.jobseekerPortfolio == null" class="btn-portofolio act text-muted" v-on:click="Toast" disabled>No Portofolio<font-awesome-icon :icon="['fas','link']"/></button>
            <button v-else class="btn-portofolio act" v-on:click="getLink(item.jobseekerPortfolio)">Portofolio <font-awesome-icon :icon="['fas','link']"/></button>
          </li>

          <li>
            <div class="action">
              <!-- <button class="acc" v-on:click="accepted(item.applicationId)"><i class="bi bi-check2"></i>accept</button> -->
               <button type="button" class="acc" data-bs-toggle="modal" data-bs-target="#popUp1">
                <font-awesome-icon class="icn" :icon="['fas','check']"/>Accept
              </button>

              <!-- Modal -->
              <div class="modal fade" id="popUp1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content" style="border-radius:20px; margin:auto; width:300px; margin-top:200px; padding-bottom:20px;">
                    <div class="modal-body">
                      <h5 class="form-popup-title">Are you sure want to accept {{item.jobseekerName}}?</h5>
                    </div>
                    <div class="select-button">
                      <button type="button" class="btn btn-primary pop" v-on:click="accepted(item.applicationId)">
                        <font-awesome-icon class="icn" :icon="['fas','check']"/>
                        Yes, accept
                      </button>
                      <button type="button" class="btn btn-danger pop" data-bs-dismiss="modal">
                        <font-awesome-icon class="icn" :icon="['fas','xmark']"/>
                        Cancel
                      </button>       
                    </div>
                  </div>
                </div>
              </div>





              <!-- <button class="rej" v-on:click="rejected(item.applicationId)"><i class="bi bi-x-lg"></i>reject</button> -->
               <button type="button" class="rej" data-bs-toggle="modal" data-bs-target="#popUp2">
                <font-awesome-icon class="icn" :icon="['fas','xmark']"/>Reject
              </button>

              <!-- Modal -->
              <div class="modal fade" id="popUp2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content" style="border-radius:20px; margin:auto; width:300px; margin-top:200px; padding-bottom:20px;">
                    <div class="modal-body">
                      <h5 class="form-popup-title">Are you sure want to reject {{item.jobseekerName}}?</h5>
                    </div>
                    <div class="select-button">
                      <button type="button" class="pop1" v-on:click="rejected(item.applicationId)">
                      <font-awesome-icon class="icn" :icon="['fas','check']"/>
                        Yes, reject
                      </button>
                      <button type="button" class="pop2" data-bs-dismiss="modal">
                        <font-awesome-icon class="icn" :icon="['fas','xmark']"/>
                        Cancel
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        
      </ul>
    </div>
  </div>




  

</template>

<script>
import axios from 'axios'
// import SidebarRightNew from '@/components/SidebarRightNew.vue'

export default {
    name:"SidebarRightReview",
    components:{
      // SidebarRightNew
    },
    
    data(){
      return{
        list:[],
        openTab:false
      }
    },
    methods:{
      openSidebar(){
        this.openTab = true;
        console.warn(this.openTab)
      },
       async accepted(id) {
        await axios.post(`https://toptalentapp.com:9091/api/v1/application/status/accepted/?applicationId=${id}`)
        // createToast(`Accepted`, { type: "success" });
        this.$toast.success('Accepted')
        location.reload()
      },
      async rejected(id) {
        await axios.post(`https://toptalentapp.com:9091/api/v1/application/status/rejected/?applicationId=${id}`)
        //  createToast(`Reject`, { type: "danger" });
        this.$toast.success('Rejected')
        location.reload()
      },

      async countAcc(){
      const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
      await axios.get(`https://toptalentapp.com:9091/api/v1/application/right-sidebar/${recruiterId}`)
      // await axios.get(`https://toptalentapp.com:9091/api/v1/auth/recruiter/${recruiterId}`)

      
        .then((resp)=>{
        this.list= resp.data.data
        console.warn(this.list.jobName)
        })
      }
    },
    test(){
        console.warn('test')
        this.$toast.error(`The applicant doesn't have any portfolio`, {
          // optional options Object
           position: 'top-right',
           pauseOnHover: true
        })
      },
    mounted(){
      this.countAcc();
      this.test();
      // this.openSidebar();
    }
}   

</script>

<style scoped>

.form-popup-title{
  width: 235px;
  text-align: center;
}
.lnk{
  text-decoration: none;
  color: black;
}
.fw-normal{
  font-weight: 500;
}
.icn{
  width: 20px;
}
.act{
  justify-content: space-between;
}
    .sidebar-right{
        
        float: right;
        display: flex;
        margin-top: 20px;
        
    }
    .side-content{
        width: 320px;
        position: absolute;
        right: 0;
        padding: 20px;
        background: white;
        border-radius: 20px 0 0 20px;
        text-decoration: none;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        height: 97vh;
        /* width: 100%; */
        transition: ease-in-out 1s;
        /* padding-right: 250px; */

    }
    .side-content li{
      list-style: none;
      margin: 13px;
      margin-left: 0px;
      margin-right: 30px;
      padding-right: 0px;
      text-align: left;
      
      display: flex;
      flex-direction: column;
      
      
    }
    .li-title{
      padding: 0;
      font-weight: bold;
      margin-left: -5px !important;
      color: #006EFF;
      
    }
    .action button{
      margin: 5px;
      border: none;
      padding: 20px;
      border-radius: 20px;
      color: white;
      transition: box-shadow 0.5s;
    }
    .action button:hover{
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
     .action button i{
       display: flex;
       justify-content: center;
       font-size: 30px;
       font-weight: bolder;
     }
    .acc{
      width: 44%;
      background: #149E48;
    }
    .acc:hover{
      background: #3dca73;
    }
    .rej{
      width: 44%;
      background: #FF3232;
    }
    .rej:hover{
      width: 44%;
      background: #f55959;
    }
    .btn-resume{
      border: none;
      padding: 15px;
      border-radius: 20px;
      background: #F6F6FF;
      display: flex;
      transition: box-shadow 0.5s;
    }
    .btn-resume:hover{
      box-shadow: rgba(152, 154, 251, 0.35) 0px 5px 15px;
    }
    .btn-resume i{
      margin-left: 120px;
    }
    .btn-portofolio{
      border: none;
      padding: 15px;
      border-radius: 20px;
      background: #F6F6FF;
      display: flex;
      transition: box-shadow 0.5s;
    }
    .btn-portofolio:hover{
      box-shadow: rgba(152, 154, 251, 0.35) 0px 5px 15px;
    }
    .btn-portofolio i{
      margin-left: 112px;
    }
    .text-side{
      position: absolute;
      padding-left: 80px;
      text-align: right;
      justify-content: right;
      
      
    }
    .li-header{
      text-align: center;
      padding: 0;
      margin-top: 10px;
      align-items: center;
    }
    .li-foto img{
      width: 100px;
      height: 100px;
      margin-left: 60px;
      margin-top: 0;
      border-radius: 50%;
      border: 3px solid #f3f3f3;
    }
    .pop{
      text-align: center;
      margin: 0;
    }
    .pop1{
      background: blue;
    }
    .pop2{
      background: red;
    }
    .select-button{
      display: flex;
      text-align: center;
      justify-content: center;
    }
    .modal-body{
      text-align: center;
      width:410px; 
      padding: 32px;
    }
    .modal-content{
      border-radius:20px;  
      margin:auto; 
      
      margin-top:200px; 
      padding-bottom:20px;
      
    }
    .jobseeker-informations{
      margin-left: -20px;
    }
    .jobseeker-informations td{
      font-size: 14px;
      height: 40px;
      padding: 15px;
      right: 0;
    }
    .jobseeker-informations th{
      font-size: 14px;
      height: 40px;
      padding: 15px;
      font-weight: 500;
    }
    
    .jobseeker-informations tr{
      font-weight: 500;
    }

    /* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */
    /* @media (max-width: 576px) {
    .side-content {
        margin-right: -320px;
    } */
    /* #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    } */
/* } */
</style>