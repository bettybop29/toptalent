<template>
    <div class="container m-5">
        <!-- <div class="back">
            <router-link class="back-link">
                <i class="bi bi-arrow-left-circle"></i> Back
            </router-link>
        </div> -->
        <div class="row align-items-start">
            <div class="col-md-6 content1">
                <div class="card">
                <h1>Reset Password</h1>
                <span class="label text-muted">
                    The verification email will be sent into mailbox<br>Please check it
                </span>
                <form action="" @submit.prevent="resetPass">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control"
                         id="floatingInput" placeholder="name@example.com"
                          v-model="recruiterEmail" required>
                        <label for="floatingInput">Email Address</label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" :disabled="searchDisabled">Reset</button>
                </form>
                </div>
            </div>
            <div class="col-md-6 content2">
                <img src="http://54.255.4.75:9091/resources/kurtb4zq5unn0md.gif" alt="">
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "ResetPass",
    data(){
        return{
            recruiterEmail:"",
            searchDisabled:false
        }
    },
    methods:{
        async resetPass(){
            try {
                this.searchDisabled = true;
                await axios.post(`http://54.255.4.75:9091/api/v1/auth/reset?recruiterEmail=${this.recruiterEmail}`)
                // window.alert("E-mail has been sent");
                this.$toast.success('E-mail has been sent',{
                    position: 'top-right',
                    pauseOnHover: true
                });
                this.$router.push("VerificationPassword")
            } catch  {
                this.searchDisabled = false;
                location.reload(true)
                // window.alert("failed")
                // this.$toast.error('failed', {
                //     position: 'top-right',
                //     pauseOnHover: true,
                //     duration: 10000
                // });

                this.$toast.success('Sign Up Successful', {
                    // optional options Object
                    position: 'top-right',
                    pauseOnHover: true
                })
            }
        }
    },
    beforeCreate(){
        document.querySelector('body').setAttribute('style', 'background:rgb(242,241,242)');
    },
    // beforeDestroy(){
    //     document.querySelector('body').setAttribute('style', '')
    // }
}
</script>

<style scoped>
*{
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
}

h1{
    font-family: 'Poppins', sans-serif;
    font-size: 36px;
}
    
.card{
    /* background: #fff; */
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

/* breakpoints */
/* mobile */
@media only screen and (max-width: 576px){
    .content2{
        margin-top: 30px;
    }

   
    
}
</style>