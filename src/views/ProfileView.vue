<script setup lang="ts">
import VerticalNav from '../components/VerticalNav.vue';
import ProfileDisplay from '../display/ProfileDisplay.vue';
import TitleSection from '../components/TitleSection.vue';
</script>

<template>
    <div class="flex flex-row">
        <aside class="w-60">
            <VerticalNav />
        </aside>
        <main class="view">
            <TitleSection :title="'Student Profile'" />
            <br />
            <div class="">
                <ProfileDisplay />
            </div>
        </main>
    </div>
    <div class="mb-3 lg:mb-6 xl:mb-10" />
</template>

<style scoped>
.view {
    width: calc(100vw - 280px);
}
</style>
