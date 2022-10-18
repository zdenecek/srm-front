<template>
    <div class="flex-col">
        <h1>
            <collapse-button v-model="collapseAll" />
            Filtr a vyhledávání
        </h1>
        <div class="overflow-hidden">
            <Transition name="expand">
                <form @submit.prevent="update" v-show="!collapseAll">
                    <div class="form-grid">
                        <div class="label">Vyhledávání</div>
                        <div class="flex-col">
                            <div>
                                <input type="radio" id="str" value="str" name="_search" v-model="searchType" />
                                <label for="str">Řetězec</label>
                                <input type="radio" id="loc" value="loc" name="_search" v-model="searchType" />
                                <label for="loc">Místo</label>
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
                                   step="0.05" />
                            <input type="number" v-model="filterObject.priceDropCZK" placeholder="Alespoň Kč" min="0"
                                   step="0.05" />
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
                                <div class="label">Smazané inzeráty</div>
                                <div>
                                    <input type="checkbox" id="deleted" v-model="filterObject.deleted" />
                                    <label for="deleted"> Zobrazit smazané</label>
                                </div>


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
import MunicipalityPanel from "./MunicipalityPanel.vue";
import { FilterObject } from "@/class/FilterObject";
import { MunicipalityObject } from "@/class/MunicipalityObject";
import CollapseButton from "./CollapseButton.vue";
import { DealLabels, PropertyLabels, OwnershipLabels, SubcategoryLabels, Property, PropertyCodes, PropertyType } from "@/class/types"

export default defineComponent({
    components: {
        GeoFilter,
        MunicipalityPanel,
        CollapseButton,
    },
    emits: ["update"],
    watch: {
        filterObject: {
            handler() {
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
        },
        updateMunicipalities(municipalities: Array<MunicipalityObject>) {
            this.municipalities = municipalities;
            this.update();
        },
    },
    mounted() {
        if (this.$route.query.id) this.collapseAll = true;
    },
    data() {
        return {
            expandFilter: false,
            collapseAll: false,
            collapseMunicipalityPanel: false,
            municipalities: [] as Array<MunicipalityObject>,
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
