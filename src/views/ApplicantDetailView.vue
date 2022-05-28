<template>
    <div>
        <sidebar-component></sidebar-component>
        <div class="page">
            <!-- section profile atas -->
            <section class="section-profile">
                <div class="row">
                    <div class="col-md-2">
                        <img v-if="applicant.jobseekerImage != null" :src="'http://54.255.4.75:9091/resources/'+ applicant.jobseekerImage" alt="profile picture" height="200">
                        <img v-else src="http://54.255.4.75:9091/resources/r5jr7e3qf8f5uhr.png" alt="profile picture" height="200" width="200">
                    </div>
                    <div class="col-md-7 middle-item">
                        <h1>{{applicant.jobseekerName}}</h1>
                        <h2 class="mt-3">{{applicant.jobseekerProfession}}</h2>
                        <div class="detail-profile">
                            <div class="row">
                                <div class="col-md-6 left-items ">
                                    <p><font-awesome-icon icon="fa-solid fa-location-dot" class="detail-profile-icon" /> {{applicant.jobseekerAddress}}</p>
                                    <p v-if="applicant.jobseekerPhone != null"><font-awesome-icon icon="fa-solid fa-phone" class="detail-profile-icon"/> {{applicant.jobseekerPhone}}</p>
                                    <p v-if="applicant.jobseekerPhone == null"><font-awesome-icon icon="fa-solid fa-phone" class="detail-profile-icon"/> -</p>
                                </div>
                                <div class="col-md-5 right-items">
                                    <p><font-awesome-icon icon="fa-regular fa-circle" class="detail-profile-icon"/> {{applicant.jobseekerProfession}}</p>
                                    <p><font-awesome-icon icon="fa-regular fa-envelope" class="detail-profile-icon"/> {{applicant.jobseekerEmail}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-primary btn-resume"><font-awesome-icon icon="fa-solid fa-cloud-arrow-down" /> Resume</button>
                    </div>
                </div>
            </section>
            <section class="section-content">
                <div class="row">
                    <div class="col-md-5 content-left">
                        <h3 class="mb-4">Background</h3>
                        <p><font-awesome-icon icon="fa-solid fa-graduation-cap " class="icon-background" /> Bachelor of Engineering</p>
                        <p><font-awesome-icon icon="fa-solid fa-cake-candles" class="icon-background"/> {{applicant.jobseekerDateOfBirth}}</p>
                        <p><font-awesome-icon icon="fa-solid fa-file" class="icon-background"/> github.com</p>
                        <p><font-awesome-icon icon="fa-brands fa-instagram" class="icon-background"/> instagram.com/janedoe</p>
                        <p><font-awesome-icon icon="fa-brands fa-linkedin" class="icon-background"/> linked.in/janedoe</p>
                    </div>
                    <div class="col-md-7">
                        <h3>Skills</h3>
                        <div class="box-skills d-flex flex-wrap">
                            <span class="badge text-dark">Markerting</span>
                            <span class="badge text-dark">Digital Marketing</span>
                            <span class="badge text-dark">Markerting Communications</span>
                            <span class="badge text-dark">Event Management</span>
                            <span class="badge text-dark">Event Management</span>
                            <span class="badge text-dark">Event Management</span>
                            <span class="badge text-dark">Event Management</span>
                            <span class="badge text-dark">Event Management</span>
                            <span class="badge text-dark">Event Management</span>
                            <span class="badge text-dark">Event Management</span>
                            <span class="badge text-dark">Event Management</span>
                        </div>
                    </div>
                </div>

                <section class="section-about">
                <h3>About</h3>
                <div class="box-about">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dictum felis. Nulla 
                        dolor dolor, pellentesque non sagittis quis, scelerisque aliquet massa. Nunc a arcu neque. 
                        Aliquam id gravida neque. 

                        Etiam faucibus erat arcu, ac ornare mauris vehicula at. Nunc eros 
                        mauris, volutpat suscipit lectus a, iaculis rutrum ex. Donec sed dui ut orci pellentesque iaculis 
                        vitae ac purus. Suspendisse potenti. 
                    </p>
                </div>
            </section>
            </section>
            
        </div>
    </div>
</template>

<script>
import sidebarcomponent from '../components/SidebarComponent.vue'
import axios from 'axios'

export default{
    name: "ApplicantDetailView",
    components: {
        SidebarComponent: sidebarcomponent,
    },
    data(){
        return {
            applicant: ""
        }
    },
    // methods: {
    //     // get data form api
    //      async fetchData(){
    //         //  await axios.get(`http://54.255.4.75:9091/api/v1/application/applicant?applicationId=`+this.$route.params.id)
    //          await axios.get(`http://54.255.4.75:9091/api/v1/application/applicant?applicationId=141`)
    //          .then((data) => {
    //              this.applicant = data.data
    //              console.log(data.data)
    //          })
             
    //      }
    // },
    mounted(){
        // this.fetchData();
         
            //  await axios.get(`http://54.255.4.75:9091/api/v1/application/applicant?applicationId=`+this.$route.params.id)
              axios.get(`http://54.255.4.75:9091/api/v1/application/applicant?applicationId=`+this.$route.params.id)
             .then((data) => {
                 this.applicant = data.data.data
                 console.log(data.data.data)
             })
             
         
    }
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}

.page{
    margin-left: 20%;
}

.section-profile{
    margin-top: 50px;
}

.section-profile .middle-item{
    padding-left: 20px;
}

.section-profile h1{
    font-size: 28px;
}

.section-profile h2{
    font-size: 16px;
}

.section-profile .detail-profile{
    margin-top: 70px;
}

.detail-profile p{
    margin-bottom: 10px;
}

.detail-profile-icon{
    color: #006EFF;
}

.icon-background{
    color: #006EFF;
}

.right-items{
    margin-left: -80px;
}

.btn-resume{
    padding: 10px;
}

.section-content{
    background-color: #F8F9FD;
    margin-top: 26px;
    padding-left: 70px;
    padding-top: 30px;
    margin-left: -5%;
}

.content-left p{
    margin-bottom: 20px;
}

h3{
    font-size: 20px;
}

.box-skills{
    max-width: 410px;
    max-height: 225px;
    overflow-y: scroll;
}

.box-skills span{
    margin: 5px;
    padding: 10px;
    font-size: 14px;
    background-color: #D1E7F3;
}

.section-about{
    max-width: 930px;
    margin-top: 70px;
    margin-bottom: 80px;
    
}

.section-about .box-about{
    margin-top: 30px;
}

.section-about h3{
    font-weight: 600;
}

.box-about p{
    font-size: 20px;
}

/*css3 design scrollbar*/
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: #F8F9FA;

}

::-webkit-scrollbar-thumb {
    background: #006EFF;
}

/* breakpoints */
/* for mobile */
@media only screen and (max-width: 576px){
    .right-items{
    margin-left: 0;
}
    
}
</style>
