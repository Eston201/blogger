<template>
    <div id="nav-container">
        <Transition @before-enter="beforeNavEnter" @enter="navEnter" @leave="navLeave" mode="out-in">
            <nav id="navigation" v-show="navVisible">
                <span id="app-logo" @click="$router.push('/home')">
                    <div class="al-letter letter-b">B</div>
                    <div class="al-letter">l</div>
                    <div class="al-letter">o</div>
                    <div class="al-letter">g</div>
                    <div class="al-letter">g</div>
                    <div class="al-letter">e</div>
                    <div class="al-letter">r</div>
                </span>
    
                <div class="nav-items-container">
                    <BaseNavLink 
                        v-for="navItem of navRoutes" 
                        :key="navItem.label" 
                        :to="{name: navItem.routeName}"
                    >
                        {{ navItem.label }}
                    </BaseNavLink>
                </div>
            </nav>
        </Transition>
    </div>
</template>

<script setup>
import BaseNavLink from './BaseNavLink.vue';
import { computed, ref, watch, onMounted, nextTick } from 'vue'
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
        label: 'Blog',
        routeName: 'blog_create'
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

// App Logo Hover Animation
function logoHoverAnimation() {
    return gsap.timeline({
        paused: true,
        defaults: {
            duration: 0.2
        }
    })
    .to(".al-letter", {
        opacity: 0.6,
        x: "+=4",
        stagger: {
            amount: 0.5,
            from: 'start'
        },
        ease: 'sine.out',
    })
    .to('.letter-b', {
        x: "+=4",
        color: '#14FFEC',
        opacity: 1,
        overwrite: true,
        ease: 'sine.out',
    }, "<");
}

onMounted(() => {
    const animation = logoHoverAnimation();
        $('#app-logo').on('mouseenter', () => {
            animation.play();
        })
        .on('mouseleave', () => {
            animation.reverse();
        })
});


</script>

<style lang="scss" scoped>

#nav-container {
    width: 100vw;
    height: 70px;
}
#navigation {
    height: 100%;
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

    display: flex;
    align-items: flex-start;
    gap: 4px;
    cursor: pointer;

    .al-letter {
        display: inline-block !important;
    }
}
.nav-items-container {
    display: flex;
    gap: 10px;
}
</style>