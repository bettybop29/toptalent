<template>
  <div>
      <sidebarcomponent></sidebarcomponent>

      <div class="container p-4">
          <div class="row justify-content-between">
            <div class="col-7">
                <h2>{{detail.jobName}} <span>({{detail.jobPosition}})</span></h2>
                <small>{{userName}}</small>
                
            </div>
            <div class="col">
                <button class="btn btn-outline-primary">click</button> 
            </div>

          </div>
        
      </div>
        
      
  </div>
</template>

<script>
import axios from 'axios'
import sidebarcomponent from '@/components/SidebarComponent.vue'


export default {
    name:'jobsDetail',
    components:{
        sidebarcomponent   
    },
    data(){
        return{
            detail:[],
            userName:''
        }
    },
    methods:{
        async getDetailJob(){
            await axios.get(`http://54.255.4.75:9091/api/v1/job/` +  this.$route.params.id)
            .then((data)=>{
                this.detail = data.data.data
                console.log(this.detail)
            })
        }
    },
    mounted(){
        this.getDetailJob();
        // get company name 
        const user = JSON.parse(localStorage.getItem("user-info")).recruiterCompany
        this.userName = user
        console.log(this.userName)
    }
}
</script>

<style scoped>
    .container{
        margin-left: 250px;
    }
</style>