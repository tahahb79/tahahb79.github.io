module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `https://tahahb79.github.io/`,
    // Your Name
    name: 'Ali Habibi',
    // Main Site Title
    title: `Ali Habibi | Machine Learning and LLM engineer`,
    // Description that goes under your name in main bio
    description: `As a Machine Learning Engineer and LLM Lover, I want to make different`,
    // Optional: Twitter account handle
    // author: `@rfitzio`,
    // Optional: Github account URL
    github: `https://github.com/tahahb79`,
    // Optional: LinkedIn account URL
    linkedin: `https://www.linkedin.com/in/ali-habibi1379/`,
    // Content of the About Me section
    about: `Machine Learning Engineer with 3+ years of experience in deep learning, machine learning, mobile development, and backend development. Proven ability to design, develop, and deploy machine learning models in production. Passionate about cloud computing and machine learning operations, and eager to conduct research in academic settings.
`,
    // Optional: List your projects, they must have `name` and `description`. `link` is optional.
    projects: [
      {
        name: 'Face Recognition',
        description:
          'Siamese networks excelled in classification with triplet loss for precision. TensorFlow was lauded for ease, flexibility, and GPU support. ResNet, a powerful deep learning architecture, handled data preprocessing and classification effectively. The results of this model were a loss of under 1% on training data and an accuracy of 89% on validation data. This was my bachelor project',
        link: 'https://colab.research.google.com/drive/1Xv-1aiAlIM7m1hw7PKVCav5Aw5t8arAX?usp=sharing',
      },
      {
        name: 'Music Genre Classification',
        description:
          'Built a robust music genre classifier using VGG19, Keras, and signal processing. It extracted audio features, generated spectrograms, and trained a model for precise 10-genre categorization. This classifier facilitated music collection organization, personalized recommendations, and adaptable streaming platforms through audio analysis and deep learning fusion. The results of this model were 80% accuracy on training data and 61% accuracy on validation data. I worked on this project to improve my classification and NLP skills.',
        link: 'https://colab.research.google.com/drive/1GHWM2DRkMD3Dr1yN21S4-HvO7GrJpeas?usp=sharing',
      },
      {
        name: 'Predict Car Prices With k-Nearest Neighbor',
        description:
          ' k-Nearest Neighbors (k-NN) was used to predict car prices based on quality. It worked by comparing a cars attributes and quality to similar cars and estimating its cost. This method helped assess car valuations for buying or selling, providing insights into fair market values based on quality. The result of this model was 90% accuracy on validation data. This was a mini project seen on YouTube ',
        link: 'https://github.com/tahahb79/Predict-Car-Prices-With-k-Nearest-Neighbor',
      },
      {
        name: 'Truecaller-and-RocketReach-scraping',
        description:
          ' write a scraper to parse information from these sites in 3 different approaches i used a virtual environment in these projects ',
        link: 'https://github.com/tahahb79/Truecaller-and-RocketReach-scraping',
      },
      {
        name: 'Customer Support Bot',
        description:
          ' I built a customer support bot using Cohere for booking flights, cars, and hotels. I also used long-chain and gpt4 embedding for embedding and creating chains for the bot I also used SQL server to save data and retrieve data ',
        link: 'https://github.com/tahahb79/Customer_Support_Bot',
      },
      {
        name: 'Nano-GPT',
        description:
          ' I built a Nano-GPT with a dataset about epic poems from Kaggle and want to Build a poem-maker',
        link: 'https://github.com/tahahb79/Nano-GPT',
      },
      {
        name: 'Micrograd-exercise',
        description:
          ' A tiny scalar-valued autograd engine and a neural net library on top of it with PyTorch-like API ',
        link: 'https://github.com/tahahb79/Micrograd-exercise',
      },
    ],
    // Optional: List your experience, they must have `name` and `description`. `link` is optional.
    experience: [
      {
        name: 'nibbit',
        description: 'Data scientist | LLM Engineer, February 2023 - July 2023',
        // link: 'https://github.com/RyanFitzgerald/devfolio',
      },
      {
        name: 'Mehr-pars',
        description: 'Django Developer(Internship), September 2021 - November 2021',
        // link: 'https://github.com/RyanFitzgerald/devfolio',
      },
      
    ],
    // Optional: List your skills, they must have `name` and `description`.
    skills: [
      {
        name: 'Languages & Frameworks',
        description:
          'Python, Golang, Keras, VGG, Django, Fast-api, Tensorflow, numpy,pandas,langschain,yolo,colab,power Bi',
      },
      {
        name: 'Databases',
        description: 'MongoDB, CosmosDB, MySQL',
      },
      {
        name: 'Other',
        description:
          'Docker,Kubernetes, Azure, CI / CD,Web scraping, Microservices, API design, Agile / Scrum,GPT && Bert Architecture ',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/blog`,
    //     name: `blog`,
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: `margin: 0 0 30px;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-feed`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`, // Optional Google Analytics
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `devfolio`,
        short_name: `devfolio`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`, // This color appears on mobile
        display: `minimal-ui`,
        icon: `src/images/AliHabibi.jpg`,
      },
    },
  ],
};
