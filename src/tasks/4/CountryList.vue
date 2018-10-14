<template>
    <div class="country-list">
        <country-item v-for="(country, index) in countries"
            v-bind="country"
            :hasFocus="currentIndex === index"
            :key="index + 1"
            @choose="chooseCountry"
        />
    </div>
</template>

<script>
import CountryItem from './CountryItem';

export default {
  name: 'CountryList',
  components: {
    CountryItem,
  },
  props: {
    countries: {
      type: Array,
      default: () => [],
    },
    currentIndex: Number,
  },
  methods: {
    chooseCountry(name) {
      this.$emit('choose', name);
    },
  },
};
</script>

<style>
.country-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 300px;
    width: 300px;
    border: 1px solid gray;
}
</style>
