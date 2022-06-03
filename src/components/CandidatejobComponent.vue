<template>

  <div class="col-md-7">
    
          <div class="candidates p-4 mb-4">
           
            <h5 class="fw-bold">Candidates</h5>

            <div class="row justify-content-between mt-4">
              <div class="col-6 d-flex align-items-center">
                <h6 class="fw-bold">ian</h6>
              </div>
              <div class="col-6 d-flex justify-content-end align-items-center">
                <button class="ict">
                  <img class="import-icon" src="../assets/icon-postjob/see-all.svg" alt="">
                </button>
                <button class="ict prm">
                  <img class="import-icon" src="../assets/icon-postjob/edit.svg" alt="">
                </button>
                <button class="ict dgr">
                  <img class="import-icon" src="../assets/icon-postjob/delete.svg" alt="">
                </button>
              </div>
              <div class="col-12">
                <small class="text-muted">Visible on </small>
              </div>
            </div>

          </div>

          <div class="applicantDetail">
            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="unreview-tab" data-bs-toggle="tab" data-bs-target="#unreview"
                  type="button" role="tab" aria-controls="unreview" aria-selected="true">Unreviewed</button>
              </li>     
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="accept-tab" data-bs-toggle="tab" data-bs-target="#accept" type="button"
                  role="tab" aria-controls="accept" aria-selected="false">Accepted</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="reject-tab" data-bs-toggle="tab" data-bs-target="#reject" type="button"
                  role="tab" aria-controls="reject" aria-selected="false">Rejected</button>
              </li>
            </ul>
            <!-- CANDIDATE  -->
            <div class="tab-content">
              <div class="tab-pane active" id="unreview" role="tabpanel" aria-labelledby="unreview-tab">
                <div v-for="item in list" v-bind:key="item.id">
                  <applicantjobcomponent :item="item" v-if="item.jobStatus == 'visible'"></applicantjobcomponent>
                </div>
              </div>
              <div class="tab-pane" id="accept" role="tabpanel" aria-labelledby="accept-tab">
                <div v-for="item in list" v-bind:key="item.id">
                  <applicantjobcomponent :item="item" v-if="item.jobStatus == 'hidden'"></applicantjobcomponent>
                </div>
              </div>
              <div class="tab-pane" id="reject" role="tabpanel" aria-labelledby="reject-tab">
                <div v-for="item in list" v-bind:key="item.id">
                  <applicantjobcomponent :item="item" v-if="item.jobStatus == 'hidden'"></applicantjobcomponent>
                </div>
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