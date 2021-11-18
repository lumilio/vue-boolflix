<template>
  <div id="app">
      <input type="text">
      <button @click="Research()">click to filter</button>
      <div>
          <div v-for='element in List' :key='element.id'>
              <p>{{element.title}}</p>
              <p>{{element.original_title}}</p>
              <p>{{element.original_language}}</p>
              <p>{{element.vote_average}}</p>
          </div>
      </div>
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
            List:[],
        };
    },
    methods:{
        Research(){
            var axios = require('axios');
            var config = {
                method: 'get',
                url: 'https://api.themoviedb.org/3/search/movie?api_key=aa241e36a559a2927e235d5e8f93f3b5&query='+`${this.InputSearch}`,
                headers: { }
            };
            axios(config).then(response => {this.List = response.data.results}).catch(function(error){console.log(error);}); 
        }
    }, 
}    
</script>




<style lang="scss">
</style>
