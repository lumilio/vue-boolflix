<template>
    <div class="container-fluid d-flex justify-content-center ">
        <div class="container d-flex flex-wrap justify-content-center">
             <div v-for='(element, index) in CardList' :key='index' class="film-box  ">

                 <div v-if='element.title != undefined'>
                     <img :src="'https://image.tmdb.org/t/p/w342/' + element.poster_path" alt="">
                    <p>{{element.title}}</p>
                    <p>{{element.original_title}}</p>
                    <div v-if="verifyLanguage(element.original_language.toUpperCase())">
                        <img :src= "require(`../assets/img/${element.original_language.toUpperCase()}.jpeg`)" alt="">
                    </div>
                    <p v-else >{{element.original_language.toUpperCase()}}</p>
                    <p class="vote-container d-flex">
                        <img v-for="star in Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-solid.svg" alt="">
                        <img v-for="star in 5 - Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-regular.svg" alt="">
                    </p>
                    <p>Film</p>
                 </div>


                 <div v-else>
                     <img :src="'https://image.tmdb.org/t/p/w342/' + element.poster_path" alt="">
                    <p>{{element.name}}</p>
                    <p>{{element.original_name}}</p>
                    <div v-if="verifyLanguage(element.original_language.toUpperCase())">
                        <img :src= "require(`../assets/img/${element.original_language.toUpperCase()}.jpeg`)" alt="">
                    </div>
                    <p v-else >{{element.original_language.toUpperCase()}}</p>
                    <p class="vote-container d-flex">
                        <img v-for="star in Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-solid.svg" alt="">
                        <img v-for="star in 5 - Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-regular.svg" alt="">
                    </p>
                    <p>Serie Tv</p>
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
            PageSelected:1,
            InputSelected:'',
        };
    },
    methods:{
        verifyLanguage(x){
            if(x == 'EN' || x == 'IT' || x == 'ES' || x == 'DE' || x == 'FR'){return true}
            else{return false}
        },

    },
    created(){
        Bus1.$on('send-data', (data) => {this.CardList = data;})
        Bus3.$on('send-data', (data) => {this.CardList = data;})
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
    padding-bottom: 110px;

}
.vote-container img{
    width: 20px;
}
.film-box{
    padding: 10px 20px;
    border: 1px solid black;
    margin: 10px 20px;
}
</style>