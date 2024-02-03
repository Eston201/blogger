<template>
    <div id="baseForm">
        <h2>{{formHeader}}</h2>
        <v-alert 
            id="form-alert"
            :icon="false"
            :type="formAlert.type"
            :title="formAlert.message"
            closable
            v-model="formAlert.visible"
            elevation="5"
        >
        </v-alert>
        <v-form 
            v-model="form.isValid"
            fast-fail
            ref="formRef"
            @submit.prevent="validateForm"
        >
            <div class="form-items-container">

                <v-text-field
                    class="text-input-field"
                    v-model="form.username"
                    :rules="formRules.username"
                    validate-on="submit lazy"
                    :counter="15"
                    autocomplete="username"
                    label="Username"
                    hide-details="auto"
                    bg-color="#F1F7FA"
                    required>
                </v-text-field>

                <v-text-field
                    class="text-input-field"
                    v-model="form.password"
                    :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="passwordVisible ? 'text' : 'password'"
                    :rules="formRules.password"
                    :counter="15"
                    label="Password"
                    autocomplete="password"
                    hide-details="auto"
                    required
                    bg-color="#F1F7FA"
                    @click:append-inner="passwordVisible = !passwordVisible">
                </v-text-field>

                <v-btn 
                    class="button-submit" 
                    type="submit"
                    color="#14FFEC"
                    :loading="form.validating"
                    :text="formButtonText"
                >
                </v-btn>
            </div>
        </v-form>
        <!-- Defaul slot will be used to insert links to sign In / Sign Up from parent-->
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { VForm, VTextField, VBtn, VAlert} from 'vuetify/components'
import config from '@/utils/config';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const props = defineProps({
    formType: {
        type: String,
        required: true
    }
});

const formHeader = computed(() => (props.formType === 'login') ? 'Login' : 'Sign Up');
const formButtonText = computed(() => (props.formType === 'login') ? 'Login' : 'Create Account');

// Form Base Rules
const { loginBaseRules, signupBaseRules } = config;
// Login rules
const loginRules = { 
    username: loginBaseRules.username, 
    password: loginBaseRules.password
}
// Signup rules
const signupRules = {
  username: signupBaseRules.username,
  password: signupBaseRules.password
}
const formRules = computed(() => {
    if (props.formType === 'login') return loginRules;
    return signupRules;
})


const formAlert = reactive({
    message: '',
    type: 'error',
    visible: false
})
function setFormAlertValues(message = '', type = 'error', visible = false) {
    formAlert.message = message;
    formAlert.type = type;
    formAlert.visible = visible;
}

const passwordVisible = ref(false);
const formRef = ref(null);
const form = reactive({
    isValid: false,
    username: '',
    password: '',
    validating: false
});
async function validateForm(e) {
    form.validating = true;
    const { valid } = await e;
    if (!valid) {
        form.validating = false;
        return
    };

    // Call login/signup from auth store
    const { type, message } = await authStore[props.formType](form.username, form.password);
    console.log(type, message);
    setFormAlertValues(message, type, true);
    form.validating = false;
    if (type !== 'error') {
        // Mutate store
        authStore.setAuth(true);
        const path = route.query.redirect || '/home';
        router.push(path);
    }
}
</script>

<style lang="scss" scoped>
%display-column {
    display: flex;
    flex-direction: column;
}

#baseForm {
    @extend %display-column;
    gap: 20px;

    background: $secondary-black;
    border-radius: 5px;
    padding: 15px;
    color: $off-white;
}

h2 {
    align-self: center;
    font-size: 3rem;
    font-weight: 200;
    letter-spacing: 1px;
}
#form-alert {
    align-self: center;
    font-size: 1rem;
}
.form-items-container {
    @extend %display-column;
    gap: 20px;

    .text-input-field {
        width: 60%;
        align-self: center;
    }
    .button-submit {
        align-self: center;
    }
}

@media screen and (max-width: 1140px) {
    h2 {
        font-size: 2rem;
    }
    .form-items-container {
        gap: 15px;
        .text-input-field {
            width: 90%;
        }
    }
}
</style>