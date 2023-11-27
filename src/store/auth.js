import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi, signupApi } from "@/api/authentication";

export const useAuthStore = defineStore('auth', () => {
    const authenticated = ref(false);
    function setAuth(auth) {
       authenticated.value = auth;
    }

    async function login(username, password) {
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
        // If no error and not authenticated then credentials are incorrect
        return {
            type: 'error',
            message: 'username/password is incorrect'
        }
    }
    async function signup(username, password) {
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

    return {
        authenticated,
        setAuth,
        login,
        signup
    }
})