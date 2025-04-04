import { LINKS } from './links';

const links = LINKS;

export const PROJECTS_DESCRIPTION = [
  {
    id: 1,
    title: "Pritam's Portfolio",
    shortDescription: 'A personal portfolio website to showcase my projects and skills.',
    context: `This portfolio website was created to showcase my projects and skills as well as discover new
    technologies.`,
    tasksDetails: [{ title: 'To be defined', points: [] }],
    technologies: ['TypeScript', 'Node.js', 'Angular'],
    thumbnail: 'pictures/portfolio-thumbnail-illustration.png',
    illustration: 'pictures/portfolio-thumbnail-illustration.png',
    spanNames: [],
    pathToCodes: [],
  },
  {
    id: 2,
    title: 'Big Brain',
    shortDescription: 'A web application boosted with AI to help students by providing them with revision sheets.',
    context: `[End of study project made in a team of 3 persons, using the Agile (Scrum) method]
    Due to the increasing use of Discord by IPSA students to seek help and access study notes, a problem
       arose: those studying late at night often received no response, as notes were shared manually. The initial
       idea was to create an AI-powered Discord bot to provide notes based on student queries. However, to better
       fit the final project requirements, it was decided to develop a conversational chat website instead.`,
    tasksDetails: [
      {
        title: 'Project management (Agile method - Scrum)',
        points: [
          'Assigning tasks to each group member',
          'Regular monitoring of to-do and upcoming tasks on project management software (Jetbrains - YouTrack)',
          'Managing and taking notes on the various searches carried out on Notion',
        ],
      },
      {
        title: 'Studying user needs and drawing up specifications',
        points: ['Feasibility study, familiarization with existing data', 'Drawing up specifications'],
      },
      {
        title: 'Data Forge: Git repository for dataset creation',
        points: ['Python code implementation to generate a structured dataset used for LLM development', ' Unit testing for the Data Forge'],
      },
      {
        title: ' Big Brain: a website that lets students interact with the tool',
        points: ['Creation of a TypeScript website using Vite and React', 'Performing unit tests for the website'],
      },
      {
        title: `SUSHI (Scrypt Universal Student Helper Intelligence): an API to manage all website data and logic,
          as well as interaction with the LLM and database.`,
        points: [
          'Fine-tuning an LLM model (llama2-7b) using the QLoRA algorithm',
          'Creation of a database in MongoDB to manage all student data and resources',
          'Creating an API using NestJS',
          'Deploying and monitoring the application',
        ],
      },
    ],
    technologies: ['TypeScript', 'Node.js', 'React', 'Vite', 'Python', 'Nest.js'],
    thumbnail: 'pictures/big-brain-thumbnail.png',
    illustration: 'pictures/big-brain-illustration.png',
    spanNames: ['Code-DF', 'Code-BB', 'Code-SUSHI'],
    pathToCodes: [links.dataforgeProject, links.bigbrainProject, links.sushiProject],
  },
  {
    id: 3,
    title: 'Lumina',
    shortDescription: 'A small Discord embedded multiplayer battle game in a fairy environment.',
    context: `As part of a personal project, I collaborated in a two-person team to develop a game, allowing me to
       deepen my skills in programming, game architecture, and explore the Discord SDK.`,
    tasksDetails: [
      {
        title: 'Project management',
        points: ['Assigning tasks to each group member', 'Regular monitoring of tasks to do and to come'],
      },
      {
        title: 'Skills enhancement',
        points: [
          'Obtain information from Phaser and Colyseus documentation for multiplayer game creation',
          'Read Discord documentation to learn how to use their SDK',
        ],
      },
      {
        title: 'Game development',
        points: ['Character creation and movement (right, left, up, down)', 'Collision management', 'Set up a two-player combat system'],
      },
    ],
    technologies: ['TypeScript', 'Node.js', 'React', 'Vite', 'Discord SDK'],
    thumbnail: 'pictures/lumina-thumbnail.png',
    illustration: 'pictures/lumina-illustration.png',
    spanNames: [],
    pathToCodes: [],
  },
  {
    id: 4,
    title: 'SQL Injections Prevention with Machine Learning',
    shortDescription: 'A machine learning model that products if a given SQL query is likely to be an injection.',
    context: `To secure the Big Brain website against potential SQL injection attacks (which could be entered
       through the site’s chat bar), a model was developed and trained to predict whether a text input in the chat
       bar is an SQL injection attempt.`,
    tasksDetails: [
      {
        title: 'Dataset retrieval',
        points: ['Search and retrieve the appropriate dataset from Kaggle'],
      },
      {
        title: 'Dataset processing',
        points: ['Tokenization and encoding of requests'],
      },
      {
        title: 'Training of a classification model',
        points: ['Training a classification model'],
      },
      {
        title: 'Test and save the file containing model parameters',
        points: ['Testing the model with classic SQL queries, general texts and SQL injections', 'Saving the model as an .h5 file'],
      },
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Keras', 'Spacy', 'NLTK', 'Matplotlib', 'Seaborn'],
    thumbnail: 'pictures/sql-injections-prediction-thumbnail.png',
    illustration: 'pictures/sql-injections-prediction-illustration.png',
    spanNames: ['Code'],
    pathToCodes: [links.sqlInjectionsPredictionProject],
  },
  {
    id: 5,
    title: 'Adult Income Prediction with Machine Learning',
    shortDescription: 'A machine learning model that predicts if a person earns more than 50k a year.',
    context: `This project served as a training exercise within the school program. The dataset deals with the
     individuals annual income results from various factors. The goal, here, is to predict, according to some
      factors, if an individual could get more than $50K per year.`,
    tasksDetails: [
      {
        title: 'Dataset retrieval',
        points: ['Search and retrieve the appropriate dataset from Kaggle'],
      },
      {
        title: 'Dataset processing',
        points: ['Deleting duplicates', 'Delete irrelevant rows (with many NULL values)', 'Data normalization (encoding, standardization, etc.)'],
      },
      {
        title: 'Study of the dataset',
        points: [
          'General study of data (data type etc.)',
          'Representation of data distribution for target variable',
          'Representation of the distribution of each variable',
          'Creation of a correlation matrix to identify and retain explanatory variables for model training',
        ],
      },
      {
        title: 'Models training',
        points: [
          'Training a KNeighbors Classifier model',
          'Logistic regression model training',
          'Training a Decision Tree Classifier model',
          'Using ensemble methods (bagging, boosting, stacking) and comparing results with single models',
        ],
      },
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
    thumbnail: 'pictures/adult-income-prediction-thumbnail.png',
    illustration: 'pictures/adult-income-prediction-illustration.png',
    spanNames: ['Code'],
    pathToCodes: [links.adultIncomePredictionProject],
  },
  {
    id: 6,
    title: 'Tetris game',
    shortDescription: 'A simple Tetris game made with Python and Pygame.',
    context: `This project served as a training exercise within the school program. The goal was to create a simple
     Tetris game using Python.`,
    tasksDetails: [
      {
        title: 'Game Mechanics implementation',
        points: [
          'Implement tetromino generation and random spawning',
          'Allow tetromino rotation and movement (left, right, down)',
          'Enable hard drop and soft drop functionalities',
          'Detect collisions with walls and other tetrominoes',
          'Handle completed line clearing and score updating',
          'Handle game over logic',
        ],
      },
      {
        title: 'User Interface & Visuals',
        points: ['Display the game board and falling tetrominoes', 'Implement a scoreboard'],
      },
    ],
    technologies: ['Python', 'Pygame'],
    thumbnail: 'pictures/tetris-thumbnail.png',
    illustration: 'pictures/tetris-illustration.png',
    spanNames: ['Code'],
    pathToCodes: [links.tetrisProject],
  },
];
