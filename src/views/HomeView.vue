<template>
<div class="full">
<div class="container-fluid-sm-lg-md">
  <NavBasic></NavBasic>
      <div class="section-2 my-6">
        <div class="main" style="background-image: linear-gradient(#ffffff 50%,#006EFF); padding-top: 50px;">       
          <div class="container-fluid pt-5 mt-5">
            <div class="row g-0">
              <div class="col-md-6 p-5">
                <h1 class="display-2 pt-3 animate__animated animate__backInLeft">Top Company<br>need a Toptalent.</h1>
                 <img class="line animate__animated animate__rollIn animate__delay-1s" src="../assets/line-main.png" alt="">
                <p class="main-text animate__animated animate__fadeInLeft">The most important asset to a company is not the<br>
                  product they sell or processes they've<br>implemented, it's their people!</p>
                 
                  <button class="btn pop animate__animated animate__fadeInUp">Start with us</button>
                </div>                
                <div class="col-md-6 p-5">
                <img class="img-fluid animate__animated animate__backInRight" src="../assets/banner.png" alt="">
                </div>
          </div>              
        </div>            
      </div>
    </div>

    <div class="main" style="background-image: linear-gradient(#006EFF,#131212);">
      <div class="d-flex justify-content-center" style="padding: 80px; color: white; text-align: center;">
        <h2>How we can help your Business</h2>
      </div>
  </div>
 
 <transition appear-active-class="animate__animated animate__fadeInLeft">
  <div class="main-card">
    
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="p-3">
            <div class="card">
              <div class="card-body">
                <img class="card-image" src="../assets/icon/CREDIT.svg" alt="">
                <h4 class="card-title">Credits</h4>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. 
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda aliquid numquam dignissimos.</p>
              </div>
          </div>
        </div>
        
        </div>
        <div class="col">
          <div class="p-3">
          <div class="card">
            <div class="card-body">
              <img class="card-image" src="../assets/icon/POSTJOB.svg" alt="">
              <h4 class="card-title">Post Job</h4>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. 
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda aliquid numquam dignissimos.</p>
            </div>
          </div>
        </div>
        </div>
        <div class="col">
          <div class="p-3">
          <div class="card">
            <div class="card-body">
              <img class="card-image" src="../assets/icon/INTERVIEW.svg" alt="">
              <h4 class="card-title">Interview Schedule</h4>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. 
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda aliquid numquam dignissimos.</p>
            </div>
          </div>
        </div>
        
        </div>
        
      </div>
    </div>
  </div>
</transition>
 <div class="main" style="background-color: #101419; padding:90px">
    <div class="d-flex justify-content-center" style="padding: 20px; color: white; text-align: center;"><h2>Our Satisfied Partner</h2></div> 
   
    
  </div>

<!-- sponsor -->

 <div class="section-5 my-0 pb-5" style="background-color:#101419;">
    <div class="container px-5">
      <div class="row gx-4 m-0">
        <div class="col">
          <div class="p">
            <img src="../assets/sponsor/BNI.png" alt="">
          </div>
        </div>
        <div class="col">
          <div class="p">
            <img src="../assets/sponsor/KAO.png" alt="">
          </div>
        </div>
        <div class="col">
          <div class="p">
            <img src="../assets/sponsor/TIX.png" alt="">
          </div>
        </div>
        <div class="col">
          <div class="p">
            <img src="../assets/sponsor/DENTSU.png" alt="">
          </div>
        </div>
        <div class="col">
          <div class="p">
            <img src="../assets/sponsor/SHARP.png" alt="">
          </div>
        </div>
        <div class="col">
          <div class="p">
            <img src="../assets/sponsor/ANA.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>

<footer class="pt-5">
        <div class="container">
        
        <div class="row">
            <div class="col pt-2">
                <h2>CariinKerja</h2>
                <span>Jl. Sudirman<br>
                Jakarta Pusat</span>
            </div>
            <div class="col">
            <ul class="navbar-nav mr-auto p-2"><h2>Contact Us</h2>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">cariinkerja@gmail.com</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">+62 855-9199-0622</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">@cariikerja</a>
              </li>
          </ul>
            </div>
            <div class="col">
            <ul class="navbar-nav mr-auto p-2"><h2>Social media</h2>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"><i class="bi bi-facebook"></i> Cariinkerja</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><i class="bi bi-instagram"></i> Cariinkerjaa</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><i class="bi bi-linkedin"></i> @Cariinkerja</a>
              </li>
          </ul>
            </div>
            <div class="col">
            <ul class="navbar-nav mr-auto p-2"><h2>Lets Join Us!!</h2>
              <li class="nav-item">
                <a href="#/login" class="btn btn-primary">Login</a>
              </li>
              
          </ul>
            </div>
        </div>
    </div>
</footer>

<div class="copyright">
<hr style="border: none;
  height: 3px;">
    <p class="text-muted">Copyright@2022</p>
  </div>

</div>   
</div>
</template>

<script>
// @ is an alias to /src
import navbasic from '../components/NavBasic.vue'
import 'animate.css';
export default {
  name: 'HomeView',
  components: {
    NavBasic : navbasic
  },
  data(){
    return {
      userInfo: null
    }
  },
  methods:{
    // goTop(){
    //    document.body.scrollTop = 0;
    //    document.documentElement.scrollTop = 0;
    // }
  },
  mounted(){
    
    const user = JSON.parse(localStorage.getItem("user-info"))
      this.userInfo = user
      
  }
  
}
</script>

<style scoped>

.line{
  margin-left:250px;
  width: 290px;
}
.pop{
  background: #006EFF;
  color: white;
  border-radius: 36px;
  width: 154px;
  height: 50px;
  margin-top: 20px;
}

  .main-text{
    color: #2F2F2F;
    padding-top: 40px;
    font-size: 18px;
    width: 526px;
    font-weight: 500;
  }
  .container-fluid{
    padding-right: 0;
    padding-left: 0;
    
  }

 .card {
   width: 19rem;
   height: 300px;
   border-radius: 50px;
   background-color:  rgb(12, 12, 12);
   color: white;
   
 }
 .card-image {
   width: 50px;
   margin-right: 240px;
   margin-bottom: 10px;
 }
 .card-title {
   text-align: left;
 }
 .card-text {
   text-align: left;
 }
 .main-card {
   background: #101419 ;
 }
 .navbar-nav {
   text-align: left;
   margin-left: 90px;
 }
 footer {
   background: #101419;
   text-align: left;
   color: white;
 }
 

.nav-link {
  color: white;
}
.nav-link:hover {
  color: blue;
}
.copyright {
  background: #101419;
  margin-bottom: 0;
  padding-top: 10px;
  padding-bottom: 0;
}
.copyright p {
  margin-bottom: 0;
  padding-bottom: 10px;
  color: white;
} 

h1{
  font-size: 70px;
  font-weight: bolder;
  color: #006EFF;
}
.text-muted{
  text-align: center;
}
i{
  padding-right: 5px;
}
.btn-primary{
  width: 100%;
  padding: 20px;
  font-size: 24px;
}
.btn-primary:hover{
  background: rgb(0, 0, 177);
}
.img-fluid{
  margin-left: 121px;
}
</style>