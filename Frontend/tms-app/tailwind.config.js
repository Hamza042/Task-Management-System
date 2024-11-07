/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      colors: {
        'bg': '#D6D6D6',
        'green':'#05CC95',
        'pink':'#FDB1C6',
        'orange':'#FF8737',
        'blue':'#2DBEF5',
        'yellow':'#FFC100',
        'darkGrey':'#242132',
        'lightGrey':'#363344',
        'MediumGrey':'#403C55',
        'purple':'#AB66FF',
        'lightPurple':"#6C5569",
        "lightPink":"#FFCBC8"

      },ringColor:{
        DEFAULT: '#F5BC70'
      },
      scrollbarHide: {
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', /* IE and Edge */
        'scrollbar-width': 'none', /* Firefox */
      },
    },
  },
  variants: {
    extend: {
      ringColor: ['focus'],
    },
  },
  plugins: [],
}