<template>
    <div class="listings">
        <div class="controls">
            <h1>Filtr a vyhledávání</h1>
            <form @submit.prevent="getListings">
                <input class="search" placeholder="Vyhledávání..." v-model="query" />
            </form>
        </div>

        <div class="listings">
            <h1>{{ listingsCount }} inzerátů</h1>
            <span v-show="loading">Inzeráty se načítají...</span>
            <listing v-for="listing in listings" :data="listing" :key="listing['_id']"></listing>
        </div>
        <vue-awesome-paginate
            v-show="listingsCount > perPage"
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
import _ from "lodash";

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
            page: 1,
            query: "",
            lastQuery: "",
            loading: false,
        };
    },

    created() {
        this.getListingsDebouced = _.debounce(() => {
            if (this.query === this.lastQuery) return;
            this.lastQuery = this.query;
            this.getListings();
        }, 1000);
        this.getListings();
    },

    watch: {
        page() {
            this.getListings();
        },
        query() {
            this.getListingsDebouced();
        },
    },

    methods: {
        getListings() {
            console.debug("fetching listings");
            this.loading = true;
            let params = {
                p: this.page,
                perPage: this.perPage,
            } as any;

            if (this.query) {
                params.q = this.query;
            }

            axios
                .get("getAll", {
                    params,
                })
                .then((response) => {
                    this.listingsCount = response.data.count;
                    this.listings = response.data.listings;
                    this.loading = false;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getListingsDebouced() {
            return;
        },
        updatePage(page: number) {
            window.scrollTo(0, 0);

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

.search {
    padding: 5px 4px;
    max-width: 400px;
}

.controls {
    display: flex;
    gap: 10px;
    flex-flow: column;

    form {
        padding: 10px 0;
        display: grid;
        grid-template-columns: 1 1;
        gap: 10px;
    }

    .search {
        border: 1px solid brown;
        border-radius: 4px;
        padding: 5px;
        font-size: 1.2rem;
    }
}
</style>
