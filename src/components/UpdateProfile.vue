<template>
<div>
<sidebarcomponent/>
<div class="bg-color">
  <button class="btn btn-primary new" onclick="history.back()"><i class="bi bi-chevron-left"></i>Go Back</button>

  <div class="container section-first">
    
    <form class="row" @submit.prevent="updateProfile" type="multipart">
      <h1 class="mb-5">Update Profile</h1>
      <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Email:</label>
        <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterEmail" disabled>
      </div>
      <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Culture</label>
        <!-- <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterCulture" required> -->
        <ckeditor :editor="editor" tag-name="textarea" :model-value="recruiterCulture" 
        v-model="profile.recruiterCulture" :config="editorConfig"></ckeditor>
      </div>
      <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Industry</label>
        <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterIndustry" required>
      </div>
     <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Benefit</label>
        <!-- <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterBenefit"  required> -->
        <ckeditor :editor="editor" tag-name="textarea" :model-value="recruiterBenefit" 
        v-model="profile.recruiterBenefit" :config="editorConfig"></ckeditor>
      </div>
     
     <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Company</label>
        <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterCompany" required>
      </div>
    
     <div class="col-md-10 mb-4">
        <label for="inputState" class="form-label">Staff</label>
        <!-- <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterStaff" required> -->
        <select class="form-control" id="inputState" v-model="profile.recruiterStaff" required>
                  <option selected>Choose..</option>
                  <option>1</option>
                  <option>2-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>201-500</option>
                  <option>501-1000</option>
                  <option>1001-1000</option>
                  <option>10000+</option>
        </select>
      </div>    
      <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Description</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="profile.recruiterDesc"></textarea>
      </div>
     <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Address</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="profile.recruiterAddress"></textarea>
      </div>
     
 
    </form>
  </div>
<div class="content-2">
  <div class="container bottom">
    <h1 class="mb-5" style="margin-left:90px;">Contact</h1>
     <form class="row" @submit.prevent="updateProfile">
 <div class="col-md-10 mb-4">
  
        <label for="validationDefault03" class="form-label">Phone</label>
        <!-- <input v-model="profile.recruiterPhone" type="text" @input="acceptNumber"> -->
        <!-- <input type="tel" class="form-control" @input="acceptNumber" id="validationDefault03" v-model="profile.recruiterPhone"  
        placeholder="Ex: 0855-1111-2222" min="10" max="12" required> -->
        <input type="tel" class="form-control" @input="acceptNumber" id="telephone" v-model="profile.recruiterPhone" > 
        <!-- <vue-tel-input v-model="profile.recruiterPhone" mode="international"></vue-tel-input>  -->
        <small>Format: 0888-1111-2222</small>
      </div>
     <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Facebook</label>
        <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterFb" >
      </div>
     <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Instagram</label>
        <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterIg" >
      </div>
       <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Linkedin</label>
        <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterLinkedin" >
      </div>
       <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Website</label>
        <input class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="profile.recruiterWebsite" required>
      </div>
       <button class="btn btn-success" type="submit">Update</button>
     </form>
  </div>
</div>
</div>
</div>
</template>

<script>
import axios from 'axios'
// import "mosha-vue-toastify"
// import { createToast } from "mosha-vue-toastify"
import sidebarcomponent from '@/components/SidebarComponent.vue'
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/intlTelInput.js';     
import intlTelInput from 'intl-tel-input';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    props:['id'],
    
    components:{
      sidebarcomponent,
      

     
      // VuePhoneNumberInput
    },
    data(){
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
         // The configuration of the editor.
         
        },
        profile:[],
        previewImage:null,
        value:''
      }
    },
    methods:{
      acceptNumber() {
        var x = this.profile.recruiterPhone.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})/);
        this.profile.recruiterPhone = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        },

      onFileSelected(event){
        this.selectedFile = event.target.files[0]
      },
      onUpload(){
        const fd = new FormData();
        fd.append('image',this.selectedFile, this.selectedFile.name)
        axios.post(`http://54.255.4.75:9091/api/v1/file/recruiter/photo/`,fd + this.$route.params.id)
        .then(res =>{
          console.log(res)
        })
      },
      //func get data
      fetchData() {
        axios.get(`http://54.255.4.75:9091/api/v1/auth/recruiter/`+this.$route.params.id)

        .then((data) => {
          this.profile=data.data
       })
      },
      // func edit profile
      async updateProfile(){    
      try {
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        await axios.put(`http://54.255.4.75:9091/api/v1/auth/recruiter/${recruiterId}?recruiterEmail=${this.profile.recruiterEmail}&recruiterCompany=${this.profile.recruiterCompany}&recruiterIndustry=${this.profile.recruiterIndustry}&recruiterPhone=${this.profile.recruiterPhone}&recruiterStaff=${this.profile.recruiterStaff}&recruiterDesc=${this.profile.recruiterDesc}&recruiterAddress=${this.profile.recruiterAddress}&recruiterBenefit=${this.profile.recruiterBenefit}&recruiterFb=${this.profile.recruiterFb}&recruiterIg=${this.profile.recruiterIg}&recruiterLinkedin=${this.profile.recruiterLinkedin}&recruiterCulture=${this.profile.recruiterCulture}&recruiterWebsite=${this.profile.recruiterWebsite}`);
        this.$router.push('/about')
        this.$toast.success(`Profile updated`, {
          // optional options Object
           position: 'top-right',
           pauseOnHover: true
      })
       
        } catch {
          console.log(Error)
        }
      }
    },
    //render func
    mounted(){
      this.fetchData();

        
        const input = document.querySelector("#telephone");
        intlTelInput(input, {
        // any initialisation options go here
            nationalMode: true,
            hiddenInput: "full_phone",
            preferredCountries: ["id"],
            placeholderNumberType:"MOBILE",
            autoPlaceholder:"polite",
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.3/build/js/utils.js",
            
        
      });
    
    
  }  
}
</script>

<style scoped>
.bg-color{
  background-color: #f3f3f3;
  min-height: 140vh;
  
}
  h1 {
    text-align: left;
    padding: 0;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  
  .container{
    background: white;
    padding: 20px;
    border-radius: 20px;
    /* position: absolute; */
    margin: 1.5%;
    width: 60%;
    padding-right: 0;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    margin-left: 20%;
    
  }
  .btn{
    width: 81%;
    margin-left: 10px;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .new{
    background: transparent;
    width: max-content;
    margin-left: 20%;
    color: black;
    margin-top: 20px;
    border: none;
    padding-left: 10px;
    transition: ease-in-out 1s;
  }
  .new:hover{
    background: transparent;
    color: red;
    padding-left: 0;
    transition: ease-in-out 1s;
    
  }
  .bottom{

    margin-top: 2%;
    margin-bottom: 10px;
    padding-bottom: 30px;
  }
  
  form{
    margin-left: 80px;
  }
  .content-2{
    padding-bottom: 40px;
  }

   
</style>