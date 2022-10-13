<template>
    <div class="form-grid">
        <div class="label">Zamknout</div>
        <div class="lock" @click="toggleLock">
            <svg
                v-show="!locked"
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-lock-open"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M8 11v-5a4 4 0 0 1 8 0"></path>
            </svg>
            <svg
                v-show="locked"
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-lock"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M8 11v-4a4 4 0 0 1 8 0v4"></path>
            </svg>
            <span>(Při zamčení není výčet měst ovlivňován změnami filtru, veškeré změny se aplikují při odemknutí)</span>
        </div>
        <div class="label">Počet inzerátů ve městě</div>
        <div class="checkbox-grid">
            <div v-for="(item, label) in ranges" :key="label">
                <input type="checkbox" :id="label" v-model="rangesSelected[label]" />
                <label :for="label">{{ label }}</label>
            </div>
            <div>
                <input type="checkbox" id="custom" v-model="customSelected" />
                <label for="custom" class="custom-range">
                    <span>Vlastní rozsah</span>
                    <div>
                        <input type="number" v-model="customRange.min" class="short" placeholder="Od" />
                        <span>-</span>
                        <input type="number" v-model="customRange.max" class="short" placeholder="Do" />
                    </div>
                </label>
            </div>
        </div>
        <div class="label">
            <span v-show="!initial && !loading">Nalezená města</span>
        </div>
        <div v-show="!initial && municipalities.length == 0 && !loading" class="flex">
            <span>Města s takovým počtem inzerátů nejsou v databázi</span>
        </div>
        <div v-show="loading" class="flex">
            <span>Načítání měst</span>
        </div>
        <div class="flex-col" v-show="municipalities.length > 0 && !loading">
            <div class="flex">
                <span>Celkem {{ municipalities.length }} měst s {{ sum }} inzeráty</span>
                <button @click="all()">Vybrat všechna</button>
                <button @click="all(false)">Zrušit výběr</button>
            </div>
            <div class="checkbox-grid-4">
                <div v-for="municipality in municipalities" :key="municipality._id">
                    <input type="checkbox" :id="municipality.name" v-model="municipality.selected" />
                    <label :for="municipality.name">
                        {{ municipality.name ?? "ostatní" }} ({{ municipality.count }})
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _, { update } from "lodash";
import axios from "axios";
import { FilterObject } from "@/class/FilterObject";
import RangeObject from "@/class/RangeObject";
import { MunicipalityObject, compare } from "@/class/MunicipalityObject";

export default defineComponent({
    props: {
        filter: FilterObject,
    },
    emits: ["update"],
    computed: {
        sum(): number {
            return this.municipalities.reduce((sum, municipality) => sum + municipality.count, 0);
        },
    },
    watch: {
        rangesSelected: {
            handler: function () {
                this.selectedRanges = Object.entries(this.ranges).reduce((acc, [key, value]) => {
                    // @ts-ignore
                    if (this.rangesSelected[key]) {
                        acc.push(value as RangeObject);
                    }
                    return acc;
                }, [] as Array<RangeObject>);
            },
            deep: true,
        },
        selectedRanges() {
            this.updateDebounced();
        },
        customSelected() {
            this.updateDebounced();
        },
        customRange: {
            handler: function () {
                if (this.customSelected) this.updateDebounced();
            },
            deep: true,
        },
        filter: {
            handler() {
                if(this.initial) return;
                if(this.locked) {
                    this.filterChangedWhenLocked = true;
                    return;
                }
                this.updateDebounced();
            },
            deep: true,
        },
        municipalities: {
            handler() {
                this.$emit(
                    "update",
                    this.municipalities.filter((a) => a.selected)
                );
            },
            deep: true,
        },
    },
    methods: {
        toggleLock() {
            this.locked = !this.locked;
            if(!this.locked && this.filterChangedWhenLocked) {
                this.filterChangedWhenLocked = false;
                this.updateDebounced();
            }
        },
        update() {
            this.loading = true;
            const ranges = this.selectedRanges.map((a: RangeObject) => `${a.min}-${a.max}`);

            if (this.customSelected) {
                ranges.push(`${this.customRange.min}-${this.customRange.max}`);
            }

            axios
                .get("/municipalities", {
                    params: { ...this.filter?.toParams(), ranges },
                })
                .then((response) => {
                    this.municipalities = response.data;
                    this.municipalities.sort(compare);
                    this.loading = false;
                    this.initial = false;
                });
        },
        updateDebounced() {
            return;
        },
        all(value = true) {
            this.municipalities.forEach((m) => (m.selected = value));
        },
    },
    created() {
        const d = _.debounce(this.update, 1000);
        this.updateDebounced = () => {
            this.loading = true;
            d();
        };
    },
    data() {
        return {
            locked: false,
            filterChangedWhenLocked: false,
            initial: true,
            loading: false,
            municipalities: [] as Array<MunicipalityObject>,
            customRange: { min: 0, max: 100 },
            customSelected: false,
            rangesSelected: {
                "0-5": false,
                "6-15": false,
                "16-30": false,
                "31 a více": false,
            },
            ranges: {
                "0-5": {
                    min: 0,
                    max: 5,
                },
                "6-15": {
                    min: 6,
                    max: 15,
                },
                "16-30": {
                    min: 16,
                    max: 30,
                },
                "31 a více": {
                    min: 31,
                },
            },
            selectedRanges: [] as Array<RangeObject>,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "../style/forms.scss";

.lock {
    display: flex;
    gap: 10px;
    align-items: center;
    user-select: none;

    svg {
        color: brown;
        cursor: pointer;
    }
}


.custom-range {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;

    div {
        display: flex;
        gap: 2px;
        justify-content: space-between;

        input[type="number"] {
            width: 50px;
            height: 20px;
        }
    }
}
</style>
