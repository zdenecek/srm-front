<template>
    <canvas class="price-chart" ref="canvas"></canvas>
</template>

<style lang="scss">
.price-chart {
    width: 100%;
    height: 200px;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Chart, ChartItem } from "chart.js";
import PriceHistoryHelper from "@/class/PriceHistory";

export interface PriceChartData {
    priceHistory: { [key: string]: number };
    deleted?: string;
}

export default defineComponent({
    name: "PriceChart",
    props: {
        data: Object as PropType<PriceChartData>,
    },
    mounted() {

        if(!this.data?.priceHistory) return;
        const normalizedData = PriceHistoryHelper.normalize(this.data.priceHistory, this.data?.deleted);

        new Chart(this.$refs.canvas as ChartItem, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "Cena",
                        fill: true,
                        borderColor: 'brown',
                        data: normalizedData,
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

