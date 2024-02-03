<template>
    <div class="base-page" id="authentication">
        <div class="left-container">
            <base-app-header/>
            <span>{{message}}</span>
        </div>

        <div class="right-container">
            <base-form :form-type="authType">
                <!--Links to change form type. If type login the show signup, vice versa  -->
                <div class="slot-content" v-if="authType === 'login'">
                    <span>Need an account ?.</span>
                    <base-button-link 
                        button-text="Sign Up"
                        button-text-size="1rem"
                        :dark-theme="false"
                        :click-handler="() => setForm('signup')">
                    </base-button-link>
                </div>

                <div class="slot-content" v-else>
                    <span>Have an account ?.</span>
                    <base-button-link 
                        button-text="Login"
                        button-text-size="1rem"
                        :dark-theme="false"
                        :click-handler="() => setForm('login')">
                    </base-button-link>
                </div>
            </base-form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap';
// Components
import BaseAppHeader from '@/components/UI/BaseAppHeader.vue'
import BaseButtonLink from '@/components/UI/BaseButtonLink.vue';
import BaseForm from '@/components/Auth/BaseForm.vue'


const route = useRoute();
const router = useRouter();

// Welcome message based on auth type
const authType = computed(() => route.query.authType);
const message = ref('Welcome Back');
watch(
   authType,
    setMessage
);
function setMessage() {
    message.value = (authType.value === 'login') ? 'Welcome Back' : 'Welcome';
    fadeMessageIn();
}
function fadeMessageIn() {
    gsap.fromTo(
        '.left-container > span',
        {
            opacity: 0,
            y: '+=15'
        },
        {
            opacity: 1,
            y: 0
        }
    )
}

function setForm(authType) {
    const redirect = route.query.redirect
    router.push({
        name: 'auth',
        query: { 
            authType,
            redirect
        }
    })
}

onMounted(() => {
    setMessage();
});
</script>

<style lang="scss" scoped> 
%center {
    display: flex;
    justify-content: center;
    align-items: center;
}

#authentication {
    @extend %center;
}
.left-container {
    flex-basis: 40%;
    @extend %center;
    flex-direction: column;
    gap: 10px;

    span {
        font-weight: 400;
        font-size: 1.5rem;
    }
}
.right-container {
    width: 50%;
    .slot-content {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
}

@media screen and (max-width: 1140px ) {
    #authentication {
        flex-direction: column;
    }
    .left-container {
        span {
            font-size: 1.5rem;
        }
    }
    .right-container {
        width: 95%;
    }
}
</style>