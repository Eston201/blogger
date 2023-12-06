<template>
    <button class="base-button-link" :class="{'active-button': active}" @click="clickHandler">{{buttonText}}</button>
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
    },
    active: { // applies active class styling
        type: Boolean,
        default: false
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
        transform: scale(0.96);
        color: #14FFEC;
    }
}
.active-button {
    color: #EEE;
    font-weight: 500;
    border-bottom: 2px solid #0D7377;
}
</style>