import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_LOADING = 'SET_LOADING';
const SET_RESULTS = 'SET_RESULTS';
const CLICK_RESULTS = 'CLICK_RESULTS';
const UP_KEY_PRESS = 'UP_KEY_PRESS';
const DOWN_KEY_PRESS = 'DOWN_KEY_PRESS';
const ENTER_KEY_PRESS = 'ENTER_KEY_PRESS';



export default new Vuex.Store({
  state: {
    searchQuery: '',
    loading: false,
    results: null,
    selectedResult: null
  
  },
  mutations: {
    [SET_SEARCH_QUERY]: (state, searchQuery) => {
      state.searchQuery = searchQuery;
      state.selectedResult = null;
    },
    [SET_LOADING]: (state, loading) => state.loading = loading,
    [SET_RESULTS]: (state, data) => state.results = data.map(item => item.name),
    
    [CLICK_RESULTS]: (state, result) => {
      state.selectedResult = state.results.indexOf(result) + 1;
      state.results = null;
    },
    [UP_KEY_PRESS]: (state) => {
      if (state.selectedResult <= state.results.length) state.selectedResult--;
    },
    [DOWN_KEY_PRESS]: (state) => {
      if (state.selectedResult === null || state.selectedResult >= 0) state.selectedResult++;
    },
    [ENTER_KEY_PRESS]: (state) => {
      state.searchQuery = state.results[state.selectedResult - 1];
      state.results = null;
      state.selectedResult = null;
    }

    
  },
  actions: {
    setSearchQuery({commit}, searchQuery) {
      commit(SET_SEARCH_QUERY, searchQuery);
    },
    keyPress({commit}, key) {
      
      if(key === 38) {
        commit(UP_KEY_PRESS);
      }
      if(key === 40) {
        commit(DOWN_KEY_PRESS);
      }
      if(key === 13) {
        commit(ENTER_KEY_PRESS);
      }
    },
    clickResult({commit}, result) {
      commit(CLICK_RESULTS, result);
    },
    async search({commit, state}) {
      commit(SET_LOADING, true);
      try {
        
        const {data} = await axios.get(`https://restcountries.eu/rest/v2/name/${state.searchQuery}`);
        commit(SET_RESULTS, data);
      } catch (e) {
        commit(SET_RESULTS, []);
      }
      commit(SET_LOADING, false);
    }
  }
})