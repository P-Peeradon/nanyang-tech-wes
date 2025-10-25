import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        // ⚠️ By default, this will *replace* all of Tailwind's default theme settings.
        // To *extend* them, use the 'extend' object as shown below.
        extend: {
            // 🎨 CUSTOM COLORS
            colors: {
                imperial: {
                    '50': '#e6e9f6',
                    '100': '#c1c9ec',
                    '200': '#93a2e0',
                    '300': '#5a72d3',
                    '400': '#254cc6',
                    '500': '#002395', // Your main brand color
                    '600': '#001e7e',
                    '700': '#001967',
                    '800': '#001552',
                    '900': '#00103e',
                    '950': '#000a29',
                },

                cardinal: {
                    '50': '#FEE6E9',
                    '100': '##FDCED3',
                    '200': '#F9A4AC',
                    '300': '#F1717E',
                    '400': '#E24155',
                    '500': '#C41E3A',
                    '600': '#A91A32',
                    '700': '#851628',
                    '800': '#67101E',
                    '900': '#490B16',
                    '950': '#2A050B',
                },
                gold: {
                    '50': '#FBF5E5',
                    '100': '#F2E7C4',
                    '200': '#E9D89D',
                    '300': '#E0C872',
                    '400': '#DAC052',
                    '500': '#D4AF37',
                    '600': '#B79730',
                    '700': '#907826',
                    '800': '#6A581D',
                    '900': '#443612',
                    '950': '#251C08',
                },
            },
            fontFamily: {
                // Use 'sans' to replace the default sans-serif stack
                sans: ['Inter', 'sans-serif'],
                // Use a new key (e.g., 'heading') to create a new utility class
                heading: ['Montserrat', 'sans-serif'], // Access with: font-heading
            },
        },
    },
    plugins: [],
};

export default config;
