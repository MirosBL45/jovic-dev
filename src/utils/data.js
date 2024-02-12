export const linksHomePage = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "About",
    url: "#about",
  },
  {
    id: 3,
    title: "Portfolio",
    url: "#portfolio",
  },
  {
    id: 4,
    title: "Contact",
    url: "#contact",
  },
  {
    id: 5,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

export const linksOtherPages = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 4,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 5,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

export const aboutDataText = [
  'I am Miroslav Jović, a professional Frontend Developer committed to delivering high-quality and scalable web solutions. With over',
  'years of experience, I specialize in crafting user-friendly interfaces and responsive websites.',
  'Specializing in ReactJS and NextJS, I leverage these cutting-edge technologies to bring web projects to life. ReactJS, renowned for its component-based architecture, allows me to build modular and reusable UI elements, ensuring a streamlined development process.',
  'NextJS, on the other hand, enhances the performance of web applications through server-side rendering and simplified routing. This not only results in faster load times but also contributes to a smoother and more engaging user experience.',
  'By harnessing the power of ReactJS and NextJS, I deliver web solutions that seamlessly blend functionality and aesthetics, catering to both the needs of the client and the end user.',
  'My role is to leverage sophisticated Frontend development skills to help digital visions become a reality. I prioritize the optimization of websites for speed, scalability, and an intuitive user journey.',
  'In every project, I aim to translate design concepts into interactive and dynamic web interfaces that not only meet but exceed user expectations. With a keen eye on industry trends and standards, I implement innovative Frontend solutions that stand out in the ever-evolving digital landscape:',
  { mainHeadline: 'About Me', headlineText: 'Creating Exceptional Digital Experiences', headline1: 'Who Am I?', headline2: 'What I Do?' },
]

export const aboutData = [
  { id: 1, text: 'Rapid and Efficient Web Applications;' },
  { id: 2, text: 'Developing Dynamic websites with a Focus on incorporating SEO elements for enhanced Visibility and Performance;' },
  { id: 3, text: 'Ensuring Responsive Design tailored to Every Device for an Optimal User Experience;' },
  { id: 4, text: 'Providing Copywriting Support to Improve the Idea and Content.' },
]

export const contactData = { mainHeadline: 'We can Keep in Touch' }

import games from '../../public/portfolio/games.jpg';
import sites from '../../public/portfolio/sites.jpg';
import webapps from '../../public/portfolio/webapps.jpg';

import blackjack from '../../public/portfolio/imagesGames/blackjack.jpg';
import poker from '../../public/portfolio/imagesGames/poker.jpg';
import memory from '../../public/portfolio/imagesGames/memory.jpg';
import puzzle from '../../public/portfolio/imagesGames/puzzle.jpg';
import snake from '../../public/portfolio/imagesGames/snake.jpg';
import tictactoe from '../../public/portfolio/imagesGames/tictactoe.jpg';

import slider from '../../public/portfolio/imagesWeb/slider.jpg';
import pets from '../../public/portfolio/imagesWeb/pets.jpg';
import social from '../../public/portfolio/imagesWeb/social.jpg';
import quiz from '../../public/portfolio/imagesWeb/quiz.jpg';
import candle from '../../public/portfolio/imagesWeb/candle.jpg';

import companywall from '../../public/portfolio/imagesApps/companywall.jpg';
import materialSocial from '../../public/portfolio/imagesApps/materialSocial.jpg';
import promptopia from '../../public/portfolio/imagesApps/promptopia.jpg';
import todo from '../../public/portfolio/imagesApps/todo.jpg';
import recipe from '../../public/portfolio/imagesApps/recipe.jpg';
import comit from '../../public/portfolio/imagesApps/comit.jpg';

export const portfolioData = [
  {
    id: 1,
    title: "Applications",
    url: "/portfolio/applications",
    image: webapps,
  },
  {
    id: 2,
    title: "Web sites",
    url: "/portfolio/sites",
    image: sites,
  },
  {
    id: 3,
    title: "Games",
    url: "/portfolio/games",
    image: games,
  },
];

export const itemsPortfolio = {
  applications: [
    {
      id: 1,
      title: "Promptopia",
      desc: "Welcome to Promptopia, a project created with the help of Next.js! This innovative app uses a range of technologies, including bcrypt, MongoDB, Mongoose, NextAuth and Tailwind CSS. Goal is to provide you with a unique experience where you can explore, create and share creative inspiration. || With the help of Next.js, this platform offers a fast and efficient user experience, with the use of advanced technologies such as MongoDB and Mongoose for data storage, bcrypt for the security of user information, NextAuth for simple and secure login with a Google account, and Tailwind CSS for modern and attractive styling.",
      url: 'https://promptopia-by-miroslav.vercel.app/',
      image: promptopia,
    },
    {
      id: 2,
      title: "Recipe App",
      desc: "This app becomes a personal culinary guide, powered by React. Explore the wealth of recipes, tailored to your tastes, with images that tempt your appetite. With the ability to filter by ingredients, this app provides a convenient way to find the perfect recipe. If you're in the mood for something sweet, just type in `chocolate` and you'll get a handful of recipes that include your favorite ingredient. In addition, you can access each recipe to find out the exact ingredients and preparation steps. || Feel free to explore different recipes and discover new flavors. Each recipe comes with pictures that visually evoke the finished product, giving you an extra level of inspiration.",
      url: 'https://recipe-app-mj.vercel.app/',
      image: recipe,
    },
    {
      id: 3,
      title: "To Do",
      desc: "This app allows you to easily add, mark as complete, or delete items, bringing organization to your fingertips. Everything you need is there: adding new items to your list, marking those you've completed or deleting those that are no longer relevant. The filter option allows you to view all items, only those that you have completed, or those that need to be done. || What makes this app special is the fact that, even when you refresh your browser, all your data remains intact. Without worrying about data loss, this app saves your to-do list exactly as it is, making it a reliable digital ally in organizing your daily schedule.",
      url: 'https://to-do-list-react-js-mj.vercel.app/',
      image: todo,
    },
    {
      id: 4,
      title: "Comit task",
      desc: "This is a project for the task I got from ComIT International when I applied for the job on the position for Frontend developer. I got a design in Figma that I needed to turn into a site using ReactJS. In the assignment I got a link where the data is located, and link is protected with CORS, so you have to use Extension CORS Unblock on your browser. Also, I done it with SASS, it is fun way to do CSS.",
      url: 'https://assignment-for-comit-mj.vercel.app/',
      image: comit,
    },
    {
      id: 5,
      title: "Company wall task",
      desc: "Roles page should contain a data table to list available roles by calling API. You can provide an in-memory data to be returned as a response (no duplicate role names allowed). The map will be populated through create action from the UI. It should be sorted by Role name by default. || Provide create and update actions to create/update roles. It should be implemented in a separate form page. Users page should contain a data table to list users by calling api. You can serve a json file from the server function as a response. Provide create and update actions to create/update users. It should be implemented in a separate form page. || After creating/updating the user/role object you should be redirected to the users/roles list page to show all the available users/roles. Each create/update action takes 2 seconds. You can simulate this period by using the setTimeout function. Use optimistic updates to show an updated list immediately.",
      url: 'https://mj-company-wall-task.vercel.app/',
      image: companywall,
    },
    {
      id: 6,
      title: "Material UI social network",
      desc: "Project done in ReactJS with Material UI. It has no social network functionality, just styling using Material UI. I have made some folder structure to separate project components and data for project, and make clean code. || This React project with Material UI provides users with a simple yet elegant interface, without unnecessary social networks, focusing exclusively on visual design and the use of Material UI components. To improve code organization, I structured the project with clear folders that separate components from data, making it easier to maintain and add new functionality in the future.",
      url: 'https://material-social-network.vercel.app/',
      image: materialSocial,
    },
  ],
  sites: [
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

export const portfolioAbout = [
  {
    id: 1,
    title: "Illustrations games",
    url: "https://github.com/MirosBL45",
    image: games,
  },
  {
    id: 2,
    title: "Websites games",
    url: "https://github.com/MirosBL45",
    image: games,
  },
  {
    id: 3,
    title: "Application games",
    url: "https://www.linkedin.com/in/mj888/",
    image: games,
  },
  {
    id: 4,
    title: "games",
    url: "https://quillbot.com/",
    image: games,
  },
]