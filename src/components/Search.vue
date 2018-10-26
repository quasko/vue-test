<template>
  <input v-model="query" @input="debouncedSearch" placeholder="Search country..." type="search" class="search"/>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import debounce from 'lodash/debounce';

export default {
  name: 'search',
  computed: {
    ...mapState(['searchQuery']),
    query: {
      get() {
        return this.searchQuery;
      },
      set(val) {
        return this.setSearchQuery(val);
      }
    }
  },
  methods: {
    ...mapActions(['setSearchQuery', 'search']),
    debouncedSearch: debounce(function () {
      this.search();
    }, 500)
  }
 
};


</script>

<style>
.search {
  width: 250px;
  font-size: 16px;
  line-height: 20px;
  padding: 10px;
  text-align: left;
  border: 1px solid #ced4da;
  border-radius: 5px;
}
</style>