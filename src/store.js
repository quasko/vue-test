import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_LOADING = 'SET_LOADING';
const SET_RESULTS = 'SET_RESULTS';

export default new Vuex.Store({
  state: {
    searchQuery: '',
    loading: false,
    results: null
  
  },
  mutations: {
    [SET_SEARCH_QUERY]: (state, searchQuery) => state.searchQuery = searchQuery,
    [SET_LOADING]: (state, loading) => state.loading = loading,
    [SET_RESULTS]: (state, data) => state.results = data.map(item => item.name)
  },
  actions: {
    setSearchQuery({commit}, searchQuery) {
      commit(SET_SEARCH_QUERY, searchQuery);
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