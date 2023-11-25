<template>
    <div class="root-template-container" id="authentication">
        <div class="left-container">
            <base-app-header/>
            <span>{{message}}</span>
        </div>

        <div class="right-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseAppHeader from '@/components/UI/BaseAppHeader.vue'
import gsap from 'gsap';

const route = useRoute();
const message = ref('Welcome Back');

watch(
    () => route.name,
    setMessage
);

function setMessage() {
    message.value = (route.name === 'login') ? 'Welcome Back' : 'Welcome';
    fadeMessageIn();
}

function fadeMessageIn() {
    gsap.fromTo(
        '.left-container > span',
        {
            opacity: 0,
            y: '+=15'
        },
        {
            opacity: 1,
            y: 0
        }
    )
}

onMounted(() => {
    setMessage();
});
</script>

<style lang="scss" scoped> 
%center {
    display: flex;
    justify-content: center;
    align-items: center;
}

#authentication {
    @extend %center;
    padding: 10px;
}
.left-container {
    flex-basis: 40%;
    @extend %center;
    flex-direction: column;
    gap: 10px;

    span {
        font-size: 2rem;
    }
}
.right-container {
    width: 50%;
}

@media screen and (max-width: 1140px ) {
    #authentication {
        flex-direction: column;
    }
    .left-container {
        span {
            font-size: 1.5rem;
        }
    }
    .right-container {
        width: 95%;
    }
}
</style>