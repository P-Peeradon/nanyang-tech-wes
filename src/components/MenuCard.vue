<template>
    <div class="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 xl:w-100 xl:h-100 bg-rose-800">
        <h3 class="text-sm md:text-xl font-semibold text-orange-200 ml-5 mt-3 mb-2">
            {{ props.category }}
        </h3>
        <ul v-for="menu in props.menus" :key="menu">
            <li>
                <router-link to="">
                    <a href="#" class="text-ssm lg:text-lg text-sky-200 ml-10 underline">{{
                        menu
                    }}</a>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { routeStore } from '../stores/direction';

interface MenuProp {
    category: string;
    menus?: Array<string>;
}

const props = defineProps<MenuProp>();
const routeState = routeStore();
</script>

<style></style>
