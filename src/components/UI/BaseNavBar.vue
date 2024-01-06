<template>

    <div id="nav-container">
        <!-- Svg from bootstrap icons -->
        <div id="app-link-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" :fill="appIconFill" class="bi bi-body-text" viewBox="0 0 16 16" @click="navIconClick">
                <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
            </svg>
        </div>

        <transition @before-enter="beforeNavEnter" @enter="navEnter" @leave="navLeave">
            <nav id="base-nav" v-show="isNavVisible">
                <div class="nav-item app-item" @click="$router.push({name: 'home'})">
                    <div id="app-link">
                        <div v-for="letter of 'Blogger'" class="letter">
                            {{ letter }}
                        </div>
                    </div>
                </div>
    
                <div class="nav-item" v-for="link of navLinks" :key="link.label">
                    <v-icon :icon="link.iconClass" :class="{ 'active-icon' : (link.routeName === $route.name) }"></v-icon>
                    <base-button-link 
                        :button-text="link.label" 
                        :button-text-size="'20px'"
                        :click-handler="() => $router.push({name: link.routeName})"
                        :active="link.routeName === $route.name"
                    />
                </div>
            </nav>
        </transition>
    </div>
</template>

<script setup>
import BaseButtonLink from './BaseButtonLink.vue';
import { useResizer } from '@/composables/resizer'
import { VIcon } from 'vuetify/components';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import $ from 'jquery'
import gsap from 'gsap';
import { watch } from 'vue';

const router = useRouter();
const { isMobile } = useResizer();

// Change nav icon color based on is mobile or not
const appIconFill = computed(() => {
    if (isMobile.value) return "#FFF";
    return "#14FFEC"
});
const isNavVisible = ref(isMobile.value ? false : true);

// For responsiveness 
watch(
    () => isMobile.value,
    (value) => {
        if (!value) isNavVisible.value = true;
    }
)

const navLinks = ref([
    {
        label: "Home",
        routeName: "home",
        iconClass: 'mdi-view-grid'
    },
    {
        label: "Profile",
        routeName: "profile",
        iconClass: 'mdi-account'
    },
    {
        label: "Create",
        routeName: "create",
        iconClass: 'mdi-text-box-edit-outline'
    },
]);

// To Open close nav
function navIconClick() {
    if (isMobile.value) {
        isNavVisible.value = !isNavVisible.value;
    }
    else {
        router.push({ name: 'home' })
    }
}
// Close the mobile nav automatically when use clicks on a route
router.beforeEach(() => {
    isNavVisible.value = false;
})

// Mobile nav enter animations
function beforeNavEnter(el, done) {
    gsap.set("#nav-container", {
        x: "-=100%"
    })
}
function navEnter(el, done) {
    gsap.to("#nav-container", {
        x: 0,
        onComplete: done
    })
}
function navLeave(el, done) {
    gsap.to("#nav-container", {
        x: '-=100%',
        onComplete: done
    })
}

// App-Link hover animations
function appLinkMouseEnterAnimation() {
    gsap.to("#app-link > .letter", {
        scale: 1.2,
        stagger: {
            amount: 0.3,
        },
        ease: 'sine.inOut',
        duration: 0.2
    })
}
function appLinkMouseLeaveAnimation() {
    gsap.to("#app-link > .letter", {
        scale: 1,
        stagger: {
            amount: 0.3,
            
        },
        ease: 'sine.inOut',
        overwrite: true,
        duration: 0.2
    })
}

onMounted(() => {
    // Set hover listeners for animations
    $('#app-link').on('mouseenter', appLinkMouseEnterAnimation)
                  .on('mouseleave', appLinkMouseLeaveAnimation)
});
</script>

<style lang="scss" scoped>
%center-align {
    display: flex;
    align-items: center;
}

#nav-container {
    position: sticky;
    top: 0;

    display: flex;
    align-items: center;
    gap: 10px;

    padding: 10px 10px;
    z-index: 100;
}

nav {
    display: flex;
    align-items: center;
    gap: 20px;
}
.nav-item {
    @extend %center-align;
    gap: 5px;
    color: #EEE;

    #app-link {
        @extend %center-align;
        gap: 1px;
        font-family: 'Fuzzy Bubbles', sans-serif;
        font-size: 2.5rem;

        &:hover {
            cursor: pointer;
        }
    }
    .active-icon {
        color: #14FFEC;
    }
    .link {
        text-decoration: none;
    }
}

@media screen and (max-width: 525px) {

    #nav-container {
        position: fixed;
        top: 0;
        left: 0;

        flex-direction: column;
        transform: translateX(-100%);
        background: #111;
        border-radius: 0 10px 10px 10px;
    }
    #app-link-icon {
        position: absolute;
        top: 10px;
        right: -40px;
    }
    nav {
        flex-direction: column;
    }
    .nav-item {
        #app-link {
            font-size: 1.5rem;
        }
    }
}
</style>