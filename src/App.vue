<template>
  <NavBar></NavBar>
  <router-view v-slot="{ Component }">
    <Transition @enter="routerEnter" @before-enter="beforeRouterEnter" @leave="routerLeave" mode="out-in">
      <component :is="Component"/>
    </Transition>
  </router-view>
</template>

<script setup>
import NavBar from './components/Nav/BaseNavBar.vue';
import { useRoute, useRouter } from 'vue-router';
import gsap from 'gsap';

const router = useRouter();
const route = useRoute();

// Dynamic router transition names
router.beforeEach((to, from) => {
  const toDepth = to.path.split("/").join("").length;
  const fromDepth = from.path.split("/").join("").length;
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
});

function beforeRouterEnter(el) {
  gsap.set(el, {
    x() {
      return (route.meta.transition !== 'slide-left') ? "-=100vh" : "+=100vh";
    },
    opacity: 0
  });
}
function routerEnter(el, done) {
  gsap.to(el, {
    x: 0,
    opacity: 1,
    onComplete: done,
    ease: 'power3.out',
    duration: 0.6,
  });
}
function routerLeave(el, done) {
  gsap.to(el, {
    x() {
      return (route.meta.transition === 'slide-left') ? "-=100vh" : "+=100vh";
    },
    opacity: 0,
    onComplete: done,
    ease: 'power3.in',
    duration: 0.6
  });
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
}
</style>