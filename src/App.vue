<template>
  <div class="root-template-container">
    <router-view v-slot="{ Component }">
      <transition @enter="routerEnter" @before-enter="beforeRouterEnter" @leave="routerLeave" :css="false" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import gsap from 'gsap';
import { computed } from '@vue/reactivity';

const router = useRouter();
const route = useRoute();

const curruntRouteTransition = computed(() => route.meta.transition);
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-down' : 'slide-up'
})


function beforeRouterEnter(el) {
  gsap.set(el, {
    y: function() {
      return (curruntRouteTransition.value === 'slide-down') ? '-=100vh' : '+=100vh';
    }
  })
}
function routerEnter(el, done) {
  gsap.to(el, {
    y: '0',
    onComplete: done,
    duration: 0.45
  })
}
function routerLeave(el, done) {
  gsap.to(el, {
    y: function() {
      return (curruntRouteTransition.value === 'slide-down') ? '+=100vh' : '-=100vh';
    },
    onComplete: done,
    duration: 0.45
  })
}
</script>

<style lang="scss" scoped>
</style>