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
      title: "Creative Portfolio",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",
      url: 'https://github.com/MirosBL45',
      image:
        "https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg",
    },
    {
      id: 2,
      title: "Minimal Single Product",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",
      url: 'https://www.linkedin.com/in/mj888/',
      image:
        "https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg",
    },
    {
      id: 3,
      title: "Strong Together Charity",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",
      url: 'https://quillbot.com/',
      image:
        "https://images.pexels.com/photos/2916450/pexels-photo-2916450.jpeg",
    }
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