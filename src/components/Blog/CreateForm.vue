<template>
    <div class="root-template-container" id="blogCreateForm">
        <section class="form-top-container">
            <div class="title-input-container">
                <input 
                    type="text" 
                    class="title-input" 
                    v-model="form.title"
                    placeholder="Blog Title"
                    autocomplete="false"
                />
                <v-icon 
                    v-show="titleClearVisible"
                    class="title-clear-icon" 
                    icon="mdi-close"
                    @click="form.title = ''"
                />
            </div>

            <div class="form-top-right">
                <div class="category-select-container">
                    <v-select
                        v-model="form.category"
                        label="Category"
                        :items="categoryOptions"
                        :error="!selectedCategory"
                        :error-messages="categoryErrorMsg"
                        clearable
                        variant="outlined"
                        density="comfortable"
                    >
                    </v-select>
                </div>

                <div class="commentable-switch-container">
                    <v-switch
                        v-model="form.commentable"
                        color="#14FFEC"
                    >
                        <template #label>
                            <span class="switch-label">Commentable</span>
                        </template>
                    </v-switch>
                </div>
            </div>

        </section>

        <section class="form-content-container">

        </section>

        <section class="form-button-container">

        </section>
    </div>
</template>

<script setup>
import { VIcon, VSelect, VSwitch } from 'vuetify/components';
import { reactive, computed } from 'vue';

const form = reactive({
    title: 'Blog Title',
    content: '',
    category: 'General',
    commentable: true
});

const titleClearVisible = computed(() => {
    if (form.title) return true;
    return false
});

const selectedCategory = computed(() => form.category ? true : false);
const categoryErrorMsg = computed(() => selectedCategory.value ? '' : 'Please select a category');
const categoryOptions = [
    'General',
    'Technology',
    'Science',
    'Entertainment',
    'Education',
    'Travel',
    'Personal Development',
    'Food'
];
</script>

<style lang="scss" scoped>
#blogCreateForm {
    padding: 50px 15px 0px;
    display: flex;
    flex-direction: column;
}

.form-top-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-input-container {
        width: 45%;
        
        display: flex;
        align-items: center;
        gap: 5px;
        
        font-size: 2.25rem;
        padding-bottom: 5px;
        border-bottom: 4px solid #14FFEC;
        .title-input {
            width: 95%;
            letter-spacing: 1px;
            outline: none;
        }
        .title-clear-icon {
            font-size: 30px;
            background-color: #323232;
            border-radius: 3px;
    
            &:hover {
                color: #14FFEC;
                cursor: pointer;
                scale: 0.95;
            }
        }
    }
    .form-top-right {
        position: relative;
        top: 15px;
        width: 40%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .category-select-container {
            width: 50%;
        }
        .commentable-switch-container {
            .switch-label {
                font-size: 1.25rem;
                letter-spacing: 1px;
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    #blogCreateForm {
        padding: 5px;
    }
    .form-top-container {
        flex-direction: column;
        gap: 15px;
        .title-input-container {
            width: 95%;
            order: 1;
        }
        .form-top-right {
            width: 100%;
            .commentable-switch-container {
                .switch-label {
                    font-size: 1rem;
                }
            }
        }
    }
}
</style>

