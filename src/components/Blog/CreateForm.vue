<template>
    <div class="base-page">
        <form id="blogCreateForm">
            <section class="form-top-container">
                <div class="title-input-container">
                    <input
                        type="text" 
                        class="title-input"
                        autofocus
                        v-model.trim="form.title"
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
                            :error="!categorySelected"
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
                <v-textarea 
                    v-model.trim="form.content"
                    label="Content" 
                    variant="outlined"
                    counter
                    auto-grow
                    rows="15"
                >
                </v-textarea>
            </section>

            <section class="form-button-container">
                <v-btn
                    color="#323232"
                    @click.prevent="saveDraft"
                >
                    Save Draft
                </v-btn>
                <v-btn
                    color="#14FFEC"
                    @click.prevent="publish"
                >
                    Publish
                </v-btn>
            </section>
        </form>
        <base-loader :loader-visible="loaderVisible">
            <div class="form-loader-content">
                {{ formLoaderContent }}
            </div>
        </base-loader>
        <base-alert 
            :show-alert="alertProps.showAlert"
            :alert-type="alertProps.alertType"
            :alert-title="alertProps.alertTitle"
            :alert-text="alertProps.alertText"
            @close-alert="alertProps.showAlert = false"
        >
        </base-alert>
    </div>
</template>

<script setup>
import BaseLoader from '@/components/UI/BaseLoader.vue'
import BaseAlert from '../UI/BaseAlert.vue';

import { 
    VIcon,
    VSelect, 
    VSwitch, 
    VTextarea,
    VBtn
} from 'vuetify/components';
import { 
    reactive, 
    computed,
    ref
} from 'vue';

const loaderVisible = ref(false);
const formLoaderContent = ref('');
const form = reactive({
    title: '',
    content: '',
    category: 'General',
    commentable: true,
    status: 'draft'
});

// Form Title
const titleClearVisible = computed(() => {
    if (form.title) return true;
    return false
});

// Form Category
const categorySelected = computed(() => form.category ? true : false);
const categoryErrorMsg = computed(() => categorySelected.value ? '' : 'Please select a category');
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

// Alert
const alertProps = reactive({
    showAlert: false,
    alertTitle: 'Title error',
    alertText: 'Error',
    alertType: 'error'
});
let alertTimeOut = null;
function setAlert(showAlert = true, alertTitle = '', alertText = '', alertType = 'success') {
    alertProps.showAlert = showAlert;
    alertProps.alertType = alertType;
    alertProps.alertTitle = alertTitle;
    alertProps.alertText = alertText;

    // Auto close alert
    if (alertTimeOut) {
        clearTimeout(alertTimeOut);
    }
    alertTimeOut = setTimeout(() => {
        alertProps.showAlert = false;
    }, 3000);
}

function validateForm(validateContent = false) {
    formLoaderContent.value = 'Validating Form...';
    let hasError = true;
    if (!form.title) {
        setAlert(true, 'Title', 'Please enter a title', 'error');
        return hasError;
    }
    else if (!form.category) {
        setAlert(true, 'Category', 'Please select a category', 'error');
        return hasError;
    }
    // Validate Content for publishing
    if (validateContent) {
        if (!form.content) {
            setAlert(true, 'Content', 'Missing blog content', 'error');
            return hasError;
        }
        else {
            if (form.content.length < 50) {
                setAlert(true, 'Content', 'Blog content to short, Enter at least 50 characters', 'error');
                return hasError;
            }
        }
    }
    return false;
}

// Submit form functions
async function saveDraft() {
    loaderVisible.value = true;
    validateForm();
    loaderVisible.value = false
}

async function publish() {
    loaderVisible.value = true;
    validateForm(true);
    form.status = 'published'
    loaderVisible.value = false
}

</script>

<style lang="scss" scoped>
#blogCreateForm {
    padding: 50px 15px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #121212;
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
        border-bottom: 4px solid #0D7377;
        .title-input {
            color: #323232;
            width: 95%;
            letter-spacing: 1px;
            outline: none;
        }
        .title-clear-icon {
            color: #F1f7FA;
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
.form-content-container {
    flex: 1;
    margin-top: 10px;
}

.form-button-container {
    height: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
}

.form-loader-content {
    font-size: 1.25rem;
    letter-spacing: 1px;
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
    .form-button-container {
        height: 10%;
    }
}
</style>

