<template>
    <div class="">
      <input v-model="InputSearch" type="text">
      <button @click="Research()">click to filter</button>
    </div>
</template>

/* -------------------------------------------------------------------------- */

<script>
//-----------------utilities--------------------
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//--------------------------------------------
//---------------components-------------------
import { Bus1 } from '../main'
import { Bus2 } from '../main'

//--------------------------------------------



export default {
    name: '',
    components: {},
    props: {},
    data() {
        return {
            InputSearch:'',
            PageActive:1,
            List:[],
        };
    },
    methods:{
        ArreyCreator(x){
            for (let i = 0; i < x.length; i++) {
                const element = x[i];
                this.List.push(element)
            }
        },
        Research(){

            Bus2.$emit('send-data', this.InputSearch);
            Bus2.$emit('send-data-2', this.PageActive);
            this.List = [];

            const axios = require('axios');
            let movie_url = 'https://api.themoviedb.org/3/search/movie?api_key=aa241e36a559a2927e235d5e8f93f3b5&query=' + `${this.InputSearch}`;
            let tv_url = 'https://api.themoviedb.org/3/search/tv?api_key=aa241e36a559a2927e235d5e8f93f3b5&query=' + `${this.InputSearch}`;
            const request_movie = axios.get(movie_url);
            const request_tv = axios.get(tv_url);

            axios
            .all([request_movie, request_tv]).then(axios.spread((...responses) => {
                const response_movie = responses[0]
                const response_tv = responses[1]
                this.ArreyCreator(response_movie.data.results);
                this.ArreyCreator(response_tv.data.results);
                Bus1.$emit('send-data', this.List);
            }))
            .catch(function(error){console.log(error);});

        }
    }, 
}   
</script>

/* -------------------------------------------------------------------------- */

<style scoped lang="scss">
@import '../assets/scss/variables.scss';
</style>