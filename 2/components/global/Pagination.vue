<template>
  <div class="py-3 d-f ai-c jc-fe">
      <div class="px-2 d-f ai-c">
        <paginate-button :px="1" :py="1"  @click="changePage(active-1)" color="#a8a8a8" :disabled="active<=1" ><span class="d-f ai-c" v-html="prevIcon"></span></paginate-button>
      </div>
      <paginate-button v-if="active>1" :py="2" :px="4" @click="changePage(1)" >{{1}}</paginate-button>
      <span :py="2" :px="4" v-if="active>3">...</span>
      <div v-for="index in gards" :key="'before'+index" class="px-1">
          <paginate-button v-if="active>1&&(active-(gards+1))+index>1" class="px-2" :py="2" :px="4" background="#ffffff" color="#333" @click="changePage((active-(gards+1))+index)">{{(active-(gards+1))+index}}</paginate-button>
      </div>
      <paginate-button :py="2" :px="4" background="#4479e2" color="#ffffff">{{active}}</paginate-button>
        <div  v-for="index in gards" :key="'after'+index" class="px-1">
          <paginate-button v-if="active<paginate.last_page&&active+index<paginate.last_page" class="px-2" :py="2" :px="4" background="#ffffff" color="#333" @click="changePage(active+index)">{{active+index}}</paginate-button>
      </div>
        <span :py="2" :px="4" v-if="active<paginate.last_page-4">...</span>
      <paginate-button v-if="active<paginate.last_page" :py="2" :px="4" @click="changePage(paginate.last_page)" >{{paginate.last_page}}</paginate-button>
      <div class="px-2 d-f ai-c">
        <paginate-button  :px="1" :py="1" @click="changePage(active+1)" color="#a8a8a8" :disabled="active>=paginate.last_page"><span class="d-f ai-c" v-html="nextIcon"></span></paginate-button>
      </div>
  </div>
</template>

<script>
export default {
    props:{paginate:Object,gardNumber:{type:Number,default:2}},
    components:{'paginate-button':()=>import('@/components/global/PaginateButton')},
    data(){
        return{
            active:this.paginate.current_page,
            nextIcon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>',
            prevIcon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>'
        }
    },
    computed:{
      gards:function(){
        if (this.gardNumber%2==0)return this.gardNumber/2;
        if (this.gardNumber%2!=0)return pasrseInt(this.gardNumber/2);
      }
    },
    watch:{
      paginate:function(val){
        this.active=1
      }
    },
    methods:{
      changePage(page){
       this.active=page;
       this.$emit('input',page)
      }
   }
}
</script>
