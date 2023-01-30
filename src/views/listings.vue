<template>
    <listings-view></listings-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListingsView from "@/components/ListingsView.vue";

export default defineComponent({
    name: "Listings",
    components: {
        ListingsView,
    },
});

</script>