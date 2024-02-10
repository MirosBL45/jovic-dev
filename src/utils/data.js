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

import illustration from '../../public/illustration.png';
import apps from '../../public/apps.jpg';

import games from '../../public/portfolio/games.jpg';
import blackjack from '../../public/portfolio/imagesGames/blackjack.jpg';
import poker from '../../public/portfolio/imagesGames/poker.jpg';
import memory from '../../public/portfolio/imagesGames/memory.jpg';

export const portfolioData = [
  {
    id: 1,
    title: "Applicationsqqq",
    url: "/portfolio/applicationsqqq",
    image: apps,
  },
  {
    id: 2,
    title: "Illustrations",
    url: "/portfolio/illustrations",
    image: illustration,
  },
  {
    id: 3,
    title: "Games",
    url: "/portfolio/games",
    image: games,
  },
];

export const itemsPortfolio = {
  applicationsqqq: [
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
  illustrations: [
    {
      id: 1,
      title: "Creative Portfolio",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",
      url: 'https://quillbot.com/',
      image:
        "https://images.pexels.com/photos/2916450/pexels-photo-2916450.jpeg",
    },
    {
      id: 2,
      title: "Minimal Single Product",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",
      url: 'https://www.linkedin.com/in/mj888/',
      image:
        "https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg",
    },
    {
      id: 3,
      title: "Strong Together Charity",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",
      url: 'https://github.com/MirosBL45',
      image:
        "https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg",
    }
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