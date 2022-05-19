<template>

    
    <div class="container m-5">
        <p class="back">
            <router-link class="back-link" to="/login">
                <i class="bi bi-arrow-left-circle"></i> Back
            </router-link>
        </p>
        <div class="row align-items-start">
            <div class="content1 col">
                <h1>Reset Password</h1>
                <span class="label text-muted">The verification email will be sent into mailbox<br>Please check it</span>
                 <form action="" @submit.prevent="resetPass">
                <div class="form-floating mb-3">
                   
                    <input type="email" 
                    class="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com"
                    v-model="recruiterEmail"
                    required>
                    <label for="floatingInput">Email address</label>
                         
                </div>
                <!-- <div v-if="this.searchDisabled == true">
                    <beat-loader class="pulse" :loading="loading" :color="color" :size="size"></beat-loader>
                </div> -->
               
                <!-- <input type="submit" class="btn btn-primary" :disabled="searchDisabled" value="reset"> -->
                <button type="submit" class="btn btn-primary" :disabled="searchDisabled">Reset</button>
                </form>
                
            </div>
            
            <div class="content2 col">
                
                <img src="http://54.255.4.75:9091/resources/kurtb4zq5unn0md.gif" alt="">
            </div>
        </div>
    </div>
   
</template>

<script>
// import axios from 'axios'
export default {
    name:"ResetPassword",
    
    data(){
        return{
            recruiterEmail:"",
            searchDisabled:false  
        }
    },
    methods:{
        // async resetPass(){
        //     try{
        //         this.searchDisabled = true;
        //         await axios.post(`http://54.255.4.75:9091/api/v1/auth/reset?recruiterEmail=${this.recruiterEmail}`)
        //         createToast("E-mail has been sent", {type:"success"});
        //         this.$router.push("/VerificationPassword")   
                            
        //     }catch{
        //         this.searchDisabled = false;
        //         location.reload(true)
        //         createToast("Failed", {type:"danger"});
        //     }
        // }
    }
}
</script>

<style scoped>
    
    .pulse{
        text-align: center;
        margin: 2px;
        transition: 1s;
    }
    .btn{
        width: 100%;
    }
    .back{
        position: fixed;
        margin: 20px;  
    }
    .back-link{
        text-decoration: none;
        color: black;
        padding: 10px;
        transition: 1s;
    }
    .back-link:hover{
        background: white;
        padding: 10px;
        border-radius: 20px;
        transition: 1s;
    }
    .container{
        position: fixed;
        padding-top: 30px;
    }
    .content1{
        background: white;
        padding: 20px;
        border-radius: 20px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .content2{
        text-align: right;
    }
   .form-floating{
       margin-top: 50px;
   }
   img{
       width: 80%;
   }
    
    
</style>