<template>
    <div id="app">
        <country-suggest v-model="country" />
    </div>
</template>

<script>
import CountrySuggest from '@/tasks/4';

export default {
  name: 'app',
  components: {
    CountrySuggest,
  },
  data() {
    return {
      country: '',
    };
  },
};
</script>

<style>

</style>
