<template>
    <div class="country-suggest">
        <slot v-bind="slotProps">
            <input type="text" class="country-suggest__input"
                :name="name"
                :placeholder="placeholder"
                :value="value"
                @input="inputHandler"
                @focus="focusHandler"
                @blur="blurHandler"
                @keydown.down="downHandler"
                @keydown.up="upHandler"
                @keydown.enter="enterHandler"
            />
        </slot>
        <country-list v-show="showCountries"
            :countries="countries"
            :current-index="currentIndex"
            @choose="chooseCountry"
        />
    </div>
</template>

<script>
import axios from 'axios';
import CountryList from './CountryList';
import { debounce, isFunction } from './utilities';

export default {
  name: 'CountrySuggest',
  components: {
    CountryList,
  },
  props: {
    value: String,
    name: {
      type: String,
      default: 'country',
    },
    placeholder: {
      type: String,
      default: 'Country',
    },
    apiURL: {
      type: [String, Function],
      default: 'https://restcountries.eu/rest/v2/name/',
    },
    flagField: {
      type: [String, Function],
      default: 'flag',
    },
    delay: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      countries: [],
      hasFocus: false,
      currentIndex: 0,
    };
  },
  computed: {
    hasCountries() {
      return this.countries.length > 0;
    },
    slotProps() {
      return {
        name: this.name,
        placeholder: this.placeholder,
        value: this.value,
        inputHandler: this.inputHandler,
        focusHandler: this.focusHandler,
        blurHandler: this.blurHandler,
        downHandler: this.downHandler,
        upHandler: this.upHandler,
        enterHandler: this.enterHandler,
      };
    },
    url() {
      return isFunction(this.apiURL) ? this.apiURL(this.value) : this.apiURL + this.value;
    },
    showCountries() {
      return this.hasFocus && this.hasCountries;
    },
    nextIndex() {
      const nextIndex = this.currentIndex + 1;

      return Math.min(this.countries.length - 1, nextIndex);
    },
    prevIndex() {
      const prevIndex = this.currentIndex - 1;

      return Math.max(0, prevIndex);
    },
  },
  methods: {
    getFlag(country) {
      return isFunction(this.flagField) ? this.flagField(country) : country[this.flagField];
    },
    getCountries() {
      if (this.value === '') {
        this.countries = [];

        return null;
      }

      return axios.get(this.url)
        .then((response) => {
          this.countries = response.data.map((country) => {
            const flag = this.getFlag(country);

            return {
              ...country,
              flag,
            };
          });
        })
        .catch(() => {
          this.countries = [];
        });
    },
    inputHandler(event) {
      this.debouncedGetCountries();

      this.$emit('input', event.target.value);
    },
    focusHandler() {
      this.hasFocus = true;
    },
    blurHandler() {
      setTimeout(() => {
        this.hasFocus = false;
      }, 100);
    },
    chooseCountry(name) {
      this.$emit('input', name);

      this.countries = [];
    },
    downHandler() {
      if (!this.hasFocus) {
        return;
      }

      this.currentIndex = this.nextIndex;
    },
    upHandler() {
      if (!this.hasFocus) {
        return;
      }

      this.currentIndex = this.prevIndex;
    },
    enterHandler() {
      if (!this.hasFocus) {
        return;
      }

      const country = this.countries[this.currentIndex];

      this.chooseCountry(country.name);
    },
  },
  watch: {
    countries() {
      this.currentIndex = 0;
    },
  },
  created() {
    this.debouncedGetCountries = debounce(this.getCountries, this.delay);
  },
};
</script>

<style>
.country-suggest__input {
    width: 300px;
}
</style>
