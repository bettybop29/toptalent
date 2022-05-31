<template>
    <div class="reset">
        <!-- navbar -->
    <div class="container-fluid">
        
        <nav class="row navbar navbar-expand-lg navbar-light bg-white">
            <div class="container">
            <ul class="navbar-nav ms-auto me-auto d-none d-lg-block ">
                <li class="nav-item d-flex justify-content-center">
                    <a class="navbar-brand " href="/" >
                        <img class="logo" src="../assets/logo/logo-main.png" width="30" alt="logo" />
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
        <section class="section-verify d-flex align-items-center">
            <div class="col text-center">
                <img class="forgot" src="frontend/images/reset-password.jpg" alt="">
                <h1>Please Check Your Email to Reset Your Password</h1>
            </div>
        </section>
    </main>
    </div>
</template>

<script>
export default {
    name: "VerificationPassword",
}
</script>

<style scoped>
*{
    background-color: #fff;
}

.text-logo{
    /* margin-left: -400px; */
    margin-top: 10px;
}


</style>