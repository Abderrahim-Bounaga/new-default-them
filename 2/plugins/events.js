export default ({ route, store }) => {
  store.state.route_path=route.path
  window.addEventListener('PAGE_VIEW',  (e) =>{
    console.log("PAGE VIEW");
    if(store.state.settings && store.state.settings.google_analytics_id){
      console.log("%cGoogle analytics is ready", 'color: #bada55');
      const google_analytics_id  = store.state.settings.google_analytics_id.trim().replace(/[^\w\u0621-\u064A-]/gi, '-');
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);};
      gtag('js', new Date());
      gtag('config',window.escape(`${google_analytics_id}`));
    }
    if (store.state.settings && store.state.settings.google_ads&&store.state.settings.google_ads.id) {
      console.log("%cGoogle ads is ready", 'color: #bada55');
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date()); 
      gtag('config', `${store.state.settings.google_ads.id}`);
    }
  })
  window.addEventListener('INIT_CART', async (e) => {
    store.commit('INITCART', { dataType: 'ids', target: e.data.target ? e.data.target : 'cart' })
    if (store.$storeCart().ids ){
      let products = (await store.$products({ '_id-in': store.$storeCart().ids }, true)).data
      store.commit('INITCART',{dataType:'objects',data:products,target:e.data.target?e.data.target:'cart'})
    }
  })
  window.addEventListener('INIT_WISHLIST', async (e) => {
    store.commit('INITCART', { dataType: 'ids',target: e.data.target })
    if (store.$storeWishlist().ids) {
      let products = (await store.$products({ '_id-in': store.$storeWishlist().ids }, true)).data
      store.commit('INITCART', { dataType: 'objects', data: products, target: e.data.target ? e.data.target : 'cart' })
    }
  })
  window.addEventListener('ADD_TO_CART', (e) => {
    store.commit('ADDCART',{data:e.data,target:e.data.target?e.data.target:'cart'})
  })
  window.addEventListener('REMOVE_CART', (e)=>{
    store.commit('REMOVECART', { data: e.data,target: e.data.target ? e.data.target : 'cart'})
  })
  window.addEventListener('message',  (e)=>{
    let response=e.data
    if(response.type=='event') store.$utils.call(response.name,response.data)
    if(response.type=='route'){window.history.pushState( {},"", store.$pushState('/account/',[`${response.data}`],''))}
    if(response.type=='route_id'){window.history.pushState( {},"", store.$pushState('/account/',[`${response.data.name}`],{orderId:response.data.query}))}
  })
  window.addEventListener('APP_GO_TO', (e) => {
    console.log("event APP_GO_TO ");
  })
  window.addEventListener('GO_TO', (e) => {
    console.log("event APP_GO_TO ");
  })
  window.addEventListener("TO_CHECKOUT", (e) => {
    console.log("event checkout");
  });
  window.addEventListener("CART_UPDATED", (e) => {
    console.log("event cart update");
  });
  window.addEventListener("APP_LOADED", (e) => {
    console.log("event  APP_LOADER");
  });

 }
