<template>
  <div id="blogger" class="root-template-container">
    <main class="center-container">
      <base-app-header/>

      <div class="button-container">
        <base-button-link button-text="Log In" :click-handler="() => $router.push({name: 'login'})"/> 
        |
        <base-button-link button-text="Sign Up" :click-handler="() => $router.push({name: 'signup'})"/>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import BaseAppHeader from '@/components/UI/BaseAppHeader.vue'
import BaseButtonLink from '@/components/Auth/BaseButtonLink.vue'
import gsap from 'gsap'


onMounted(() => {
  gsap.from('.button-container', {
    opacity: 0,
    delay: 0.5
  })
});
</script>

<style lang="scss" scoped>
#blogger {
  display: flex;
  justify-content: center;
  align-items: center;

  letter-spacing: 1px;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.button-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>