<template>
  <div id="app">
      <input type="text">
      <button>click to filter</button>
  </div>
</template>

<script>

//-----------------utilities--------------------
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//--------------------------------------------
//---------------components-------------------

//--------------------------------------------

export default {
    name: 'App',
    components: {},
    data() {
        return {
            InputSearch:'ciao',
        };
    },
    methods:{}, 
    mounted() {


        var axios = require('axios');

        var config = {
        method: 'get',
        url: 'https://api.themoviedb.org/3/search/movie?api_key=aa241e36a559a2927e235d5e8f93f3b5&query='+`${this.InputSearch}`,
        headers: { }
        };
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });      
    },
}    
</script>




<style lang="scss">
</style>
