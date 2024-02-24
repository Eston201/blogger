<template>
    <div id="blog-list-container">
        <main id="blog-list">
            <base-blog-card 
                v-for="(blog, index) in blogs"
                :key="blog.id + index"
                :blog="blog"
            >
            </base-blog-card>
        </main>
        <v-pagination 
            v-model="currPage" 
            :length="pagLength"
            total-visible="5"
            @update:model-value="pageChange"
        >
        </v-pagination>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseBlogCard from './BaseBlogCard.vue';
import { VPagination } from 'vuetify/components'
import { computed } from 'vue';

const emits = defineEmits(["pageChange"])

const props = defineProps({
    blogs: {
        type: Array,
        required: true,
        default: []
    },
    blogsPerPage: {
        type: Number,
        required: true,
        default: 5
    },
    total: { // This is the total of all data...not the total of the blogs arr
        type: Number,
        required: true,
        default: 0
    }
});

const currPage = ref(1);
const pagLength = computed(() => Math.ceil(props.total / props.blogsPerPage));
function pageChange(pageNumber) {
    emits('pageChange', pageNumber)
}

</script>

<style lang="scss" scoped>
#blog-list-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
#blog-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 365px);
    justify-content: center;
    gap: 15px;

    overflow-x: hidden;
}
</style>