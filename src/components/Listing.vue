<template>
    <div class="listing">
        <div class="heading">{{ data?.title ?? "Inzerát" }}</div>
        <div class="images">
            <div v-for="image in data?.images" :key="image.gallery">
                <img loading="lazy" :src="image.gallery" @click="openImage(image.view)" />
            </div>
        </div>
        <div class="overview">
            <div class="label price">
                <span>Cena</span>
                <span>{{ price }}</span>
            </div>
            <div class="label description">
                <span>Popis</span>
                <span>{{ data?.description ?? "-" }}</span>
            </div>
        </div>
        <div class="actions">
            <div class="button" @click="toggleDetails">Zobrazit detaily</div>
            <a class="button" :href="'https://' + data?.url" target="_blank">Otevřít na sreality</a>
            <a class="button" :href="data?.apiUrl" target="_blank">Api</a>
        </div>
        <div class="details" v-show="showDetails">
            <div class="items">
                <div class="label" v-for="(item, key) in data?.items" :key="key">
                    <span>{{ key }}</span>
                    <span>{{ item }}</span>
                </div>
            </div>
            <div class="meta">
                <div  v-if="priceHistory">
                <h3>Vývoj cen</h3>
                <price-chart class="chart" :data="priceHistory"></price-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PriceChart from "./PriceChart.vue";

export default defineComponent({
    name: "Listing",
    components: {
        PriceChart,
    },
    props: {
        data: Object,
    },
    data() {
        return {
            showDetails: false,
        };
    },
    computed: {
        price() {
            let s = this.data?.price + " Kč" ?? "-";
            if (this.data?.priceUnit) s += " " + this.data?.priceUnit;
            if (this.data?.pricePerMeter) s += ` (${this.data?.pricePerMeter} Kč/m²)`;

            return s;
        },
        priceHistory() {
            if(!this.data?.priceHistory || Object.keys(this.data?.priceHistory).length < 2) return false;
            return this.data.priceHistory;
        },
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
        },
        openImage(url: string) {
            console.log('not supported');
        }
    },
});
</script>

<style lang="scss">
.button {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 4px;
    background: coral;
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background: brown;
    }
}

.listing {
    display: flex;
    flex-flow: column;
    outline: solid brown 1px;
    border-radius: 10px;
    overflow: hidden;

    & > div {
        padding: 10px 20px;
    }
}

.heading {
    color: brown;
    font-size: 2em;
    outline: solid brown 1px;
    background-color: #f2f2f2;
}

.images {
    display: flex;
    gap: 6px;
    overflow-x: auto;

    img {
        max-height: 300px;
    }

    img:not(:hover) {
        max-height: 200px;
    }
}

.overview {
    display: flex;
    flex-flow: column;
    gap: 6px;
}

.actions {
    display: flex;
    flex-flow: row;
    gap: 6px;
    outline: solid brown 1px;
}

.details {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .items {
        display: flex;
        flex-flow: column;
        gap: 6px;

        .label {
            background-color: #f2f2f2;
            grid-template-columns: 1fr 1fr;
        }
    }

    .meta {
        padding: 10px;
    }
}

.label {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 10px;

    span:first-child {
        width: 100%;
        font-weight: bold;
        text-align: right;
        color: brown;
    }

    &.description {
        text-justify: justify;
    }
}

.price {
    font-weight: bold;
}
</style>
