import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Feature, type IFeature } from '../../../server/utility/feature.ts';
import type { FeatureRoute } from '../../../server/nanyang';
import axios from 'axios';

export const routeStore = defineStore('route', () => {
    const routes = ref<Array<IFeature>>([]);

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

export const timeStore = defineStore('time', () => {
    const TIMEZONE: string = 'Asia/Singapore';
    const currentTime = ref<Date>(new Date());
    const intervalId = ref<number | undefined>(undefined);

    const timeZoneTime = computed<string>(() => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: TIMEZONE,
      };

      // Use the reactive date object for formatting
      return currentTime.value.toLocaleString('en-SG', options);
    });

    return { currentTime, intervalId, timeZoneTime }
});
