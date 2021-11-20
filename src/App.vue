<template>
    <div id="app">
        <HeaderBanner/>
        <CardBox/>
        <ArrowBox/>
    </div>

</template>

<script>

//-----------------utilities--------------------
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//--------------------------------------------
//---------------components-------------------
import HeaderBanner from './components/HeaderBanner.vue';
import CardBox from './components/CardBox.vue';
import ArrowBox from './components/ArrowBox.vue';
//--------------------------------------------

export default {
    name: 'App',
    components: {
        HeaderBanner,
        CardBox,
        ArrowBox,
    },
}    
</script>




<style lang="scss">
@import './assets/scss/variables.scss';
</style>
