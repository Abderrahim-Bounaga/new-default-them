import schema from './schema.json';
import utils from './utils'
export default (context, inject) => {
  // if (!process.client) {
    inject('utils',utils)
  const functions = {};
  schema.forEach(element => {
      const functionName=context.$utils.capitalize(element)
        functions[element]= async function(payload = {}, init = false) {
            const get=context.store.getters
            const items = get[`get${functionName}`]
            if (init ||!items|| items.length == 0) {
                await context.store.dispatch(`get${functionName}`, payload);
                if (get[`get${functionName}`].paginate)  {return { data: get[`get${functionName}`].results, paginate: get[`get${functionName}`].paginate }}
                else return get[`get${functionName}`]
            }
            return items.paginate||items.results? { data:items.results, paginate: items.paginate }:items
        }

        const functionSingleName=context.$utils.singularize(context.$utils.capitalize(element))
        functions[context.$utils.singularize(element)]= async function(payload = {}, init = false) {
            let item = context.store.getters[`get${functionSingleName}`](payload)
            if (init || !item || context.$utils.singularize(element)=='product'&&item&&!item.html ) {
                return await context.store.dispatch(`get${functionSingleName}`, payload);
            }
            return item;
        }
        inject(element,functions[element])
        inject(context.$utils.singularize(element),functions[context.$utils.singularize(element)])
    })
//settings
  async function settings(payload = {}, init = false) {
    let settings = {}

      if(process.client) settings = context.store.getters.getSettings;
        if (init || Object.keys(settings).length == 0) {
            if (context.req && context.req.body && context.req.body.preview) {
                context.store.state.isPreview = true;
                const body = context.req.body.preview;
                payload.data = JSON.parse(body.data);
                payload.schema = JSON.parse(body.schema);
                await context.store.dispatch('getSettings', payload)
            } else {
                await context.store.dispatch('getSettings', payload)
            }
            settings = context.store.getters.getSettings;
            let currency = settings.store_currencies.find(c => c.default == true)
            context.store.state.CURRENT_CURRENCY = currency && currency.code ? currency.code : sett.store_currencies[0].code;
            return settings
        }
        return settings
    }
    //filters
    async function filters(payload = {}, init = false) {
        const {data}=await this.$http.get(`/products/filters`, { params: payload })
        return data
    }
    async function blogFilters(payload = {}, init = false) {
        const {data}=await this.$http.get(`/pages/filters`, { params: payload })
        return data
    }
// crud
    const createCustomer= async function (data) {
        let response = await context.store.dispatch(`create${context.$utils.capitalize('customer')}`, data);
        return response;
    }
// login
    function singIn(payload) {const response = context.store.dispatch("singIn", payload); return response}
    function singOut(payload) {const response = context.store.dispatch("singOut")}
    inject('settings', settings)
    inject('createCustomer', createCustomer)
    inject('singIn', singIn)
    inject('singOut', singOut)
    inject('filters',filters)
    inject('blogFilters',blogFilters)

    //......helper functions......
    function initCart(data) { context.store.dispatch('initCart', data)  }
    function initWishlist(data) {context.store.dispatch('initWishlist', data)}
    function addToWishlist(data) {  context.store.dispatch('addToWishlist', data)   }
    function getWishlist() {return context.store.getters.getWishList }
    // function addToCart(data, toCheckout = false) { context.store.dispatch('addToCart', { product: data, toCheckout: toCheckout })}
    function getStoreCart() {  return context.store.getters.getStoreCart}
    function removeCart(payload) {context.store.dispatch('removeCart', payload)}
    function cartCount() {return context.store.state.cartCount}
    function removeFromWishlist(payload) {context.store.dispatch('removeFromWishlist', payload)}
    function updateBascket() {context.store.dispatch('updateBascket')}
    function getBascket() { context.store.dispatch('updateBascket');return context.store.getters.getBascket}
    function getSelectedVariant(variants, value1, value2, value3) {
        let selectedVariant = null
        variants.forEach((v) => {
            if (v.option3) {
                if (v.option3.value === value3) {
                    if (v.option2.value === value2) {
                        if (v.option1.value === value1) {
                            selectedVariant = v;
                        }
                    }
                }
            } else if (v.option2) {
                if (v.option2.value === value2) {
                    if (v.option1.value === value1) {
                        selectedVariant = v;
                    }
                }
            } else if (v.option1) {
                if (value1 === v.option1.value) {
                    selectedVariant = v;
                }
            }

        });
        return selectedVariant;
    }
    function upsellProducts() {return context.store.getters.getUpsellProducts}
    function addUpsellProducts(products) { context.store.dispatch('addUpsellProducts', products)}
    function removeUpsellProduct(index) {context.store.dispatch('removeUpsellProduct', index) }

    function serializeQuery(params, prefix) {
        let query = Object.keys(params).map((key) => {
            const value = params[key];
            if (params.constructor === Array)
                key = `${prefix}[]`;
            else if (params.constructor === Object)
                key = (prefix ? `${prefix}[${key}]` : key);
          if (typeof value === 'object' && value) {
                if (value.length > 0) {
                    return serializeQuery(value, key);
                }
            }
            else {
                if (value) {
                    return `${key}=${encodeURIComponent(value)}`;
                }
            }
        });
        query = query.filter(function (el) {
            return el != null;
        });
        return [].concat.apply([], query).join('&');
    }

  function pushState(path, params, query) {
    if (typeof params == 'object') {
      params = params.join('+');
      let qs = serializeQuery(query);
      qs = qs == '' ? '' : '?' + qs;
      return path + params + qs;
    }

  }

    function setLangCurrency(target, value) {
        if (target == 'lang') { context.store.commit('SETLANGUAGES', value) }
        if (target == 'currency') { context.store.commit('SETCURRENCY', value)}
    }

    function getCurrentCurrency() {  return context.store.getters.getCurrentCurrency;}
    function getToken() { return context.store.getters.getToken;}
    function getAuth() { return context.store.getters.getAuth;}

    if (process.client) {
        inject("setCookie",function setCookie(cname, cvalue, exdays) { var d = new Date(); d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); var expires = "expires=" + d.toUTCString(); document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";})
        inject("getCookie",function getCookie(cname) { var name = cname + "=";var ca = document.cookie.split(';');for (var i = 0; i < ca.length; i++) {var c = ca[i];while (c.charAt(0) == ' ') {c = c.substring(1);}if (c.indexOf(name) == 0) { return c.substring(name.length, c.length);} } return "";})
        inject("deleteCookie", function deleteCookie(cname) { this.$setCookie(cname, '', -1) })
    }


    inject("defaultImageProduct", 'https://storeino.b-cdn.net/assets/no-image/no-image-products.svg');
    inject("defaultImageBlog", 'https://storeino.b-cdn.net/assets/no-image/no-image-post.svg');
    inject("defaultImageCollection", 'https://storeino.b-cdn.net/assets/no-image/no-image-collections.svg');
    inject("defaultLogo", 'https://storeno.b-cdn.net/stores/7-2021/1626690015596.png');
    inject('initCart', initCart)
    inject('AUTH_TOKEN', getToken)
    inject('AUTH', getAuth)
    inject('storeCart', getStoreCart)
    inject('removeCart', removeCart)
    inject('cartCount', cartCount)
    inject('initWishlist', initWishlist)
    inject('addToWishlist', addToWishlist)
    inject('storeWishlist', getWishlist)
    inject('removeFromWishlist', removeFromWishlist)
    inject('updateBascket', updateBascket)
    inject('bascket', getBascket)
    inject('getSelectedVariant', getSelectedVariant)
    inject('addUpsellProducts', addUpsellProducts)
    inject('removeUpsellProduct', removeUpsellProduct)
    inject('upsellProducts', upsellProducts)
    inject('pushState', pushState)
    inject('setLangCurrency', setLangCurrency)
    inject('currency', getCurrentCurrency)

  // }
}
