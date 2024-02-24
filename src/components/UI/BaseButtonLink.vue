<template>
    <button :class="classBindings" @click="clickHandler">
        {{buttonText}}
    </button>
</template>

<script setup>
import { computed } from 'vue'

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
    },
    darkTheme: {
        type: Boolean,
        required: false,
        default: true
    }
});

const classBindings = computed(() => {
    return [
        props.darkTheme ? 'base-button-link-dark' : 'base-button-link-light',
        props.active ? 'active' : ''
    ]
});
</script>

<style lang="scss" scoped>
@mixin base-button-link($border-bottom-color, $hover-font-color, $hover-bg-color) {
    font-size: v-bind('props.buttonTextSize');
    background: transparent;
    border: none;
    padding: 2px 5px;
    border-bottom: 2px solid #{$border-bottom-color};
    
    transition: all 0.2s ease-out;
    &:hover {
        cursor: pointer;
        color: #{$hover-font-color};
        background: #{$hover-bg-color};
        transform: skewX(-9deg);
    }
}
.base-button-link-dark {
    @include base-button-link($secondary-black, $off-white, $secondary-black);
}

.base-button-link-light {
    @include base-button-link($off-white, $secondary-black, $off-white);
}

.active-button {
    // color: #EEE;
    font-weight: 500;
}
</style>