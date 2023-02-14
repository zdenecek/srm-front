<template>
   
    <div class="container">
        <div class="nav">
            <router-link active-class="active" class="nav-item" to="/">Inzeráty</router-link>
            <router-link active-class="active" class="nav-item" to="/about">Informace</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App",

});
</script>

<style lang="scss">

.nav {
    display: flex;
}

.nav-item {
    flex-grow: 1;
    text-align: center;
    outline: brown solid 1px;
    text-decoration: none;
    color: brown;

    &.active {
        background-color: lightgray;
    }
}

* {
    box-sizing: border-box;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana,
        sans-serif;
}

body {
    font-size: 0.8em;
}

.container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 100px;
}

h1,
h2,
h3 {
    padding: 0;
    margin: 0;
    color: brown;
}

input:focus {
    outline: 2px solid orange;
}

.pagination-container {
    display: flex;
    column-gap: 10px;
    margin: auto;
}

</style>
