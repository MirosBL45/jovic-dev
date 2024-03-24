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
            desc: "This React app was made so that people can express their gratitude to firemans by posting an image and text as desired. All posts are publicly available and at the end the winning post is announced. || In my previous company, 4bees, I have been working on this project from scratch after getting design in Figma.",
            url: 'https://jednakala-jednohvala.hr/',
            image: kala,
        },
        {
            id: "retail-heroes",
            title: "Retail Heroes",
            desc: "This beautiful React app was made for client from Switzerland. It is like a little game show and the rules are: you can click on each week to open its section and watch short clips, then you collect stickers for that week. After watching all 4 weeks, you get cool stickers as a gift. If you watch on a mobile phone, you can save the stickers in Viber and send them to your friends. || In my previous company, 4bees, I have been working on this project from scratch after getting design in Figma. I mostly worked for the desktop version, but I also helped a colleague with the mobile version.",
            url: 'https://retail-heroes.vercel.app/',
            image: retail,
        },
        {
            id: "milsped",
            title: "Milšped Group",
            desc: "Milšped Group`s services are numerous and integrated, including customs mediation and representation, organization of international and domestic transport and distribution, as well as storage of goods - contract logistics. In my previous company, 4bees, I worked on projects for Milšped Group, which includes their 3 web applications, Milšped, M-ONE and MBOX. || These applications are made in Vue.js, Nuxt.js. I did the creation of galleries, the integration to pull data from the strapi database, the implementation of the English-Serbian language, the creation of the transport service price calculator and many other things.",
            url: 'https://www.milsped.com/',
            image: milspedAll,
        },
        {
            id: "simic",
            title: "“Dr Simić” dental office",
            desc: "“Dr Simić” dental office deals with prosthetics and aesthetic dentistry, implantology, orthopedics of the jaw, teeth whitening and aesthetic facial treatments, oral surgery, tooth treatment and aesthetic fillings, periodontology, preventive and children`s dentistry. || This application is made in Vue.js, Nuxt.js. In my previous company, 4bees, I did the creation of galleries, the implementation of the English-Serbian language, adding some pages and other things.",
            url: 'https://www.milsped.com/',
            image: simic,
        },
        {
            id: "houses",
            title: "House marketplace",
            desc: "Welcome to the world of real estate through the React House Marketplace app! This innovative platform offers you the opportunity to research, sell or rent houses with a simple and user-friendly interface. Users can easily register, post ads for selling or renting their home, entering information such as price, number of rooms, number of bathrooms and even displaying the location on a map. With an intuitive user panel, the process of posting ads is quick and easy. || On the other hand, non-registered site visitors can also browse all available homes for sale or rent. They have access to all information about the houses, including prices, number of rooms, bathrooms and location on the map, without the need to log in.",
            url: 'https://house-marketplace-mirosbl45.vercel.app/',
            image: houses,
        },
        {
            id: "promptopia",
            title: "Promptopia",
            desc: "Welcome to Promptopia, a project created with the help of Next.js! This innovative app uses a range of technologies, including bcrypt, MongoDB, Mongoose, NextAuth and Tailwind CSS. Goal is to provide you with a unique experience where you can explore, create and share creative inspiration. || With the help of Next.js, this platform offers a fast and efficient user experience, with the use of advanced technologies such as MongoDB and Mongoose for data storage, bcrypt for the security of user information, NextAuth for simple and secure login with a Google account, and Tailwind CSS for modern and attractive styling.",
            url: 'https://promptopia-by-miroslav.vercel.app/',
            image: promptopia,
        },
        {
            id: "github-finder",
            title: "Github Finder",
            desc: "This React app gives you easy access to user accounts on GitHub, allowing you to explore repositories and learn about the work of other developers. A simple user search lets you find developers by name and view their GitHub profiles. || Once you find a user you're interested in, you can easily access their profile, where you can see how many repositories they've published, as well as browse their projects.",
            url: 'https://github-finder-app-mirosbl45.vercel.app/',
            image: githubfinder,
        },
        {
            id: "recipe-app",
            title: "Recipe App",
            desc: "This app becomes a personal culinary guide, powered by React. Explore the wealth of recipes, tailored to your tastes, with images that tempt your appetite. With the ability to filter by ingredients, this app provides a convenient way to find the perfect recipe. If you're in the mood for something sweet, just type in `chocolate` and you'll get a handful of recipes that include your favorite ingredient. In addition, you can access each recipe to find out the exact ingredients and preparation steps. || Feel free to explore different recipes and discover new flavors. Each recipe comes with pictures that visually evoke the finished product, giving you an extra level of inspiration.",
            url: 'https://recipe-app-mj.vercel.app/',
            image: recipe,
        },
        {
            id: "company-wall-task",
            title: "Company wall task",
            desc: "Roles page should contain a data table to list available roles by calling API. You can provide an in-memory data to be returned as a response (no duplicate role names allowed). The map will be populated through create action from the UI. It should be sorted by Role name by default. || Provide create and update actions to create/update roles. It should be implemented in a separate form page. Users page should contain a data table to list users by calling api. You can serve a json file from the server function as a response. Provide create and update actions to create/update users. It should be implemented in a separate form page. || After creating/updating the user/role object you should be redirected to the users/roles list page to show all the available users/roles. Each create/update action takes 2 seconds. You can simulate this period by using the setTimeout function. Use optimistic updates to show an updated list immediately.",
            url: 'https://mj-company-wall-task.vercel.app/',
            image: companywall,
        },
        {
            id: "comit-task",
            title: "Comit task",
            desc: "This is a project for the task I got from ComIT International when I applied for the job on the position for Frontend developer. I got a design in Figma that I needed to turn into a site using React. In the assignment I got a link where the data is located, and link is protected with CORS, so you have to use Extension CORS Unblock on your browser. Also, I done it with SASS, it is fun way to do CSS.",
            url: 'https://assignment-for-comit-mj.vercel.app/',
            image: comit,
        },
        {
            id: 8,
            title: "to-do",
            desc: "This app allows you to easily add, mark as complete, or delete items, bringing organization to your fingertips. Everything you need is there: adding new items to your list, marking those you've completed or deleting those that are no longer relevant. The filter option allows you to view all items, only those that you have completed, or those that need to be done. || What makes this app special is the fact that, even when you refresh your browser, all your data remains intact. Without worrying about data loss, this app saves your to-do list exactly as it is, making it a reliable digital ally in organizing your daily schedule.",
            url: 'https://to-do-list-react-js-mj.vercel.app/',
            image: todo,
        },
        {
            id: "material-UI-social-network",
            title: "Material UI social network",
            desc: "Project done in React with Material UI. It has no social network functionality, just styling using Material UI. I have made some folder structure to separate project components and data for project, and make clean code. || This React project with Material UI provides users with a simple yet elegant interface, without unnecessary social networks, focusing exclusively on visual design and the use of Material UI components. To improve code organization, I structured the project with clear folders that separate components from data, making it easier to maintain and add new functionality in the future.",
            url: 'https://material-social-network.vercel.app/',
            image: materialSocial,
        },
    ],
    websites: [
        {
            id: 1,
            title: "Pets - Medicine for the soul",
            desc: "Designed in Figma, this site is a fusion of pet love and technology. One of the key challenges was the implementation of multilingualism and choosing between six world languages. Ensuring consistency between the design in Figma and the actual implementation required careful handling of styles via SCSS. Project is adapted for different screens so that users can enjoy it on any device.",
            url: 'https://petsmj.netlify.app/',
            image: pets,
        },
        {
            id: 2,
            title: "Social network",
            desc: "This interactive website provides users with the opportunity to connect, share their thoughts, and interact with each other through posts, likes, and comments. One of the main challenges during the creation of this site was the implementation of authentication and authorization. Allowing users to log in securely, store their data, and properly manage it required careful handling of JavaScript.",
            url: 'https://socialnetworkmj.netlify.app/',
            image: social,
        },
        {
            id: 3,
            title: "Quiz App",
            desc: "During the creation of this site, one of the key challenges was the implementation of a dynamic system for asking questions and collecting responses from users. I had to work carefully with JavaScript to properly manage the logic of the quiz, ensuring correct answers were properly tracked and results generated at the end.",
            url: 'https://quizappmj.netlify.app/',
            image: quiz,
        },
        {
            id: 4,
            title: "Candle",
            desc: "Click on each candle and blow out the flame to reveal the sweet rewards that await! The task was to implement the dynamic behavior of each candle which required precise JavaScript handling to ensure that the flame only goes out when the user clicks on a specific candle. Try it for resolution 375x667.",
            url: 'https://candle-game-mj.netlify.app/',
            image: candle,
        },
        {
            id: 5,
            title: "Slider Cat",
            desc: "It was crucial to track the mouse movements correctly and synchronize the movement of the crosshair with each step. This required careful manipulation of mouse events and proper handling of screen coordinates. Implementing a fluid and aesthetically pleasing line movement was a challenge in optimizing performance.",
            url: 'https://slidercatmj.netlify.app/',
            image: slider,
        },
    ],
    games: [
        {
            id: 1,
            title: "Blackjack",
            desc: "It was crucial to implement the rules of Blackjack, including proper counting of card values, treating aces as 1 or 11, and proper management of aces. Also, I had to pay attention to the logic around `busting` when a player goes over 21.",
            url: 'https://mjblackjack.netlify.app/',
            image: blackjack,
        },
        {
            id: 2,
            title: "Memory game",
            desc: "One of the key challenges in the development of the Memory game was to implement the logic of turning cards and matching them. When two cards are flipped over, I had to carefully monitor their status, reveal them appropriately, and allow players to see and remember the images on the cards",
            url: 'https://memory-card-game-mj.vercel.app/',
            image: memory,
        },
        {
            id: 3,
            title: "Puzzle",
            desc: "This game offers users the opportunity to enjoy solving puzzles at three different levels of difficulty, each level being more challenging than the last. One of the key challenges was to implement the functionality of dragging partial pieces of the puzzle in order to achieve the final image stacking. I had to carefully manage the drag events, track the movement of the partials and position them correctly in certain places.",
            url: 'https://puzzlemj.netlify.app/',
            image: puzzle,
        },
        {
            id: 4,
            title: "Snake",
            desc: "Implementing the logic for snake movement and bite detection was key. I had to carefully balance the speed of the snake, react to user commands and avoid collisions with walls. An additional challenge was developing the mechanics to generate bites on the screen that the snake eats in order to grow.",
            url: 'https://snake-final.vercel.app/',
            image: snake,
        },
        {
            id: 5,
            title: "Tic tac toe",
            desc: "It was important to properly implement the game logic, in order to automatically track the conquest and declare the winner. This step involved detecting winning combinations and properly updating the game state. Work on the user interface and visual aspect of the game was important. I had to ensure that each player's moves were clearly marked, maintain visibility of the game state, and allow for easy mouse interaction.",
            url: 'https://tictactoemj.netlify.app/',
            image: tictactoe,
        },
        {
            id: 6,
            title: "Poker",
            desc: "I had to handle the logic for detecting and evaluating card combinations, which added to the complexity of the project. Through this creative process, I gained a deep understanding of JavaScript, working with objects, manipulating the DOM, and developing complex algorithms.",
            url: 'https://pokermj.netlify.app/',
            image: poker,
        },
    ],
};