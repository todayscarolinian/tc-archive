import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'300': '#FF5959',
  				'400': '#D73333',
  				'500': '#C02D2D',
  				'600': '#9B2626',
  				'700': '#842020',
  				'800': '#771D1D',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'300': '#FDF2E7',
  				'400': '#E7DDD1',
  				'500': '#CEC4B3',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent_black: {
  				'300': '#313131',
  				'400': '#1C1C1C',
  				'500': '#151515',
  				DEFAULT: '#151515'
  			},
  			accent_orangee: {
  				'500': '#F49656',
  				DEFAULT: '#F49656'
  			},
  			grayscale: {
  				'100': '#F7F7F7',
  				'200': '#EFEFEF',
  				'300': '#E6E6E6',
  				'400': '#D5D5D5',
  				'500': '#D3D3D3',
  				'600': '#C4C4C4',
  				'700': '#808080',
  				'800': '#3A3A3A',
  				'900': '#080808',
  				DEFAULT: '#808080'
  			},
  			error: {
  				'400': '#D78888',
  				'500': '#BC3939',
  				'600': '#962E2E',
  				'700': '#712222',
  				DEFAULT: '#BC3939'
  			},
  			warning: {
  				'400': '#FFBE78',
  				'500': '#FF931E',
  				'600': '#CC7618',
  				'700': '#995812',
  				DEFAULT: '#FF931E'
  			},
  			success: {
  				'400': '#4CBF80',
  				'500': '#009444',
  				'600': '#007636',
  				'700': '#005929',
  				DEFAULT: '#009444'
  			},
  			info: {
  				'400': '#68C1FE',
  				'500': '#0397FE',
  				'600': '#0279CB',
  				'700': '#025B98',
  				DEFAULT: '#0397F3'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
