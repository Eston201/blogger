<template>
    <div id="nav-container">
        <div @click="mobileNavVisible = !mobileNavVisible" id="nav-icon">
            <svg id="app-link-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#14FFEC" class="bi bi-body-text" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
            </svg>
        </div>
        <nav id="base-nav">
            <div class="nav-item app-item" @click="$router.push({name: 'home'})">
                <!-- Svg from bootstrap icons -->
                <svg id="app-link-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#14FFEC" class="bi bi-body-text" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                </svg>
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
    </div>
</template>

<script setup>
import BaseButtonLink from './BaseButtonLink.vue';
import { VIcon } from 'vuetify/components';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import $ from 'jquery'
import gsap from 'gsap';

const router = useRouter();

const mobileNavVisible = ref(false);
const displayMobileNav = computed(() => {
    if (mobileNavVisible.value) return 'block';
    return 'none';
});
router.beforeEach(() => {
    mobileNavVisible.value = false
});

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
        routeName: "blog_create",
        iconClass: 'mdi-text-box-edit-outline'
    },
]);

// Changes the nav background on scroll
function setNavBackGroundOnScroll() {
    gsap.timeline({
        scrollTrigger: {
            trigger: '#main-router-container',
            start: '50px top',
            scroller: document.getElementById('main-router-container'),
            scrub: true
        }
    }).to('#nav-container', {
        background: '#111',
        duration: 0.5
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
    setNavBackGroundOnScroll();
    // Set hover listeners for animations
    $('#app-link').on('mouseenter', appLinkMouseEnterAnimation)
                  .on('mouseleave', appLinkMouseLeaveAnimation)
});
</script>

<style lang="scss" scoped>
nav {
    position: sticky;
    top: 0;
    height: 60px;
    
    z-index: 100;
    padding: 0 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    
    display: flex;
    align-items: center;
    gap: 20px;
}
#nav-icon {
    display: none;
}

%center-align {
    display: flex;
    align-items: center;
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
    nav {
        height: 100%;
        margin-top: 45px;
        display: v-bind(displayMobileNav);
    }
    #nav-icon {
        position: absolute;
        top: 10px;
        left: 10px;
        display: block;
        z-index: 100;
    }
    .nav-item {
        margin-top: 10px;
        #app-link-icon {
            display: none;
        }
        #app-link {
            font-size: 2rem;
        }
    }
}
</style>