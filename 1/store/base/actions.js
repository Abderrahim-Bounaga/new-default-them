import schema from '../../plugins/schema.json';
import utils from '../../plugins/utils'
const actions={
  async search(context,payload){ const module=payload[0];const params=payload[1]; let response = await to(this.$http.get(`/${module}/search`,{ params})); return response.data},
  async get(context,payload){const module=payload[0];const params=payload[1]; let response = await to(this.$http.get(`/${module}/get`, { params})); return response.data },
  async create(context,payload){const module=payload[0];const data=payload[1];let response = await to(this.$http.post(`${module}/create`, data));return response.data},
  async createCustomer({dispatch},payload){let response = await dispatch('create',['customers',payload]);return response},
  async singIn(context,payload){const response = await to(this.$http.post(`/customers/login`,  payload,));return response},
  async singOut(context,payload){const response = await to(this.$http.post(`/customers/logout`,  payload,));return response}
}
for (const element of schema) {
  actions[`get${utils.capitalize(element)}`] = async function({dispatch,commit,state},payload={}){
    let response = {};

    if (element == "settings") {
      try {
        if (payload.data) {
          const url = `/settings/current/`;
          if (state.CURRENT_LANGUAGE) url += `?lang=${state.CURRENT_LANGUAGE}`;
          response = await to(this.$http.post(url, payload))
        } else {
          response = await to(this.$http.get(`/settings/current/`, { params: payload }))
        }
        commit('SETSETTINGS', response.data);
        if (state.products&&state.products.length <= 0) commit('SETPRODUCTS', { results: response.data.sections.featured_products.items });
        return response
      } catch (error) {
        process.sentry.captureException(error)
      }
    }

    response =await dispatch('search',[element,payload])
    const commitElement=element.toUpperCase()
    commit(`SET${commitElement}`, response)
    return response;
  }
}
for(const element of schema){
    actions[`get${utils.singularize(utils.capitalize(element))}`] = async function({dispatch,commit},payload={}){
      let response =await dispatch('get',[element,payload])
      return response;
    }
  }
export default actions
async function to(promise) {
  try {
    const response = await promise
    return response
  } catch (error) {
    console.log(error.message);
    if (error.response && error.response.status != 404 && process.env.NODE_ENV != "development") {
      process.sentry.captureException(error)
    }
    return error.response ? error.response.data : error.message
  }
}
