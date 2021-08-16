import schema from '../../plugins/schema'
import utils from '../../plugins/utils'
const mutations={
  INITCART(state,e){
    let data=null;
    let cookies=utils.getCookie(`STOREINO-${e.target.toUpperCase()}`)?JSON.parse(utils.getCookie(`STOREINO-${e.target.toUpperCase()}`)):null
    if(cookies&&cookies.length>0){
      if(e.dataType=='ids'){state[`${e.target}`].ids=null; data=utils.initCart(null,cookies,e.dataType)}
      else {data=utils.initCart(e.data,cookies,'objects');delete state[`${e.target}`].ids }
      data?e.dataType=='ids'?state[`${e.target}`].ids=data:state[`${e.target}`].products=data:state[`${e.target}`].products=[];
      if(e.target=="cart"&&e.dataType!='ids') state[`${e.target}`].total=utils.calcCartTotal(cookies);
    }

  },
  ADDCART(state,e){
    if(!state[`${e.target}`].products) state[`${e.target}`.products]=[];
    try {
      state[`${e.target}`].products=utils.addCart(state[`${e.target}`].products,e.data,e.target)
      let reformedProduct=this.$utils.reformToCookies(state[`${e.target}`].products,e.data.quantity)
      utils.setCookie(`STOREINO-${e.target.toUpperCase()}`, JSON.stringify(reformedProduct,15))
      if(e.target=='cart') {state[`${e.target}`].total=this.$utils.calcCartTotal(reformedProduct)};
    } catch (error) {console.log(error)}
  } ,
  REMOVECART(state,e){
    try {
      console.log(e);
      state[`${e.target}`.products]=utils.removeCart(state[`${e.target}`].products,e.data,e.target)
      let reformedProduct=this.$utils.reformToCookies(state[`${e.target}`].products,e.data.product.selected_quantity)
      utils.setCookie(`STOREINO-${e.target.toUpperCase()}`,JSON.stringify(reformedProduct),15)
      if(e.target=='cart') state[`${e.target}`].total=utils.calcCartTotal(reformedProduct);
   } catch (error){ console.log(error)}
    if(!state[`${e.target}`].products.length>0) utils.deleteCookie(`STOREINO-${e.target.toUpperCase()}`)
  },
  SETCUSTOMER(state,customer){state.customer=customer;},
  SETAUTH(state,payload){
   if(payload && payload.type) state.auth[`${payload.type}`]=payload.data
   else state.auth={}
  }

}
for(const element of schema){
  mutations[`SET${element.toUpperCase()}`]=(state,payload={})=>{
    state[element]=payload
  }
}
export default mutations
// export default {
//   SETPRODUCTS: (state, products) => {
//     state.products = null
//     state.products = products
//   },
//   UPDATEPRODUCTS: (state, product) => {
//     if (state.products.length != 0) {
//       const productIndex = state.products.results.findIndex(p => p.slug === product.slug)
//       if (productIndex != -1) {
//         state.products.results[productIndex] = product
//       }
//     }

//   },
//   // add  collection fetchted to satate
//   SETCATEGORIES: (state, categories) => (state.categories = categories),
//   SETCOLLECTIONS: (state, collections) => (state.collections = collections),
//   UPDATCOLLECTIONS: (state, collection) => (state.collections.results.push(collection)),  // add filters List  to satate
  // SETFILTERS: (state, filters) => (state.filters = filters),
//   SETBLOGFILTERS: (state, filtersBlog) => (state.filtersBlog = filtersBlog),
//   SETSETTINGS: (state, settings) => { state.settings = settings },
//   //SETCURRENCY:(state, currency) => { state.currency = currency },
//   // SETPAGINATE: (state, paginate) => { state.paginate = paginate },
//   SETMENUS: (state, menus) => { state.menus = menus },
//   UPDATEMENUS: (state, menu) => { state.menus.results.push(menu) },
//   SETIMAGES: (state, images) => { state.images = images },
//   SETBRANDS: (state, brands) => (state.brands = brands),
//   SETREVIEWS: (state, reviews) => (state.reviews = reviews),
//   //..cart
//   // ADDITEM(state, id) { state.storeCart.push(id) },
//   SETAPPS: (state, apps) => (state.apps = apps),
//   SETCOUNTRIES: (state, countries) => (state.countries = countries),
//   SETPROVINCES: (state, provinces) => (state.provinces = provinces),
//   SETCITIES: (state, cities) => (state.cities = cities),
//   SETMETHODS: (state, paymentMethods) => (state.paymentMethods = paymentMethods),
//   UPDATEPAPPS: (state, app) => {
//     if (state.apps.length != 0) {
//       const appIndex = state.apps.results.findIndex(p => p._id === app._id)
//       if (appIndex === -1) {
//         state.apps.push(app)
//       }
//     }

//   },
//   SETUPSELLS:(state,upsells)=>{state.upsells=upsells},
//   STEZONE: (state, zone) => (state.zone = zone[0]),
//   //add one ???
//   INITCART(state, cookieCart) {
//     state.storeCart = cookieCart
//   },
//   ADDTOCART(state, data) {
//     let exists = false;
//     if (state.storeCart && state.storeCart.length > 0) {
//       state.storeCart.forEach(p => {
//         if (p._id == data._id && !data.variant && !p.variant) { p.quantity = data.quantity; exists = true }
//         if (p._id == data._id && data.variant && p.variant && p.variant._id == data.variant._id) { p.quantity = data.quantity; exists = true }
//         if (data.upsell && data.upsell.product) {
//           let isTargetParent = false
//           if (p._id == data._id && !data.variant && !p.variant) { isTargetParent = true }
//           if (p._id == data._id && data.variant && p.variant && p.variant._id == data.variant._id) { isTargetParent = true }
//           if (isTargetParent) {
//             if (p.upsell && p.upsell.products && p.upsell.products.length > 0) {
//               let upselProductExist = false
//               for (let i = 0; i < p.upsell.products.length; i++) {
//                 const product = p.upsell.products[i];
//                 if (product._id == data.upsell.product._id && !data.upsell.product.variant && !product.variant) {
//                   p.upsell.products[i].quantity = data.upsell.quantity
//                   upselProductExist = true
//                   exists = true
//                 }
//                 if (product._id == data.upsell.product._id && data.upsell.product.variant && product.variant && product.variant._id == data.upsell.product.variant._id) {
//                   p.upsell.products[i].quantity = data.upsell.quantity
//                   upselProductExist = true
//                   exists = true
//                 }
//               }
//               if (!upselProductExist) p.upsell.products.push(data.upsell.product)
//             } else {
//               p.upsell = Object.assign({}, data.upsell)
//               p.upsell.products = [data.upsell.product]
//               delete p.upsell.product
//             }
//           }
//         }
//       });
//       if (!exists) {
//         state.storeCart.push(data)
//       }
//     } else {
//       state.storeCart = []
//       state.storeCart.push(data)
//     }


//   },
//   REMOVECART(state, data) {
//     if (data.isUpsell) {
//       for (let i = 0; i < state.cardProducts.length; i++) {
//         const p = state.cardProducts[i];
//         const c = state.storeCart[i]
//         if (data.parent.product && p.product._id == data.parent.product._id && ((!data.parent.variant && !p.variant) || (data.parent.variant && p.variant && p.variant._id == data.parent.variant._id))) {
//           for (let j = 0; j < p.upsell.products.length; j++) {
//             const up = p.upsell.products[j];
//             const cup = c.upsell[j];
//             if (up.product._id == data._id && ((!data.variant && !up.variant) || (data.variant && up.variant && up.variant._id == data.variant._id))) {
//               p.upsell.products.splice(j, 1);
//               c.upsell.products.splice(j, 1)
//               j--
//             }
//           }
//         }
//       }
//     } else {
//       for (let i = 0; i < state.cardProducts.length; i++) {
//         const p = state.cardProducts[i];
//         if (p.product._id == data._id && ((!data.variant && !p.variant) || (data.variant && p.variant && p.variant._id == data.variant._id))) {
//           state.cardProducts.splice(i, 1);
//           state.storeCart.splice(i, 1)
//           i--;
//         }
//       }
//     }


//   },
//   ADDTOWISHLIST(state, data) {
//     let w = state.storeWishlist.find(c => c._id == data._id)
//     if (!w) {
//       state.storeWishlist.push(data)
//     }

//   },
//   INITWISHLIST(state, data) {
//     state.storeWishlist = data
//   },

//   REMOVEFROMWISHLIST(state, index) {
//     state.storeWishlist.splice(index, 1)
//   },
//   UPDATEBASCKET(state, count) { state.bascket = count},
//   ADDUPSELLPRODUCTS(state, products) { state.upsellProducts = products},
//   REMOVEUPSELLPRODUCTS(state, productId) {
//     state.upsellProducts = state.upsellProducts.filter(p => p._id != productId)
//     // state.upsellProducts.splice(index, 1)
//   },
//   USERLOGIN(state, loginData) {
//     state.customer = loginData.customer
//     state.customerToken = loginData.token
//   },
//   SETTOKEN(state, token) {
//     state.customrToken = token
//   },
//   SETCUSTOMER(state, customer) {
//     state.customer = customer
//   },
//   ////blogs////
//   SETBLOGS(state, blogs) {
//     state.blogs = blogs
//   },

//   SETLANGUAGES(state, value) {
//     state.CURRENT_LANGUAGE = value;
//   },

//   SETCURRENCY(state, value) {
//     state.CURRENT_CURRENCY = value;
//   }
// }
