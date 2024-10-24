import games from '../../../public/portfolio/games.jpg';
import sites from '../../../public/portfolio/sites.jpg';
import webapps from '../../../public/portfolio/webapps.jpg';

import blackjack from '../../../public/portfolio/imagesGames/blackjack.webp';
import poker from '../../../public/portfolio/imagesGames/poker.webp';
import memory from '../../../public/portfolio/imagesGames/memory.webp';
import puzzle from '../../../public/portfolio/imagesGames/puzzle.webp';
import snake from '../../../public/portfolio/imagesGames/snake.webp';
import tictactoe from '../../../public/portfolio/imagesGames/tictactoe.webp';

import slider from '../../../public/portfolio/imagesWeb/slidercat.webp';
import pets from '../../../public/portfolio/imagesWeb/pets.webp';
import social from '../../../public/portfolio/imagesWeb/socialnetwork.webp';
import quiz from '../../../public/portfolio/imagesWeb/quiz.webp';
import iqos from '../../../public/portfolio/imagesWeb/iqos.webp';
import talex from '../../../public/portfolio/imagesWeb/talexm.webp';
import uzelac from '../../../public/portfolio/imagesWeb/uzilight.webp';
import rakita from '../../../public/portfolio/imagesWeb/studiorakita.webp';

import companywall from '../../../public/portfolio/imagesApps/companywalltask.webp';
import materialSocial from '../../../public/portfolio/imagesApps/materialUI.webp';
import promptopia from '../../../public/portfolio/imagesApps/promptopiaApp.webp';
import todo from '../../../public/portfolio/imagesApps/todolist.webp';
import recipe from '../../../public/portfolio/imagesApps/recipeapp.webp';
import comit from '../../../public/portfolio/imagesApps/committask.webp';
import githubfinder from '../../../public/portfolio/imagesApps/githubfinder.webp';
import houses from '../../../public/portfolio/imagesApps/housemarketplace.webp';
import mboxt from '../../../public/portfolio/imagesApps/mboxt.webp';
import milspedJust from '../../../public/portfolio/imagesApps/milspedJust.webp';
import mOne from '../../../public/portfolio/imagesApps/mOne.webp';
import simic from '../../../public/portfolio/imagesApps/drsimic.webp';
import retail from '../../../public/portfolio/imagesApps/retailheroes.webp';
import kala from '../../../public/portfolio/imagesApps/kalahvala.webp';
import whatsApp from '../../../public/portfolio/imagesApps/whatsApp.webp';
import imageGallery from '../../../public/portfolio/imagesApps/imageGallery.webp';
import liveDocs from '../../../public/portfolio/imagesApps/liveDocs.webp';
import carHub from '../../../public/portfolio/imagesApps/carHub.webp';

export const portfolioData = [
    {
        id: 1,
        title: "Apps",
        url: "/portfolio/apps",
        image: webapps,
        description: 'Embark on a journey through my collection of dynamic web applications, each meticulously crafted using JavaScript, React, Next.js and Vue.js. These applications showcase my expertise in frontend development and my dedication to creating intuitive and efficient digital solutions.',
        forUrl: 'apps',
    },
    {
        id: 3,
        title: "Games",
        url: "/portfolio/games",
        image: games,
        description: 'Indulge in the thrill of interactive entertainment with my collection of games. Developed using JavaScript these games offer experiences that captivate players because each game highlights my passion for blending creativity with technical expertise.',
        forUrl: 'games',
    },
    {
        id: 2,
        title: "Websites",
        url: "/portfolio/websites",
        image: sites,
        description: 'Discover a variety of websites that showcase my emphasis on clean design and a smooth user experience, demonstrating my dedication to creating visually appealing and efficient online destinations. Explore the convergence of art and technology as you travel these engaging digital environments.',
        forUrl: 'websites',
    },
];

export const itemsPortfolio = {
    apps: [
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
            desc: "Milšped Group includes 3 web applications, Milšped, M-ONE and MBOX which are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the Strapi, translations, the creation of the transport service price calculator and many other things.",
            liveUrl: 'https://m-one.rs/',
            gitUrl: 'https://github.com/MirosBL45',
            image: mOne,
            techs: ['Vue.js', 'Nuxt.js', 'Strapi', 'CSS'],
        },
        {
            id: "simic",
            title: "“Dr Simić” dental office",
            desc: "This application is made in Vue.js, Nuxt.js.I did the creation of galleries, the implementation of the English-Serbian language, adding some pages and other things.",
            liveUrl: 'https://www.dental-simic.rs/',
            gitUrl: 'https://github.com/MirosBL45/dental-simic',
            image: simic,
            techs: ['Vue.js', 'Nuxt.js', 'Strapi', 'CSS'],
        },
        {
            id: "liveDocs",
            title: "Collaborative SaaS Application",
            desc: "I developed a collaborative SaaS application that enables real-time document editing, user authentication, document storage, and performance monitoring. Inspired by Google Docs, this application is tailored for enterprise users, offering advanced monitoring and notification capabilities.",
            liveUrl: 'https://live-docs-mj.vercel.app/',
            gitUrl: 'https://github.com/MirosBL45/live_docs',
            image: liveDocs,
            techs: ['Next.js', 'TypeScript', 'Liveblocks', 'Sentry'],
        },
        {
            id: "whatsApp",
            title: "Desktop WhatsApp Clone with OpenAI",
            desc: "Made in Next.js with TypeScript this desktop WhatsApp Clone supports group chat, video call, ChatGPT support for with @gpt and image generation with @dall-e. Of course, there are also group chats, as well as regular sending of pictures or videos.",
            liveUrl: 'https://whats-app-mjovic.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/WhatsApp',
            image: whatsApp,
            techs: ['Next.js', 'TypeScript', 'TailwindCSS', 'Convex'],
        },
        {
            id: "carHub",
            title: "Car Hub Application",
            desc: "The app provides a smooth and responsive user experience, with filters to help users find the exact vehicle they are looking for. It is made in Next.js with TypeScript, to ensure speed and stability of responses from the web.",
            liveUrl: 'https://car-hub-jovicm.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/car_hub',
            image: carHub,
            techs: ['Next.js', 'TypeScript', 'HeadlessUI', 'TailwindCSS'],
        },
        {
            id: "houses",
            title: "House marketplace",
            desc: "This platform offers you the opportunity to research, sell or rent houses with a user-friendly interface. Users can register, post ads for selling or renting their home, entering information such as price, number of rooms, number of bathrooms and even displaying the location on a map.",
            liveUrl: 'https://house-marketplace-mirosbl45.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/house-marketplace',
            image: houses,
            techs: ['React', 'Firebase', 'Leaflet', 'Swiper'],
        },
        {
            id: "promptopia",
            title: "Promptopia",
            desc: "This Next.js app uses a range of technologies, including bcrypt, MongoDB, Mongoose, NextAuth and Tailwind CSS. Goal is to provide you with a unique experience where you can explore, create and share creative inspiration.",
            liveUrl: 'https://promptopia-by-miroslav.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/Promptopia',
            image: promptopia,
            techs: ['Next.js', 'MongoDB', 'Bcrypt', 'Next-auth'],
        },
        {
            id: "pexelsImageGallery",
            title: "Pexels Image Gallery",
            desc: "This project is an image gallery application that fetches images from pexels.com. It features pagination and allows users to search for images based on the object in the picture (e.g., typing `cat` displays images of cats).",
            liveUrl: 'https://pexels-gallery-mj.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/Next.js-Image-Gallery',
            image: imageGallery,
            techs: ['Next.js', 'TypeScript', 'zod', 'TailwindCSS'],
        },
        {
            id: "gitUrl-finder",
            title: "GitHub Finder",
            desc: "This React app gives you easy access to user accounts on GitHub, allowing you to explore repositories and learn about the work of other developers. A simple user search lets you find developers by name and view their GitHub profiles.",
            liveUrl: 'https://github-finder-app-mj.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/github_finder_app',
            image: githubfinder,
            techs: ['React', 'Axios', 'DaisyUI', 'React-icons'],
        },
        {
            id: "recipe-app",
            title: "Recipe App",
            desc: "This app becomes a personal culinary guide, powered by React. Explore the wealth of recipes, tailored to your tastes, with images that tempt your appetite. With the ability to filter by ingredients, this app provides a convenient way to find the perfect recipe.",
            liveUrl: 'https://recipe-app-mj.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/recipe-app',
            image: recipe,
            techs: ['React', 'Framer-motion', 'React-icons', 'Styled-components'],
        },
        {
            id: "company-wall-task",
            title: "Company wall Task",
            desc: "Roles page needs a data table to list roles from API, sorted by name (no duplicate names). Implement create/update actions for roles and users in a separate form page. Users page requires a data table listing users from API. Serve JSON from server as response. After creating/updating, redirect to respective list page.",
            liveUrl: 'https://mj-company-wall-task.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/company_wall_task',
            image: companywall,
            techs: ['Next.js', 'MongoDB', 'Mongoose', 'MaterialUI'],
        },
        {
            id: "comit-task",
            title: "Comit task",
            desc: "Task I got from ComIT International for the job on the position for Frontend developer. I got a design in Figma that I needed to turn into a site using React. In the assignment I got a link where the data is located, and link is protected with CORS, so you have to use Extension CORS Unblock on your browser.",
            liveUrl: 'https://assignment-for-comit-mj.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/assignment_for_comit',
            image: comit,
            techs: ['React', 'Figma', 'CSS', 'Sass'],
        },
        {
            id: 8,
            title: "To-do",
            desc: "This app simplifies adding, marking, and deleting items for organization. It covers adding new items, marking completed ones, and deleting irrelevant ones. Filter options allow viewing all, completed, or pending items. Notably, the app retains data even after browser refresh, ensuring no loss and maintaining your to-do list reliably.",
            liveUrl: 'https://to-do-list-react-js-mj.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/To-Do-List_ReactJS',
            image: todo,
            techs: ['React', 'React-icons', 'CSS'],
        },
        {
            id: "material-UI-social-network",
            title: "Material UI social network",
            desc: "React project styled with Material UI, devoid of social networking features. The focus is on clean styling through Material UI components. I've organized the code into folders for better maintenance and future expansion.",
            liveUrl: 'https://material-social-network.vercel.app',
            gitUrl: 'https://github.com/MirosBL45/material-social-network',
            image: materialSocial,
            techs: ['React', 'MaterialUI'],
        },
    ],
    games: [
        {
            id: 1,
            title: "Blackjack",
            desc: "It was crucial to implement the rules of Blackjack, including proper counting of card values, treating aces as 1 or 11, and proper management of aces. Also, I had to pay attention to the logic around `busting` when a player goes over 21.",
            liveUrl: 'https://mjblackjack.netlify.app/',
            gitUrl: 'https://github.com/MirosBL45/Blackjack',
            image: blackjack,
            techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
        },
        {
            id: 2,
            title: "Memory game",
            desc: "One of the key challenges in the development of the Memory game was to implement the logic of turning cards and matching them. When two cards are flipped over, I had to carefully monitor their status, reveal them appropriately, and allow players to see and remember the images.",
            liveUrl: 'https://memory-card-game-mj.vercel.app/',
            gitUrl: 'https://github.com/MirosBL45/memory_card_game',
            image: memory,
            techs: ['JavaScript', 'HTML', 'CSS', 'SCSS'],
        },
        {
            id: 3,
            title: "Puzzle",
            desc: "This game provides puzzles at three difficulty levels, progressively more challenging. A key challenge was implementing drag functionality for puzzle pieces, ensuring correct positioning to complete the image. It was essential to handle drag events and placement carefully.",
            liveUrl: 'https://puzzlemj.netlify.app/',
            gitUrl: 'https://github.com/MirosBL45/Puzzle_game',
            image: puzzle,
            techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
        },
        {
            id: 4,
            title: "Snake",
            desc: "Implementing the logic for snake movement and bite detection was key. I had to carefully balance the speed of the snake, react to user commands and avoid collisions with walls. An additional challenge was developing the mechanics to generate bites on the screen that the snake eats in order to grow.",
            liveUrl: 'https://snake-final.vercel.app/',
            gitUrl: 'https://github.com/MirosBL45/snake_final',
            image: snake,
            techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
        },
        {
            id: 5,
            title: "Tic tac toe",
            desc: "It was crucial to track wins and declare a winner automatically. This included detecting winning combinations and updating the game state accurately. Focus was also on enhancing the user interface for clear marking of player moves, maintaining game state visibility, and enabling easy mouse interaction.",
            liveUrl: 'https://tictactoemj.netlify.app/',
            gitUrl: 'https://github.com/MirosBL45/TicTacToe',
            image: tictactoe,
            techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
        },
        {
            id: 6,
            title: "Poker",
            desc: "I had to handle the logic for detecting and evaluating card combinations, which added to the complexity of the project. Through this creative process, I gained a deep understanding of JavaScript, working with objects, manipulating the DOM, and developing complex algorithms.",
            liveUrl: 'https://pokermj.netlify.app/',
            gitUrl: 'https://github.com/MirosBL45/Poker',
            image: poker,
            techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
        },
    ],
    websites: [
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
            id: "uzelac",
            title: "Uzelac Light",
            desc: "Uzelac is in lighting design and visual storytelling. I made for him whole website with Vite.js which prioritizes speed by leveraging native ES module support in browsers, resulting in rapid startup times during development.",
            liveUrl: 'https://uzilight.com/',
            gitUrl: 'https://github.com/MirosBL45/uzelac_web',
            image: uzelac,
            techs: ['Vite.js', 'Framer-motion', 'TailwindCSS', 'React-three'],
        },
        {
            id: "rakita",
            title: "Studio Rakita",
            desc: "Shooting events like weddings, sporting events, and high-altitude drone shooting is what Studio Rakita does. I made for them whole website with Next.js for server-side rendering, using TailwindCSS utility-first CSS styling framework.",
            liveUrl: 'https://studio-rakita.vercel.app/',
            gitUrl: 'https://github.com/MirosBL45/studio_rakita',
            image: rakita,
            techs: ['Next.js', 'Framer-motion', 'TailwindCSS', 'Swiper'],
        },
        {
            id: "milsped",
            title: "Milšped: MBOX Terminals",
            desc: "Milšped Group includes 3 web applications, Milšped, M-ONE and MBOX which are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the Strapi, translations, the creation of the transport service price calculator and many other things.",
            liveUrl: 'https://mboxt.com/',
            gitUrl: 'https://github.com/MirosBL45',
            image: mboxt,
            techs: ['Vue.js', 'Nuxt.js', 'Strapi', 'CSS'],
        },
        {
            id: 1,
            title: "Pets - Medicine for the soul",
            desc: "Designed in Figma, this site is a fusion of pet love and technology. One of the key challenges was the implementation of multilingualism and choosing between six world languages. Project is adapted for different screens.",
            liveUrl: 'https://petsmj.netlify.app/',
            gitUrl: 'https://github.com/MirosBL45/pets_on_languages',
            image: pets,
            techs: ['JavaScript', 'Figma', 'CSS', 'SCSS'],
        },
        {
            id: "milspedGroup",
            title: "Milšped Group",
            desc: "Milšped Group includes 3 web applications, Milšped, M-ONE and MBOX which are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the Strapi, translations, the creation of the transport service price calculator and other things.",
            liveUrl: 'https://www.milsped.com/',
            gitUrl: 'https://github.com/MirosBL45',
            image: milspedJust,
            techs: ['Vue.js', 'Nuxt.js', 'Strapi', 'CSS'],
        },
        {
            id: 2,
            title: "Social network",
            desc: "This interactive website enables users to connect, share thoughts, and engage through posts, likes, and comments. A significant challenge was implementing secure authentication and authorization, ensuring safe login, data storage, and management through JavaScript.",
            liveUrl: 'https://socialnetworkmj.netlify.app/',
            gitUrl: 'https://github.com/MirosBL45/Social_Network',
            image: social,
            techs: ['JavaScript', 'HTML', 'CSS', 'SCSS'],
        },
        {
            id: 3,
            title: "Quiz App",
            desc: "During the creation of this site, one of the key challenges was the implementation of a dynamic system for asking questions and collecting responses from users. I had to work carefully with JavaScript to properly manage the logic of the quiz, ensuring correct answers were properly tracked and results generated at the end.",
            liveUrl: 'https://quizappmj.netlify.app/',
            gitUrl: 'https://github.com/MirosBL45/Quiz_App',
            image: quiz,
            techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
        },
        {
            id: 4,
            title: "Iqos",
            desc: "Click on each candle and blow out the flame to reveal the sweet rewards that await! The task was to implement the dynamic behavior of each candle which required precise JavaScript handling to ensure that the flame only goes out when the user clicks on a specific candle. Try it for resolution 375x667.",
            liveUrl: 'https://candle-game-mj.netlify.app/',
            gitUrl: 'https://github.com/MirosBL45/candle_game',
            image: iqos,
            techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
        },
        {
            id: 5,
            title: "Slider Cat",
            desc: "It was crucial to track the mouse movements correctly and synchronize the movement of the crosshair with each step. This required careful manipulation of mouse events and proper handling of screen coordinates. Implementing a fluid and aesthetically pleasing line movement was a challenge in optimizing performance.",
            liveUrl: 'https://slidercatmj.netlify.app/',
            gitUrl: 'https://github.com/MirosBL45/Slider-cat',
            image: slider,
            techs: ['JavaScript', 'SCSS', 'CSS', 'HTML'],
        },
    ],
};