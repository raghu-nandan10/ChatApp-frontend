/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      custom: [
        "Trebuchet MS",
        "Lucida Sans Unicode",
        "Lucida Grande",
        "Lucida Sans",
      ],
      customFont: [
        "SF UI Text",
        " -apple - system",
        " BlinkMacSystemFont",
        "Segoe UI",
        " Roboto",
        " Helvetica",
        " Arial",
        "sans - serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ],
    },
  },
  plugins: [],
};
