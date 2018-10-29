<template>
  <div>
    <ul v-if="results && results.length > 0" class="results">
      <li v-for="(item, index) in results" :key="item.index" v-on:click="liOnClick" v-bind:class="{results_item__selected: index+1 === selectedResult, results_item: true }">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'Results',
  
  computed: {
    ...mapState(['loading', 'results', 'selectedResult']),
    classListItem: () => {
      return {
        results_item: true,

      }
    }
  },
  methods: {
    ...mapActions(['setSearchQuery', 'clickResult']),
    liOnClick (e) {
      const val = e.target.textContent.trim();
      this.setSearchQuery(val);
      this.clickResult(val);
    }
  }
};

</script>

<style>
  .results {
    text-align: left;
    font-size: 16px;
    list-style: none;
    width: 250px;
    border: 1px solid gray;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 11px grey;
  }
  .results_item:hover,
  .results_item__selected {
    background-color: gray;
    cursor: pointer;
  }
  
  
</style>