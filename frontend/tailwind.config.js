/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                azulEscuro: '#004A8F',
                vermelhoAlerta: '#D32F2F',
                cinzaFundo: '#F4F7F6',
                cinzaTexto: '#334155'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}