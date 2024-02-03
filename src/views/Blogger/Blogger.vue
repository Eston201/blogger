<template>
  <div id="blogger" class="base-page">
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
.center-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.button-container {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 45px;
}

@media screen and (min-width: 1024px){
  .center-container {
    margin-top: 10%;
  }
}

@media screen and (min-width: 425px) {
  .center-container {
    margin-top: 15%;
  }
}

@media screen and (max-width: 425px) {
  .center-container {
    margin-top: 40%;
  }
}
</style>