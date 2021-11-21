<template>
    <div class="container-fluid d-flex justify-content-center">
        <div class="container d-flex justify-content-center align-items-center">
            <button @click="PreviusPage">Previus</button>
            <p>{{PageCounter}}</p>
            <button @click="NextPage">Next</button>
        </div>
    </div>
</template>

/* -------------------------------------------------------------------------- */

<script>
//-----------------utilities--------------------
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//--------------------------------------------
//---------------components-------------------
import { Bus2 } from '../main'
import { Bus3 } from '../main'
//--------------------------------------------



export default {
    name: '',
    components: {},
    props: {},
    data() {
        return {
            ListForPage:[],
            PageCounter:1,
            InputPage:'',
        };
    },
    methods:{
        PreviusPage(){
            if(this.PageCounter > 1){
                this.PageCounter --;
                this.ChangePageRequest();

            }
        },
        NextPage(){
            if(this.PageCounter < 10){
                this.PageCounter ++;
                this.ChangePageRequest();

            }
        },
        ArreyCreator(x){
            for (let i = 0; i < x.length; i++) {
                const element = x[i];
                this.ListForPage.push(element)
            }
        },
        ChangePageRequest(){
            this.ListForPage = [];

            const axios = require('axios');
            let movie_url = 'https://api.themoviedb.org/3/search/movie?api_key=aa241e36a559a2927e235d5e8f93f3b5' + '&page=' + `${this.PageCounter}` + '&query=' + `${this.InputPage}`;
            let tv_url = 'https://api.themoviedb.org/3/search/tv?api_key=aa241e36a559a2927e235d5e8f93f3b5&query=' + '&page=' + `${this.PageCounter}` + '&query=' + `${this.InputPage}`;
            const request_movie = axios.get(movie_url);
            const request_tv = axios.get(tv_url);

            axios
            .all([request_movie, request_tv]).then(axios.spread((...responses) => {
                const response_movie = responses[0]
                const response_tv = responses[1]
                this.ArreyCreator(response_movie.data.results);
                this.ArreyCreator(response_tv.data.results);
                Bus3.$emit('send-data', this.ListForPage); 
                console.log(this.ListForPage); 
            }))
            .catch(function(error){console.log(error);});
        }
    },

    created(){
        Bus2.$on('send-data', (data) => {this.InputPage = data;});
        Bus2.$on('send-data', (data) => {this.PageCounter = data;});
    }
}
</script>

/* -------------------------------------------------------------------------- */

<style scoped lang="scss">
@import '../assets/scss/variables.scss';
</style>