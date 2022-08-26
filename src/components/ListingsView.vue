<template>
    <div class="listings">
        <h1>Filtr a vyhledávání</h1>

        <h1>{{listingsCount}} inzerátů</h1>
        <div class="listings">
            <listing v-for="listing in listings" :data="listing" :key="listing['_id']"></listing>

        </div>
        <vue-awesome-paginate
            :total-items="listingsCount"
            :items-per-page="perPage"
            :max-pages-shown="5"
            :current-page="1"
            :on-click="updatePage"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Listing from "@/components/Listing.vue";
import axios from "axios";

export default defineComponent({
    name: "ListingsView",
    components: {
        Listing,
    },
    data() {
        return {
            listings: [],
            listingsCount: 1,
            perPage: 20,
            page: 1
        };
    },

    created() {
        this.getListings();
    },

    watch: {
        page() {
            this.getListings();
        }
    },

    methods: {
        getListings() {
            axios
                .get("getAll", {
                    params: {
                        p: this.page,
                        perPage: this.perPage,
                    },
                })
                .then((response) => {
                    this.listingsCount = response.data.count;
                    this.listings = response.data.listings;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updatePage(page: number) {
          window.scrollTo(0,0);
          
            this.page = page;
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.listings {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

</style>
