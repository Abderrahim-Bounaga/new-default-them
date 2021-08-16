<template>
    <div v-if="routes.includes(this.$route.params.route)" class="container w-f d-f jc-c ai-c px-10 py-5 p-0 m-0 o-h">
        <iframe  id="iframe" name="iframe-account" frameborder="0" class="d-b o-h" @load="load"> </iframe>
        <form ref="form" id="account" :action="src" method="get" target="iframe-account">
            <input name="route" :value="this.$route.params.route" hidden>
            <input v-if="this.$route.query&&this.$route.query.orderId" name="query" :value="this.$route.query.orderId" hidden>
        </form>
    </div>
    <div v-else>{{'NOT FOUND'}}</div>
</template>

<script>
export default {
    data(){
        return{
            routes:['password','orders','profile','messages'],
            src:'/checkout/account/orders',
            loading:true
          }
    },
    fetch(){

        if(!this.$AUTH().customer)console.log(this.$AUTH().customer);
        else if(this.$route.name=="account-route") this.$router.push('/account/orders');
        },
    mounted(){
        if(this.routes.includes(this.$route.params.route)&& document.querySelector("#account")){ document.querySelector("#account").submit();}
        fbPageView();
        snapPageView();
    },
    methods:{
        load(){console.log("loaded");this.loading=!this.loading;}
    }
}
</script>

<style lang="scss" scoped>
    iframe{width:100vw;height:100vh;}
</style>
