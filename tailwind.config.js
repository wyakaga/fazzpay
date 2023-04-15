/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
      fontFamily: {
        nunitoSans: ['var(--font-nunito-sans)', 'sans-serif']
      },
			colors: {
				fazzpay: {
					primary: "#6379F4",
					secondary: "#FFFFFF",
					dark: "#3A3D42",
					error: "#FF5B37"
				}
			}
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [],
	},
};
