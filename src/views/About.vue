<template>
  <div class="about">
    <h1>This is an about page</h1>
     <wizzard-form-3/>
  </div>
</template>
<script>
import WizzardForm3 from '../components/WizzardForm3.vue';
// @ is an alias to /src

export default {
  name: "about",
  components: {
    WizzardForm3
  },
};
</script>