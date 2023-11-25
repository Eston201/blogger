import { defineStore } from "pinia";
import { ref } from "vue";

export const useRootStore = defineStore('root', () => {
    const authenticated = ref(false);
    function setAuth(auth) {
       authenticated.value = auth;
    }

    return {
        authenticated,
        setAuth
    }
})