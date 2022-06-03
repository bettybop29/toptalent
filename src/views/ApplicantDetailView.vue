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
                        <div>
                        <h2 class="mt-3" v-if="applicant.jobseekerProfession != null">{{applicant.jobseekerProfession}}</h2>
                        <h2 v-else></h2>
                        </div>

                        <div class="mt-2">
                            <p v-if="applicant.workEndYear == 0 || applicant.workStartYear == 0 || applicant.jobsekerCompany == null"></p>
                            
                            <p v-else class="jobseeker-company">{{applicant.jobsekerCompany}} ({{applicant.workStartYear}} - {{applicant.workEndYear}})</p>
                        </div>
                        <div class="detail-profile">
                            <div class="row">
                                <div class="col-md-6 left-items ">
                                    <div>
                                        <p v-if="applicant.jobseekerAddress == null || applicant.jobseekerAddress == ''"><font-awesome-icon icon="fa-solid fa-location-dot" class="detail-profile-icon" /> -</p>
                                        <p v-else><font-awesome-icon icon="fa-solid fa-location-dot" class="detail-profile-icon" /> {{applicant.jobseekerAddress}}</p>
                                    </div>

                                    <p v-if="applicant.jobseekerPhone != null"><font-awesome-icon icon="fa-solid fa-phone" class="detail-profile-icon"/> {{applicant.jobseekerPhone}}</p>
                                    <p v-if="applicant.jobseekerPhone == null"><font-awesome-icon icon="fa-solid fa-phone" class="detail-profile-icon"/> -</p>
                                </div>
                                <div class="col-md-5 right-items">
                                    <div>
                                        <p v-if="applicant.jobseekerProfession == null || applicant.jobseekerProfession == ''"><font-awesome-icon icon="fa-regular fa-circle" class="detail-profile-icon"/> -</p>
                                        <p v-else><font-awesome-icon icon="fa-regular fa-circle" class="detail-profile-icon"/> {{applicant.jobseekerProfession}}</p>
                                    </div>

                                    <div>
                                        <p v-if="applicant.jobseekerEmail == null || applicant.jobseekerEmail == ''"><font-awesome-icon icon="fa-regular fa-envelope" class="detail-profile-icon"/> -</p>
                                        <p v-else><font-awesome-icon icon="fa-regular fa-envelope" class="detail-profile-icon"/> {{applicant.jobseekerEmail}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <a v-bind:href="'http://54.255.4.75:9091/resources/' + applicant.jobseekerResume"
                        type="application/octet-stream" 
                        download=""
                        class="btn btn-primary btn-resume">
                        <font-awesome-icon icon="fa-solid fa-cloud-arrow-down" /> 
                        Resume
                        </a>
                    </div>
                </div>
            </section>
            <section class="section-content">
                <div class="row">
                    <div class="col-md-5 content-left">
                        <h3 class="mb-4">Background</h3>
                        <div>
                        <p v-if="applicant.jobseekerEducation != null"><font-awesome-icon icon="fa-solid fa-graduation-cap " class="icon-background" /> {{applicant.jobseekerEducation}}</p>
                        <p v-else></p>
                        </div>

                        <div>
                        <p v-if="applicant.jobseekerDateOfBirth != null"><font-awesome-icon icon="fa-solid fa-cake-candles" class="icon-background"/> {{applicant.jobseekerDateOfBirth}}</p>
                        <p v-else></p>
                        </div>
                        
                        <div>
                            <a href="#" v-if="applicant.jobseekerPortfolio == null || applicant.jobseekerPortfolio == '' "></a>
                            <a v-bind:href="applicant.jobseekerPortfolio" target="_blank" v-else><font-awesome-icon icon="fa-solid fa-file" class="icon-background"/> Portofolio</a>
                        </div>

                        <div>
                            <a href="#" v-if="applicant.jobseekerMedsos == null || applicant.jobseekerMedsos == '' "></a>
                            <a v-bind:href="applicant.jobseekerMedsos" target="_blank" v-else><font-awesome-icon icon="fa-solid fa-user-group" class="icon-background"/> LinkedIn</a>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <h3>Skills</h3>
                        <div class="box-skills d-flex flex-wrap" >
                            <span class="badge text-dark" :key="item.id" v-for="item in splitStringToArray(applicant.jobseekerSkill)">{{item}}</span>
                            <!-- <span class="badge text-dark" v-for="item in (applicant.skills)" :key="item.id">{{item}}</span> -->
                        </div>
                    </div>
                </div>
                <section class="section-about" >
                    <div>
                        <h3 v-if="applicant.jobseekerAbout == '' || applicant.jobseekerAbout == null " ></h3>
                        <h3 v-else>About</h3>
                
                </div>
                <div class="box-about">
                    <p >
                        {{applicant.jobseekerAbout}}
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
            applicant: "",
            skill: [],
            item:''
        }
    },
    methods: {
        splitStringToArray(sentences){
            const words = sentences.split(';');
            console.log(words);
            return words;
            
        },
        // get data form api
         async fetchData(){
            try{
                await axios.get(`http://54.255.4.75:9091/api/v1/jobseeker/user/ ` + this.$route.params.id)
                // createToast("Job Updated", { type: "success" });
                .then((data) => {
                    this.applicant = data.data.data
                    console.log(data.data.data)
                })
                } catch {
                console.log(Error);
                }
             
         },
         async getStringSkill(){
            try{
                await axios.get(`http://54.255.4.75:9091/api/v1/jobseeker/user/ ` + this.$route.params.id)
                .then((data) => {
                    this.skill = data.data.data.skills
                    console.log(this.skill);
                    console.log('skill')
                })
                } catch {
                console.log(Error);
                }
             
         },     
    },
    mounted(){
       
        this.fetchData();
        this.getStringSkill();   
    },
    
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
.section-profile h3{
    font-size: 16px;
    margin-top: 10px;
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
.content-left a{
    display: block;
    margin-bottom: 20px;
    text-decoration: none;
    color: #000;
}
.content-left a:hover{
    color: #006EFF;
    text-decoration: underline;
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

.jobseeker-company{
    font-size: 12px !important;
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