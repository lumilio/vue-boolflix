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
        Research(){
            const axios = require('axios');
            const config = {
                method: 'get',
                url: 'https://api.themoviedb.org/3/search/movie?api_key=aa241e36a559a2927e235d5e8f93f3b5' + '&page=' + `${this.PageActive}` + '&query=' + `${this.InputSearch}` ,
                headers: { }
            };

            axios(config).then(response => {
                this.List = response.data.results;
                Bus1.$emit('send-special', this.List); 
            })
            .catch(function(error){console.log(error);});
            
        }
    }, 
}   
</script>

/* -------------------------------------------------------------------------- */

<style scoped lang="scss">
@import '../assets/scss/variables.scss';
</style>