// import event from './events'
import icons from './icons'
import StoreinoApp from "@/node_modules/vue/dist/vue.common.prod";
export default (context, inject) => {
    let settings = context.store.getters.getSettings;
  if (!settings) settings = null
  if (settings && !settings.store_currencies) settings.store_currencies = [];
  if (!context.store.state.CURRENT_CURRENCY && settings) {
    if (settings.store_currencies.find(c => c.default == true) && settings.store_currencies.find(c => c.default == true).code) {
      context.store.state.CURRENT_CURRENCY = (settings.store_currencies.find(c => c.default == true)).code
    }
    context.store.state._current_currency = settings.store_currencies.find(c => c.default == true)
  } else if (settings) {
    context.store.state._current_currency = settings.store_currencies.find(c => c.code == context.store.state.CURRENT_CURRENCY)

  }
  if (settings && !settings.store_languages) settings.store_languages = [];
  if (!context.store.state.CURRENT_LANGUAGE && settings && settings.store_languages) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var languages = null
    if (params.lang) {
      languages = settings.store_languages.find(c => c.code == params.lang)
      context.store.state.CURRENT_LANGUAGE = languages.code
      context.store.state._current_language = languages
    }
    if (!languages) {
      if (settings.store_languages.find(c => c.default == true) && settings.store_languages.find(c => c.default == true).code) {
        context.store.state.CURRENT_LANGUAGE = (settings.store_languages.find(c => c.default == true)).code
      }
      context.store.state._current_language = settings.store_languages.find(c => c.default == true)

    }
  } else if (settings && settings.store_languages) {
    context.store.state._current_language = settings.store_languages.find(c => c.code == context.store.state.CURRENT_LANGUAGE)
  }
  StoreinoApp.$store = {
    search: async function (module, params) {
      let response = await context.$http.get(`/${module}/search`, { params });
      return response.data;
    },
    get: async function (module, params) {
      let response = await context.$http.get(`/${module}/get`, { params });
      return response.data;
    },
    create: async function (module, params, data) {
      let response = await context.$http.post(`/${module}/create`, data, { params });
      return response.data;
    },
    update: async function (module, params, data) {
      let response = await context.$http.post(`/${module}/update`, data, { params });
      return response.data;
    }
  };
  window.StoreinoApp = StoreinoApp;

  // Init fb pixel
  if(!context.store.state.isPreview){
    if (settings && settings.facebook_multiple_pixel && settings.facebook_multiple_pixel.length > 0) {
      window.enableFacebookEvents(true);
      context.store.state.facebookPixelEnabled = true;
      let pixels=[];
      settings.facebook_multiple_pixel.forEach(p => {
        fbPixel(p.id);
      });
    }else window.enableFacebookEvents(false);
    if (settings && settings.snapchat_pixel && settings.snapchat_pixel.length > 0) {
      window.enableSnapEvents(true);
      context.store.state.snapchatPixelEnabled = true;
      settings.snapchat_pixel.forEach(p => {
        snapPixel(p.id, p.email);
      });
    }else window.enableSnapEvents(false);
  }else{
    console.log("Facebook Pixel Not Working On Preview Mode");
  }

  inject('icons', icons)
}
 window.log=console.log
