<template>
    <div class="container-fluid d-flex justify-content-center">
        <div class="container">
             <div v-for='element in List' :key='element.id'>
                <p>{{element.title}}</p>
                <p>{{element.original_title}}</p>
                <p>{{element.original_language}}</p>
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
    props: {},
/*  data() {},
    methods: {},
    computed: {},
    mounted() {}, */
}
</script>

/* -------------------------------------------------------------------------- */

<style scoped lang="scss">
@import '../assets/scss/variables.scss';

</style>