<template>
    <div class="container-fluid d-flex justify-content-center ">
        <div class="container d-flex flex-wrap justify-content-center">
            <div v-for='(element, index) in CardList' :key='index' @mouseleave="ShowData = false" class="card-box">
                <img :src="'https://image.tmdb.org/t/p/w342/' + element.poster_path" :alt="(element.name == undefined)? element.title : element.name" class="card-image">
                <div class="card-data">
                    <template v-if='element.name == undefined'>
                        <p><b>Titolo: </b> "{{element.title}}"</p>
                        <p><b>Titolo originale: </b>  "{{element.original_title}}"</p>
                    </template>
                    <template v-else>
                        <p><b>Titolo: </b> "{{element.name}}"</p>
                        <p><b>Titolo originale: </b>  "{{element.original_name}}"</p>
                    </template>
                    <div v-if="verifyLanguage(element.original_language.toUpperCase())" class="my-3">
                        <img :src= "require(`../assets/img/${element.original_language.toUpperCase()}.jpeg`)" alt="">
                    </div>
                    <p v-else >{{element.original_language.toUpperCase()}}</p>
                    <div class="vote-container d-flex">
                        <p><b>Voto:&nbsp; </b></p>
                        <img v-for="star in Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-solid.svg" alt="">
                        <img v-for="star in 5 - Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-regular.svg" alt="">
                    </div>
                    <div>
                        <p @click='ShowMoreData(element)' class="more-info">show extra data</p>
                        <p v-show="ShowData"> <b>Genere : </b> <span v-for='genre in ShowGenersList' :key='genre.id'>{{genre.name}}, </span></p>  
                        <p v-show="ShowData"> <b>Attori : </b> <span v-for='actor in ShowActorsList.slice(0, 5)' :key='actor.id'>{{actor.name}}, </span></p> 
                        <p v-show="ShowData" @click='ShowData = false' class="more-info"> hide extra data</p>
                    </div>
                    <p v-if='element.name == undefined' ><b>Categoria:</b> Film</p>
                    <p v-else > <b>Categoria:</b> Serie Tv</p>
                </div>
            </div>
        </div>
    </div>
</template>

/* -------------------------------------------------------------------------- */

<script>
//-----------------utilities--------------------
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios';

//--------------------------------------------
//---------------components-------------------
import { Bus1 } from '../main'
import { Bus3 } from '../main'
//--------------------------------------------



export default {
    name: '',
    components: {},
    data() {
        return {
            CardList:[],
            AllGenersList:[],
            ShowActorsList:[],
            ShowGenersList:[],
            ShowData: false,
            InputSelected:'',
        };
    },
    methods:{
        verifyLanguage(x){
            if(x == 'EN' || x == 'IT' || x == 'ES' || x == 'DE' || x == 'FR'){return true}
            else{return false}
        },
        ShowMoreData(x){
            this.ShowActorsList = [];
            this.ShowGenersList = [];
            axios
            .get((x.name == undefined)? 'https://api.themoviedb.org/3/movie/' + `${x.id}` + '/credits?api_key=aa241e36a559a2927e235d5e8f93f3b5' : 'https://api.themoviedb.org/3/tv/' + `${x.id}` + '/credits?api_key=aa241e36a559a2927e235d5e8f93f3b5')
            .then(response => {this.ShowActorsList = response.data.cast})
            .catch(e => {console.error(e, 'errore di caricamento');})   
            for (let i = 0; i < this.AllGenersList.length; i++) {
                const element = this.AllGenersList[i];
                if(x.genre_ids.includes(element.id)){   
                    this.ShowGenersList.push(element)
                }
            }
            this.ShowData = true;
        },
    },
    created(){
        Bus1.$on('send-data', (data) => {this.CardList = data;})
        Bus3.$on('send-data', (data) => {this.CardList = data;})
    },
    mounted(){
        const axios = require('axios');
        const config = {
            method: 'get',
            url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=aa241e36a559a2927e235d5e8f93f3b5&query=i',
            headers: { }
        };
        axios(config)
        .then(response => {this.AllGenersList = response.data.genres; console.log(this.AllGenersList);})
        .catch(function (error) {console.log(error);});
    }
} 
</script>

/* -------------------------------------------------------------------------- */

<style scoped lang="scss">
@import '../assets/scss/variables.scss';
body{
    overflow-y: auto;
}
.container-fluid{
    padding-top: 40px;
    padding-bottom: 70px;

}
.vote-container img{
    width: 20px;
}
.card-box{
    border: 1px solid black;
    margin: 10px 20px;
    min-width: 342px;
    min-height: 500px;
    position: relative;
    background-color: black;
}
.card-image{
    color: white;
}
.card-data{
    position: absolute;
    z-index: 1;
    color: white;
    top: 40px;
    left: 20px;
    display: none;
}
.card-box:hover .card-data{
    display: block;
}
.card-box:hover .card-image{
    opacity: 0.2;
}
p{
    margin:  10px 0;
}

.more-info{
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}
.more-info:hover{
    color: rgb(183, 0, 255);
    cursor: pointer;
}
</style>