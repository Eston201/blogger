<template>
    <router-link v-bind="$props">
        <slot></slot>
    </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    ...RouterLink.props
});
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
    color: $off-white;
    font-size: 1.2rem;
    letter-spacing: 2px;
    padding-inline: 10px;
}
a.router-link-active {
    background: $off-white;
    color: $primary-black;
    transition: all 0.5s ease-out;
    transform: skewX(-8deg);
}
</style>