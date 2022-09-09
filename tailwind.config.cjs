/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.pug", "./src/assets/js/*.js"],
  theme: {
		colors: {
      'test': '#80180a',
      },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),],
}
