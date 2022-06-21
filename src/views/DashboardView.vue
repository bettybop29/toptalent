<template>

  <div>
    <!-- <PageLoader/> -->
    <sidebar-component />
    <sidebar-right v-if="this.sidepop == true" :view="views"></sidebar-right>
    <div>

      <sidebar-right-review v-if="this.sidepop == false & this.err == '200'"></sidebar-right-review>
      <sidebar-right-empty v-if="this.err =='400'"></sidebar-right-empty>

      <nav-mobile></nav-mobile>

      <div class="container">
        <div class="row">
          <div class="col-lg-6 ">
            <div class="card greetings mb-4">
              <h2 class="main-head">Hi, {{recruiters.recruiterCompany}}!</h2>
              <div class="row">
                <div class="col-lg-3 col-6">
                  <img class="animate__animated animate__tada" src="@/assets/saly.png" alt="">
                </div>
                <div class=" col-lg-9 col-6">

                  <div class="card-text">
                    <h5 class="welcome">Welcome</h5>
                    <h5 id="info">You have <span class="decor">{{edit.data}}</span> new
                      resume(s)</h5>
                  </div>
                  <button class="btn" hidden>See all</button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card-monitor">

              <div class="card-approve">
                
                <div class="card-title">
                  <radial-progress-bar :diameter="100" :stopColor="stopColor" :startColor="startColor"
                    :innerStrokeColor="innerStrokeColor" v-bind:completed-steps="accept.data"
                    v-bind:total-steps="total.data" :strokeWidth="6" :innerStrokeWidth="6" class="radial-custom">
                    <div class="animate__animated animate__fadeIn">
                      <p v-if="this.accept.data !== 0" class="ellipse-title">{{percentt}}%</p>
                    
                      <p v-else class="ellipse-title">0%</p>
                    </div>
                  </radial-progress-bar>
                  <h2 class="sum-title">Summary of approve</h2>

                  <h3 class="data-progress">{{accept.data}}<span> / {{total.data}}</span></h3>

                </div>
              </div>
              <div class="card-reject">
                <radial-progress-bar :diameter="100" :stopColor="stopColor" :startColor="startColor"
                  :innerStrokeColor="innerStrokeColor" v-bind:completed-steps="reject.data"
                  v-bind:total-steps="total.data" :strokeWidth="6" :innerStrokeWidth="6" class="radial-custom">
                  <div class="animate__animated animate__fadeIn">
                    <p v-if="this.reject.data == 0" class="ellipse-title">0%</p>
                    
                    <p v-else class="ellipse-title">{{percent}}%</p>
                  </div>
                </radial-progress-bar>
                <h2 class="sum-title">Summary of reject</h2>
                <h3 class="data-progress">{{reject.data}}<span> / {{total.data}}</span></h3>

              </div>

            </div>
          </div>

        </div>

      </div>

      <div>

      </div>

      <div class="table-wrapper">
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
              <td>
                <!-- {{resume.jobseekerName}} -->
                <router-link class="jobseeker-name" :to="'/applicant-detail/'+ resume.jobseekerId">
                  {{resume.jobseekerName}}
                </router-link>
              </td>
              <td>{{resume.jobseekerEmail}}</td>
              <td>
                <p v-if="resume.applicationStatus != 'sent'">{{resume.applicationStatus}}</p>
                <p v-else>Reviewed</p>
              </td>
              <td>{{resume.jobName}}</td>
              <td>
                <p v-if="resume.jobPosition != 'Internship'" class="position">{{resume.jobPosition}}</p>
                <p v-else class="position2">{{resume.jobPosition}}</p>
              </td>
              <td class="d-none d-md-block">
                <button class="btn btn-primary btn-view mb-3" @click="getView(resume.applicationId)">View
                </button>

              </td>


              <td class="d-block d-md-none">
                <!-- <button class="btn-primary" @click="getView(resume.applicationId)">View</button> -->

                <!-- Button trigger modal -->
                <button @click="getView(resume.applicationId)" type="button" class="btn btn-primary btn-view"
                  data-bs-toggle="modal" data-bs-target="#exampleModal">
                  View
                  <p></p>
                </button>
              </td>

            </tr>
          </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Accept Applicant</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div class="li-foto mb-4">
                  <img v-if="views.jobseekerImage == null"
                    src="https://toptalentapp.com:9091/resources/pfekimaggdc7k9r.png" alt="">
                  <img v-else :src="'https://toptalentapp.com:9091/resources/'+ views.jobseekerImage" alt="">
                </div>

                <div>
                  <p class="text-center"> {{views.jobseekerName}}</p>

                  <p v-if="views.jobseekerProfession == null" class="text-center">---</p>
                  <p v-else class="text-center">{{views.jobseekerProfession}}</p>

                </div>

                <p class="li-title">Basic Information</p>
                <!-- tabel untuk data jobseeker -->
                <table class="jobseeker-informations mb-4">
                  <tbody>

                    <tr>
                      <th style="width: 25%;">Birthdate</th>
                      <td v-if="views.jobseekerDateOfBirth == null" class="text-side text-muted">-</td>
                      <td v-else class="text-side mt-4">{{views.jobseekerDateOfBirth}}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td v-if="views.jobseekerPhone == null" class="text-side text-muted">-</td>
                      <td class="text-side mt-4">{{views.jobseekerPhone}}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td v-if="views.jobseekerEmail == null" class="text-side text-muted">-</td>
                      <td class="text-side mt-4 ">{{views.jobseekerEmail}}</td>
                    </tr>

                  </tbody>
                </table>

                <!-- resume -->
                <div class="mb-2">
                  <button v-if="views.jobseekerResume == '' || views.jobseekerResume == null"
                    class="btn btn-no-resume act lnk" disabled>No data resume
                  </button>
                  <a v-else v-bind:href="'https://toptalentapp.com:9091/resources/' + views.jobseekerResume"
                    target="_blank" download class="btn btn-resume act lnk">Resume
                    <font-awesome-icon :icon="['fas','download']" />
                  </a>
                </div>

                <!-- portofolio -->
                <div class="mb-2">
                  <button v-if="views.jobseekerPortfolio == '' || views.jobseekerPortfolio == null"
                    class="btn btn-no-resume act lnk" disabled>
                    No Portofolio
                    <font-awesome-icon :icon="['fas','link']" />
                  </button>

                  <a v-else v-bind:href="views.jobseekerPortfolio" target="_blank" class=" btn-resume act lnk">
                    Portofolio
                    <font-awesome-icon :icon="['fas','link']" />
                  </a>
                </div>

                <p class="confirmation">
                  Are you sure you want to accept {{ views.jobseekerName}}?
                </p>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                  v-on:click="accepted(views.applicationId)">Yes, accept</button>
                <button type="button" class="btn btn-outline-danger" v-on:click="rejected(views.applicationId)">No,
                  Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import SidebarComponent from '@/components/SidebarComponent.vue'
  import SidebarRight from '@/components/SidebarRight.vue'
  import SidebarRightEmpty from '@/components/SidebarRightEmpty.vue'
  import SidebarRightReview from '@/components/SidebarRightReview.vue'
  import RadialProgressBar from 'vue-radial-progress'
  import NavMobile from '../components/NavMobile.vue'
  // import { ref, onMounted } from 'vue';
  // import { useStore } from "vuex";

  // import PageLoader from '@/components/PageLoader.vue'


  export default {
    components: {
      SidebarComponent,
      SidebarRightEmpty,
      SidebarRightReview,
      SidebarRight,
      RadialProgressBar,
      NavMobile,
      // PageLoader
    },
    name: 'DashboardView',
    data() {
      return {
        // path: 'https://toptalentapp.com:9091',
        recruiters: [],
        accept: "",
        reject: "",
        list: [],
        total: "",
        edit: "",
        views: "",
        sidepop: '',
        dashboardEmpty: '',
        startColor: '#F39201',
        stopColor: '#F39201',
        innerStrokeColor: '#C4C4C4',
        percent: '',
        percentt: ''
      }
    },


    
    

    methods: {
      
      // setup(){
      //   const store = useStore();
      //   const email = ref('')
      // },
      async percenttCount() {
        const accept = JSON.parse(localStorage.getItem("countaccept-info"))
        const total = JSON.parse(localStorage.getItem("counttotal-info"))
        const result = Math.round((accept / total) * 100)
        this.percentt = result
        // if (localStorage.getItem("Authenticated") == true){
        //   location.reload()
        // }

        if(isNaN(this.percentt)) this.percentt = '0';


        //  console.warn(accept)

      },
      async percentCount() {
        const reject = JSON.parse(localStorage.getItem("countreject-info"))
        const total = JSON.parse(localStorage.getItem("counttotal-info"))
        const result = Math.round((reject / total) * 100)
        this.percent = result
        // console.warn(result)
        if(isNaN(this.percent)) this.percent = '0';

      },
      async totalnewAplicant() {
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        await axios.get(`https://toptalentapp.com:9091/api/v1/application/new-resume/${recruiterId}`)
          .then((data) => {
            this.edit = data.data
            console.log(data.data)
            if (data.data != 0) {
              this.$toast.info(`You have ${data.data.data} new apllicant`, {
                // optional options Object
                position: 'top-right',
                pauseOnHover: true,
                queue: 'true'
              })
            }
          })


      },
      async w3_open() {
        await axios.get(``)
      },
      async totalAplicant() {
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        await axios.get(`https://toptalentapp.com:9091/api/v1/application/applications/${recruiterId}`)
          .then((data) => {
            this.total = data.data
            localStorage.setItem("counttotal-info", JSON.stringify(data.data.data));
          })
      },
      async newResume() {
        let response = '';
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        try {
          response = await axios.get(`https://toptalentapp.com:9091/api/v1/application/dashboard/${recruiterId}`)
            .then((resp) => {
              this.list = resp.data.data
              console.log(resp.data.code)
              this.err = resp.data.code
              this.sidepop = false
            })
        } catch (err) {
          this.err = err.response.data.code
          console.log(err.response.data.code)
          this.sidepop = false
        }
        if (response.status == 200) {
          console.log(response)
        }
      },
      async recruiter() {
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        await axios.get(`https://toptalentapp.com:9091/api/v1/auth/recruiter/${recruiterId}`)
          .then((data) => {
            this.recruiters = data.data
            localStorage.setItem("user-profile", JSON.stringify(data.data.recruiterDesc))
          })
      },
      async countAcc() {
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        await axios.get(`https://toptalentapp.com:9091/api/v1/application/count-accepted/${recruiterId}`)
          .then((data) => {
            this.accept = data.data
            localStorage.setItem("countaccept-info", JSON.stringify(data.data.data));
          })
      },
      async countRejc() {
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        await axios.get(`https://toptalentapp.com:9091/api/v1/application/count-rejected/${recruiterId}`)
          .then((data) => {
            this.reject = data.data
            localStorage.setItem("countreject-info", JSON.stringify(data.data.data));
          })
      },
      async getView(applicationId) {
        await axios.get(`https://toptalentapp.com:9091/api/v1/application/applicant?applicationId=${applicationId}`)
          .then((data) => {
            this.views = data.data.data
            this.sidepop = true
            console.log(this.sidepop)
            // console.log(data)

          })
      },

      async accepted(id) {
        await axios.post(`https://toptalentapp.com:9091/api/v1/application/status/accepted/?applicationId=${id}`)
        // createToast(`Accepted`, { type: "success" });
        location.reload(true)
      },
      async rejected(id) {
        await axios.post(`https://toptalentapp.com:9091/api/v1/application/status/rejected/?applicationId=${id}`)
        //  createToast(`Reject`, { type: "danger" });
        location.reload(true)
      },
      test() {
        console.log('test')
        this.$toast.error('Profile saved.', {
          // optional options Object
          position: 'top-right',
          pauseOnHover: true
        })
      },
      
    },
    mounted() {
      this.recruiter(),
        this.countAcc(),
        this.countRejc(),
        this.newResume(),
        this.totalAplicant(),
        this.totalnewAplicant(),
        this.getView(),
        this.percentCount(),
        this.percenttCount()
        
        
        
      },
      
    
    
  };


</script>

<style scoped>
  .ellipse-title {
    font-size: 25px;
    margin-left: 6px;
    margin-top: 15px;
  }

  .sum-title {
    font-size: 22px;
  }

  .radial-custom {
    position: absolute;
    margin-left: 230px;
  }

  .main-head {
    font-weight: 700;
    font-size: 20px;
    text-align: right;
  }

  .table {
    /* border: 1px solid red; */
    border-radius: 20px;
    padding: 10%;
  }

  .table-wrapper {
    /* background-color: green; */
    margin-top: 20px;
    width: -webkit-fill-available;
    max-height: 40vh;
    overflow: auto;
    display: inline-block;
  }

  .table h3 {
    margin: 15px;
    width: 30px;

  }

  .table td {
    font-weight: 500;
    overflow: auto;
  }

  .btn-view {
    border-radius: 10px;
    border-style: none;
  }

  .btn-view:hover {
    background: blue;
    box-shadow: 6px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .logo-main {
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
    padding: 20px;
    border-radius: 29px;
    width: 430px;
    height: 273px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  }

  .card-text {
    padding: 10px;
    margin: 0;
    /* padding-left: 40px; */
    /* text-align: left; */
  }

  img {
    /* z-index: 1; */
    position: relative;
    /* display: block; */
    left: -70px;
    top: 20px;
    /* right: 1000px; */
    /* margin-left: 0; */
    /* margin-right: 40px; */
    width: 210px;
    height: 210px;


  }

  h5 {
    padding-top: 5px;
    text-align: right;
    /* margin-left: 160px; */
  }

  .welcome {
    font-size: 16px;
    font-weight: 700;
  }

  .decor {
    font-size: 17px;
    color: rgb(37, 37, 37);
  }

  #info {
    font-size: 16px;
  }

  .card-approve {
    /* background-image: url("../assets/approve.png"); */
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    border-radius: 20px;
    height: 133px;
    width: 373px;
    display: flex;
    padding: 10px;

  }

  .card-reject {
    padding: 20px;
    /* background-image: url("../assets/reject.png"); */
    background-color: #FBDA61;
    background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
    border-radius: 20px;
    height: 133px;
    width: 373px;
    margin-top: 9px;
    /* box-shadow: 6px 10px 15px -3px rgba(0,0,0,0.1); */
  }

  .card-title {
    padding: 10px;
    padding-left: 10px;
  }

  .data-progress {
    font-size: 32px;
  }

  span {
    font-size: 26px;
  }

  .card-monitor {
    margin-left: 10px;
    color: white;

  }

  .table {
    margin-left: 310px;
    width: 52.5%;
    background: rgb(249, 249, 249)
  }

  .position {
    background: #E2E3F6;
    padding: 5px;
    width: 100%;
    font-weight: bold;
    border-radius: 10px;
    color: #7D8CD1;
    font-size: 12px;
    text-align: center;
  }

  .position2 {
    background: #e3fe9f;
    padding: 5px;
    width: 100%;
    font-weight: bold;
    border-radius: 10px;
    color: #b4bf1b;
    font-size: 11px;
    text-align: center;
  }

  .title-table {
    position: fixed;
    margin-left: 20.3%;
    background: white;
    width: max-content;
    padding: 8px;
    margin-top: 15px;
    border-radius: 10px 50px 10px 0px;
    padding-right: 40px;
  }

  .jobseeker-name {
    color: #000;
    text-decoration: none;
  }

  .jobseeker-name:hover {
    text-decoration: underline;
  }

  .li-foto img {
    width: 100px;
    height: 100px;
    margin-left: 55%;
    margin-top: -20px;
    border-radius: 50%;
    border: 3px solid #f3f3f3;
  }

  .btn-resume {
    border: none;
    padding: 15px;
    border-radius: 20px;
    background: #F6F6FF;
    display: flex;
    transition: box-shadow 0.5s;
  }

  .btn-no-resume {
    border: none;
    padding: 15px;
    border-radius: 20px;
    background: #F6F6FF;
    display: flex;
    transition: box-shadow 0.5s;
    width: 100%;
  }

  .lnk {
    text-decoration: none;
    color: black;
  }

  .act {
    justify-content: space-between;
  }

  .li-title {
    padding: 0;
    font-weight: bold;
    text-align: center;
    color: #006EFF;
  }

  .text-center {
    text-align: center;
  }

  .jobseeker-informations td {
    font-size: 14px;
    height: 40px;
    margin-left: 5px;
    text-align: right;
  }

  .jobseeker-informations th {
    font-size: 14px;
    height: 40px;
    font-weight: 500;
  }

  .confirmation {
    margin-top: 2rem;
  }

  /* =================================================================================================
  BREAKPOINTS
  ================================================================================================= */
  /* for mobile */
  @media only screen and (max-width: 576px) {
    .container {
      margin-top: 60px;
      margin-left: 10%;
    }


    .table {
      margin-left: 20px;
      width: 52.5%;
      background: rgb(249, 249, 249)
    }

    .btn-view {
      margin-top: 10px;
      /* padding-top: 20px; */
      padding-right: 10px;
      padding-left: 10px;
    }

  }

  /* tablet */
  @media only screen and (max-width: 768px) {
    .container {
      margin-left: 10%;


      /* margin-top: 30px; */
      padding-top: 30px;
      width: auto;
      display: flex;
    }

    .greetings {
      width: 80vw;

    }

    .card-monitor {

      width: 80vw;


    }

    .card-reject {
      padding: 20px;
      /* background-image: url("../assets/reject.png"); */
      background: rgb(254, 0, 0);
      background: linear-gradient(138deg, rgba(254, 0, 0, 1) 0%, rgba(224, 128, 73, 1) 54%, rgba(237, 255, 0, 1) 100%);
      border-radius: 20px;
      height: 133px;
      width: 80vw;
      margin-top: 9px;
      /* box-shadow: 6px 10px 15px -3px rgba(0,0,0,0.1); */
    }
  }
</style>