<template>
  <div class="card" style="width: 18rem;" >
      
    <div class="card-body">
        <div class="d-flex">
            <h5 class="card-title flex-grow-1">{{item.jobName}}</h5>
            <span class="bdge">{{item.jobStatus}} </span>
            <div class="dropdown">
            <a class="bi bi-three-dots-vertical" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                aria-expanded="false"></a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li></li>
                <button v-if="item.jobStatus !='hidden'" class="dropdown-item" v-on:click="active(item.jobId)">Hidden</button>
                <button v-else disabled class="dropdown-item">Hidden</button>
                <button v-if="item.jobStatus !='visible'" class="dropdown-item"
                v-on:click="visible(item.jobId)">Visible</button>
                <button v-else disabled class="dropdown-item">Visible</button>
            </ul>
            </div>
        </div>
         
        <small class="card-text text-muted">Rp{{ formatPrice(item.jobSalary)}},-</small>
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>
</div>
<!-- hidden  -->

</template>

<script>
export default {
    name:'JobComponentVue',
    props:
        ['item'],
     methods:{ 
       formatPrice(value) {
            let val = (value/1).toFixed().replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
       }
    },
}
</script>

<style scope>   
    .bdge{
        background: lightblue;
        border-radius: 7px;
        font-size: 12px;
        justify-content: center;
        padding: 3px;
        height: fit-content;
    }
</style>