<template>
    <div>
        <sidebar-component></sidebar-component>
        <div class="page">
            <!-- section profile atas -->
            <section class="section-profile">
                <div class="row">
                    <div class="col-md-2">
                        <img src="@/assets/photo_profile.png" alt="profile picture" height="200">
                    </div>
                    <div class="col-md-6">
                        <h1>Anggi Anindita</h1>
                        <h2 class="mt-3">Product Designer</h2>
                        <div class="detail-profile">
                            <div class="row">
                                <div class="col-md-6 left-items">
                                    <p><font-awesome-icon icon="fa-solid fa-location-dot" class="detail-profile-icon" /> San Fransisco, USA</p>
                                    <p><font-awesome-icon icon="fa-solid fa-phone" class="detail-profile-icon"/> +62 87877451236</p>
                                </div>
                                <div class="col-md-6 right-items">
                                    <p><font-awesome-icon icon="fa-regular fa-circle" class="detail-profile-icon"/> Designer</p>
                                    <p><font-awesome-icon icon="fa-regular fa-envelope" class="detail-profile-icon"/> anggikrist@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <button class="btn btn-primary btn-resume"><font-awesome-icon icon="fa-solid fa-cloud-arrow-down" /> Resume</button>
                    </div>
                </div>
            </section>
            <section class="section-content">
                <div class="row">
                    <div class="col-md-5 content-left">
                        <h3 class="mb-4">Background</h3>
                        <p><font-awesome-icon icon="fa-regular fa-graduation-cap" /> Bachelor of Engineering</p>
                        <p>14-04-1997</p>
                        <p>github.com</p>
                        <p>instagram.com/janedoe</p>
                        <p>linked.in/janedoe</p>
                    </div>
                    <div class="col-md-7">
                        <h3>Skills</h3>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import sidebarcomponent from '../components/SidebarComponent.vue'

export default{
    name: "ApplicantDetailView",
    components: {
        SidebarComponent: sidebarcomponent,
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

/* breakpoints */
/* for mobile */
@media only screen and (max-width: 576px){
    .right-items{
    margin-left: 0;
}
    
}
</style>
