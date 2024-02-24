<template>
    <!-- We don't have gsap splitText (paid) plugin so divs will suffice :) -->
    <h1>
        <div v-for="(letter, index) of appName" :key="letter + index" class="app-letter">{{letter}}</div>
        <div class="dot"></div>
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
    align-items: flex-end;
    font-family: 'Playfair Display', 'sans-serif';
    font-weight: 500;
    font-size: 7rem;
    letter-spacing: 10px;
}

.dot {
    height: 30px;
    width: 30px;
    margin-bottom: 30px;
    margin-left: 5px;
    border-radius: 50%;
    background: $primary-teal;
}

@include mobile {
    h1 {
        font-size: 4rem;
<<<<<<< HEAD
=======
    }

    .dot {
        height: 20px;
        width: 20px;
        margin-bottom: 10px;
>>>>>>> refactor
    }
}

// @media screen and (max-width: 450px) {
//     h1 {
//         font-size: 5rem;
//     }
// }
// @media screen and (max-width: 768px) {
//     h1 {
//         font-size: 6rem;
//     }
// }
// @media screen and (max-width: 600px) {
//     h1 {
//         font-size: 4rem;
//     }
// }
// @media screen and (max-width: 425px) {
//     h1 {
//         font-size: 4rem;
//     }
// }
</style>