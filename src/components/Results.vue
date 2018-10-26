<template>
  <div class='results'>
    <ul v-if="results && results.length > 0">
      <li v-for="item in results" :key="item.index">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'Results',
  computed: mapState(['loading', 'results'])
};

</script>

<style>
  ul {
    text-align: left;
    font-size: 16px;
    list-style: none;
    width: 250px;
    border: 1px solid gray;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 11px grey;
  }
  
  
</style>