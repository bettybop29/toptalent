<template>
<div style="width:400px; margin:50px;">

  <vue-tel-input v-model="phone"></vue-tel-input>
  </div>
</template>
<script>
import { VueTelInput } from 'vue-tel-input'

export default {
  components: {
    VueTelInput,
  },
};
</script>