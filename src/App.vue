<template>
  <div id="app">
      <input v-model="InputSearch" type="text">
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
            InputSearch:'',
            List:[],
        };
    },
    methods:{
        Research(){
            const axios = require('axios');
            const config = {
                method: 'get',
                url: 'https://api.themoviedb.org/3/search/movie?api_key=aa241e36a559a2927e235d5e8f93f3b5&query='+`${this.InputSearch}`,
                headers: { }
            };
            axios(config).then(response => {this.List = response.data.results; console.log(this.List); }).catch(function(error){console.log(error);}); 
        }
    }, 
}    
</script>




<style lang="scss">
</style>
