import Vuex from 'vuex'
import store from './base'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
const createStore = () => {
    return new Vuex.Store({ 
      // modules:{...store},
    state,actions,mutations,getters,...store
    })
  }
export default createStore