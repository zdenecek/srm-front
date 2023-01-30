<template>
    <div class="listing">
        <div class="header">
            <div class="heading">{{ data?.title ?? "Inzerát" }}, {{ address }}</div>
            <div class="top-labels">
                <span v-if="data?.prop" :class="'top-label top-label-prop top-label-prop-' + data.prop"> {{ propLabel }}
                </span>
                <span v-if="data?.deal" :class="'top-label top-label-deal top-label-deal-' + data.deal"> {{ dealLabel }}
                </span>
                <span v-if="data?.ownership"
                      :class="'top-label top-label-ownership top-label-ownership-' + data.ownership"> {{ ownershipLabel
                      }} </span>
                <span v-if="priceDropLabel"
                      :class="'top-label top-label-price-drop top-label-price-drop-' + priceDropLabel"> {{ priceDrop
                      }} </span>
                <span v-if="data?.sub" :class="'top-label top-label-sub top-label-sub-' + data.sub"> {{ subLabel }}
                </span>
                <span v-if="data?.deleted" class="top-label top-label-deleted"> Smazaný inzerát </span>
            </div>
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
            <div class="listing-label" v-if="priceDrop">
                <span>Sleva</span>
                <span>{{priceDrop}}</span>
            </div>
        </div>
        <div class="actions">
            <div class="button" @click="toggleDetails">Zobrazit detaily</div>
            <a class="button" :href="webUrl" target="_blank">Otevřít na sreality</a>
            <a class="button" :href="detailUrl" target="_blank">Detail inzerátu</a>
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

            </div>
            <div class="meta">
                <div>
                    <h3>Vývoj cen</h3>
                    <price-chart class="chart" :data="chartData"></price-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Ownership, OwnershipLabels, OwnershipType, PropertyType } from "@/class/types";
import { defineComponent, PropType } from "vue";
import PriceChart from "./PriceChart.vue";
import Checkmark from "./partial/Checkmark.vue";
import { PropertyLabels, PropertyCodes, DealLabels, SubcategoryLabels } from "@/class/types";

export default defineComponent({
    name: "Listing",
    components: {
        PriceChart,
        Checkmark,

    },
    props: {
        data: Object,
        autoexpand: Boolean as PropType<boolean>,
    },
    created() {
        if (this.autoexpand) this.showDetails = true;
    },
    data() {
        return {
            showDetails: false,
            PropertyLabels, PropertyCodes, DealLabels, SubcategoryLabels
        };
    },
    computed: {
        chartData() {
            return {
                priceHistory: this.data?.priceHistory,
                deleted: this.data?.deleted,
            }
        },
        priceDropLabel() {
            if (this.data?.priceDropPercent >= 0.5) return 50;
            if (this.data?.priceDropPercent >= 0.4) return 40;
            if (this.data?.priceDropPercent >= 0.3) return 30;
            if (this.data?.priceDropPercent >= 0.25) return 25;
            if (this.data?.priceDropPercent >= 0.2) return 20;
            if (this.data?.priceDropPercent >= 0.15) return 15;
            if (this.data?.priceDropPercent >= 0.10) return 10;
            if (this.data?.priceDropPercent >= 0.075) return 7;
            if (this.data?.priceDropPercent >= 0.03) return 3;
            return false;
        },
        propLabel() {
            return PropertyLabels[this.data?.prop as PropertyType];
        },
        ownershipLabel() {
            return OwnershipLabels[this.data?.ownership as OwnershipType];
        },
        dealLabel() {
            return DealLabels[this.data?.deal as PropertyType];
        },
        subLabel() {
            return SubcategoryLabels[this.data?.prop][this.data?.sub];
        },
        webUrl() {
            return 'https://' + this.data?.url;
        },
        detailUrl() {
            return "/listing/" + this.data?.id ;
        },
      
        description() {
            return this.data?.description ?? '-';
        },
        price() {
            let s = this.data?.price?.toLocaleString() + " Kč" ?? "-";
            if (this.data?.priceUnit) s += " " + this.data?.priceUnit;
            if (this.data?.pricePerMeter) s += ` (${Math.floor(this.data?.pricePerMeter).toLocaleString()} Kč/m²)`;

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
            return this.data?.priceDropPercent > 0 ? `${Math.round(this.data?.priceDropPercent * 100)} %` : false;
        },
        address() {
            return this.data?.address ?? this.data?.locality?.name ?? "";
        },
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
        }
    }
});
</script>

<style lang="scss">
@import "../style/labels.scss";

.button {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 4px;
    background: coral;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all .5s;

    &:hover {
        background: brown;
        color: white;
    }

    &.light {
        background-color: white;
        color: brown;
        border: brown solid 1px;

        &:hover {
        background: brown;
        color: white;
        }
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
    display: flex;
    flex-direction: column;
    gap: 2px;
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
