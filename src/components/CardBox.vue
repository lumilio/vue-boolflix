<template>
    <div class="container-fluid d-flex justify-content-center ">
        <div class="container d-flex flex-wrap justify-content-center">
             <div v-for='(element, index) in CardList' :key='index' class="film-box  col-xl-2 col-lg-3 col-md-4 col-12">
                <p>{{element.title}}</p>
                <p>{{element.original_title}}</p>
                <p>{{element.original_language.toUpperCase()}}</p>
                <p>{{element.vote_average}}</p>
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
    created(){
        Bus1.$on('send-special', (data) => {this.CardList = data;})
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