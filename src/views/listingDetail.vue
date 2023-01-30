<template>
    <listing-detail-view></listing-detail-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListingDetailView from "@/components/ListingDetail.vue";

export default defineComponent({
    name: "ListingDetail",
    components: {
        ListingDetailView,
    },
});

</script>