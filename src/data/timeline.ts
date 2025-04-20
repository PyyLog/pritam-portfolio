export const EVENTS = [
  {
    id: 1,
    date: new Date(2001, 5, 1),
    title: 'Birth YAAY !',
    menuTitle: 'Birth',
    importance: 'primary',
    type: 'base',
    dateRange: '',
    location: '',
    description: '',
    eventDetails: [],
    thumbnailPath: 'icons/birth-cake-icon.png',
    illustrationPath: '',
    illustrationType: 0,
  },
  {
    id: 2,
    date: new Date(2019, 6, 1),
    title: 'Graduated from High School !',
    menuTitle: 'High School Graduation',
    importance: 'primary',
    type: 'education',
    dateRange: 'June 2019',
    location: '-',
    description: 'Scientific path with a speciality in Mathematics',
    eventDetails: [
      {
        title: 'Grade: Honors',
        points: [],
      },
    ],
    thumbnailPath: 'icons/party-icon.png',
    illustrationPath: 'icons/school-icon.png',
    illustrationType: 1,
  },
  {
    id: 3,
    date: new Date(2019, 8, 1),
    title: 'IPSA Engineering School Beginning',
    menuTitle: 'IPSA Engineering School Beginning',
    importance: 'primary',
    type: 'education',
    dateRange: 'September 2019',
    location: 'Ivry-sur-Seine, France',
    description: 'Engineering course in 5 years. Domain: Aeronautics and Space',
    eventDetails: [
      {
        title: 'Applied mathematics (differentiable optimization, finite difference methods, numerical solution of ordinary differential equations)',
        points: [],
      },
      {
        title: 'Statistics and Probability',
        points: [],
      },
      {
        title: 'Signal processing - Programming in Python and C/C++ language',
        points: [],
      },
      {
        title: 'Microcontroller programming / Introduction to FPGA programming',
        points: [],
      },
      {
        title: 'Network of communicating objects / Basic operating systems',
        points: [],
      },
      {
        title: 'General mechanics',
        points: [],
      },
      {
        title: 'Machine Learning/ Deep Learning',
        points: [],
      },
      {
        title: 'Systems architechture and project management',
        points: [],
      },
    ],
    thumbnailPath: 'icons/ipsa-logo.png',
    illustrationPath: 'icons/ipsa-logo.png',
    illustrationType: 1,
  },
  {
    id: 4,
    date: new Date(2021, 6, 1),
    title: 'Mechanic Intern',
    menuTitle: 'Internship at Air France',
    importance: 'primary',
    type: 'experience',
    dateRange: 'July 2021 - August 2021',
    location: 'Charles de Gaulle Airport, France',
    description: 'Internship made in the frame of the 2nd year of study.',
    eventDetails: [
      {
        title: 'Assisted and performed routine maintenance on track equipments.',
        points: [],
      },
    ],
    thumbnailPath: 'icons/af-logo.png',
    illustrationPath: 'icons/full-af-logo.png',
    illustrationType: 2,
  },
  {
    id: 5,
    date: new Date(2021, 10, 1),
    title: 'Joined Scrypt, a scholar organization at IPSA',
    menuTitle: 'Scrypt Organization',
    importance: 'secondary',
    type: 'experience',
    dateRange: 'January 2022 - January 2024',
    location: 'Ivry-Sur-Seine, France',
    description: 'Member of Scrypt, a school organization about computer science, AI and robotics.',
    eventDetails: [
      {
        title: `Contribution in a project to create an application powered by artificial intelligence, to help
         students by providing them revision sheets.`,
        points: [],
      },
    ],
    thumbnailPath: 'icons/scrypt-logo.png',
    illustrationPath: 'icons/scrypt-logo.png',
    illustrationType: 1,
  },
  {
    id: 6,
    date: new Date(2022, 7, 1),
    title: 'Exchange semester',
    menuTitle: 'Exchange Semester at the University of Arizona',
    importance: 'primary',
    type: 'exchange',
    dateRange: 'August 2022 - December 2022',
    location: 'Tucson, Arizona, USA',
    description: 'International semester in Tucson, Arizona, USA at the University of Arizona.',
    eventDetails: [
      {
        title: 'Statistics and Probability',
        points: [],
      },
      {
        title: 'Controls Systems (linear, continuous and digital systems) / State Space',
        points: [],
      },
      {
        title: 'Microcontroller programming',
        points: [],
      },
      {
        title: 'Perfect Fluid Mechanics',
        points: [],
      },
    ],
    thumbnailPath: 'icons/uofa-logo.png',
    illustrationPath: 'icons/full-uofa-logo.png',
    illustrationType: 1,
  },
  {
    id: 7,
    date: new Date(2023, 5, 1),
    title: 'Developer Intern on a research project: Project migration from SVN to GitLab',
    menuTitle: 'Internship at Safran',
    importance: 'primary',
    type: 'experience',
    dateRange: 'June 2023 - September 2023',
    location: 'Villaroche Site, France',
    description: 'Internship made in the frame of the 4th year of study.',
    eventDetails: [
      {
        title: 'Study of user needs',
        points: [
          `Organization of discussion sessions with the team involved and potential people interested in the
           project, to understand the specific issues, the challenges encountered in the workflow, and the points of
           improvement`,
        ],
      },
      {
        title: 'Study of the feasibility of data transfers from SVN to Git',
        points: [
          `Analysis of the different SVN repositories in order to get specificities, potential edge cases
           and special cases`,
          'Search for pre-made tools to migrate SVN repositories to Git',
        ],
      },
      {
        title: 'Implementation of the migration strategy',
        points: [
          `
          Migration of commits and branches. Support for SVN externals according to the repositories that
          contain them`,
          'Maintenance of commit metadata, including authors and timestamp',
        ],
      },
      {
        title: 'Transition of the solution to tool format',
        points: [],
      },
      {
        title: 'Creation of documentation and presentation meetings for teams likely to use Git',
        points: [
          `Writing a user manual, summarizing the steps of the migration process and the actions to be
          carried out.`,
          'Presentation of Git functionalities and comparison with SVN',
        ],
      },
    ],
    thumbnailPath: 'icons/safran-logo.png',
    illustrationPath: 'icons/full-sae-logo.png',
    illustrationType: 2,
  },
  {
    id: 8,
    date: new Date(2024, 2, 1),
    title: 'AI Intern on a research project: Coding assistant for Data Scientists',
    menuTitle: 'Internship at Airbus',
    importance: 'primary',
    type: 'experience',
    dateRange: 'March 2024 - August 2024',
    location: 'Blagnac Site, France',
    description: 'Internship made in the frame of the last year of study.',
    eventDetails: [
      {
        title: 'Collection of needs and expectations regarding the coding assistant',
        points: [
          `Organization of meetings with the teams involved, in French and English, to understand their
           specific issues, the challenges encountered in their workflow, and the opportunities for
           improvement thanks to the coding assistant`,
        ],
      },
      {
        title: `Implementation of a coding assistant (chatbot) in Python integrating an LLM to generate
        Python/PySpark code`,
        points: [
          `Detailed analysis of the source code of the library to be used for code generation. Extraction and
           transformation of this data in order to feed the vector databases`,
          'Testing of several vectorization models and several vector databases',
          'Testing of several LLMs, of several sizes, basic and fine-tuned. Comparisons of results with code generation',
        ],
      },
      {
        title: `Creation of a Retrieval Augmented Generation (RAG) pipeline to improve the assistant's answers to
        specific questions`,
        points: [
          `Exploration of different Prompt Engineering techniques to improve and create a qualitative prompt
           (prompt structuring, Few-Shot examples, prompt chain ...)`,
          `Extraction of information from specification files, used with filters, in order to retrieve data from the
           databases`,
        ],
      },
      {
        title: 'Creation of a user interface with Streamlit to facilitate interactions between users and the machine',
        points: ['Styling with HTML/CSS', `Implementation of a 'Drag And Drop' component to support specification files in the chatbot`],
      },
    ],
    thumbnailPath: 'icons/airbus-logo.png',
    illustrationPath: 'icons/full-airbus-logo.png',
    illustrationType: 2,
  },
  {
    id: 9,
    date: new Date(2024, 6, 1),
    title: 'Graduated from IPSA Engineering School !',
    menuTitle: 'IPSA Engineering School Graduation',
    importance: 'primary',
    type: 'education',
    dateRange: 'September 2024',
    location: 'Ivry-sur-Seine, France',
    description: 'Graduated from engineering school. Major: Mechatronics Systems, Minor: Artificial Intelligence and Data',
    eventDetails: [],
    thumbnailPath: 'icons/party-icon.png',
    illustrationPath: 'icons/ipsa-logo.png',
    illustrationType: 1,
  },
];
