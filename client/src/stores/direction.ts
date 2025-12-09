import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Feature, type IFeature } from '../../../utility/feature';
import type { FeatureRoute } from '../../../server/nanyang'
import axios from 'axios';

export const routeStore = defineStore('route', () => {
    const routes = ref<Array<Feature>>([]);

    async function getAllRoutes() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/features`);
            if (!response?.data) {
                throw new Error("Data does not exist.");
            }

            routes.value = response?.data.map(
                (feature: FeatureRoute) => new Feature(feature?.ft_name, feature?.ft_view),
            );
        } catch (err) {
            console.error(err);
        }
    }

    function getRoute(name: string): IFeature | undefined {
        return routes.value.find((route) => route.name === name);
    }

    return { getRoute, getAllRoutes };
});
