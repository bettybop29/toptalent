<template>
<div class="container d-flex justify-content-center">
    
        <div class="card " style="width: 30rem;">
            <img src="https://toptalentapp.com:9091/resources/0be0zx99d5y9ewd.jpeg" class="card-img-top" alt="..." >
            <div class="card-body">
                <h5 class="card-title">Check Your Email For Activation</h5>
                <p class="card-text">Email has been sent to {{this.email}}</p>
            </div>
        </div>
    
    
  </div>
</template>

<script>
export default {
    name:"ActivationView",
    data(){
        return{
            email:""
        }
    },
    mounted(){
        this.email = JSON.parse(localStorage.getItem("sign-info")).data.recruiterEmail   
    }
}
</script>

<style scoped>
    .card{
        /* position: fixed; */
         margin-top: 20vh;
        /* margin-left: 360px; */
        border-radius: 20px;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        /* text-align: center; */
    }
</style>