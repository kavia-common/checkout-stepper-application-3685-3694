module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#F59E0B",
        error: "#EF4444",
        surface: "#ffffff",
        background: "#f9fafb",
        text: "#111827"
      },
      boxShadow: {
        'soft': '0 10px 25px -10px rgba(0,0,0,0.15)'
      },
      borderRadius: {
        'xl': '1rem'
      }
    }
  },
  plugins: []
}
