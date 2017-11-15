import Vue from 'vue'
import Vuex from 'vuex'

import personMd from './person/person'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    personMd
  }
})
