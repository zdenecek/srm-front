<template>
    <div>
        <listings-filter @update="update"></listings-filter>
        <div class="listings">
            <div class="listings" :class="{ 'blur-deleted' : blurDeleted }">
                <h1>{{ listingsCount }} inzerátů</h1>

                <pagination
                            v-show="listingsCount > perPage"
                     ;       v-model="page"
                            :records="listingsCount"
                            :per-page="perPage"
                            @paginate="updatePage"
                            :autoexpand="expand" />

                <span v-show="loading">Inzeráty se načítají...</span>
                <listing v-for="listing in listings" :data="listing" :key="listing['_id']"></listing>
            </div>
            <pagination
                        v-show="listingsCount > perPage"
                        v-model="page"
                        :records="listingsCount"
                        :per-page="perPage"
                        @paginate="updatePage" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Listing from "@/components/Listing.vue";
import axios from "axios";
import _, { filter } from "lodash";
import ListingsFilter from "./ListingsFilter.vue";
import { FilterObject } from "@/class/FilterObject";
import { MunicipalityObject } from "@/class/MunicipalityObject";
// @ts-ignore
import Pagination from "v-pagination-3";

export default defineComponent({
    name: "ListingsView",
    components: {
        Listing,
        ListingsFilter,
        Pagination,
    },
    data() {
        return {
            listings: [] as Array<any>,
            listingsCount: 0,
            perPage: parseInt(this.$route.query.perPage as string) || 20,
            page: parseInt(this.$route.query.p as string) || 1,
            loading: false,
            filter: undefined as FilterObject | undefined,
            municipalitiesFilter: [] as Array<MunicipalityObject>,
                // has to be on data, because I cannot add another computed property (somewhat creates deep type errors (?))
            blurDeleted: true,
        };
    },

    created() {
        const debounced = _.debounce(this.getListings, 1000);
        this.getListingsDebouced = () => {
            this.loading = true;
            debounced();
        };
        
    },
    mounted() {
        // for compatibility with old links with id: /?id=123
        if (this.$route.query.id) this.getListings(this.$route.query.id as string);
        else this.getListings();

        console.log(this.filter);
    },

    computed: {
        expand() {
            // volar nonsense
            if(this.listingsCount === 1) return true;
            return false;
        }
        
    },

    watch: {
        page() {
            this.$router.push({ query: { p: this.page } });
        },
        filter: {
            handler() {
                if(this.filter?.deleted === "deleted") this.blurDeleted = false;
                else this.blurDeleted = true;
            },
            deep: true,
        },
    },

    methods: {
        update(filter?: FilterObject, municipalities?: Array<MunicipalityObject>) {
            this.filter = filter;
            this.page = 1;
            this.municipalitiesFilter = municipalities || [];
            this.getListingsDebouced();
            console.log("update")
        },

        getListings(id?: string) {
            console.debug("fetching listings");
            this.loading = true;
            let params = {
                p: this.page,
                perPage: this.perPage,
            } as any;

            if (this.filter) {
                params = { ...params, ...this.filter.toParams() };
            }

            if (this.municipalitiesFilter.length > 0) {
                params.municipalities = this.municipalitiesFilter
                    .filter((a) => a.selected)
                    .map((a) => a._id ?? "0")
                    .join(",");
            }

            if (id) params = { id };

            axios
                .post("getAll", {
                    ...params,
                })
                .then((response) => {
                    this.listingsCount = response.data.count;
                    this.listings = response.data.listings;
                    this.loading = false;
                    if(response.data.chain) console.debug(response.data.chain);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getListingsDebouced() {
            return;
        },
        updatePage() {
            if (window.pageYOffset > 1200) window.scrollTo(0, 0);

            this.getListingsDebouced();
        },
    },
});
</script>

<style lang="scss">
.listings {
    display: flex;
    flex-direction: column;
    gap: 20px;
}


.blur-deleted .deleted:not(:hover) .top-labels,
.blur-deleted .deleted:not(:hover) .images,
.blur-deleted .deleted:not(:hover) .overview, 
.blur-deleted .deleted:not(:hover) .actions {
    opacity: 45%;
}

.pagination {
    list-style: none;
    display: flex;
    gap: 4px;
    justify-content: center;
    padding: 0;

    button[disabled] {
        opacity: 0.5;
    }

    button {
        background-color: antiquewhite;
        border: 1px brown solid;
        color: brown;
        border-radius: 5px;
        padding: 2px 5px;

        &.active,
        &:not([disabled]):hover {
            background-color: brown;
            color: antiquewhite;
        }
    }
}

.VuePagination__count {
    display: none;
}
</style>
