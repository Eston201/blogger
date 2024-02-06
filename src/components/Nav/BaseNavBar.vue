<template>
    <div id="nav-container">
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
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import gsap from 'gsap';

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
function beforeNavEnter(el) {
    gsap.set(el, {
        opacity: 0,
        y: "-=100%"
    });
}

function navEnter(el, done) {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        onComplete: done,
        ease: 'power4.out',
    });
}
function navLeave(el, done) {
    gsap.to(el, {
        opacity: 0,
        y: "-=100%",
        onComplete: done,
        ease: 'power4.in',
    })
}
</script>

<style lang="scss" scoped>

#nav-container {
    width: 100vw;
    height: 60px;
}
#navigation {
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