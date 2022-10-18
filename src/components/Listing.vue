<template>
    <div class="listing">
        <div class ="header">
            <div class="labels"> </div>
            <div class="heading">{{ data?.title ?? "Inzerát" }}, {{ address }}</div>
        </div>
        <div class="images">
            <div v-for="image in data?.images" :key="image.view">
                <img loading="lazy" :src="image.gallery ?? image.view" />
            </div>
        </div>
        <div class="overview">
            <div class="listing-label price">
                <span>Cena</span>
                <span>{{ price }}</span>
            </div>
            <div class="listing-label" v-if="ownership">
                <span>Vlastnictví</span>
                <span>{{ ownership }}</span>
            </div>
            <div class="listing-label" v-if="age">
                <span>Stáří</span>
                <span>{{ age }}</span>
            </div>
        </div>
        <div class="actions">
            <div class="button" @click="toggleDetails">Zobrazit detaily</div>
            <a class="button" :href="webUrl" target="_blank">Otevřít na sreality</a>
            <a class="button" :href="data?.apiUrl" target="_blank">Api</a>
        </div>
        <div class="details" v-show="showDetails">
            <div class="description">
                <span v-html="description"></span>
            </div>
            <div class="items">
                <div class="listing-label" v-for="(item, key) in data?.items" :key="key">
                    <span>{{ key }}</span>
                    <checkmark v-if="item === false || item === true" :value="item"></checkmark>
                    <span v-else>{{ item }}</span>
                </div>
                <div class="listing-label" v-if="priceDrop">
                    <span>Sleva</span>
                    <span>{{priceDrop}}</span>
                </div>
            </div>
            <div class="meta">
                <div>
                    <h3>Vývoj cen</h3>
                    <price-chart class="chart" :data="priceHistory"></price-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Ownership } from "@/class/types";
import { defineComponent, PropType } from "vue";
import PriceChart from "./PriceChart.vue";
import Checkmark from "./Checkmark.vue";
import {PropertyLabels, PropertyCodes} from "@/class/types";

export default defineComponent({
    name: "Listing",
    components: {
        PriceChart,
        Checkmark,
    },
    props: {
        data: Object,
        autoexpand:  Boolean  as PropType<boolean>,
    },
    created() {
        if(this.autoexpand) this.showDetails = true;
    },
    data() {
        return {
            showDetails: false,
            PropertyLabels, PropertyCodes
        };
    },
    computed: {
        webUrl() {
            return 'https://' + this.data?.url;
        },
        description() {
            return this.data?.description ?? '-';
        },
        price() {
            let s = this.data?.price?.toLocaleString() + " Kč" ?? "-";
            if (this.data?.priceUnit) s += " " + this.data?.priceUnit;
            if (this.data?.pricePerMeter) s += ` (${Math.round(this.data?.pricePerMeter).toLocaleString()} Kč/m²)`;

            return this.data?.price ? s : "-";
        },
        priceHistory() {
            return this.data?.priceHistory;
        },
        age() {
            if (this.data?.inserted) {
                const age = Math.ceil((Date.now() - Date.parse(this.data?.inserted)) / (1000 * 60 * 60 * 24));
                return age + (age === 1 ? " den" : " dní");
            }
            else return false;
        },
        ownership() {
            return Ownership[this.data?.ownership] ?? false;
        },
        priceDrop() {
            return this.data?.priceDropPercent > 0 ? `${this.data?.priceDropPercent} %` : false;
        },
        address() {
            return this.data?.address ?? this.data?.locality?.name ?? "";
        },
    },
    methods: {
        toggleDetails() {
            this.showDetails = ! this.showDetails;
        }
    }
});
</script>

<style lang="scss">
@import "../style/labels.scss";


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

    &>div {
        padding: 4px 20px;
    }
}

.header {
    outline: solid brown 1px;
    background-color: #f2f2f2;
}

.heading {
    color: brown;
    font-size: 1.5em;
   
}

.images {
    display: flex;
    gap: 6px;
    overflow-x: auto;

    img {
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

.description {
    grid-column: 1/3;
    padding-bottom: 10px;
}

.details {
    display: flex;
    flex-direction: column;

    @media only screen and (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .items {
        display: flex;
        flex-flow: column;
        gap: 6px;

        .listing-label {
            background-color: #f2f2f2;
            grid-template-columns: 1fr 1fr;
        }
    }

    .meta {
        padding: 10px;
    }
}

.listing-label {
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
