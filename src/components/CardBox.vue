<template>
    <div class="container-fluid d-flex flex-column align-items-center ">

        <div class="container d-flex justify-content-center">
            <label>Filtra quest apagina selezionando un genere:</label>
            <select v-model="SelectValue">
                    <option value="All" selected >All</option>
                    <SelectBox v-for='element in AllGenrsList' :key='element.id' :genreId='element.id' :genreName='element.name' />
            </select>
        </div>

        <div class="container d-flex flex-wrap justify-content-center">
            <!----------- card -->
            <div v-for='(element, index) in CardList' :key='index' @mouseleave="ShowData = false" class="card-box" v-bind:class ="(element.genre_ids.includes(SelectValue) || SelectValue == 'All' )?'':'d-none'">
                <img v-if='element.poster_path != undefined' :src="'https://image.tmdb.org/t/p/w342/' + element.poster_path" :alt="(element.name == undefined)? element.title : element.name" class="card-image">
                <img v-else src="../assets/img/404pic.png" :alt="(element.name == undefined)? element.title : element.name" class="card-image">
                <div class="card-data">
                    <!----------- nome o titolo -->
                    <template v-if='element.name == undefined'>
                        <p><b>Titolo: </b> "{{element.title}}"</p>
                        <p><b>Titolo originale: </b>  "{{element.original_title}}"</p>
                    </template>
                    <template v-else>
                        <p><b>Titolo: </b> "{{element.name}}"</p>
                        <p><b>Titolo originale: </b>  "{{element.original_name}}"</p>
                    </template>
                    <!----------- lingua -->
                    <div v-if="verifyLanguage(element.original_language.toUpperCase())" class="my-3">
                        <img :src= "require(`../assets/img/${element.original_language.toUpperCase()}.jpeg`)" alt="">
                    </div>
                    <!----------- voto -->
                    <p v-else >{{element.original_language.toUpperCase()}}</p>
                    <div class="vote-container d-flex">
                        <p><b>Voto:&nbsp; </b></p>
                        <img v-for="star in Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-solid.svg" alt="">
                        <img v-for="star in 5 - Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-regular.svg" alt="">
                    </div>
                    <!----------- extra info -->
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
import { Bus1 } from '../main'
import { Bus3 } from '../main'
//--------------------------------------------
//---------------components-------------------
import SelectBox from './SelectBox.vue';
//--------------------------------------------



export default {
    name: '',
    components: {
        SelectBox,
    },
    data() {
        return {
            CardList:[],
            AllGenrsList:[],
            ShowActorsList:[],
            ShowGenersList:[],
            ShowData: false,
            InputSelected:'',
            SelectValue:'All',
        };
    },
    methods:{
        verifyLanguage(x){
            if(x == 'EN' || x == 'IT' || x == 'ES' || x == 'DE' || x == 'FR'){return true} // --------------- sostituisco la nazionalita con immagine in base al nome del file
            else{return false}
        },
        ShowMoreData(x){   // --------------- creo due arrey che contengano le info extra da mostrare
            this.ShowActorsList = [];
            this.ShowGenersList = [];
            axios
            .get((x.name == undefined)? 'https://api.themoviedb.org/3/movie/' + `${x.id}` + '/credits?api_key=aa241e36a559a2927e235d5e8f93f3b5' : 'https://api.themoviedb.org/3/tv/' + `${x.id}` + '/credits?api_key=aa241e36a559a2927e235d5e8f93f3b5')
            .then(response => {this.ShowActorsList = response.data.cast})
            .catch(e => {console.error(e, 'errore di caricamento');})   
            for (let i = 0; i < this.AllGenrsList.length; i++) {
                const element = this.AllGenrsList[i];
                if(x.genre_ids.includes(element.id)){   
                    this.ShowGenersList.push(element)
                }
            }
            this.ShowData = true;
            console.log(this.SelectValue);
        },

    },
    created(){
        Bus1.$on('send-data', (data) => {this.CardList = data;}) // --------------- ricevo dati contenuti nell'arrey lista cards
        Bus3.$on('send-data', (data) => {this.CardList = data;})
    },
    mounted(){
        const axios = require('axios'); // --------------- richiesta per creare un arrey con tutti i generi disponibili
        const config = {
            method: 'get',
            url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=aa241e36a559a2927e235d5e8f93f3b5&query=i',
            headers: { }
        };
        axios(config)
        .then(response => {this.AllGenrsList = response.data.genres; console.log(this.AllGenrsList);})
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
p{margin:  10px 0;}
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