const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');


mix.js('src/app.js', 'dist/js')
    .sass('src/app.scss', 'dist/css')
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss() ],
    });