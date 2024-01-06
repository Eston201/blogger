import {
    ref,
    computed,
    onMounted,
    onUnmounted
} from 'vue'

const useResizer = () => {
    const windowWidth = ref(window.innerWidth);
    const setWindowWidth = () => windowWidth.value = window.innerWidth;
    const width = computed(() => windowWidth.value);
    const isMobile = computed(() => {
        if (windowWidth.value <= 525) return true;
        return false;
    })

    onMounted(() => window.addEventListener('resize', setWindowWidth));
    onUnmounted(() => window.removeEventListener('resize', setWindowWidth));

    return { width, isMobile };
};

export { useResizer }