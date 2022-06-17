<template>
<div>
    <sidebar-component />
    <div class="container-fluid">
        <h2>Applicant profile for {{aplicant.jobseekerName}}</h2>
    </div>
    <div class="container">
        
    <div class="content d-flex justify-content-center mt-5">
        <button class="btn btn-primary" onclick="history.back()">Go Back</button>
        <div class="p-2 bd-highlight flex-grow-1">
            <h1>{{aplicant.jobseekerName}}</h1>
            <span>{{aplicant.jobseekerAddress}}</span>

        </div>
        <div class="p-2 bd-highlight left">
            <img class="img-thumbnail" :src="'https://toptalentapp.com:9091/resources/'+aplicant.jobseekerImage" alt="">
        </div>

    </div>
    <div class="content">
        <div class="p-2 bd-higlight">
            <a href=""><i class="bi bi-instagram"></i></a>
            <p class="mt-4">{{aplicant.jobseekerAbout}}</p>
            <p class="title-content">Contact Info</p>
            <p class="text">{{aplicant.jobseekerEmail}} ● {{aplicant.jobseekerPhone}}</p>
            <p class="title-content">Profession info</p>
            <p class="text">{{aplicant.jobseekerProfession}}</p>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                       
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Skill
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>{{aplicant.jobseekerSkill}}</strong>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Portofolio
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>{{aplicant.jobseekerEducation}}</strong>
                        </div>
                        <div class="accordion-body">
                        <button class="btn btn-primary">Download Resume</button>
                        </div>
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
    export default {
        name: "AplicantDetail",
        components: {
            SidebarComponent: sidebarcomponent
        },
        data() {
            return {
                aplicant: []
            }
        },
        methods: {

            async aplicantDetail() {
                // await axios.get(`https://toptalentapp.com:9091/api/v1/application/applicant/` + this.$route.params.id)
                await axios.get(`https://toptalentapp.com:9091/api/v1/application/applicant?applicationId=` + this.$route.params.id)
                    .then((data) => {
                        this.aplicant = data.data.data
                        console.log(data)

                    })
            }
        },
        mounted() {
            this.aplicantDetail()
        }
    }
</script>

<style scoped>
    .container-fluid {
        margin-left: 12%;
        background: rgb(11, 0, 227);
        padding: 20px;
        color: white;
    }

    h2 {
        padding-left: 70px;
    }

    .content {
        margin-left: 200px;
    }

    .left {
        margin-right: 300px;
    }

    h1 {
        font-weight: bolder;
    }

    i {

        padding: 5px;
        color: black;
        border-radius: 50%;
        border: solid 1px black;
    }

    i:hover {
        background: rgb(104, 104, 255);
        color: white;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    }

    .title-content {
        font-weight: bolder;
    }

    .accordion-item {
        width: 80%;
    }
</style>