<template>
  <div class="col-md-5">
          <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                role="tab" aria-controls="home" aria-selected="true">Visible</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                role="tab" aria-controls="profile" aria-selected="false">Hidden</button>
            </li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
             <div class="mx-3 mb-4 pt-4 px-3">
                <h5 class="fw-bold">xx Jobs is Visible</h5>
              </div>
              <!-- list job -->
              <div v-for="item in list" v-bind:key="item.id">
                <jobcomponentnew :item="item" v-if="item.jobStatus == 'visible'"></jobcomponentnew>
              </div>
            </div>
            <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="mx-3 mb-4 pt-4 px-3">
                <h5 class="fw-bold">xx Jobs is Hidden</h5>
              </div>
              
              <div v-for="item in list" v-bind:key="item.id">
                <jobcomponentnew :item="item" v-if="item.jobStatus == 'hidden'"></jobcomponentnew>
              </div>
            </div>
          </div>
  </div>  
</template>

<script>
export default {

}
</script>

<style scoped>

</style>