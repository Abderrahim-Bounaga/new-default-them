import utils from '../plugins/utils'

export default function ({res,req,route,store,redirect}) {
  // if(route.name=="account-route"&&!store.$AUTH().customer) redirect('/')
  if (process.client) {
    if (route.path != store.state.route_path) {
      window.dispatchEvent(new CustomEvent('PAGE_VIEW', {
        detail: {
          path_name: route.name,
          location:window.location
          }
      }));
        store.state.route_path=route.path
      }
  }
  if (req && req.headers&&req.headers['x-auth-token']) {
      console.log("header token -->",req.headers['x-auth-token']);
      let decodedToken=utils.tokenDecode(req.headers['x-auth-token'])
      if(!store.state.AUTH_TOKEN) store.state.AUTH_TOKEN = req.headers['x-auth-token'];
      if (decodedToken&&decodedToken.customer) {store.state.authenticated=true;store.commit('SETAUTH', {type:'customer',data:decodedToken.customer})}   
      else if (decodedToken&&decodedToken.user) {store.state.authenticated=true;store.state.isAdmin=true;store.commit('SETAUTH', {type:'user',data:decodedToken.user})}   
      else {store.state.authenticated=false;store.state.isAdmin=false;store.commit('SETAUTH', null)};
  } else if (store.state.AUTH_TOKEN){
      let decodedToken=utils.tokenDecode(store.state.AUTH_TOKEN)
      if (decodedToken&&decodedToken.customer) {store.state.authenticated=true;store.commit('SETAUTH', {type:'customer',data:decodedToken.customer})}   
      else if (decodedToken&&decodedToken.user) {store.state.authenticated=true;store.state.isAdmin=true;store.commit('SETAUTH', {type:'user',data:decodedToken.user})}   
      else {store.state.authenticated=false;store.state.isAdmin=false;store.commit('SETAUTH', null)};
  }
  
}
