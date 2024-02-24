<template>
    <teleport to="body">
        <transition @before-enter="beforeLoaderEnter" @enter="onLoaderEnter" @leave="onLoaderLeave">
            <div class="loader-overlay" v-if="loaderVisible">
                <div class="loader-content">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
import gsap from 'gsap';

const props = defineProps({
    loaderVisible: {
        type: Boolean,
        required: true
    }
});

function beforeLoaderEnter(el) {
    gsap.set(el, {
        opacity: 1
    })
}
function onLoaderEnter(el, done) {
    gsap.from(el, {
        opacity: 0,
        onComplete: done,
        duration: 0.5
    })
}
function onLoaderLeave(el, done) {
    gsap.to(el, {
        opacity: 0,
        onComplete: done,
        duration: 0.5
    })
}

</script>

<style lang="scss" scoped>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.5);
}
.loader-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>