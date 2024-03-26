import retail from '../../../public/portfolio/imagesApps/retail.jpg';
import kala from '../../../public/portfolio/imagesApps/kala.jpg';
import houses from '../../../public/portfolio/imagesApps/houses.jpg';
import milspedAll from '../../../public/portfolio/imagesApps/milspedAll.jpg';

import pets from '../../../public/portfolio/imagesWeb/pets.jpg';
import social from '../../../public/portfolio/imagesWeb/social.jpg';
import quiz from '../../../public/portfolio/imagesWeb/quiz.jpg';

import blackjack from '../../../public/portfolio/imagesGames/blackjack.jpg';
import puzzle from '../../../public/portfolio/imagesGames/puzzle.jpg';
import snake from '../../../public/portfolio/imagesGames/snake.jpg';

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
        title: "Milšped Group",
        desc: "Milšped Group includes 3 web applications, Milšped, M-ONE and MBOX which are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the Strapi, translations, the creation of the transport service price calculator and other things.",
        liveUrl: 'https://www.milsped.com/',
        gitUrl: 'https://github.com/MirosBL45/milsped',
        image: milspedAll,
        techs: ['Vue.js', 'Nuxt.js', 'Strapi', 'CSS'],
    },
];

export const websites = [
    {
        id: "Pets",
        title: "Pets - Medicine for the soul",
        desc: "Designed in Figma, this site is a fusion of pet love and technology. One of the key challenges was the implementation of multilingualism and choosing between six world languages. Project is adapted for different screens.",
        liveUrl: 'https://petsmj.netlify.app/',
        gitUrl: 'https://github.com/MirosBL45/pets_on_languages',
        image: pets,
        techs: ['JavaScript', 'Figma', 'CSS', 'SCSS'],
    },
    {
        id: "Social",
        title: "Social network",
        desc: "This interactive website enables users to connect, share thoughts, and engage through posts, likes, and comments. A significant challenge was implementing secure authentication and authorization, ensuring safe login, data storage, and management through JavaScript.",
        liveUrl: 'https://socialnetworkmj.netlify.app/',
        gitUrl: 'https://github.com/MirosBL45/Social_Network',
        image: social,
        techs: ['JavaScript', 'HTML', 'CSS', 'SCSS'],
    },
    {
        id: "Quiz",
        title: "Quiz App",
        desc: "During the creation of this site, one of the key challenges was the implementation of a dynamic system for asking questions and collecting responses from users. I had to work carefully with JavaScript to properly manage the logic of the quiz, ensuring correct answers were properly tracked and results generated at the end.",
        liveUrl: 'https://quizappmj.netlify.app/',
        gitUrl: 'https://github.com/MirosBL45/Quiz_App',
        image: quiz,
        techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
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