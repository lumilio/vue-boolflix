<template>
    <div class="container-fluid d-flex justify-content-center ">
        <div class="container d-flex flex-wrap justify-content-center">
             <div v-for='(element, index) in CardList' :key='index' class="film-box  col-xl-2 col-lg-3 col-md-4 col-12">

                 <div v-if='element.title != undefined'>
                    <p>{{element.title}}</p>
                    <p>{{element.original_title}}</p>
                    <div v-if="verifyLanguage(element.original_language.toUpperCase())"><img :src= "require(`../assets/img/${element.original_language.toUpperCase()}.jpeg`)" alt=""></div>
                    <p v-else >{{element.original_language.toUpperCase()}}</p>
                    <p>{{element.vote_average}}</p>
                    <p>Film</p>
                 </div>

                 <div v-else>
                    <p>{{element.name}}</p>
                    <p>{{element.original_name}}</p>
                    <div v-if="verifyLanguage(element.original_language.toUpperCase())"><img :src= "require(`../assets/img/${element.original_language.toUpperCase()}.jpeg`)" alt=""></div>
                    <p v-else >{{element.original_language.toUpperCase()}}</p>
                    <p>{{element.vote_average}}</p>
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
//--------------------------------------------



export default {
    name: '',
    components: {},
    data() {
        return {
            CardList:[],
        };
    },
    methods:{
        verifyLanguage(x){
            if(x == 'EN' || x == 'IT' || x == 'ES' || x == 'DE' || x == 'FR'){return true}
            else{return false}
        }
    },
    created(){
        Bus1.$on('send-special', (data) => {this.CardList = data;})
        console.log();
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
.film-box{
    padding: 10px 20px;
    border: 1px solid black;
    margin: 10px 20px;
}
</style>