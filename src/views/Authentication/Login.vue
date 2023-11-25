<template>
  <div class="root-template-container">
      <base-form 
        form-header="Login" 
        button-text="Login" 
        :form-rules="loginRules"
        :submit-function="login"
      >
        <div class="slot-content">
            <span>Create an account ?.</span>
            <base-button-link 
              button-text="Sign Up"
              button-text-size="1rem"
              :click-handler="() => $router.push({name: 'signup'})">
            </base-button-link>
        </div>
      </base-form>
  </div>
</template>

<script setup>
import BaseForm from '@/components/Auth/BaseForm.vue'
import BaseButtonLink from '@/components/Auth/BaseButtonLink.vue'
import config from '@/utils/config';
import { loginApi } from '@/api/authentication';

// These are array of username/password function rules
const { username, password } = config.loginBaseRules

const loginRules = {
  username: [...username],
  password: [...password]
}

async function login(username, password) {
  // Make an api request to validate user login
  const { data: authenticated, error } = await loginApi(username, password);

  if (error) {
    console.error(error);
    return {
      type: 'error',
      message: 'Something went wrong!.'
    }
  }
  else if (authenticated) {
    return {
      type: "success",
      message: "Logged in Successfully"
    }
  }

  return {
    type: 'error',
    message: 'username/password is incorrect'
  }
}
</script>

<style lang="scss" scoped>
.slot-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
</style>