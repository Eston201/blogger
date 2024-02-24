<template>
    <div class="base-page">
        blog View {{ blog_id }}
    </div>
</template>

<script setup>
import { watch, reactive } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

const props = defineProps({
    blog_id: {
        type: Number,
        required: true
    }
});

const router = useRouter();
onBeforeRouteUpdate(async (to, from) => {
    const { blog_id } = to.params;
    if (isNaN(blog_id)) return { name: 'blog_notFound'};
    
    const blogDetails = await getBlogDetails(blog_id);
    if (blogDetails) return true;
    return { name: 'blog_notFound'};
})

const blogPost = reactive({
    
})

// watch(
//     () => props.blog_id, 
//     (value) => {
//         if (isNaN(value)) router.push({name: 'blog_notFound'});
//         else getBlogDetails(value);
//     },
//     {
//         immediate: true
//     }
// );
async function getBlogDetails(blog_id) {
    // If no response data, the blog does not exist
    console.log("Getting blog details");
    const res = await new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(false)
        }, 1000);
    });
    return res;
    // if (res) console.log("true"); 
    // else router.push({name: 'blog_notFound'});

}

</script>

<style lang="scss" scoped>

</style>