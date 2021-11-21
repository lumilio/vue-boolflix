<template>
    <div class="container-fluid d-flex justify-content-center ">
        <div class="container d-flex flex-wrap justify-content-center">


             <div v-for='(element, index) in CardList' :key='index' class="card-box">
                <img :src="'https://image.tmdb.org/t/p/w342/' + element.poster_path" :alt="(element.name == undefined)? element.title : element.name" class="card-image">
                <div class="card-data">
                    <div v-if='element.name == undefined'>
                        <p><b>Titolo: </b> "{{element.title}}"</p>
                        <p><b>Titolo originale: </b>  "{{element.original_title}}"</p>
                    </div>
                    <div v-else>
                        <p><b>Titolo: </b> "{{element.name}}"</p>
                        <p><b>Titolo originale: </b>  "{{element.original_name}}"</p>
                    </div>
                    <div v-if="verifyLanguage(element.original_language.toUpperCase())" class="my-3">
                        <img :src= "require(`../assets/img/${element.original_language.toUpperCase()}.jpeg`)" alt="">
                    </div>
                    <p v-else >{{element.original_language.toUpperCase()}}</p>
                    <div class="vote-container d-flex">
                        <p><b>Voto:&nbsp; </b></p>
                        <img v-for="star in Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-solid.svg" alt="">
                        <img v-for="star in 5 - Math.round(element.vote_average/2)" :key="star.id" src="../assets/img/star-regular.svg" alt="">
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
.card-box{
    border: 1px solid black;
    margin: 10px 20px;
    min-width: 342px;
    min-height: 400px;
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

</style>