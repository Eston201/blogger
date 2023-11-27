<template>
    <button class="base-button-link" @click="clickHandler">{{buttonText}}</button>
</template>

<script setup>
const props = defineProps({
    buttonText: {
        type: String,
        required: true
    },
    buttonTextSize: {
        type: String,
        required: false,
        default: '1.25rem'
    },
    clickHandler: {
        type: Function,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.base-button-link {
    font-size: v-bind('props.buttonTextSize');
    background: transparent;
    border: none;
    color: #0D7377;

    &:hover {
        cursor: pointer;
        color: #14FFEC;
    }
}
</style>