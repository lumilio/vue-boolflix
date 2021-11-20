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
import { Bus3 } from '../main'
//--------------------------------------------



export default {
    name: '',
    components: {},
    props: {},
    data() {
        return {
            PageCounter:1,
        };
    },
    methods:{
        PreviusPage(){
            if(this.PageCounter > 1){
                this.PageCounter --;
                Bus3.$emit('send-special', this.PageCounter);
            }
        },
        NextPage(){
            if(this.PageCounter < 10){
                this.PageCounter ++;
                Bus3.$emit('send-special', this.PageCounter);
            }
        }
    }
}
</script>

/* -------------------------------------------------------------------------- */

<style scoped lang="scss">
@import '../assets/scss/variables.scss';
</style>