import axios from 'axios'
import https from 'https'
import store from './store';
import utils from './utils'
let baseURL = 'https://api-stores.storeino.world/api';
// baseURL = "https://api-stores.storeino.com/api";
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI1ZmRiODIyMzgwOTVkYjAwZDc3ODA4OGEiLCJuYW1lIjoiU3RvcmUgTnVtYmVyIDUiLCJzdWJkb21haW4iOiJzdG9yZTUuc3RvcmVpbm8uY29tIn0sInVzZXIiOnsiX2lkIjoiNWZkYjgyMTU4MDk1ZGIwMGQ3NzgwODg2IiwiZmlyc3RuYW1lIjoiYWJkZXJyYWhpbSIsImxhc3RuYW1lIjoib3VraHJpYiJ9LCJjb21wYW55Ijp7Il9pZCI6IjVmZGI4MjE1ODA5NWRiMDBkNzc4MDg4NCIsIm5hbWUiOiJzdG9yZSBudW1iZXIgNSIsInN0YXR1cyI6IlVOQ09NUExFVEVEIn0sImlhdCI6MTYwODMwMDEyNSwiZXhwIjoxNjM5ODM2MTI1fQ.WfsQZsB64L49U730yvc5AQoC3IQ9WUwVUBA7dw-HDuU";
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MDEwNDM3NjJkODI5ZjBjNWFlZTIyNmIifSwiaWF0IjoxNjExODcwNDU5LCJleHAiOjE2NDM0MDY0NTl9.PmufnSywMN0BfqcJOJhgT5yuqZY4bnaRuTS78ITve38";
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMGU5MzhkMmQ4MjlmMGM1YWVlMWVlNiIsImZpcnN0bmFtZSI6ImFsbGFhIiwibGFzdG5hbWUiOiJoYW16YSIsInBvc2l0aW9uIjoiQ0xJRU5UIn0sImNvbXBhbnkiOnsiX2lkIjoiNjAwZTkzOGQyZDgyOWYwYzVhZWUxZWU0IiwibmFtZSI6ImVjb21taXJjZSIsInN0YXR1cyI6IlVOQ09NUExFVEVEIn0sInN0b3JlIjp7Il9pZCI6IjYwMGU5M2VlMmQ4MjlmMGM1YWVlMWVlYSIsIm5hbWUiOiJnbG9wIiwic3ViZG9tYWluIjoiZ2xvcC5zdG9yZWluby5jb20ifSwiaWF0IjoxNjIwMjk5MzkxLCJleHAiOjE2NTE4MzUzOTF9.G1HSVtaVyhZ1mbC8JtWg_HL6goPIjcVWRvdROQxAE-s";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMTNkOTYwMzhhOWU3MDEwYWI5MWQ2NyIsImZpcnN0bmFtZSI6ImhpY2hhbSIsImxhc3RuYW1lIjoiZG91Y2giLCJwb3NpdGlvbiI6IkFETUlOIiwiZW1haWwiOiJrYWthcm90bzE0LmhkQGdtYWlsLmNvbSIsImFkZHJlc3MiOm51bGx9LCJjb21wYW55Ijp7Il9pZCI6IjYwMTNkOTYwMzhhOWU3MDEwYWI5MWQ2NSIsIm5hbWUiOiJibG9ja2NoYWluZSIsInN0YXR1cyI6IlVOQ09NUExFVEVEIn0sInN0b3JlIjp7Il9pZCI6IjYwMTNkOTZlMzhhOWU3MDEwYWI5MWQ2YiIsIm5hbWUiOiJoYWlreXV1Iiwic3ViZG9tYWluIjoiaGFpa3l1dS5zdG9yZWluby53b3JsZCJ9LCJpYXQiOjE2Mjc5OTAwMzAsImV4cCI6MTY1OTUyNjAzMH0.osqwQZEtjpoCJDai1pBiwjH1f65DzZuODkSGkGgfQCg"
 // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MDEzZDk2ZTM4YTllNzAxMGFiOTFkNmIiLCJuYW1lIjoiaGFpa3l1dSIsInN1YmRvbWFpbiI6ImhhaWt5dXUuc3RvcmVpbm8ud29ybGQifSwidXNlciI6eyJfaWQiOiI2MDEzZDk2MDM4YTllNzAxMGFiOTFkNjciLCJmaXJzdG5hbWUiOiJoaWNoYW0iLCJsYXN0bmFtZSI6ImRvdWNoIn0sImNvbXBhbnkiOnsiX2lkIjoiNjAxM2Q5NjAzOGE5ZTcwMTBhYjkxZDY1IiwibmFtZSI6ImJsb2NrY2hhaW5lIiwic3RhdHVzIjoiVU5DT01QTEVURUQifSwiaWF0IjoxNjI1NDk3Mzk4LCJleHAiOjE2MjYzNjEzOTh9.gFPQjWzY8Q46ci4dpi4Lsj8AqzaV4KGeZ0C0musqy7s";
 // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MDUwOTNjM2M0OTMxZjAxNTgzZGNmMzQiLCJuYW1lIjoicGhvbmVjaG9wIiwic3ViZG9tYWluIjoicGhvbmVjaG9wLnN0b3JlaW5vLndvcmxkIiwiZG9tYWluIjp7fX0sInVzZXIiOnsiX2lkIjoiNjA1MDkzYmRjNDkzMWYwMTU4M2RjZjMwIiwiZmlyc3RuYW1lIjoiaGFtemEiLCJsYXN0bmFtZSI6ImFsbGFhIn0sImNvbXBhbnkiOnsiX2lkIjoiNjA1MDkzYmRjNDkzMWYwMTU4M2RjZjJlIiwibmFtZSI6InBob25lY2hvcCJ9LCJpYXQiOjE2MTU4OTM0NDQsImV4cCI6MTYxNjc1NzQ0NH0.Q_MWT7iTARPj9gIYCmo-KylndELg5jlBjNidmDGEOHw";
 if (process.env.environment == 'production') {
   baseURL = "https://api-stores.storeino.com/api";
  }
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI1ZmRhNmIyNjgwOTVkYjAwZDc3ODA4NzMifSwiaWF0IjoxNjA4MjE2NDgxLCJleHAiOjE2Mzk3NTI0ODF9.SOWlZ5BAy9a24RqKu1XgnwIet50BCMsk-iUvfLkr-yA";
console.log("NODE_ENV", process.env.environment);
console.log("BASEURL", baseURL);
export default ({ app }, inject) => {
  if (app.context.req && app.context.req.headers && app.context.req.headers['x-auth-token']) {
    app.context.store.state.AUTH_TOKEN = app.context.req.headers['x-auth-token'];
  }
  if (!app.context.store.state.AUTH_TOKEN) {
    if (app.context.req && app.context.req.headers && app.context.req.headers['x-auth-token']) {
      token = app.context.req.headers['x-auth-token'];
      app.context.store.state.AUTH_TOKEN = token;
    } else console.log('No Token Found');
  } else {
    token = app.context.store.state.AUTH_TOKEN;
  }
  if (app.context.req && app.context.req.headers && app.context.req.headers['x-auth-ctoken']) {
    token = app.context.req.headers['x-auth-ctoken'];
    app.context.store.state.customerToken = token;
  }
  if (app.context.store.state.customerToken) {
    token = app.context.store.state.customerToken;
  }
  if (!process.client) {
    const payload = utils.getPayload(token);
    if (payload.customer) app.context.store.state.customer = payload.customer;
    if (payload.user) app.context.store.state.isAdmin = payload.user;
   }
  if (app.context.req && app.context.req.cookies && app.context.store.state) {
    if (app.context.req.cookies['CURRENT_CURRENCY']) app.context.store.state.CURRENT_CURRENCY = app.context.req.cookies['CURRENT_CURRENCY'];
    if (app.context.req.cookies['CURRENT_LANGUAGE']) app.context.store.state.CURRENT_LANGUAGE = app.context.req.cookies['CURRENT_LANGUAGE'];
    if (app.context.req.query.lang) app.context.store.state.CURRENT_LANGUAGE = app.context.req.query.lang;
    if (app.context.req.query.currency) app.context.store.state.CURRENT_CURRENCY = app.context.req.query.currency;
    if (app.context.store.state.CURRENT_LANGUAGE) app.context.res.setHeader('Set-Cookie', [`CURRENT_LANGUAGE=${app.context.store.state.CURRENT_LANGUAGE};path=/`]);
    if (app.context.store.state.CURRENT_CURRENCY) app.context.res.setHeader('Set-Cookie', [`CURRENT_CURRENCY=${app.context.store.state.CURRENT_CURRENCY};path=/`]);
  }
  const http = axios.create({
    baseURL: baseURL,
    headers: { 'x-auth-token': token },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });
  http.interceptors.request.use(function (config) {
    if (config.method == 'get') {
      if (config.params && !config.params.lang && app.context.store.state.CURRENT_LANGUAGE) config.params.lang = app.context.store.state.CURRENT_LANGUAGE;
      if (config.params && !config.params.cur && app.context.store.state.CURRENT_CURRENCY) config.params.cur = app.context.store.state.CURRENT_CURRENCY;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  inject('http', http);
};
