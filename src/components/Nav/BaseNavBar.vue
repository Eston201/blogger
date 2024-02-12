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
                    <div class="dot"></div>
                </span>
                
                <Teleport to="#app" :disabled="!isMobile">
                    <Transition name="navItem" @before-enter="beforeNavItemsEnter" @enter="navItemsEnter" @leave="navItemsLeave"  mode="out-in">
                        <div class="nav-items-container" v-show="(!isMobile || mobileNavOpen) && navVisible">
                            <BaseNavLink
                                v-for="navItem of navRoutes" 
                                :key="navItem.label" 
                                :to="{name: navItem.routeName}"
                            >
                                {{ navItem.label }}
                            </BaseNavLink>
                        </div>
                    </Transition>
                </Teleport>

                <!-- Mobile Nav Icon -->
                <div class="mobile-nav-icon" :class="{'mobile-nav-icon-close' : mobileNavOpen}" @click="mobileNavOpen = !mobileNavOpen">
                </div>
            </nav>
        </Transition>
    </div>
</template>

<script setup>
import BaseNavLink from './BaseNavLink.vue';
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { useMobile } from '@/composables/mobile'

import gsap from 'gsap';
import $ from 'jquery'


const route = useRoute();
const routeName = computed(() => route.name);

const { isMobile } = useMobile();
const mobileNavOpen = ref(false);
watch( // Auto close the mobile nav when no longer mobile view
    isMobile,
    (value) => {
        if (!value) mobileNavOpen.value = false;
    }
)

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

// Nav Items Animation
function beforeNavItemsEnter(el) {
    gsap.set([el, ".nav-items-container > a"],{
        opacity: 1,
        y: 0,
        x: 0,
        
    });
}

function navItemsEnter(el, done) {
    gsap.from(el, {
        opacity: 0,
        x: '+=60%',
    })
    gsap.from(".nav-items-container > a", {
        opacity: 0,
        x: "+=10vw",
        stagger: {
            amount: 0.4
        },
        onComplete: done,
    })
}

function navItemsLeave(el, done) {

    if (mobileNavOpen.value) {
        gsap.set(el, {
            opacity: 0
        })
    }
    else {
        gsap.to(".nav-items-container > a", {
            opacity: 0,
            x: "+=15vw",
            stagger: {
                amount: 0.3,
                from: 'end'
            },
            duration: 0.4
        })
        gsap.to(el, {
            opacity: 0,
            x: '+=60%',
            delay: 0.4,
            onComplete: done,
        })
    }
}


onMounted(() => {
    const animation = logoHoverAnimation();
    $('#app-logo')
    .on('click', () => {
        animation.reverse();
    })
    .on('mouseenter', () => {
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
    font-size: 2.5rem;
    font-weight: 500;

    display: flex;
    align-items: flex-end;
    gap: 4px;
    cursor: pointer;

    .dot {
        height: 10px;
        width: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        border-radius: 50%;
        background: $primary-teal;
    }
}
.nav-items-container {
    display: flex;
    gap: 10px;
}


@mixin mobileIconBar($width: 30px, $height: 3px) {
    width: $width;
    height: $height;
    background: $primary-teal;
}

.mobile-nav-icon {
    transition: all 0.3s ease-in-out;
    position: absolute;
    right: 30px;
    z-index: 100000;
    visibility: hidden;
    @include mobileIconBar();

    &::before {
        content: "";
        @include mobileIconBar(15px, 3px);
        position: absolute;
        top: -10px;
    }
    &::after {
        content: "";
        @include mobileIconBar();
        position: absolute;
        top: 10px;
    }
}
.mobile-nav-icon-close {
    transform: rotate(45deg);
    @include mobileIconBar();

    &::before {
        @include mobileIconBar();
        transform: rotate(-90deg);
        top: 0px;
    }
    &::after {
        display: none;
    }
}

@include mobile {
    #app-logo {
        font-size: 2rem;
    }
    .mobile-nav-icon {
        visibility: visible;
    }

    .nav-items-container {
        height: calc(100vh - 70px);
        width: 100vw;

        position: fixed;
        top: 70px;

        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        background: rgb(0, 0, 0, 0.85);
    }
}
</style>