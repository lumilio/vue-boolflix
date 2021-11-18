<template>
    <div class="container-fluid d-flex justify-content-center">
        <div class="container">
            <Logo1/>
            <SearchBox/>
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
import Logo1 from './Logo1.vue';
import SearchBox from './SearchBox.vue';
//--------------------------------------------



export default {
    name: '',
    components: {
        Logo1,
        SearchBox,
    },
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

.container-fluid{
    background-color: black;
    color: white;
}
</style>