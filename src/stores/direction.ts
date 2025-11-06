import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Feature } from '../utility/feature';
import axios from 'axios';

export const routeStore = defineStore('route', () => {
    const routes = ref<Array<Feature>>([]);

    function getRoute(name: string) {
        return routes.value.find((route: Feature) => route.name === name);
    }

    async function getAllRoutes() {
        try {
            const { data } = await axios.get('/api/features');
            routes.value = data.map(
                (feature: object) => new Feature(feature.ft_name, feature.ft_path),
            );
        } catch (err) {
            console.error(err);
        }
    }

    return { getRoute, getAllRoutes };
});
