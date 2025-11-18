<template>
    <div class="menu-background">
        <h3 class="menu-header">
            {{ props.category }}
        </h3>
        <ul>
            <li v-for="menu in props.menus" :key="menu" class="menu-list">
                <router-link :to="{ name: routeState.getRoute(menu)?.view || 'home' }">
                    <a href="#" class="menu-link">
                        {{ menu }}
                    </a>
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
