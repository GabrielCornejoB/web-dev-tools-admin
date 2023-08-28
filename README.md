# a

## Tailwind config

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Prettier

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

```json
/* .prettierrc.json */
{
  "trailingComma": "es5",
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Eslint

```js
module.exports = {
  // ..
  extends: [
     // ...
     'prettier',
  ],
  // ...

```
