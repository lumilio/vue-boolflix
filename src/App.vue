<template>
    <div id="app">
        <HeaderBanner/>
        <CardBox/>
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
//--------------------------------------------

export default {
    name: 'App',
    components: {
        HeaderBanner,
        CardBox,
    },
}    
</script>




<style lang="scss">
@import './assets/scss/variables.scss';
body{
    overflow-y: hidden;
}
</style>
