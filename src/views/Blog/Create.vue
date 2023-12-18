<template>
    <div class="root-template-container" id="create">
        <div id="component-switcher">
            <v-btn 
                elevation="4"
                variant="outlined"
                :color="activeCompBtnColor('CreateFrom')" 
                @click="changeComp('CreateFrom')"
            >
                Create
            </v-btn>
            <v-btn 
                elevation="4"
                variant="outlined"
                :color="activeCompBtnColor('DraftList')" 
                @click="changeComp('DraftList')"
            >
                Drafts
            </v-btn>
        </div>

        <main>
            <component :is="components[activeComp]"/>
        </main>
    </div>
</template>

<script setup>
import CreateFrom from '@/components/Blog/CreateForm.vue'
import DraftList from '@/components/Blog/DraftList.vue'
import { VBtn } from 'vuetify/components';
import { ref } from 'vue'

const components = {
    CreateFrom,
    DraftList
}
const activeComp = ref('CreateFrom');

function changeComp(comp) {
    activeComp.value = comp;
}
function activeCompBtnColor(comp) {
    if (activeComp.value === comp) return '#14FFEC';
    return "#FFF";
}

</script>

<style lang="scss" scoped>
#create {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px 0;
}
#component-switcher {
    display: flex;
    gap: 10px;
}
main {
    width: 100%;
    flex: 1;
}
</style>