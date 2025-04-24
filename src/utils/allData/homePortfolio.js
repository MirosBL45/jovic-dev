import retail from '../../../public/portfolio/imagesApps/retailheroes Miroslav Jovic Frontend Developer.webp';
import kala from '../../../public/portfolio/imagesApps/kalahvala Miroslav Jovic Frontend Developer.webp';
import mOne from '../../../public/portfolio/imagesApps/mOne Miroslav Jovic Frontend Developer.webp';

import rakita from '../../../public/portfolio/imagesWeb/studiorakita Miroslav Jovic Frontend Developer.webp';
import talex from '../../../public/portfolio/imagesWeb/talexm Miroslav Jovic Frontend Developer.webp';
import milspedJust from '../../../public/portfolio/imagesApps/milspedJust Miroslav Jovic Frontend Developer.webp';

import blackjack from '../../../public/portfolio/imagesGames/blackjack Miroslav Jovic Frontend Developer.webp';
import puzzle from '../../../public/portfolio/imagesGames/puzzle Miroslav Jovic Frontend Developer.webp';
import snake from '../../../public/portfolio/imagesGames/snake Miroslav Jovic Frontend Developer.webp';

export const apps = [
    {
        id: "jednakala",
        title: "Kala hvala",
        desc: "This React app was made so that people can express their gratitude to firefighters by posting an image and text as desired. All posts are publicly available, and at the end, the winning post is announced.",
        liveUrl: 'https://kala-hvala-mj.vercel.app/',
        gitUrl: 'https://github.com/MirosBL45/kala-hvala',
        image: kala,
        techs: ['React', 'MaterialUI', 'Axios', 'JS-Cookie'],
    },
    {
        id: "retail-heroes",
        title: "Retail Heroes",
        desc: "This React app is like a little game show with rules: you can click on each week to open its section and watch short clips, then you collect stickers for that week. After watching all 4 weeks, you get cool stickers as a gift.",
        liveUrl: 'https://retail-heroes.vercel.app/',
        gitUrl: 'https://github.com/MirosBL45/retail_heroes',
        image: retail,
        techs: ['React', 'JSZip', 'File-saver', 'Framer-motion'],
    },
    {
        id: "milsped",
        title: "Milšped: M-ONE",
        desc: "Milšped, M-ONE and MBOX are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the Strapi, translations, the creation of the transport service price calculator and other things.",
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
        desc: "Milšped, M-ONE and MBOX are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the Strapi, translations, the creation of the transport service price calculator and other things.",
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
        id: "rakita",
        title: "Studio Rakita",
        desc: "Shooting weddings, sporting events, and high-altitude drone shooting is what Studio Rakita does. This website uses Next.js for server-side rendering with the TailwindCSS utility-first CSS styling framework.",
        liveUrl: 'https://studio-rakita.vercel.app/',
        gitUrl: 'https://github.com/MirosBL45/studio_rakita',
        image: rakita,
        techs: ['Next.js', 'Framer-motion', 'TailwindCSS', 'Swiper'],
    },
];

export const games = [
    {
        id: "Blackjack",
        title: "Blackjack",
        desc: "It was crucial to implement the rules of Blackjack, including proper counting of card values, treating aces as 1 or 11, and proper management of aces. Also, the logic around `busting` when a player goes over 21.",
        liveUrl: 'https://mjblackjack.netlify.app/',
        gitUrl: 'https://github.com/MirosBL45/Blackjack',
        image: blackjack,
        techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
    },
    {
        id: "Puzzle",
        title: "Puzzle",
        desc: "Puzzles at three difficulty levels, progressively more challenging. A key challenge was implementing drag functionality for pieces, ensuring correct positioning. It was essential to handle drag events and placement.",
        liveUrl: 'https://puzzlemj.netlify.app/',
        gitUrl: 'https://github.com/MirosBL45/Puzzle_game',
        image: puzzle,
        techs: ['JavaScript', 'HTML', 'CSS', 'SCSS'],
    },
    {
        id: "Snake",
        title: "Snake",
        desc: "Snake movement and bite detection was the key. I had to balance the speed, reaction on user commands and avoid walls. Also the mechanics to generate bites on the screen that the snake eats in order to grow.",
        liveUrl: 'https://snake-final.vercel.app/',
        gitUrl: 'https://github.com/MirosBL45/snake_final',
        image: snake,
        techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
    },
];