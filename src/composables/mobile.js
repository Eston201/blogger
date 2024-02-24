import { ref, computed } from 'vue'
import { useEventLister } from './event'

export function useMobile() {
    
    const width = ref(window.innerWidth);
    const height = ref(window.innerHeight);
    const isMobile = computed(() => width.value <= 576);

    function resize() {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    }
    useEventLister(window, 'resize', resize);
    
    return { width, height, isMobile };
}