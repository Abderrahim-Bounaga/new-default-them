const functions={
    singularize(name){if(name!='categories') return  name.substring(0,name.length-1);else return 'category'},
    pluralize(name){if(name!='category') return  name+'s'; else return 'categories'},
    capitalize(name){  return name.charAt(0).toUpperCase() + name.slice(1)},
    call(eventName,data={}){
        if(!window.events) window.events={}
        if(!window.events[eventName]) window.events[eventName] = new CustomEvent(eventName);
        window.events[eventName].data=data
        window.dispatchEvent(window.events[eventName]);
    },
    postMessage(ifram,data,target="*"){if(data&&data!='undefined') {ifram.contentWindow.postMessage(data,target)} },
    setCookie(cname, cvalue, exdays = 365) {
        let date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) {
        let name = cname + "=";
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) == ' ') { cookie = cookie.substring(1); }
            if (cookie.indexOf(name) == 0) {
                const result = decodeURIComponent(cookie.substring(name.length, cookie.length))
                return result
            }
        }
        return "";
    },
    deleteCookie(cname){this.setCookie(cname,'',-1)},
    addCart(target ,data,targetType=''){
        if(data.upsell){
            let keys=['_id','name','value','code','type'];
          let discount = {};
            data.discount._id = data.upsellId
            for(let key of keys){discount[key]=data.discount[key]?data.discount[key]:null}
            data.upsell.discount=discount;
            if(data.upsell.parents&&!data.upsell.parents.includes(data.product._id))data.upsell.parents.push(data.product._id);
            if(!data.upsell.parents){data.upsell.parents=[];data.upsell.parents.push(data.product._id);}
            this.addCart(target,{product:data.upsell,quantity:data.quantity,variant:data.variant?data.variant:null},targetType='cart')
        }
        if(data.upsell)  data={...data.product, selected_quantity:data.product.selected_quantity?data.product.selected_quantity:1,selected_variant:data.product.selected_variant?data.product.selected_variant:null}
        else data={...data.product,selected_quantity:data.quantity,selected_variant:data.variant?data.variant:null}
        if (!data._id) throw `${targetType}_id_is_required`;
        if (data.variant && !data.variant._id ) throw `${targetType}_variant_id_is_required`;
        if (isNaN(data.selected_quantity) && targetType!="wishlist") throw `${targetType}_quantity_is_required`;
        let exists=false
        for(const product of target){
            if (product._id == data._id && !data.selected_variant && !product.selected_variant && !data.upsell) {if(targetType!="wishlist") product.selected_quantity = data.selected_quantity; exists = true; }
            if (product._id == data._id && data.selected_variant && product.selected_variant && product.selected_variant._id == data.selected_variant._id&&!data.upsell) { if (targetType!="wishlist")product.selected_quantity = data.selected_quantity; exists = true; }
        }
      if (!exists && !data.upsell){
        target.push(data);
      }
      return target
    },
    reformToCookies(products){
        let productsList=[];
        for(const product of products){
           let reformedProduct=this.reformProductCart(product,product.selected_quantity,product.selected_variant);
            productsList.push(reformedProduct)
        }
        return productsList;
    },
    removeCart(list,target,targetType=''){
      if (targetType == "cart") {
        target={...target.product,variant:target.variant?target.variant:null}
          let productIndex=null
          if(!target.variant)productIndex = list.findIndex(item=>item._id==target._id)
          else productIndex = list.findIndex(item=>item._id==target._id&&item.selected_variant&&target.variant&&item.selected_variant._id==target.variant._id)
        list.splice(productIndex, 1)
          let upsells = list.filter(item=>item.parents&&item.parents.includes(target._id))
          if (upsells&&upsells.length>0) {
              for (const product of upsells) {
                  if(product.parents.length==1) {list.splice(list.findIndex(item=>item._id==product._id),1);}
                  else product.parents.splice(product.parents.findIndex(id=>id==target._id),1);
              }
          }
          return list
      } else {
        const productIndex = list.findIndex(item => item._id == target.product._id)
        if (productIndex != -1) list.splice(productIndex, 1)
        return list
      }
    },
    //not tested yet
  calcCartTotal(products) {
        let total = 0;
    for (let product of products) { total += product.price * product.quantity}
        return total;
    },
    calcDiscount(price,type,value,quantity=1){
        if (type == "percentage") return  (price*quantity - ((price*value) / 100)) * quantity;
        else if(type == "fixed_amount") return (price * quantity )-(value * quantity);
        else return price * quantity

    },
    reformProductCart(product,quantity,variant=null){
        let reformedProduct={
            _id:product._id,
            quantity:quantity,
            price:product.price.salePrice
        }
        if(variant){
            let currentVariant=product.variants.find(item=>item._id==variant._id)
            reformedProduct.variant={_id:currentVariant._id}
          reformedProduct.price = currentVariant.price.salePrice * quantity
        }
      if (product.parents) {
            reformedProduct.upsell=product.discount
            reformedProduct.parents=product.parents
            reformedProduct.price=this.calcDiscount(product.price.salePrice,product.discount.type,product.discount.value,quantity)
        }
        return reformedProduct;

    },
    tokenDecode(token){
       if(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/.test(token)&&token.split(".").length > 1){
               let data = token.split(".")[1];
               let buff = new Buffer.from(data, 'base64');
               let text = buff.toString('ascii');
               return JSON.parse(text)
        }else  return null;
    },
    initCart(list,cookies,type){
        let products_ids=[];
        let products=[];
        if (type=='ids') {
            for(const item of cookies){if(!products_ids.includes(item._id)) products_ids.push(item._id);}
            return products_ids;
        }else{
          for (let index = 0; index < cookies.length; index++) {
            const item = cookies[index];
            let product={...list.find(product=>product._id==item._id)}
            product.selected_quantity=item.quantity
            if (item.variant && product.variants?.length > 0 ) product.selected_variant= product.variants.find(variant=>variant._id==item.variant._id);
                 if(item.parents){product.parents = item.parents; product.discount = item.upsell;}
                products.push({...product})
          }
            return products
        }

  },
  getPayload(token = null) {
    if (token) {
      var base64Payload = token.split('.')[1];
      var payload = Buffer.from(base64Payload, 'base64');
      return JSON.parse(payload.toString());
    }
  },

}
export default functions
