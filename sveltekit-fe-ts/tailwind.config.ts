import type { Config } from 'tailwindcss';
import daisyui from "daisyui"

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [daisyui],
	daisyui: {
		styled: true,
		themes: ["cupcake","cmyk"],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "dark",
	  }
} as Config;
