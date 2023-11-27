<template>
  <div id="blogger" class="root-template-container">
    <main class="center-container">
      <base-app-header/>

      <div class="button-container">
        <base-button-link 
          button-text="Log In" 
          :click-handler="() => goToAuth('login')"
        /> 
        |
        <base-button-link 
          button-text="Sign Up" 
          :click-handler="() => goToAuth('signup')"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import BaseAppHeader from '@/components/UI/BaseAppHeader.vue'
import BaseButtonLink from '@/components/UI/BaseButtonLink.vue'
import gsap from 'gsap'

const router = useRouter();

function goToAuth(authType) {
  router.push({
    name: 'auth',
    query: {
      authType
    }
  })
}

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