<template>
    <div class="reset">
        <!-- navbar -->
    <div class="container-fluid">
        
        <nav class="row navbar navbar-expand-lg navbar-light bg-white">
            <div class="container">
            <ul class="navbar-nav ms-auto me-auto d-none d-lg-block ">
                <li class="nav-item d-flex justify-content-center">
                    <a class="navbar-brand " href="/" >
                        <img class="logo" src="../assets/logo/logo-main.png" alt="logo" />
                    </a>
                    <span class="text-muted text-logo">
                        | &nbsp; Find The Best Fit
                    </span>
                </li>     
                                  
            </ul>
                
            </div>
        </nav>
        
    </div>

    
    <main>
        <section class="section-change-pass-mobile d-flex align-items-center">
            <div class="col text-center">
                <img class="forgot" src="frontend/images/mail.jpg" alt="">
                <h1>You have successfully changed your password. <br>
                    Open Toptalent app, then login with {{email}}
                </h1>
            </div>
        </section>
    </main>
    </div>
</template>

<script>
export default {
    data(){
        return{
            email : ""
        }
    },
    name: "ChangePassMobileSuccess",
    mounted(){
        const email = JSON.parse(localStorage.getItem("mobile-email"))
        this.email = email
    }
}
</script>

<style scoped>
*{
    background-color: #fff;
}

h1 {
        font-weight: 600;
        font-size: 26px;
        color: #1f1d52;
    }

.text-logo{
    /* margin-left: -400px; */
    margin-top: 10px;
}

.forgot{
    margin-top: 10%;
    width: 500px ;
    height: 300px ;
}

/* ======================================================================
BREAKPOINT
====================================================================== */
/* mobile s and m */
@media only screen and (max-width: 576px){
    .forgot{
                width: 80vw;
                height: 30vh;
                margin-top: 40%;
            }

            h1 {
        font-weight: 600;
        font-size: 16px;
    }
    
}




</style>