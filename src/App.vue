<template>
  <div class="root-template-container" id="app-container">
    <base-nav-bar v-show="showNav"></base-nav-bar>
    <div id="main-router-container">
      <router-view v-slot="{ Component }">
        <transition @enter="routerEnter" @before-enter="beforeRouterEnter" @leave="routerLeave" :css="false" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import BaseNavBar from './components/UI/BaseNavBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import gsap from 'gsap';
import $ from 'jquery'
import { watch } from 'vue';

const router = useRouter();
const route = useRoute();

const showNav = ref(false);
watch(
  () => route.name,
  (routeName) => {
    if (routeName === 'blogger' || routeName === 'auth') {
      showNav.value = false;
    }
    else {
      showNav.value = true;
    }
  }
);

// Dynamic router transition names
router.beforeEach((to, from) => {
  const toDepth = to.path.split("/").join("").length;
  const fromDepth = from.path.split("/").join("").length;
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
});

// Prevent scroller from popping up on route transition
const setScrollerOverflowY = (value) => {
  $('#main-router-container').css({
    'overflow-y': value
  });
}
function beforeRouterEnter(el) {
  gsap.set(el, {
    x() {
      return (route.meta.transition !== 'slide-left') ? "-=100vh" : "+=100vh";
    },
    opacity: 0
  });
  setScrollerOverflowY('hidden');
}
function routerEnter(el, done) {
  gsap.to(el, {
    x: '0',
    opacity: 1,
    onComplete: () => {
      setScrollerOverflowY('auto');
      done();
    },
    duration: 0.7
  })
}
function routerLeave(el, done) {
  setScrollerOverflowY('hidden');
  gsap.to(el, {
    x() {
      return (route.meta.transition === 'slide-left') ? "-=100vh" : "+=100vh";
    },
    opacity: 0,
    onComplete: () => {
      setScrollerOverflowY('auto');
      done();
    },
    duration: 0.7
  })
}
</script>

<style lang="scss" scoped>
#app-container {
  display: flex;
  flex-direction: column;
  z-index: 0;
}
#main-router-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

@media screen and (max-width: 525px) {
  #app-container {
    flex-direction: row;
  }
}
</style>