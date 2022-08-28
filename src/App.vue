<template>
    <div class="container">
        <router-view></router-view>
    </div>
 
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App",

});
</script>

<style>

* {
    box-sizing: border-box;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}

.container {
    max-width: 900px;
    margin: 0 auto;
    padding-bottom: 100px;
}

h1, h2, h3 {
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
.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}
.paginate-buttons:hover {
    background-color: #d8d8d8;
}
.active-page {
    background-color:  #ca742d;
    border: 1px solid  #ca742d;
    color: white;
}
.active-page:hover {
    background-color: #ca742d;
}
</style>
