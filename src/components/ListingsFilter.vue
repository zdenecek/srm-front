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
                        <div class="label">Cena</div>
                        <div class="price-filter flex">
                            <input type="number" placeholder="Od Kč" v-model="filterObject.priceMin" />
                            <input type="number" placeholder="Do Kč" v-model="filterObject.priceMax" />
                        </div>
                        <div class="label">Sleva od prvotní ceny</div>
                        <div class="flex">
                            <input type="number" v-model="filterObject.priceDropPercent" placeholder="Alespoň %" />
                            <input type="number" v-model="filterObject.priceDropCZK" placeholder="Alespoň Kč" />
                        </div>
                        <div class="label">Cena za užitnou plochu</div>
                        <div class="flex">
                            <input type="number" placeholder="Od Kč/m²" v-model="filterObject.pricePerMeterMin" />
                            <input type="number" placeholder="Do Kč/m²" v-model="filterObject.pricePerMeterMax" />
                        </div>
                        <div class="label">Stáří inzerátu</div>
                        <div class="flex">
                            <input type="number" v-model="filterObject.ageMin" placeholder="Alespoň dní" />
                            <input type="number" v-model="filterObject.ageMax" placeholder="Nejvýše dní" />
                        </div>
                        <div class="label">Kategorie</div>
                        <div class="checkbox-grid">
                            <div v-for="(label, item) in propertyCodes" :key="item">
                                <input type="checkbox" :id="label" v-model="filterObject.property[item]" />
                                <label :for="label">{{ label }}</label>
                            </div>
                        </div>
                        <div class="label">Typ</div>
                        <div class="checkbox-grid">
                            <div v-for="(label, item) in deals" :key="item">
                                <input type="checkbox" :id="label" v-model="filterObject.deal[item]" />
                                <label :for="label">{{ label }}</label>
                            </div>
                        </div>

                        <div class="label">Vlastnictví</div>
                        <div class="checkbox-grid">
                            <div v-for="(label, item) in ownerships" :key="item">
                                <input type="checkbox" :id="'o' + label" v-model="filterObject.ownership[item]" />
                                <label :for="'o' + label">{{ label }}</label>
                            </div>
                        </div>
                        <template  v-if="expandFilter">
                            <div></div>
                            <div class="checkbox-grid" >
                                <div v-for="(label, item) in categoryCodes" :key="item">
                                    <input type="checkbox" :id="label" v-model="filterObject.sub[item]" />
                                    <label :for="label">{{ label }}</label>
                                </div>
                            </div>
                        </template>    
                        <div class="expand-filter">
                            <span @click="expandFilter = !expandFilter">
                                Zobrazit {{ expandFilter ? 'méně' : 'více' }}
                            </span>
                        </div>
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
            deals: { 1: "Prodej", 2: "Pronájem", 3: "Dražba" },
            propertyCodes: { 1: "Byty", 2: "Domy", 3: "Pozemky", 4: "Komerční", 5: "Jiné" },
            categoryCodes: {
                2: "1+kk",
                3: "1+1",
                4: "2+kk",
                5: "2+1",
                6: "3+kk",
                7: "3+1",
                8: "4+kk",
                9: "4+1",
                10: "5+kk",
                11: "5+1",
                12: "6 a více",
                0: "Neuvedeno",
            },
            ownerships: { 1: "Osobní", 2: "Družstevní", 3: "Statní/Obecní", 0: "Neuvedeno" },
            filterObject: new FilterObject(),
            searchType: "str" as "str" | "loc",
        };
    },
});
</script>

<style lang="scss" scoped>
@import "../style/forms.scss";

.overflow-hidden {
    overflow: hidden;
}

.expand-enter-active,
.expand-leave-active {
    transition: all 0.5s ease-in;
}

.expand-enter-from,
.expand-leave-to {
    margin-top: -90%;
    opacity: 0;
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
