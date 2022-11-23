<template>
    <canvas class="price-chart" ref="canvas"></canvas>
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

        // add price for today to have at least two entries
        const data = { ...this.data };
        const today = new Date(Date.now()).toISOString().split('T')[0];
        const all = Object.values(data);
        data[today] = all[all.length - 1];

        new Chart(this.$refs.canvas as ChartItem, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "Cena",
                        fill: true,
                        borderColor: 'brown',
                        data: data,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                    }
                }
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
