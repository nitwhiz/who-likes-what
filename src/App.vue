<template>
  <div class="wrapper">
    <ItemSearch />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ItemSearch from './components/ItemSearch.vue';

export default defineComponent({
  components: {
    ItemSearch,
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  justify-content: center;
}

.wrapper {
  width: 100%;
}
</style>
