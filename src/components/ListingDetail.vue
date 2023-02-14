<template>
    <div>
        <span v-show="loading">Inzerát se načítá...</span>
        <div v-if="listing !== null">
            <listing :data="listing" :autoexpand="true"></listing>
        </div>
    </div>
</template>

<script lang="ts">
import {  defineComponent } from "vue";
import Listing from "@/components/Listing.vue";
import axios from "axios";
import { useHead } from '@unhead/vue';

export default defineComponent({
    name: "ListingsDetail",

    components: {
        Listing,
    },

    data() {
        return {
            loading: true,
            listing: null as any
        };
    },

    created() {

        this.getListing(this.$route.params.id as string);
    },

    methods: {

        getListing(id?: string) {
            console.debug("fetching listing");
            this.loading = true;


            axios
                .get(`listing/${id}`)
                .then((response) => {

                    console.log(response.data);
                    this.listing = response.data;
                    this.loading = false;
                    useHead({  title: this.listing.title + ' | Sreality Manager'});
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
});
</script>

<style lang="scss">

</style>
