// AI Courses Directory Data
// Curated list of AI/ML courses from top platforms

export type Course = {
  id: string;
  title: string;
  provider: string;
  platform: string;
  instructor: string;
  url: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // e.g., "4 weeks", "40 hours"
  format: 'Video' | 'Interactive' | 'Text' | 'Project-Based';
  price: 'Free' | 'Freemium' | 'Paid' | 'Subscription';
  priceDetail?: string;
  topics: string[];
  rating?: number;
  students?: string; // e.g., "2M+"
  certificate: boolean;
  featured?: boolean;
};

export type LearningPath = {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  courses: string[]; // Course IDs
};

export const COURSE_PLATFORMS = [
  'Coursera',
  'DeepLearning.AI',
  'Fast.ai',
  'Udacity',
  'edX',
  'Stanford Online',
  'MIT OpenCourseWare',
  'Google',
  'Microsoft Learn',
  'Hugging Face',
  'YouTube',
  'Kaggle',
] as const;

export const COURSE_TOPICS = [
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'Computer Vision',
  'Generative AI',
  'LLMs',
  'Prompt Engineering',
  'MLOps',
  'Reinforcement Learning',
  'AI Ethics',
  'Data Science',
  'Python',
] as const;

export const COURSES: Course[] = [
  // Top Featured Courses
  {
    id: 'deeplearning-ai-ml-spec',
    title: 'Machine Learning Specialization',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    instructor: 'Andrew Ng',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    description:
      'The most popular ML course ever, updated for 2024. Learn ML fundamentals from the pioneer who taught millions.',
    level: 'Beginner',
    duration: '3 months',
    format: 'Video',
    price: 'Freemium',
    priceDetail: 'Free to audit, $49/mo for certificate',
    topics: ['Machine Learning', 'Python', 'Deep Learning'],
    rating: 4.9,
    students: '5M+',
    certificate: true,
    featured: true,
  },
  {
    id: 'deeplearning-ai-dl-spec',
    title: 'Deep Learning Specialization',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    instructor: 'Andrew Ng',
    url: 'https://www.coursera.org/specializations/deep-learning',
    description:
      'Master deep learning from neural networks to CNNs, RNNs, and transformers. 5 courses covering the foundations of DL.',
    level: 'Intermediate',
    duration: '5 months',
    format: 'Video',
    price: 'Freemium',
    priceDetail: 'Free to audit, $49/mo for certificate',
    topics: ['Deep Learning', 'NLP', 'Computer Vision'],
    rating: 4.9,
    students: '1M+',
    certificate: true,
    featured: true,
  },
  {
    id: 'fastai-practical-dl',
    title: 'Practical Deep Learning for Coders',
    provider: 'Fast.ai',
    platform: 'Fast.ai',
    instructor: 'Jeremy Howard',
    url: 'https://course.fast.ai/',
    description:
      'Top-down approach to deep learning. Build real models from day 1. No PhD required - learn by doing.',
    level: 'Beginner',
    duration: '7 weeks',
    format: 'Video',
    price: 'Free',
    topics: ['Deep Learning', 'Computer Vision', 'NLP'],
    rating: 4.9,
    students: '500K+',
    certificate: false,
    featured: true,
  },
  {
    id: 'stanford-cs229',
    title: 'CS229: Machine Learning',
    provider: 'Stanford',
    platform: 'Stanford Online',
    instructor: 'Andrew Ng',
    url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU',
    description:
      'The original Stanford ML course. More mathematical rigor than the Coursera version. Full lecture recordings.',
    level: 'Intermediate',
    duration: '20 hours',
    format: 'Video',
    price: 'Free',
    topics: ['Machine Learning', 'Data Science'],
    rating: 4.8,
    students: '2M+',
    certificate: false,
  },
  {
    id: 'stanford-cs231n',
    title: 'CS231n: CNNs for Visual Recognition',
    provider: 'Stanford',
    platform: 'Stanford Online',
    instructor: 'Fei-Fei Li, Andrej Karpathy',
    url: 'https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv',
    description:
      'The definitive course on computer vision and CNNs. Taught by legends including former Tesla AI director.',
    level: 'Intermediate',
    duration: '16 hours',
    format: 'Video',
    price: 'Free',
    topics: ['Computer Vision', 'Deep Learning'],
    rating: 4.9,
    students: '1M+',
    certificate: false,
  },
  {
    id: 'stanford-cs224n',
    title: 'CS224n: NLP with Deep Learning',
    provider: 'Stanford',
    platform: 'Stanford Online',
    instructor: 'Chris Manning',
    url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ',
    description:
      'Comprehensive NLP course covering word vectors, transformers, and modern LLMs from the NLP pioneer.',
    level: 'Advanced',
    duration: '20 hours',
    format: 'Video',
    price: 'Free',
    topics: ['NLP', 'Deep Learning', 'LLMs'],
    rating: 4.9,
    students: '500K+',
    certificate: false,
  },
  // Generative AI Courses
  {
    id: 'deeplearning-ai-genai',
    title: 'Generative AI with LLMs',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    instructor: 'AWS & DeepLearning.AI',
    url: 'https://www.coursera.org/learn/generative-ai-with-llms',
    description:
      'Learn the fundamentals of generative AI and LLMs. Covers training, fine-tuning, and deployment of LLMs.',
    level: 'Intermediate',
    duration: '3 weeks',
    format: 'Video',
    price: 'Freemium',
    priceDetail: 'Free to audit, $49/mo for certificate',
    topics: ['Generative AI', 'LLMs'],
    rating: 4.8,
    students: '200K+',
    certificate: true,
    featured: true,
  },
  {
    id: 'deeplearning-ai-chatgpt-prompt',
    title: 'ChatGPT Prompt Engineering for Developers',
    provider: 'DeepLearning.AI',
    platform: 'DeepLearning.AI',
    instructor: 'Isa Fulford, Andrew Ng',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    description:
      'Short course on prompt engineering best practices directly from OpenAI. Learn to build apps with LLMs.',
    level: 'Beginner',
    duration: '1 hour',
    format: 'Video',
    price: 'Free',
    topics: ['Prompt Engineering', 'LLMs', 'Generative AI'],
    rating: 4.9,
    students: '500K+',
    certificate: false,
  },
  {
    id: 'google-genai-learning-path',
    title: 'Generative AI Learning Path',
    provider: 'Google',
    platform: 'Google',
    instructor: 'Google Cloud',
    url: 'https://www.cloudskillsboost.google/paths/118',
    description:
      'Google\'s official GenAI curriculum. Covers LLMs, responsible AI, and building AI applications on Google Cloud.',
    level: 'Beginner',
    duration: '10 hours',
    format: 'Interactive',
    price: 'Free',
    topics: ['Generative AI', 'LLMs'],
    rating: 4.7,
    students: '1M+',
    certificate: true,
  },
  {
    id: 'microsoft-ai-fundamentals',
    title: 'Azure AI Fundamentals',
    provider: 'Microsoft',
    platform: 'Microsoft Learn',
    instructor: 'Microsoft',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/',
    description:
      'Official Microsoft path covering AI concepts, computer vision, NLP, and generative AI on Azure.',
    level: 'Beginner',
    duration: '8 hours',
    format: 'Interactive',
    price: 'Free',
    topics: ['Machine Learning', 'NLP', 'Computer Vision'],
    rating: 4.6,
    students: '500K+',
    certificate: true,
  },
  // Hugging Face
  {
    id: 'huggingface-nlp',
    title: 'NLP Course',
    provider: 'Hugging Face',
    platform: 'Hugging Face',
    instructor: 'Hugging Face Team',
    url: 'https://huggingface.co/learn/nlp-course',
    description:
      'Free course on NLP using the Transformers library. Hands-on with state-of-the-art models.',
    level: 'Intermediate',
    duration: '15 hours',
    format: 'Interactive',
    price: 'Free',
    topics: ['NLP', 'LLMs', 'Deep Learning'],
    rating: 4.8,
    students: '300K+',
    certificate: false,
  },
  {
    id: 'huggingface-deep-rl',
    title: 'Deep Reinforcement Learning Course',
    provider: 'Hugging Face',
    platform: 'Hugging Face',
    instructor: 'Thomas Simonini',
    url: 'https://huggingface.co/learn/deep-rl-course',
    description:
      'Learn deep RL from basics to advanced algorithms. Train agents to play games and solve problems.',
    level: 'Intermediate',
    duration: '20 hours',
    format: 'Interactive',
    price: 'Free',
    topics: ['Reinforcement Learning', 'Deep Learning'],
    rating: 4.7,
    students: '100K+',
    certificate: true,
  },
  // Kaggle
  {
    id: 'kaggle-intro-ml',
    title: 'Intro to Machine Learning',
    provider: 'Kaggle',
    platform: 'Kaggle',
    instructor: 'Kaggle Team',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    description:
      'Quick, practical introduction to ML. Learn to build models in Python with real datasets.',
    level: 'Beginner',
    duration: '3 hours',
    format: 'Interactive',
    price: 'Free',
    topics: ['Machine Learning', 'Python', 'Data Science'],
    rating: 4.6,
    students: '1M+',
    certificate: true,
  },
  {
    id: 'kaggle-intermediate-ml',
    title: 'Intermediate Machine Learning',
    provider: 'Kaggle',
    platform: 'Kaggle',
    instructor: 'Kaggle Team',
    url: 'https://www.kaggle.com/learn/intermediate-machine-learning',
    description:
      'Handle missing values, categorical data, and pipelines. Level up your ML skills.',
    level: 'Intermediate',
    duration: '4 hours',
    format: 'Interactive',
    price: 'Free',
    topics: ['Machine Learning', 'Data Science'],
    rating: 4.5,
    students: '500K+',
    certificate: true,
  },
  {
    id: 'kaggle-intro-deep-learning',
    title: 'Intro to Deep Learning',
    provider: 'Kaggle',
    platform: 'Kaggle',
    instructor: 'Kaggle Team',
    url: 'https://www.kaggle.com/learn/intro-to-deep-learning',
    description:
      'Build and train neural networks with TensorFlow and Keras. Hands-on deep learning basics.',
    level: 'Intermediate',
    duration: '4 hours',
    format: 'Interactive',
    price: 'Free',
    topics: ['Deep Learning', 'Python'],
    rating: 4.5,
    students: '400K+',
    certificate: true,
  },
  // MLOps & Production
  {
    id: 'deeplearning-ai-mlops',
    title: 'Machine Learning Engineering for Production (MLOps)',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    instructor: 'Andrew Ng',
    url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops',
    description:
      'Learn to deploy ML models at scale. Covers data pipelines, model monitoring, and production systems.',
    level: 'Advanced',
    duration: '4 months',
    format: 'Video',
    price: 'Freemium',
    priceDetail: 'Free to audit, $49/mo for certificate',
    topics: ['MLOps', 'Machine Learning'],
    rating: 4.7,
    students: '100K+',
    certificate: true,
  },
  {
    id: 'fullstack-deeplearning',
    title: 'Full Stack Deep Learning',
    provider: 'FSDL',
    platform: 'YouTube',
    instructor: 'Josh Tobin, Sergey Karayev',
    url: 'https://fullstackdeeplearning.com/',
    description:
      'Build production ML systems. Covers infrastructure, deployment, and team workflows.',
    level: 'Advanced',
    duration: '20 hours',
    format: 'Video',
    price: 'Free',
    topics: ['MLOps', 'Deep Learning'],
    rating: 4.8,
    students: '200K+',
    certificate: false,
  },
  // AI Ethics
  {
    id: 'fast-ai-ethics',
    title: 'Practical Data Ethics',
    provider: 'Fast.ai',
    platform: 'Fast.ai',
    instructor: 'Rachel Thomas',
    url: 'https://ethics.fast.ai/',
    description:
      'Essential course on AI ethics covering bias, privacy, and societal impact of ML systems.',
    level: 'Beginner',
    duration: '10 hours',
    format: 'Video',
    price: 'Free',
    topics: ['AI Ethics', 'Data Science'],
    rating: 4.7,
    students: '100K+',
    certificate: false,
  },
  // MIT
  {
    id: 'mit-intro-dl',
    title: '6.S191: Introduction to Deep Learning',
    provider: 'MIT',
    platform: 'MIT OpenCourseWare',
    instructor: 'Alexander Amini, Ava Amini',
    url: 'http://introtodeeplearning.com/',
    description:
      'MIT\'s official intro to deep learning. Updated annually with latest techniques and research.',
    level: 'Intermediate',
    duration: '10 hours',
    format: 'Video',
    price: 'Free',
    topics: ['Deep Learning', 'Generative AI'],
    rating: 4.8,
    students: '500K+',
    certificate: false,
  },
  // Short Courses
  {
    id: 'deeplearning-ai-langchain',
    title: 'LangChain for LLM Application Development',
    provider: 'DeepLearning.AI',
    platform: 'DeepLearning.AI',
    instructor: 'Harrison Chase, Andrew Ng',
    url: 'https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/',
    description:
      'Build powerful LLM apps with LangChain. Learn chains, agents, and RAG from the creator of LangChain.',
    level: 'Intermediate',
    duration: '1 hour',
    format: 'Video',
    price: 'Free',
    topics: ['LLMs', 'Generative AI'],
    rating: 4.8,
    students: '300K+',
    certificate: false,
  },
  {
    id: 'deeplearning-ai-building-systems',
    title: 'Building Systems with ChatGPT API',
    provider: 'DeepLearning.AI',
    platform: 'DeepLearning.AI',
    instructor: 'Isa Fulford, Andrew Ng',
    url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/',
    description:
      'Learn to build complex systems using multiple API calls, chaining prompts, and handling edge cases.',
    level: 'Intermediate',
    duration: '1 hour',
    format: 'Video',
    price: 'Free',
    topics: ['LLMs', 'Prompt Engineering'],
    rating: 4.8,
    students: '200K+',
    certificate: false,
  },
  {
    id: 'deeplearning-ai-finetuning',
    title: 'Finetuning Large Language Models',
    provider: 'DeepLearning.AI',
    platform: 'DeepLearning.AI',
    instructor: 'Sharon Zhou',
    url: 'https://www.deeplearning.ai/short-courses/finetuning-large-language-models/',
    description:
      'Learn when and how to fine-tune LLMs. Covers data preparation, training, and evaluation.',
    level: 'Intermediate',
    duration: '1 hour',
    format: 'Video',
    price: 'Free',
    topics: ['LLMs', 'Deep Learning'],
    rating: 4.7,
    students: '150K+',
    certificate: false,
  },
  {
    id: 'deeplearning-ai-rag',
    title: 'Building RAG Agents with LLMs',
    provider: 'DeepLearning.AI',
    platform: 'DeepLearning.AI',
    instructor: 'Various',
    url: 'https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/',
    description:
      'Build retrieval-augmented generation systems. Connect LLMs to your data for accurate, grounded responses.',
    level: 'Intermediate',
    duration: '1 hour',
    format: 'Video',
    price: 'Free',
    topics: ['LLMs', 'Generative AI'],
    rating: 4.7,
    students: '100K+',
    certificate: false,
  },
  // Computer Vision
  {
    id: 'deeplearning-ai-tensorflow',
    title: 'TensorFlow Developer Professional Certificate',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    instructor: 'Laurence Moroney',
    url: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice',
    description:
      'Official TensorFlow certification prep. Build and deploy CV and NLP models with TensorFlow.',
    level: 'Intermediate',
    duration: '4 months',
    format: 'Video',
    price: 'Freemium',
    priceDetail: 'Free to audit, $49/mo for certificate',
    topics: ['Deep Learning', 'Computer Vision', 'NLP'],
    rating: 4.7,
    students: '300K+',
    certificate: true,
  },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'ml-beginner',
    title: 'ML Fundamentals',
    description: 'Start your ML journey from zero to building your first models',
    level: 'Beginner',
    duration: '2-3 months',
    courses: ['deeplearning-ai-ml-spec', 'kaggle-intro-ml', 'kaggle-intermediate-ml'],
  },
  {
    id: 'deep-learning-path',
    title: 'Deep Learning Expert',
    description: 'Master neural networks, CNNs, RNNs, and transformers',
    level: 'Intermediate',
    duration: '4-6 months',
    courses: ['deeplearning-ai-dl-spec', 'fastai-practical-dl', 'stanford-cs231n'],
  },
  {
    id: 'llm-engineer',
    title: 'LLM Application Developer',
    description: 'Build production apps with large language models',
    level: 'Intermediate',
    duration: '1-2 months',
    courses: [
      'deeplearning-ai-chatgpt-prompt',
      'deeplearning-ai-langchain',
      'deeplearning-ai-genai',
    ],
  },
  {
    id: 'nlp-specialist',
    title: 'NLP Specialist',
    description: 'From word embeddings to transformers and LLMs',
    level: 'Advanced',
    duration: '3-4 months',
    courses: ['stanford-cs224n', 'huggingface-nlp', 'deeplearning-ai-genai'],
  },
];

// Helper functions
export function getCoursesByTopic(topic: string): Course[] {
  return COURSES.filter((course) => course.topics.includes(topic));
}

export function getCoursesByLevel(level: Course['level']): Course[] {
  return COURSES.filter((course) => course.level === level);
}

export function getCoursesByPlatform(platform: string): Course[] {
  return COURSES.filter((course) => course.platform === platform);
}

export function getFreeCourses(): Course[] {
  return COURSES.filter((course) => course.price === 'Free');
}

export function getFeaturedCourses(): Course[] {
  return COURSES.filter((course) => course.featured);
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((course) => course.id === id);
}
