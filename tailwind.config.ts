/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
      fontSize: {
        xs: ['12px', '1.5rem'],
        sm: ['14px', '1.75rem'],
        base: ['16px', '1.75rem'],
        lg: ['18px', '2rem'],
        xl: ['22px', '2.25rem'],
        '2xl': ['24px', '2.25rem'],
        '3xl': ['30px', '2.25rem']  // section title
      }
    },
    extend: {
      fontFamily: {
        dela: ['var(--font-dela)'],
        norms: ['var(--font-norms)'],
      },

      colors: {
        customPrimary: {
          DEFAULT: "hsl(var(--customPrimary))",
          // foreground: ""
        },
        lightBlue: {
          DEFAULT: "hsl(var(--lightBlue))"
        },
        customRed: {
          DEFAULT: "hsl(var(--customRed))"
        },
        lightGray: {
          DEFAULT: "hsl(var(--lightGray))",
          // foreground: ""
        },
        darkGray: {
          DEFAULT: "hsl(var(--darkGray))",
          // foreground: ""
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        productTabsActive: {
          DEFAULT: "var(--product-tabs-line)"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
