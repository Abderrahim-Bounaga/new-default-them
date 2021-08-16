<template>
    <button :class="['py-'+py, 'px-'+px,!disabled?'button--active':null]" :style="`backgroundColor:${background}; color:${color}`" @click="$emit('click')" :disabled="disabled">{{text}}<slot/></button>
</template>

<script>
export default {
    props:{
        text:{
            type:String,
            default:""
        },
        background:{
            type:String,
            default:"#ffffff"
        },
        color:{
            type:String,
            default:"#333"
        },
        px:{
            type:Number,
            default:3
        },
        py:{
            type:Number,
            default:3
        },
        disabled:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style lang="scss" scoped>
    button{border:none;outline:none;border-radius: 3px;transition:.4s;}
    .button--active:hover{background:#4479e2 !important;color:#ffffff !important; cursor: pointer;.icon{color:#ffffff;}}
</style>
