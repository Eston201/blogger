<template>
    <div class="blog-card">
        <section class="bc-top">
            <h3>{{ blog.title }}</h3>
            <span class="blog-author">{{ blog.author }}</span>
            <span class="blog-category">{{ startCase(blog.category) }}</span>
        </section>
        <section class="bc-bottom">
            <div class="blog-content">
                {{ truncate(blog.content,  {length: 200}) }}
            </div>
            <div class="blog-rating">
                <v-rating
                    readonly
                    length="5"
                    density="compact"
                    :model-value="blog.rating"
                    color="#0D7377"
                    active-color="#14FFEC"
                >
                </v-rating>
            </div>
        </section>
    </div>
</template>

<script setup>
import { startCase, truncate } from 'lodash-es'
import { VRating } from 'vuetify/components';

const props = defineProps({
    blog: {
        type: Object,
        required: true
    }
});

</script>

<style lang="scss" scoped>
.blog-card {
    height: 225px;
    width: 365px;

    display: flex;
    flex-direction: column;

    background: #323232;
    border-radius: 5px;
    letter-spacing: 1px;

    transition: transform 0.3s ease-out;

    &:hover {
        & h3 {
            color: #14FECC;
        }
        cursor: pointer;
        box-shadow: 4px 4px 3px #1a1a1a;
        transform: scale(0.98);
    }
}
.bc-top {
    height: 60px;
    padding-left: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    h3 {
        font-size: 1.5rem;
        // color: #0D7377;
    }
    .blog-category {
        position: absolute;
        top: 0px;
        right: 0px;
        
        font-size: 1.1rem;
        padding: 2px 5px;
        background: #212121;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }
}
.bc-bottom {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    .blog-content {
        line-height: 1.3;
    }
    .blog-rating {
        align-self: flex-end;
    }
}
</style>