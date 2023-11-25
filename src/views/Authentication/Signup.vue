<template>
    <div class="root-template-container">
        <base-form 
            form-header="Sign Up" 
            button-text="Create Account" 
            :form-rules="signupRules"
            :submit-function="formSubmit"
        >
            <div class="slot-content">
                <span>Already have an account ?.</span>
                <base-button-link 
                    button-text="Login"
                    button-text-size="1rem"
                    :click-handler="() => $router.push({name: 'login'})">
                </base-button-link>
            </div>
        </base-form>
    </div>
</template>

<script setup>
import BaseForm from '@/components/Auth/BaseForm.vue'
import BaseButtonLink from '@/components/Auth/BaseButtonLink.vue'
import config from '@/utils/config'
import { validateUniqueUsernameApi, signupApi } from '@/api/authentication';

// These are array of username/password rules of type function
const { username, password } = config.signupBaseRules
const signupRules = {
  username: [...username, checkUniqueUsername],
  password: [...password]
}

async function checkUniqueUsername(username) {
    const { data: isUnique, error } = await validateUniqueUsernameApi(username);
    if (error) {
        console.error(error);
        return `Could not validate unique username. ${error.code}`
    }

    if (isUnique) return true;
    return "Username already exists, try another!.";
}

async function formSubmit(username, password) {
    const { data: signedUp, error } = await signupApi(username, password);

    if (signedUp) {
        return {
            type: "success",
            message: "Signed Up Successfully"
        }
    }
    else {
        if (error) console.error(error);
        return {
            type: 'error',
            message: 'Something went wrong!.'
        }
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