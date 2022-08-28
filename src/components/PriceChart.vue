<template>
    <canvas class="price-chart" ref="canvas" ></canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Chart, ChartItem } from "chart.js";

export default defineComponent({
    name: "PriceChart",
    props: {
        data: Object,
    },
    mounted() {
       
        const ctx = document.getElementById("myChart");
        const myChart = new Chart(this.$refs.canvas as ChartItem, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "Cena",
                         fill: true,
                        borderColor: 'brown',
                        data: this.data,
                    },
                ],
            },
        });
    },
});
</script>

<style lang="scss">
.price-chart {
    width: 100%;
    height: 200px;
}
</style>
