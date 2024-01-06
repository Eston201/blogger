<template>
    <!-- We don't have gsap splitText (paid) plugin so divs will suffice :) -->
    <h1>
        <div v-for="(letter, index) of appName" :key="letter + index" class="app-letter">{{letter}}</div>
    </h1>
</template>

<script setup>
import { onMounted, ref} from 'vue';
import gsap from 'gsap';

const appName = ref('Blogger');

onMounted(() => {
    initGsap();
});

function initGsap() {
    gsap.from('.app-letter', {
        opacity: 0,
        scale: 0,
        y: '+=30',
        stagger: {
            amount: 0.7,
            grid: [1, appName.value.length],
            from: 'start'
        }
    })
}
</script>

<style lang="scss" scoped>
h1 {
    display: flex;
    font-family: 'Fuzzy Bubbles', sans-serif;
    font-size: 7rem;
    color: #14FFEC;
}

@media screen and (max-width: 450px) {
    h1 {
        font-size: 4rem;
    }
}
</style>