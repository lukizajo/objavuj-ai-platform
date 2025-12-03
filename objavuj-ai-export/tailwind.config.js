/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// Light Mode Color Palette
				background: {
					DEFAULT: '#F8FAFC',
					white: '#FFFFFF',
				},
				text: {
					primary: '#1A1A1A',
					secondary: '#4A4A4A',
					muted: '#6B7280',
				},
				border: '#E5E7EB',
				
				// Dark Mode Color Palette
				dark: {
					background: '#0A0A0A',
					'background-secondary': '#111827',
					'background-tertiary': '#1F2937',
					card: '#111827',
					muted: '#1F2937',
					text: {
						primary: '#F9FAFB',
						secondary: '#E5E7EB',
						muted: '#D1D5DB',
					},
					border: '#374151',
				},
				
				// Accent Colors
				primary: {
					DEFAULT: '#F97316',
					hover: '#EA580C',
					light: '#FFEDD5',
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#0A2238',
					hover: '#0D2E4D',
					light: '#E8EEF4',
					foreground: '#FFFFFF',
				},
				success: {
					DEFAULT: '#0C2A1D',
					hover: '#0F3525',
					light: '#E8F5EE',
					foreground: '#FFFFFF',
				},
				community: {
					DEFAULT: '#B8205B',
					hover: '#9E1B4E',
					light: '#FBE8EF',
					foreground: '#FFFFFF',
				},
				
				// UI States
				input: '#F1F5F9',
				ring: "#F97316"
				muted: {
					DEFAULT: '#F1F5F9',
					foreground: '#64748B',
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#1A1A1A',
				},
				destructive: {
					DEFAULT: '#DC2626',
					foreground: '#FFFFFF',
				},
			},
			borderRadius: {
				'2xl': '20px',
				xl: '16px',
				lg: '12px',
				md: '8px',
				sm: '4px',
			},
			boxShadow: {
				'soft': '0 4px 16px rgba(0, 0, 0, 0.06)',
				'soft-lg': '0 8px 32px rgba(0, 0, 0, 0.08)',
				'soft-xl': '0 12px 48px rgba(0, 0, 0, 0.1)',
				'hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
				'dark-soft': '0 4px 16px rgba(0, 0, 0, 0.3)',
				'dark-soft-lg': '0 8px 32px rgba(0, 0, 0, 0.4)',
				'dark-hover': '0 8px 24px rgba(0, 0, 0, 0.5)',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'fade-in': {
					from: { opacity: 0, transform: 'translateY(10px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				'slide-up': {
					from: { opacity: 0, transform: 'translateY(20px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				'slide-up-panel': {
					from: { transform: 'translateY(100%)' },
					to: { transform: 'translateY(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-up-panel': 'slide-up-panel 0.3s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
