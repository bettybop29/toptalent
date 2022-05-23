<template>
 <div>
  <div class="col-md-10 mb-4">
        <label for="validationDefault03" class="form-label">Email:</label>
        <input type="text" class="form-control" id="validationDefault03" v-model="profile.recruiterEmail" disabled>
      </div>
      </div>
</template>

<script>
export default {
  props:['id'],
  name:'UpdateProfile'
}
</script>

<style>

</style>