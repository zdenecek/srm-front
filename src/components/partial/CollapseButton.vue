<template>
    <svg viewBox="0 0 20 20" class="collapseButton" role="button" :class="{ on: !modelValue }" @click="toggle">
        <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CollapseButton",
    props: {
        modelValue: Boolean,
    },
    emits: ["update:modelValue"],
    methods: {
        toggle() {
            this.$emit("update:modelValue", !this.modelValue);
        },
    },
});
</script>

<style>
.collapseButton {
    color: brown;
    cursor: pointer;
    user-select: none;
    width: 22px;
    fill: brown;
    transition: .5s ease-out;
}

.on {
    transform: rotate(90deg);
    display: inline-block;
}
</style>
