import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        // Dark-first AI colors (Green theme)
        ai: {
          primary: "hsl(var(--ai-primary))",
          secondary: "hsl(var(--ai-secondary))",
          accent: "hsl(var(--ai-accent))",
          glow: "hsl(var(--ai-glow))",
        },
        priority: {
          urgent: "hsl(var(--priority-urgent))",
          high: "hsl(var(--priority-high))",
          medium: "hsl(var(--priority-medium))",
          low: "hsl(var(--priority-low))",
        },
        chat: {
          user: "hsl(var(--chat-user))",
          ai: "hsl(var(--chat-ai))",
          bg: "hsl(var(--chat-bg))",
        },
        // Dark theme specific colors
        dark: {
          bg: "rgb(0, 0, 0)",
          card: "rgb(15, 15, 15)",
          border: "rgb(45, 45, 45)",
          text: "rgb(255, 255, 255)",
          muted: "rgb(160, 160, 160)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          from: {
            opacity: "0",
            transform: "scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "slide-up": {
          from: {
            transform: "translateY(100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgb(34 197 94 / 0.4)",
          },
          "50%": {
            boxShadow: "0 0 40px rgb(34 197 94 / 0.7)",
          },
        },
        typing: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        "loading-dots": {
          "0%, 20%": {
            color: "rgb(34, 197, 94)",
            transform: "scale(1)",
          },
          "50%": {
            color: "rgb(74, 222, 128)",
            transform: "scale(1.2)",
          },
          "80%, 100%": {
            color: "rgb(34, 197, 94)",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        typing: "typing 2s steps(20, end) infinite",
        "loading-dots": "loading-dots 1.5s infinite",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.7)",
        card: "0 4px 20px 0 rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 30px 0 rgba(0, 0, 0, 0.5)",
        glow: "0 0 20px rgb(34 197 94 / 0.4)",
        "glow-strong": "0 0 40px rgb(34 197 94 / 0.6)",
        "green-glow": "0 0 30px rgb(34 197 94 / 0.5)",
      },
      backgroundImage: {
        "dark-gradient":
          "linear-gradient(to bottom right, rgb(0, 0, 0), rgb(15, 15, 15), rgb(0, 0, 0))",
        "green-gradient":
          "linear-gradient(135deg, rgb(34, 197, 94), rgb(74, 222, 128))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
