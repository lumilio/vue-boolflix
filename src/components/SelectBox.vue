<template>
    <option :value="genreId">{{genreName}}</option>
</template>

/* -------------------------------------------------------------------------- */

<script>
//-----------------utilities--------------------
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//--------------------------------------------
//---------------components-------------------
//--------------------------------------------



export default {
    name: '',
    components: {},
    props: {
        genreName: String,
        genreId: Number,
    },
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