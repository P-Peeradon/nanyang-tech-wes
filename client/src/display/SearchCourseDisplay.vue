<template>
    <form>
        <div class="course-search-bar">
            <div class="course-input">
                <label for="code">Course Code</label>
                <input type="text" name="code" id="code" v-model="code" />
            </div>

            <div class="course-input">
                <label for="code">Course Title</label>
                <input type="text" name="code" id="code" v-model="title" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const code = ref<string>('');
const title = ref<string>('');
const courses = computed(() => {
    return true;
});



</script>

<style>

</style>
