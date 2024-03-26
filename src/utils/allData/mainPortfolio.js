import games from '../../../public/portfolio/games.jpg';
import sites from '../../../public/portfolio/sites.jpg';
import webapps from '../../../public/portfolio/webapps.jpg';

import blackjack from '../../../public/portfolio/imagesGames/blackjack.jpg';
import poker from '../../../public/portfolio/imagesGames/poker.jpg';
import memory from '../../../public/portfolio/imagesGames/memory.jpg';
import puzzle from '../../../public/portfolio/imagesGames/puzzle.jpg';
import snake from '../../../public/portfolio/imagesGames/snake.jpg';
import tictactoe from '../../../public/portfolio/imagesGames/tictactoe.jpg';

import slider from '../../../public/portfolio/imagesWeb/slider.jpg';
import pets from '../../../public/portfolio/imagesWeb/pets.jpg';
import social from '../../../public/portfolio/imagesWeb/social.jpg';
import quiz from '../../../public/portfolio/imagesWeb/quiz.jpg';
import candle from '../../../public/portfolio/imagesWeb/candle.jpg';

import companywall from '../../../public/portfolio/imagesApps/companywall.jpg';
import materialSocial from '../../../public/portfolio/imagesApps/materialSocial.jpg';
import promptopia from '../../../public/portfolio/imagesApps/promptopia.jpg';
import todo from '../../../public/portfolio/imagesApps/todo.jpg';
import recipe from '../../../public/portfolio/imagesApps/recipe.jpg';
import comit from '../../../public/portfolio/imagesApps/comit.jpg';
import githubfinder from '../../../public/portfolio/imagesApps/githubfinder.jpg';
import houses from '../../../public/portfolio/imagesApps/houses.jpg';
import milspedAll from '../../../public/portfolio/imagesApps/milspedAll.jpg';
import simic from '../../../public/portfolio/imagesApps/simic.jpg';
import retail from '../../../public/portfolio/imagesApps/retail.jpg';
import kala from '../../../public/portfolio/imagesApps/kala.jpg';

export const portfolioData = [
    {
        id: 1,
        title: "Applications",
        url: "/portfolio/apps",
        image: webapps,
        description: 'Embark on a journey through my collection of dynamic web applications, each meticulously crafted using JavaScript, React, Next.js and Vue.js. These applications showcase my expertise in frontend development and my dedication to creating intuitive and efficient digital solutions.',
    },
    {
        id: 2,
        title: "Web sites",
        url: "/portfolio/websites",
        image: sites,
        description: 'Discover a variety of websites that showcase my emphasis on clean design and a smooth user experience, demonstrating my dedication to creating visually appealing and efficient online destinations. Explore the convergence of art and technology as you travel these engaging digital environments.',
    },
    {
        id: 3,
        title: "Games",
        url: "/portfolio/games",
        image: games,
        description: 'Indulge in the thrill of interactive entertainment with my collection of games. Developed using JavaScript these games offer experiences that captivate players because each game highlights my passion for blending creativity with technical expertise.',
    },
];

export const itemsPortfolio = {
    apps: [
        {
            id: "jednakala",
            title: "Kala hvala",
            desc: "This React app was made so that people can express their gratitude to firefighters by posting an image and text as desired. All posts are publicly available, and at the end, the winning post is announced.",
            url: 'https://jednakala-jednohvala.hr/',
            github: 'https://github.com/MirosBL45/kala-hvala',
            image: kala,
        },
        {
            id: "retail-heroes",
            title: "Retail Heroes",
            desc: "This React app is like a little game show and the rules are: you can click on each week to open its section and watch short clips, then you collect stickers for that week. After watching all 4 weeks, you get cool stickers as a gift.",
            url: 'https://retail-heroes.vercel.app/',
            github: 'https://github.com/MirosBL45/retail_heroes',
            image: retail,
        },
        {
            id: "milsped",
            title: "Milšped Group",
            desc: "Milšped Group includes 3 web applications, Milšped, M-ONE and MBOX which are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the Strapi, translations, the creation of the transport service price calculator and many other things.",
            url: 'https://www.milsped.com/',
            github: 'https://github.com/MirosBL45/milsped',
            image: milspedAll,
        },
        {
            id: "simic",
            title: "“Dr Simić” dental office",
            desc: "This application is made in Vue.js, Nuxt.js.I did the creation of galleries, the implementation of the English-Serbian language, adding some pages and other things.",
            url: 'https://www.dental-simic.rs/',
            github: 'https://github.com/MirosBL45/dental-simic',
            image: simic,
        },
        {
            id: "houses",
            title: "House marketplace",
            desc: "This platform offers you the opportunity to research, sell or rent houses with a user-friendly interface. Users can register, post ads for selling or renting their home, entering information such as price, number of rooms, number of bathrooms and even displaying the location on a map.",
            url: 'https://house-marketplace-mirosbl45.vercel.app/',
            github: 'https://github.com/MirosBL45/house-marketplace',
            image: houses,
        },
        {
            id: "promptopia",
            title: "Promptopia",
            desc: "This Next.js app uses a range of technologies, including bcrypt, MongoDB, Mongoose, NextAuth and Tailwind CSS. Goal is to provide you with a unique experience where you can explore, create and share creative inspiration.",
            url: 'https://promptopia-by-miroslav.vercel.app/',
            github: 'https://github.com/MirosBL45/Promptopia',
            image: promptopia,
        },
        {
            id: "github-finder",
            title: "Github Finder",
            desc: "This React app gives you easy access to user accounts on GitHub, allowing you to explore repositories and learn about the work of other developers. A simple user search lets you find developers by name and view their GitHub profiles.",
            url: 'https://github-finder-app-mirosbl45.vercel.app/',
            github: 'https://github.com/MirosBL45/github_finder_app',
            image: githubfinder,
        },
        {
            id: "recipe-app",
            title: "Recipe App",
            desc: "This app becomes a personal culinary guide, powered by React. Explore the wealth of recipes, tailored to your tastes, with images that tempt your appetite. With the ability to filter by ingredients, this app provides a convenient way to find the perfect recipe.",
            url: 'https://recipe-app-mj.vercel.app/',
            github: 'https://github.com/MirosBL45/recipe-app',
            image: recipe,
        },
        {
            id: "company-wall-task",
            title: "Company wall Task",
            desc: "Roles page needs a data table to list roles from API, sorted by name (no duplicate names). Implement create/update actions for roles and users in a separate form page. Users page requires a data table listing users from API. Serve JSON from server as response. After creating/updating, redirect to respective list page.",
            url: 'https://mj-company-wall-task.vercel.app/',
            github: 'https://github.com/MirosBL45/company_wall_task',
            image: companywall,
        },
        {
            id: "comit-task",
            title: "Comit task",
            desc: "Task I got from ComIT International for the job on the position for Frontend developer. I got a design in Figma that I needed to turn into a site using React. In the assignment I got a link where the data is located, and link is protected with CORS, so you have to use Extension CORS Unblock on your browser.",
            url: 'https://assignment-for-comit-mj.vercel.app/',
            github: 'https://github.com/MirosBL45/assignment_for_comit',
            image: comit,
        },
        {
            id: 8,
            title: "To-do",
            desc: "This app simplifies adding, marking, and deleting items for organization. It covers adding new items, marking completed ones, and deleting irrelevant ones. Filter options allow viewing all, completed, or pending items. Notably, the app retains data even after browser refresh, ensuring no loss and maintaining your to-do list reliably.",
            url: 'https://to-do-list-react-js-mj.vercel.app/',
            github: 'https://github.com/MirosBL45/To-Do-List_ReactJS',
            image: todo,
        },
        {
            id: "material-UI-social-network",
            title: "Material UI social network",
            desc: "React project styled with Material UI, devoid of social networking features. The focus is on clean styling through Material UI components. I've organized the code into folders for better maintenance and future expansion.",
            url: 'https://material-social-network.vercel.app/',
            github: 'https://github.com/MirosBL45/material-social-network',
            image: materialSocial,
        },
    ],
    websites: [
        {
            id: 1,
            title: "Pets - Medicine for the soul",
            desc: "Designed in Figma, this site is a fusion of pet love and technology. One of the key challenges was the implementation of multilingualism and choosing between six world languages. Project is adapted for different screens.",
            url: 'https://petsmj.netlify.app/',
            github: 'https://github.com/MirosBL45/pets_on_languages',
            image: pets,
        },
        {
            id: 2,
            title: "Social network",
            desc: "This interactive website enables users to connect, share thoughts, and engage through posts, likes, and comments. A significant challenge was implementing secure authentication and authorization, ensuring safe login, data storage, and management through JavaScript.",
            url: 'https://socialnetworkmj.netlify.app/',
            github: 'https://github.com/MirosBL45/Social_Network',
            image: social,
        },
        {
            id: 3,
            title: "Quiz App",
            desc: "During the creation of this site, one of the key challenges was the implementation of a dynamic system for asking questions and collecting responses from users. I had to work carefully with JavaScript to properly manage the logic of the quiz, ensuring correct answers were properly tracked and results generated at the end.",
            url: 'https://quizappmj.netlify.app/',
            github: 'https://github.com/MirosBL45/Quiz_App',
            image: quiz,
        },
        {
            id: 4,
            title: "Candle",
            desc: "Click on each candle and blow out the flame to reveal the sweet rewards that await! The task was to implement the dynamic behavior of each candle which required precise JavaScript handling to ensure that the flame only goes out when the user clicks on a specific candle. Try it for resolution 375x667.",
            url: 'https://candle-game-mj.netlify.app/',
            github: 'https://github.com/MirosBL45/candle_game',
            image: candle,
        },
        {
            id: 5,
            title: "Slider Cat",
            desc: "It was crucial to track the mouse movements correctly and synchronize the movement of the crosshair with each step. This required careful manipulation of mouse events and proper handling of screen coordinates. Implementing a fluid and aesthetically pleasing line movement was a challenge in optimizing performance.",
            url: 'https://slidercatmj.netlify.app/',
            github: 'https://github.com/MirosBL45/Slider-cat',
            image: slider,
        },
    ],
    games: [
        {
            id: 1,
            title: "Blackjack",
            desc: "It was crucial to implement the rules of Blackjack, including proper counting of card values, treating aces as 1 or 11, and proper management of aces. Also, I had to pay attention to the logic around `busting` when a player goes over 21.",
            url: 'https://mjblackjack.netlify.app/',
            github: 'https://github.com/MirosBL45/Blackjack',
            image: blackjack,
        },
        {
            id: 2,
            title: "Memory game",
            desc: "One of the key challenges in the development of the Memory game was to implement the logic of turning cards and matching them. When two cards are flipped over, I had to carefully monitor their status, reveal them appropriately, and allow players to see and remember the images.",
            url: 'https://memory-card-game-mj.vercel.app/',
            github: 'https://github.com/MirosBL45/memory_card_game',
            image: memory,
        },
        {
            id: 3,
            title: "Puzzle",
            desc: "This game provides puzzles at three difficulty levels, progressively more challenging. A key challenge was implementing drag functionality for puzzle pieces, ensuring correct positioning to complete the image. It was essential to handle drag events and placement carefully.",
            url: 'https://puzzlemj.netlify.app/',
            github: 'https://github.com/MirosBL45/Puzzle_game',
            image: puzzle,
        },
        {
            id: 4,
            title: "Snake",
            desc: "Implementing the logic for snake movement and bite detection was key. I had to carefully balance the speed of the snake, react to user commands and avoid collisions with walls. An additional challenge was developing the mechanics to generate bites on the screen that the snake eats in order to grow.",
            url: 'https://snake-final.vercel.app/',
            github: 'https://github.com/MirosBL45/snake_final',
            image: snake,
        },
        {
            id: 5,
            title: "Tic tac toe",
            desc: "It was crucial to track wins and declare a winner automatically. This included detecting winning combinations and updating the game state accurately. Focus was also on enhancing the user interface for clear marking of player moves, maintaining game state visibility, and enabling easy mouse interaction.",
            url: 'https://tictactoemj.netlify.app/',
            github: 'https://github.com/MirosBL45/TicTacToe',
            image: tictactoe,
        },
        {
            id: 6,
            title: "Poker",
            desc: "I had to handle the logic for detecting and evaluating card combinations, which added to the complexity of the project. Through this creative process, I gained a deep understanding of JavaScript, working with objects, manipulating the DOM, and developing complex algorithms.",
            url: 'https://pokermj.netlify.app/',
            github: 'https://github.com/MirosBL45/Poker',
            image: poker,
        },
    ],
};