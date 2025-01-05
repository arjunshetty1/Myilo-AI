/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
  darkMode: ["class"],
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("flowbite/plugin"),
    require("tailwindcss-animate"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/forms"),
  ],
  prefix: "",
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px',
  			xs: '330px',
  			xss: {
  				max: '400px'
  			},
  			xsm: {
  				max: '680px'
  			},
  			tab: {
  				max: '960px'
  			}
  		}
  	},
  	extend: {
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			ripple: {
  				'0%, 100%': {
  					transform: 'translate(-50%, -50%) scale(1)'
  				},
  				'50%': {
  					transform: 'translate(-50%, -50%) scale(0.9)'
  				}
  			},
  			grid: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			},
  			seesaw: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'25%': {
  					transform: 'translateX(-50%)'
  				},
  				'50%': {
  					transform: 'translateX(0%)'
  				},
  				'75%': {
  					transform: 'translateX(50%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'seesaw': 'seesaw 1s infinite linear',
  			marquee: 'marquee var(--duration) linear infinite',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			grid: 'grid 15s linear infinite',
  			ripple: 'ripple 3400ms ease infinite',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
  			rainbow: 'rainbow var(--speed, 2s) infinite linear'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			tremor: {
  				brand: {
  					faint: 'colors.blue[50]',
  					muted: 'colors.blue[200]',
  					subtle: 'colors.blue[400]',
  					DEFAULT: 'colors.blue[500]',
  					emphasis: 'colors.blue[700]',
  					inverted: 'colors.white'
  				},
  				background: {
  					muted: 'colors.gray[50]',
  					subtle: 'colors.gray[100]',
  					DEFAULT: 'colors.white',
  					emphasis: 'colors.gray[700]'
  				},
  				border: {
  					DEFAULT: 'colors.gray[200]'
  				},
  				ring: {
  					DEFAULT: 'colors.gray[200]'
  				},
  				content: {
  					subtle: 'colors.gray[400]',
  					DEFAULT: 'colors.gray[500]',
  					emphasis: 'colors.gray[700]',
  					strong: 'colors.gray[900]',
  					inverted: 'colors.white'
  				}
  			},
  			'dark-tremor': {
  				brand: {
  					faint: '#0B1229',
  					muted: 'colors.blue[950]',
  					subtle: 'colors.blue[800]',
  					DEFAULT: 'colors.blue[500]',
  					emphasis: 'colors.blue[400]',
  					inverted: 'colors.blue[950]'
  				},
  				background: {
  					muted: '#131A2B',
  					subtle: 'colors.gray[800]',
  					DEFAULT: 'colors.gray[900]',
  					emphasis: 'colors.gray[300]'
  				},
  				border: {
  					DEFAULT: 'colors.gray[800]'
  				},
  				ring: {
  					DEFAULT: 'colors.gray[800]'
  				},
  				content: {
  					subtle: 'colors.gray[600]',
  					DEFAULT: 'colors.gray[500]',
  					emphasis: 'colors.gray[200]',
  					strong: 'colors.gray[50]',
  					inverted: 'colors.gray[950]'
  				}
  			},
  			'color-1': 'hsl(var(--color-1))',
  			'color-2': 'hsl(var(--color-2))',
  			'color-3': 'hsl(var(--color-3))',
  			'color-4': 'hsl(var(--color-4))',
  			'color-5': 'hsl(var(--color-5))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'tremor-small': '0.375rem',
  			'tremor-default': '0.5rem',
  			'tremor-full': '9999px'
  		},
  		boxShadow: {
  			'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  		},
  		fontSize: {
  			'tremor-label': ["0.75rem", { lineHeight: "1rem" }],
  			'tremor-default': ["0.875rem", { lineHeight: "1.25rem" }],
  			'tremor-title': ["1.125rem", { lineHeight: "1.75rem" }],
  			'tremor-metric': ["1.875rem", { lineHeight: "2.25rem" }]
  		}
  	}
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
};
