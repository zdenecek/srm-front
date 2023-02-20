<template>
    <div class="flex-col">
        <div class="flex">
            <h1>
                <collapse-button v-model="collapseAll" />
                <span>Filtr a vyhledávání</span>
            </h1>
            <span class="button light" @click="clearFilter">Vyčistit filtr</span>
        </div>
        <div class="overflow-hidden">
            <Transition name="expand">
                <form @submit.prevent="update" v-show="!collapseAll">
                    <div class="form-grid">
                        <div class="label"><span>Vyhledávání</span>
                        </div>
                        <div class="flex-col">
                            <div>
                                <input type="radio" id="str" value="str" name="_search" v-model="searchType" />
                                <label for="str">Řetězec
                                </label>
                                <input type="radio" id="loc" value="loc" name="_search" v-model="searchType" />
                                <label for="loc">Místo

                                </label>
                            </div>

                            <input
                                   type="text"
                                   class="long"
                                   placeholder="Vyhledávání..."
                                   v-model="filterObject.query"
                                   v-show="searchType == 'str'" />
                            <geo-filter v-model="filterObject.location" v-show="searchType == 'loc'"></geo-filter>
                        </div>
                        <div class="label">Cena prodeje</div>
                        <div class="price-filter flex">
                            <input type="number" placeholder="Od Kč" v-model="filterObject.priceMin" min="0" />
                            <input type="number" placeholder="Do Kč" v-model="filterObject.priceMax" min="0" />
                        </div>
                        <div class="label">Nájem</div>
                        <div class="price-filter flex">
                            <input type="number" placeholder="Od Kč/měsíc" v-model="filterObject.rentMin" min="0" />
                            <input type="number" placeholder="Do Kč/měsíc" v-model="filterObject.rentMax" min="0" />
                        </div>
                        <div class="label">Sleva ceny/nájmu</div>
                        <div class="flex">
                            <input type="number" v-model="filterObject.priceDropPercent" placeholder="Alespoň %" min="0"
                                   max="100"
                                   step="0.001" />
                            <input type="number" v-model="filterObject.priceDropCzk" placeholder="Alespoň Kč" min="0"
                                   step="1" />
                        </div>
                        <div class="label">Cena za plochu</div>
                        <div class="flex">
                            <input type="number" placeholder="Od Kč/m²" v-model="filterObject.pricePerMeterMin"
                                   min="0" />
                            <input type="number" placeholder="Do Kč/m²" v-model="filterObject.pricePerMeterMax"
                                   min="0" />
                        </div>
                        <div class="label">Nájem za plochu</div>
                        <div class="flex">
                            <input type="number" placeholder="Od Kč/m² a měsíc" v-model="filterObject.rentPerMeterMin"
                                   min="0" />
                            <input type="number" placeholder="Do Kč/m² a měsíc" v-model="filterObject.rentPerMeterMax"
                                   min="0" />
                        </div>
                        <div class="label">Stáří inzerátu</div>
                        <div class="flex">
                            <input type="number" v-model="filterObject.ageMin" placeholder="Alespoň dní" min="0" />
                            <input type="number" v-model="filterObject.ageMax" placeholder="Nejvýše dní" min="0" />
                        </div>
                        <div class="label">Kategorie</div>
                        <div class="checkbox-grid">
                            <div v-for="(label, item) in PropertyLabels" :key="item">
                                <input type="checkbox" :id="label" v-model="filterObject.property[item]" />
                                <label :for="label">{{ label }}</label>
                            </div>
                        </div>
                        <div class="label">Nabídka</div>
                        <div class="checkbox-grid">
                            <div v-for="(label, item) in DealLabels" :key="item">
                                <input type="checkbox" :id="label" v-model="filterObject.deal[item]" />
                                <label :for="label">{{ label }}</label>
                            </div>
                        </div>

                        <div class="label">Vlastnictví</div>
                        <div class="checkbox-grid">
                            <div v-for="(label, item) in OwnershipLabels" :key="item">
                                <input type="checkbox" :id="'o' + label" v-model="filterObject.ownership[item]" />
                                <label :for="'o' + label">{{ label }}</label>
                            </div>
                        </div>
                        <div class="label">Smazané inzeráty</div>
                        <div>
                            <input type="radio" id="deleted-active" v-model="filterObject.deleted" value="active"  />
                            <label for="deleted-active"> Aktivní</label>
                            <input type="radio" id="deleted-all" v-model="filterObject.deleted" value="all" />
                            <label for="deleted-all"> Vše</label>
                            <input type="radio" id="deleted-deleted" v-model="filterObject.deleted" value="deleted" />
                            <label for="deleted-deleted">Jen smazané</label>
                        </div>
                        <div class="label">
                            <div class="flex">
                                <span>Řazení</span>
                                <span class="button light" v-show="canAddOrdering" @click="addOrdering">+</span>
                            </div>

                        </div>
                        <div class="ordering">
                            <div class="flex" v-for="ordering, index in filterObject.orderBy" :key="ordering.key">
                                <span class="button light" @click="filterObject.orderBy.splice(index, 1)">-</span>
                                <span>{{ index + 1 }}.</span>
                                <select v-model="ordering.key">
                                    <option v-for="opt, key in orderByOptions" :key="key" :value="key">{{ opt.label }}
                                    </option>
                                </select>
                                <select v-model="ordering.desc">
                                    <option :value="true">{{ orderByOptions[ordering.key].descLabel }}</option>
                                    <option :value="false">{{ orderByOptions[ordering.key].ascLabel }}</option>
                                </select>

                            </div>
                        </div>

                    </div>
                    <div class="overflow-hidden">
                        <Transition name="expand">
                            <div class="form-grid" v-if="expandFilter">

                                <template v-for="prop in PropertyCodes" :key="prop">
                                    <div class="label">{{ subcategoryFormLabels[prop] }}</div>

                                    <div class="checkbox-grid">
                                        <div v-for="(label, item) in SubcategoryLabels[prop]" :key="item">

                                            <input type="checkbox" :id="label"

                                                   v-model="filterObject.subcategory[item]" />
                                            <label :for="label">{{ label }}</label>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </Transition>
                    </div>
                    <div class="expand-filter">
                        <span @click="expandFilter = !expandFilter">
                            Zobrazit {{ expandFilter ? 'méně' : 'více' }}
                        </span>
                    </div>
                    <h2>
                        <collapse-button v-model="collapseMunicipalityPanel" />
                        Města
                    </h2>
                    <div class="overflow-hidden">
                        <Transition name="expand">
                            <municipality-panel
                                                :filter="filterObject"
                                                @update="updateMunicipalities"
                                                v-show="!collapseMunicipalityPanel"></municipality-panel>
                        </Transition>
                    </div>
                </form>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GeoFilter from "./GeoFilter.vue";
import MunicipalityPanel from "./ListingsMunicipalityFilter.vue";
import { FilterObject, OrderingOption } from "@/class/FilterObject";
import { MunicipalityObject } from "@/class/MunicipalityObject";
import CollapseButton from "./partial/CollapseButton.vue";
import { DealLabels, PropertyLabels, OwnershipLabels, SubcategoryLabels, Property, PropertyCodes, PropertyType } from "@/class/types";
import 'tippy.js/dist/tippy.css';
// import Tooltip from "./Tooltip.vue";

export default defineComponent({
    components: {
        GeoFilter,
        MunicipalityPanel,
        CollapseButton,
        // Tooltip
    },
    emits: ["update"],
    watch: {
        filterObject: {
            handler() {
                if(!this.filterObject.deleted) this.filterObject.deleted = "active";
                this.update();
            },
            deep: true,
        },
        searchType() {
            if (this.searchType == "str") {
                this.filterObject.location = undefined;
            } else {
                this.filterObject.query = "";
            }
        },
    },
    methods: {
        update() {
            this.$emit("update", this.filterObject, this.municipalities);

            this.$router.push({ query: this.filterObject.toParams() as any });
        },
        updateMunicipalities(municipalities: Array<MunicipalityObject>) {
            this.municipalities = municipalities;
            this.update();
        },
        clearFilter() {
            this.filterObject = new FilterObject();
        },
        addOrdering() {
            const remainingFilters = Object.keys(this.orderByOptions).filter(k => this.filterObject.orderBy.every(o => o.key != k))

            this.filterObject.orderBy.push({
                desc: false,
                key: remainingFilters[0] as OrderingOption ?? "age",
            });
        },
    },
    computed: {
        canAddOrdering(): boolean {
            return this.filterObject.orderBy.length < Object.values(this.orderByOptions).length;
        }
    },
    mounted() {
        if (this.$route.query.id) this.collapseAll = true;
        this.filterObject =  FilterObject.fromParams(this.$route.query);
        if(this.filterObject.location) this.searchType = "loc";
        this.update();
    },
    data() {
        return {
            expandFilter: false,
            collapseAll: false,
            collapseMunicipalityPanel: false,
            municipalities: [] as Array<MunicipalityObject>,
            orderByOptions: {
                priceDrop: { label: "Sleva", descLabel: "Sestupně", ascLabel: "Vzestupně" },
                age: { label: "Stáří", descLabel: "Od nejnovějších", ascLabel:"Od nejstarších" , },
                price: { label: "Cena/Nájem", descLabel: "Sestupně", ascLabel: "Vzestupně" },
                pricePerMeter: { label: "Cena/Nájem na plochu", descLabel: "Sestupně", ascLabel: "Vzestupně" },
            },
            filterObject: new FilterObject(),
            searchType: "str" as "str" | "loc",
            subcategoryFormLabels: {
                [Property.apartment]: "Typ bytu",
                [Property.commercial]: "Typ komerčních nemovitostí",
                [Property.parcel]: "Typ pozemku",
                [Property.house]: "Typ domu",
                [Property.other]: "Typ - jiné",
            } as { [key in PropertyType]: string },
            DealLabels, PropertyLabels, OwnershipLabels, SubcategoryLabels,
            Property, PropertyCodes: PropertyCodes as Array<PropertyType>
        };
    },
});
</script>

<style lang="scss" scoped>
@import "../style/forms.scss";
@import "../style/animation-expand.scss";

.overflow-hidden {
    overflow: hidden;
}

.ordering {

    display: flex;
    flex-direction: column;
    gap: 4px;

    select {
        height: 1.7em;
        border: brown solid 1px;
        border-radius: 4px;
        background-color: white;
    }

    .button {
        width: 1.7em;
    }
}

.expand-filter {
    grid-column: 1/ span 2;
    display: flex;
    justify-content: center;
    font-size: 9px;
    color: gray;
    text-decoration: underline;
    cursor: pointer;
}
</style>
