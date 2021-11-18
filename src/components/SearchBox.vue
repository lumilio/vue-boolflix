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
            Bus1.$emit('xxx', this.List);
        }
    }, 
}   
</script>

/* -------------------------------------------------------------------------- */

<style scoped lang="scss">
@import '../assets/scss/variables.scss';

</style>