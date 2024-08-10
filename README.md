 # LMS FRONTEND

### Set up instruction

1.  Clone the project
```
    git clone https://github.com/omarjun/LMS-frontend.git
```

2. Move into the directory 
```
     cd client
```
3. Install the dependencies
```
    npm install
```
4. Run the server
```
    npm run dev
```

### Tailwind setup instructions


1. Installing TailwindCSS and configuration
```
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
```

2. Add file extensions to tailwind config file

``` 
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```
3.Add the tailwind directives at the top of the index.css
```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

### Adding plugins and dependicies

```
    npm i @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui@latest axios react-hot-toast @tailwindcss/line-clamp
```
