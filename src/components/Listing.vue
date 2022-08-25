<template>
    <div class="listing">
        <h1>Listing</h1>
        <span>{{ data }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Listing",
    props: {
        data: Object,
    },
});
</script>
