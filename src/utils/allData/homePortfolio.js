import retail from '../../../public/portfolio/imagesApps/retailheroes.webp';
import kala from '../../../public/portfolio/imagesApps/kalahvala.webp';
import mOne from '../../../public/portfolio/imagesApps/mOne.webp';

import pets from '../../../public/portfolio/imagesWeb/pets.webp';
import talex from '../../../public/portfolio/imagesWeb/talexm.webp';
import milspedJust from '../../../public/portfolio/imagesApps/milspedJust.webp';

import blackjack from '../../../public/portfolio/imagesGames/blackjack.webp';
import puzzle from '../../../public/portfolio/imagesGames/puzzle.webp';
import snake from '../../../public/portfolio/imagesGames/snake.webp';

export const apps = [
    {
        id: "jednakala",
        title: "Kala hvala",
        desc: "This React app was made so that people can express their gratitude to firefighters by posting an image and text as desired. All posts are publicly available, and at the end, the winning post is announced.",
        liveUrl: 'https://jednakala-jednohvala.hr/',
        gitUrl: 'https://github.com/MirosBL45/kala-hvala',
        image: kala,
        techs: ['React', 'MaterialUI', 'Axios', 'JS-Cookie'],
    },
    {
        id: "retail-heroes",
        title: "Retail Heroes",
        desc: "This React app is like a little game show and the rules are: you can click on each week to open its section and watch short clips, then you collect stickers for that week. After watching all 4 weeks, you get cool stickers as a gift.",
        liveUrl: 'https://retail-heroes.vercel.app/',
        gitUrl: 'https://github.com/MirosBL45/retail_heroes',
        image: retail,
        techs: ['React', 'JSZip', 'File-saver', 'Framer-motion'],
    },
    {
        id: "milsped",
        title: "Milšped: M-ONE",
        desc: "Milšped Group includes 3 web applications, Milšped, M-ONE and MBOX which are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the Strapi, translations, the creation of the transport service price calculator and other things.",
        liveUrl: 'https://m-one.rs/',
        gitUrl: 'https://github.com/MirosBL45',
        image: mOne,
        techs: ['Vue.js', 'Nuxt.js', 'Strapi', 'CSS'],
    },
];

export const websites = [
    {
        id: "milsped",
        title: "Milšped Group",
        desc: "Milšped Group includes 3 web applications, Milšped, M-ONE and MBOX which are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the Strapi, translations, the creation of the transport service price calculator and other things.",
        liveUrl: 'https://www.milsped.com/',
        gitUrl: 'https://github.com/MirosBL45',
        image: milspedJust,
        techs: ['Vue.js', 'Nuxt.js', 'Strapi', 'CSS'],
    },
    {
        id: "talex",
        title: "Talex",
        desc: "Talex invest is a company for the execution of works in construction, Belgrade. I did the creation of galleries, the integration of animations in Vue.js, image customization and other things.",
        liveUrl: 'https://www.talex.rs/',
        gitUrl: 'https://github.com/MirosBL45/talex',
        image: talex,
        techs: ['Vue.js', 'Nuxt.js', 'Leaflet', 'CSS'],
    },
    {
        id: "Pets",
        title: "Pets - Medicine for the soul",
        desc: "Designed in Figma, this site is a fusion of pet love and technology. One of the key challenges was the implementation of multilingualism and choosing between six world languages. Project is adapted for different screens.",
        liveUrl: 'https://petsmj.netlify.app/',
        gitUrl: 'https://github.com/MirosBL45/pets_on_languages',
        image: pets,
        techs: ['JavaScript', 'Figma', 'CSS', 'SCSS'],
    },
];

export const games = [
    {
        id: "Blackjack",
        title: "Blackjack",
        desc: "It was crucial to implement the rules of Blackjack, including proper counting of card values, treating aces as 1 or 11, and proper management of aces. Also, I had to pay attention to the logic around `busting` when a player goes over 21.",
        liveUrl: 'https://mjblackjack.netlify.app/',
        gitUrl: 'https://github.com/MirosBL45/Blackjack',
        image: blackjack,
        techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
    },
    {
        id: "Puzzle",
        title: "Puzzle",
        desc: "This game provides puzzles at three difficulty levels, progressively more challenging. A key challenge was implementing drag functionality for puzzle pieces, ensuring correct positioning to complete the image. It was essential to handle drag events and placement carefully.",
        liveUrl: 'https://puzzlemj.netlify.app/',
        gitUrl: 'https://github.com/MirosBL45/Puzzle_game',
        image: puzzle,
        techs: ['JavaScript', 'HTML', 'CSS', 'SCSS'],
    },
    {
        id: "Snake",
        title: "Snake",
        desc: "Implementing the logic for snake movement and bite detection was key. I had to carefully balance the speed of the snake, react to user commands and avoid collisions with walls. An additional challenge was developing the mechanics to generate bites on the screen that the snake eats in order to grow.",
        liveUrl: 'https://snake-final.vercel.app/',
        gitUrl: 'https://github.com/MirosBL45/snake_final',
        image: snake,
        techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
    },
];