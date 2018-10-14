<template>
    <div :class="classList" @click="clickHandler">
        <img class="country-item__flag" :src="flag" alt='' role='image' v-if="flag" />
        <div class="country-item__name">{{ name }}</div>
    </div>
</template>

<script>
export default {
  name: 'CountryItem',
  props: {
    name: String,
    flag: String,
    hasFocus: Boolean,
  },
  computed: {
    classList() {
      return {
        'country-item': true,
        'country-item_focused': this.hasFocus,
      };
    },
  },
  methods: {
    clickHandler() {
      this.$emit('choose', this.name);
    },
  },
};
</script>

<style>
.country-item {
    padding: 3px 5px;
    min-height: 1.5em;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.country-item:hover {
    background-color: lightskyblue;
}
.country-item_focused {
    background-color: deepskyblue !important;
}
.country-item__flag {
    width: 16px;
    height: 16px;
}
.country-item__name {
    white-space: nowrap;
    overflow-x: hidden;
    padding-left: 5px;
    padding-right: 5px;
}
</style>
