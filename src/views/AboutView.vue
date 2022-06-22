<template>
  <div class="main">

    <sidebar-component></sidebar-component>
    <nav-mobile></nav-mobile>

    <div class="container" >
      <p class="head-title">Company Profile</p>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="row mb-1">
                <div class="col-md-6">
                  <h5 class="card-title">{{profile.recruiterCompany}}</h5>
                </div>
                <div class="col-md-6">
                  <img v-if="profile.recruiterImage != null" class="img-thumbnail position-absolute top-0 end-0 m-3"
                    :src="'https://toptalentapp.com:9091/resources/'+ profile.recruiterImage" alt=""
                    style="width: 125px; height:120px;">
                  <img v-else class="img-thumbnail position-absolute top-0 end-0 m-3"
                    src="https://toptalentapp.com:9091/resources/r5jr7e3qf8f5uhr.png" alt=""
                    style="width: 125px; height:120px;">

                </div>
                </div>

                <!-- Button trigger modal -->
                <button type="button" class="btn new position-absolute top-0 end-0 m-3" data-bs-toggle="modal"
                  data-bs-target="#exampleModal">
                  Edit/upload
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Image Profile</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body ">
                        <form class="form-upload" action="" @submit.prevent="onUpload" enctype="multipart/formdata">
                          <label class="custom-file-upload w-50">Select file
                            <!-- <input type="file" ref="file" @change="onFileSelected" /> -->
                            <input type="file" ref="file" @change="onFileSelected"
                              accept="image/png, image/gif, image/jpeg" />
                            <font-awesome-icon icon="fa-solid fa-circle-check" v-if="this.check == true" />
                          </label>
                          <button type="submit"
                            class="btn btn-primary valid custom-file-upload animate__animated animate__fadeIn"
                            v-if="this.check == true && this.searchDisabled == false">
                            Save Changes
                          </button>
                          <button v-if="searchDisabled == true" class="btn valid custom-file-upload" type="button" disabled>
                            Loading...
                          </button>
                        </form>
                      </div>
                      <div class="modal-footer">

                        <p class="text-muted">recomended size 120px x 120px</p>

                      </div>
                    </div>
                  </div>
                </div>

              

              <span class="mb-4 badge bg-info text-dark category">{{profile.recruiterIndustry}}</span>
              <p class="card-span">Staff: </p>
              <p class="card-text">
                <font-awesome-icon icon="fa-solid fa-user" class="icn" /> {{profile.recruiterStaff}}</p>
              <p class="card-span">Description: </p>
              <p class="card-text">{{profile.recruiterDesc}}</p>
              <p class="card-span">Address: </p>
              <p class="card-text">{{profile.recruiterAddress}}</p>
              <p class="card-span">Culture: </p>
              <p class="card-text" v-html="profile.recruiterCulture"></p>
              <p class="card-span">Benefit: </p>
              <p class="card-text" v-html="profile.recruiterBenefit"></p>

              <!-- <router-link class="btn btn-success" :to="{name: 'updateprofile', params:{id:profile.recruiterId}}">Update Profile</router-link> -->
              <!-- <router-link class="btn btn-success" :to="'/updateprofile/'+ profile.recruiterId">Update Profile</router-link> -->
              <router-link class="btn btn-success" :to="{name: 'updateprofile', params:{id:profile.recruiterId}}">Update
                Profile</router-link>
              <!-- <router-link class="btn btn-success" to="/updateprofile">test</router-link> -->
            </div>
          </div>

        </div>
        <div class="col-md-6">
          <div class="card m-1 ctnt">
            <div class="card-body section-contact panel-2">
              <h5 class="card-title">Contact</h5>
              <hr>
              <div>
                <a class="card-text" v-if="profile.recruiterEmail == ''"></a>
                <a class="card-text" v-else :href="'https://mail.google.com/mail/' + profile.recruiterEmail" target="_blank">
                  <font-awesome-icon icon="fa-solid fa-envelope" class="icn" /> {{profile.recruiterEmail}}</a>
              </div>
              <div>
                <a class="card-text" v-if="profile.recruiterFb == ''|| profile.recruiterFb == null"></a>
                <a class="card-text" v-else>
                  <font-awesome-icon icon="fa-brands fa-facebook" class="icn" /> {{profile.recruiterFb}}</a>
              </div>
              <div>
                <a class="card-text" v-if="profile.recruiterIg == '' || profile.recruiterIg == null"></a>
                <a class="card-text" v-else>
                  <font-awesome-icon icon="fa-brands fa-instagram" class="icn" /> {{profile.recruiterIg}}</a>
              </div>
              <div>
                <a class="card-text" v-if="profile.recruiterLinkedin == '' || profile.recruiterLinkedin == null"></a>
                <a class="card-text" v-else>
                  <font-awesome-icon icon="fa-brands fa-linkedin" class="icn" /> {{profile.recruiterLinkedin}}</a>
              </div>
              <div>
                <a class="card-text" v-if="profile.recruiterPhone == '' || profile.recruiterPhone == null"></a>
                <a class="card-text" v-else :href="'tel:'+ profile.recruiterPhone">
                  <font-awesome-icon icon="fa-solid fa-phone" class="icn" /> +{{profile.recruiterPhone}}</a>
                  
              </div>
              <div>
                <a class="card-text" v-if="profile.recruiterWebsite == ''|| profile.recruiterWebsite == null"></a>
                <a class="card-text" v-else :href="profile.recruiterWebsite" target="_blank">
                  <font-awesome-icon icon="fa-solid fa-globe" class="icn" /> {{profile.recruiterWebsite}}</a>
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
  import sidebarcomponent from '../components/SidebarComponent.vue'
  import NavMobile from '../components/NavMobile.vue'
  

  export default {
    props: ['id'],
    components: {
      SidebarComponent: sidebarcomponent,
      NavMobile: NavMobile,
    },
    data() {

      return {
        profile: [],
        selectedFile: null,
        check: false,
        searchDisabled: false
      }
    },
    methods: {
      onFileSelected(Event) {
        this.selectedFile = Event.target.files[0]

        console.warn(this.selectedFile)
        this.check = true;
      },
      onUpload() {
        this.searchDisabled = true;

        const fd = new FormData();
        fd.append('file', this.selectedFile, this.selectedFile.name)
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        fd.append('recruiterId', recruiterId)
        axios.post(`https://toptalentapp.com:9091/api/v1/file/recruiter/photo`, fd)
          .then(res => {
            console.log(res)
            location.reload(true)
          })

        //  const fd = new FormData();
        //  fd.append('image', this.selectedFile,  this.selectedFile.name)
        //  await axios.post(`https://toptalentapp.com:9091/api/v1/file/recruiter/photo`,fd)
        //  .then(res =>{
        //    console.log(res)
        //  })
      },
      created() {
        // Simple POST request with a JSON body using axios
        const article = {
          title: "Vue POST Request Example"
        };
        axios.post("https://reqres.in/api/articles", article)
          .then(response => this.articleId = response.data.id);
      },
      fetchData() {
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        axios.get(`https://toptalentapp.com:9091/api/v1/auth/recruiter/${recruiterId}`)

          .then((profile) => {
            this.profile = profile.data

          })
      },
      // async updateProfile(){
      //   await axios.
      // }
    },
    mounted() {
      this.fetchData()
    }


  };
</script>

<style scoped>
  * {
    font-weight: 500;
  }

  .icn {
    color: #006EFF;
  }

  span {
    width: auto;
  }

  .btn-success {
    width: 100%;
  }

  .panel-2 {
    display: grid;
  }

  .container {
    margin-left: 17%;
  }

  .main {
    background: #F3F3F3;
    height: 110vh;
  }

  .head-title {
    position: relative;
    font-size: 30px;
    padding-left: 10px;
  }

  .card {
    border-radius: 20px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    padding: 20px;
  }

  .card-title {
    font-weight: bold;
    font-size: 36px;
  }

  .card-span {
    padding: 0;
    margin: 0;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    cursor: pointer;

  }

  i {
    margin-right: 10px;
  }

  .btn {

    color: #fff;
    /* margin-top: 30px; */
  }

  .new {
    width: auto;
    padding-top: 7%;
    padding-bottom: 8%;
    color: transparent;
  }

  .new:hover {
    padding: auto;
    width: 125px;
    height: 121px;
    color: white;
    background: rgba(0, 0, 0, 0.285);
  }

  .category {
    height: 25px;
    font-size: 14px;
  }

  .section-contact .card-text {
    margin-bottom: 10px;
  }

  i {
    color: #4296C7;
  }

  .form-upload {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
  }
  .valid{
    background: rgb(15, 163, 15);
  }

  /* .custom-file-upload{
   
 } */

  /* breakpoints */
  /* for mobile */
  @media only screen and (max-width: 576px) {
    .head-title {
      position: static;
      margin-top: 50px;
    }

    .container {
      margin-left: 0;
    }
   

  }
</style>