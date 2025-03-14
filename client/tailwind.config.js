/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        PoppinsSemiBold: ["Poppins_600SemiBold", "sans-serif"],
        PoppinsBold: ["Poppins_700Bold", "sans-serif"],
        PoppinsLight: ["Poppins_300Light", "sans-serif"],
        PoppinsMedium: ["Poppins_500Medium", "sans-serif"],
        PoppinsRegular: ["Poppins_400Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
