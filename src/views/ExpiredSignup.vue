<template>
    <div class="reset">
        <!-- navbar -->
    <div class="container">
        
        <nav class="row navbar navbar-expand-lg navbar-light bg-white">
            <div class="container">
            <ul class="navbar-nav ms-auto me-auto d-none d-lg-block ">
                <li class="nav-item d-flex justify-content-center">
                    <a class="navbar-brand " href="#" >
                        <img class="logo" src="../assets/logo/logo-main.png" width="30" alt="logo" />
                    </a>
                    <span class="text-muted text-logo">
                        | &nbsp; Find The Best Fit
                    </span>
                </li>     
                                  
            </ul>
                
            </div>
        </nav>
        
        <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="../assets/logo/logo-sm.png" alt="" width="30" height="30">
                </a>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                </div>
            </div>
            </nav> -->
        
    </div>

    
    <main>
        <section class="section-verify d-flex align-items-center">
            <div class="col text-center">
                <img class="forgot" src="http://54.255.4.75:9091/resources/r8jfpc0fx95da5w.png" alt="" style="width:500px;">
                <h1>Your link is expired</h1>
                <p>If you need help, please contact our support</p>
                
            </div>
        </section>
    </main>
    </div>
</template>

<script>
export default {
    name: "ExpiredSignup",
}
</script>

<style scoped>
*{
    background-color: #fff;
}

.text-logo{
    margin-left: -400px;
    margin-top: 10px;
}

</style>