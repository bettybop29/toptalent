<template>
<div style="width:400px; margin:50px;">

  <vue-tel-input v-model="value"></vue-tel-input>
  <p>{{value}}</p>
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