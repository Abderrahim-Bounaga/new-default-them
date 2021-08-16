import schema from '../../plugins/schema'
import utils from '../../plugins/utils'

const getters={
  //other getters 
  getWishList(state) { return state.wishlist },
  getStoreCart(state) { return state.cart; },
  getAuth(state) { return state.auth },
  getToken(state) { return state.AUTH_TOKEN },
  getCartCount(state) { return state.cartCount },
  getCurrentCurrency(state) { return state._current_currency&&state._current_currency.symbol?state._current_currency.symbol:state.CURRENT_CURRENCY},
  getAppByPlacement: (state) => (placement) => { if (state.apps && state.apps.length != 0) {const app = state.apps.filter(app => app.placement.indexOf(placement) != -1);return app};return {}},
}
  for(const element of schema){
    getters[`get${utils.capitalize(element)}`] = (state,getters)=>{
      return state[element]
    }
    getters[`get${utils.singularize(utils.capitalize(element))}`] = (state,getters)=>(payload)=>{
      const params =payload
      const data=state[element]
      const key = Object.keys(params)[0]
      return data && data.results&&data.results.length>0?data.results.find(item => item[key] == params[key]):null;
    }
  }
export default getters

