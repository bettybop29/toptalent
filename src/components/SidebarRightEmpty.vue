<template>
  <div class="sidebar-right d-none d-md-none d-lg-block">

    <div class="side-content">
      <ul>
        <li class="li-title mt-5">
          <img src="https://toptalentapp.com:9091/resources/mb3.png" alt=""></li>  
        <li>
          <p>There is no<br>candidate to be reviewed</p>
          <!-- <router-link to="/postjobNew" class="btn btn-primary">Post a new job</router-link> -->
          <a href="/postjobNew" class="btn btn-primary">Post a new job</a>
        </li>

      </ul>
    </div>
  </div>




  

</template>

<script>
export default {
    name:"SidebarRightEmpty",
}
</script>

<style scoped>
ul{
  padding-top: 80px;
}
    img{
      width: 180px;
      height: 180px;
    }
    
    .hide{
      position: fixed;
      justify-content: center;

    }
    
    .sidebar-right{
        float: right;
        display: flex;
        margin-top: 20px;
        
        
    }
    .side-content{
        width: 320px;
        position: absolute;
        right: 0;
        padding: 40px;
        background: white;
        border-radius: 20px 0 0 20px;
        text-decoration: none;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        height: 97vh;
        /* width: 100%; */
        transition: ease-in-out 1s;
        /* padding-right: 250px; */

    }
    .side-content li{
      list-style: none;
      margin: 13px;
      margin-left: 0px;
      margin-right: 30px;
      padding-right: 0px;
      text-align: center;
      display: flex;
      flex-direction: column;     
    }
    .li-title{
      padding: 0;
      font-weight: bold;
      margin-left: -5px !important;
      color: #6476c8;
      
    }
    .action button{
      margin: 5px;
      border: none;
      padding: 20px;
      border-radius: 20px;
      color: white;
      transition: box-shadow 0.5s;
    }
    .action button:hover{
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
     .action button i{
       display: flex;
       justify-content: center;
       font-size: 30px;
       font-weight: bolder;
     }
    .acc{
      width: 44%;
      background: #6779CD;
    }
    .acc:hover{
      background: #6476c8;
    }
    .rej{
      width: 44%;
      background: #E79AA2;
    }
    .rej{
      background: #d79097;
    }
    .btn-resume{
      border: none;
      padding: 15px;
      border-radius: 20px;
      background: #F6F6FF;
      display: flex;
      transition: box-shadow 0.5s;
    }
    .btn-resume:hover{
      box-shadow: rgba(152, 154, 251, 0.35) 0px 5px 15px;
    }
    .btn-resume i{
      margin-left: 120px;
    }
    .btn-portofolio{
      border: none;
      padding: 15px;
      border-radius: 20px;
      background: #F6F6FF;
      display: flex;
      transition: box-shadow 0.5s;
    }
    .btn-portofolio:hover{
      box-shadow: rgba(152, 154, 251, 0.35) 0px 5px 15px;
    }
    .btn-portofolio i{
      margin-left: 112px;
    }
    .text-side{
      position: absolute;
      padding-left: 80px;
      text-align: right;
      justify-content: right;
      
      
    }
    .li-header{
      text-align: center;
      padding: 0;
      margin-top: 10px;
      align-items: center;
    }
    .li-foto img{
      width: 100px;
      height: 100px;
      margin-left: 60px;
      margin-top: 0;
      border-radius: 50%;
      border: 3px solid #f3f3f3;
    }
    .pop{
     
     
      
      text-align: center;
      margin: 0;
    }
    .select-button{
      display: flex;
      text-align: center;
      justify-content: center;
    }
    .modal-body{
      text-align: center;
    }
    .modal-content{
      border-radius:20px;  
      margin:auto; 
      width:300px; 
      margin-top:200px; 
      padding-bottom:20px;
    }
    .jobseeker-informations{
      margin-left: -20px;
    }
    .jobseeker-informations td{
      height: 40px;
      padding: 15px;
    }
    .jobseeker-informations th{
      height: 40px;
      padding: 15px;
    }

    /* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */
    @media (max-width: 576px) {
    .side-content {
        margin-right: -280px;
    }
    /* #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    } */
}
</style>