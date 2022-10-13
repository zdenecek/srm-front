<template>
    <div class="autocomplete">
        <div class="flex">
            <input
                type="text"
                ref="input"
                placeholder="Hledání místa..."
                v-model="searchString"
                @input="suggestDebounced"
                @focus="setFocus(true)"
                @blur="setFocus(false)"
            />
            <span>v okruhu</span>
            <input type="number" class="short" v-model="radius" />
            <span>km</span>
        </div>
        <div class="autocomplete-list" ref="list" v-show="suggestions.count > 0">
            <div class="autocomplete-item" v-for="item in suggestions.data" :key="item" @click="select(item)">
                <div>{{ item.userData?.suggestFirstRow }}</div>
                <div>{{ item.userData?.suggestSecondRow }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash";
import axios from "axios";
import { GeoObject } from "@/class/GeoObject";

export default defineComponent({
    props: {
        modelValue: Object,
    },
    emits: ["update:modelValue"],
    data() {
        return {
            suggestions: {
                count: 0,
                data: {} as any,
            },
            searchString: "",
            selectedLocality: this.modelValue as any,
            radius: 10,
            focus: false,
        };
    },
    watch: {
        modelValue() {
            if (this.modelValue != this.selectedLocality) {
                this.selectedLocality = this.modelValue;
                this.searchString = this.modelValue?.userData?.suggestFirstRow ?? "";
            }
        },
        radius() {
            if(this.selectedLocality) {
                this.selectedLocality.radius = this.radius;
                this.$emit("update:modelValue", this.selectedLocality);
            }
        }
    },
    methods: {
        setFocus(value: boolean) {
            this.focus = value;
            if (value) this.suggestDebounced();
            this.setListVisibility(value, !value);
            if (!value) {
                this.searchString = this.selectedLocality?.userData?.suggestFirstRow ?? "";
            }
        },
        setListVisibility(value: boolean, delay = false) {
            if (delay) setTimeout(() => this.setListVisibility(value), 500);
            else (this.$refs.list as HTMLElement).style.visibility = value ? "visible" : "hidden";
        },
        suggestDebounced() {
            return;
        },
        suggest() {
            if (!this.focus || this.searchString.length == 0) return;
            axios
                .get("/suggest", {
                    params: {
                        phrase: this.searchString,
                        category: "region_cz,district_cz,municipality_cz,ward_cz,quarter_cz,street_cz",
                        count: 10,
                    },
                })
                .then((response) => {
                    this.suggestions = response.data;
                });
        },
        select(item: GeoObject) {
            this.setListVisibility(false);
            item.radius = this.radius;
            this.selectedLocality = item;
            this.searchString = item.userData.suggestFirstRow;
            this.$emit("update:modelValue", this.selectedLocality);
        },
    },
    created() {
        this.suggestDebounced = _.debounce(() => this.suggest(), 500);
    },
});
</script>

<style lang="scss">
.autocomplete {
    position: relative;
}

.autocomplete-list {
    position: absolute;
    background-color: white;
    width: 300px;
    outline: black 1px solid;
}

.autocomplete-item {
    font-size: 10pt;
    cursor: pointer;
    &:hover {
        background-color: lightgray;
    }

    div:last-child {
        font-size: 8pt;
        color: gray;
    }
}
</style>
