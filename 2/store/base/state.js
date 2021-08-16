import schema from '../../plugins/schema'
const extra=["apps","isAdmin","authenticated","IP","AUTH_TOKEN","CURRENT_LANGUAGE","CURRENT_CURRENCY","customer","token","cartTotal","referer"]
const varibales=schema.concat(extra)
const state={
  isPreview: false,
  facebookPixelEnabled: false,
  snapPixelEnabled: false,
  cart:{products:[],total:0},
  wishlist:{products:[]},
  showSideBarBlog:false,
  auth: { user: null, customer: null },
  searchText: 'hamza allaa',
  valueQuntity:null

}
for(const element of varibales){if(element=="settings") state[`${element}`] ={};else state[`${element}`] =null}

export default () => state
// export default{
//   route_path:"/",
//   products: [],
//   apps: [],
//   AUTH_TOKEN: null,
//   IP: null,
//   CURRENT_LANGUAGE: null,
//   CURRENT_CURRENCY: null,
//   _current_currency: null,
//   categories: [],
//   collections: {
//     results: [],
//     paginate: {
//       total: 1,
//       per_page: 1,
//       current_page: 1,
//       last_page: 0
//     }
//   },
//   filters: [],
//   filtersBlog: [],
//   settings: {},
//   brands: [],
//   reviews: [],
//   menus: {
//     results: [],
//     paginate: {
//       total: 1,
//       per_page: 1,
//       current_page: 1,
//       last_page: 0
//     }
//   },
//   upsells:[],
//   images: [],
//   countries: [],
//   provinces: [],
//   cities: [],
//   paymentMethods: [],
//   zone: [],
//   wishList: 0,
//   bascket: 0,
//   storeCart: null,
//   storeWishlist: [],
//   upsellProducts: [],
//   customer: null,
//   token: null,
//   user: null,
//   posts: [],
//   referer: null,
//   cartCount: 0,
//   customerToken: null,
//   cartTotal: 0,
//   cardProducts: null

// }
