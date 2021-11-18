<template>
  <div id="app" class="bg-dark">
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
</template>

<script>

//-----------------utilities--------------------
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios';
//--------------------------------------------
//---------------components-------------------

//--------------------------------------------

export default {
    name: 'App',
    components: {},
    mounted() {
        axios
        .get("https://flynn.boolean.careers/exercises/api/array/music")
        .then(myResp => {console.log(myResp.data.response); })
        .catch(e => {console.error(e, 'errore di caricamento');})       
    },
}    


</script>

<style lang="scss">
</style>
