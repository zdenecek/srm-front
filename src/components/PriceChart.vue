<template>
    <canvas class="price-chart" ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Chart, ChartItem } from "chart.js";

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



        // add price for today to have at least two entries
        const data = { ...this.data?.priceHistory }
        // sort just in case
        const ordered = Object.keys(data).sort().reduce(
        (obj, key) => { 
            obj[key] = data[key]; 
            return obj;
        }, 
        {} as Record<string, number>
        );


        const lastDate = this.data?.deleted ?? new Date(Date.now()).toISOString().split('T')[0];
        const values = Object.values(ordered);
        ordered[lastDate] = values[values.length - 1];


        new Chart(this.$refs.canvas as ChartItem, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "Cena",
                        fill: true,
                        borderColor: 'brown',
                        data: ordered,
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
