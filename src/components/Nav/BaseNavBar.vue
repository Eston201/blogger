<template>
    <Transition @before-enter="beforeNavEnter" @enter="navEnter" @leave="navLeave" mode="out-in">
        <nav id="navigation" v-show="navVisible">
            <span id="app-logo">
                Blogger
            </span>

            <div class="nav-items-container">
                <div v-for="navItem of navRoutes" :key="navItem.label">
                    {{ navItem.label }}
                </div>
            </div>
        </nav>
    </Transition>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import gsap from 'gsap';
import $ from 'jquery'

const route = useRoute();
const routeName = computed(() => route.name);

const navVisible = ref(false);
const navRoutes = [
    {
        label: 'Home',
        routeName: 'home'
    },
    {
        label: 'Blog'
    },
    {
        label: 'Profile',
        routeName: 'profile'
    },

]
const navHiddenRoutes = [ // Routes to hide the nav
    "blogger",
    "auth"
]
watch(
    routeName,
    (value) => {
        if (navHiddenRoutes.includes(value)) navVisible.value = false;
        else navVisible.value = true;
    }
);

// Nav Transition animation functions
// The position and delay alter for nav leave needed so router-view content does not jump into position
function beforeNavEnter(el) {
    gsap.set(el, {
        opacity: 0,
        y: "-=100%",
        position: "fixed"
    });
}

function navEnter(el, done) {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        onComplete: () => {
            $("#navigation").css({
                position: "sticky"
            })
            done();
        },
        ease: 'power3.out',
        duration: 0.8
    });
}
function navLeave(el, done) {
    gsap.to(el, {
        delay: 0.2,
        opacity: 0,
        y: "-=100%",
        position: 'fixed',
        onComplete: done,
        ease: 'power3.in',
        duration: 0.8
    })
}
</script>

<style lang="scss" scoped>
#navigation {
    position: sticky;
    top: 0;
    left: 0;

    width: 100vw;
    height: 60px;
    background: $secondary-black;
    color: $off-white;

    padding: 10px 35px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

#app-logo {
    font-family: 'Playfair Display', 'sans-serif';
    font-size: 38px;
    font-weight: 500;
    letter-spacing: 2px;
}
.nav-items-container {
    display: flex;
    gap: 10px;
}
</style>