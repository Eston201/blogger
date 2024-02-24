<template>
    <teleport to="body">
        <transition @before-enter="beforeAlertEnter" @enter="onAlertEnter" @leave="onAlertLeave">
            <div id="base-alert-container" v-if="showAlert">
                <v-alert
                    :type="alertType"
                    :title="alertTitle"
                    :text="alertText"
                    variant="elevated"
                    density="compact"
                    border="start"
                    closable
                    @click:close="$emit('closeAlert')"
                >
                </v-alert>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
import { VAlert } from 'vuetify/components'
import gsap from 'gsap';

const props = defineProps({
    showAlert: {
        type: Boolean,
        required: true,
        default: false
    },
    alertTitle: {
        type: String,
        required: false,
        default: ''
    },
    alertText: {
        type: String,
        required: true,
        default: ''
    },
    alertType: {
        type: String,
        required: true,
        default: 'Success'
    }
});
const emits = defineEmits(['closeAlert']);


// Transition functions
function beforeAlertEnter(el) {
    gsap.set(el, {
        opacity: 1,
        x: 0
    })
}
function onAlertEnter(el, done) {
    gsap.from(el, {
        opacity: 0,
        x: '+=20px',
        onComplete: done,
        duration: 0.5
    })
}
function onAlertLeave(el, done) {
    gsap.to(el, {
        opacity: 0,
        x: '+=20px',
        onComplete: done,
        duration: 0.5
    })
}
</script>

<style lang="scss" scoped>
#base-alert-container {
    position: fixed;
    top: 20px;
    right: 20px;

    z-index: 100;
}
</style>