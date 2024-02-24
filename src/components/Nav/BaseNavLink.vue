<template>
    <router-link v-bind="$props">
        <div class="router-link-content">
            <slot></slot>
        </div>
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
    padding-inline: 5px;

    &:hover {
        color: $primary-teal;
    }
}
a.router-link-active {
    .router-link-content {
        padding-inline: 5px;
        background: $off-white;
        color: $primary-black;
        transform: skewX(-8deg);
    }
}

@include mobile {
    a {
        font-size: 1.5rem;
    }
}
</style>