<template>
  <div>
      <sidebarcomponent></sidebarcomponent>

      <div class="container p-4">
          <div class="row align-items-start">
            <div class="col">
                <h2>{{detail.jobName}}</h2><h3>({{detail.jobPosition}})</h3>
                
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
            detail:[]
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
    }
}
</script>

<style scoped>
    .container{
        margin-left: 250px;
    }
</style>