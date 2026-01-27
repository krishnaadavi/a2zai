import { QuizQuestion, DailyTeaser } from './types';

// Quiz questions derived from the glossary and AI 101 course content
export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What does "LLM" stand for?',
    options: ['Large Language Model', 'Linear Learning Machine', 'Logical Linguistic Module', 'Long-form Language Mechanism'],
    correctIndex: 0,
    explanation: 'LLM stands for Large Language Model — AI systems trained on massive text datasets to understand and generate human language.',
  },
  {
    id: '2',
    question: 'What is a "neural network" inspired by?',
    options: ['Computer circuits', 'The human brain', 'Spider webs', 'The internet'],
    correctIndex: 1,
    explanation: 'Neural networks are inspired by biological neurons in the human brain, using interconnected nodes to process information.',
  },
  {
    id: '3',
    question: 'What is "machine learning"?',
    options: [
      'Programming a computer step by step',
      'Teaching robots to walk',
      'AI that learns patterns from data without explicit programming',
      'A type of computer hardware',
    ],
    correctIndex: 2,
    explanation: 'Machine learning is a subset of AI where systems learn and improve from data rather than being explicitly programmed for every task.',
  },
  {
    id: '4',
    question: 'What does GPT stand for?',
    options: [
      'General Purpose Technology',
      'Generative Pre-trained Transformer',
      'Global Processing Tool',
      'Graphical Pattern Tracker',
    ],
    correctIndex: 1,
    explanation: 'GPT stands for Generative Pre-trained Transformer, the architecture behind ChatGPT and similar models.',
  },
  {
    id: '5',
    question: 'What is a "prompt" in AI?',
    options: [
      'A computer error message',
      'The text input you give to an AI model',
      'An AI\'s memory storage',
      'A type of neural network',
    ],
    correctIndex: 1,
    explanation: 'A prompt is the text or instruction you provide to an AI model to get a response. Better prompts lead to better outputs.',
  },
  {
    id: '6',
    question: 'What is "computer vision"?',
    options: [
      'A high-resolution monitor',
      'AI that can understand and process images and video',
      'A virtual reality headset',
      'A programming language for graphics',
    ],
    correctIndex: 1,
    explanation: 'Computer vision is a field of AI that enables machines to interpret and understand visual information from images and videos.',
  },
  {
    id: '7',
    question: 'What is "natural language processing" (NLP)?',
    options: [
      'Teaching computers to speak every language',
      'AI that understands and generates human language',
      'A method of compressing text files',
      'Writing code in plain English',
    ],
    correctIndex: 1,
    explanation: 'NLP is the branch of AI focused on enabling computers to understand, interpret, and generate human language.',
  },
  {
    id: '8',
    question: 'What is a "hallucination" in AI?',
    options: [
      'When an AI has a bug',
      'When an AI generates confident but incorrect information',
      'When an AI refuses to answer',
      'When an AI processes images',
    ],
    correctIndex: 1,
    explanation: 'AI hallucination is when a model generates information that sounds plausible but is factually incorrect or fabricated.',
  },
  {
    id: '9',
    question: 'What is "deep learning"?',
    options: [
      'Studying AI for many years',
      'Machine learning using neural networks with many layers',
      'An advanced search engine',
      'Learning from deep-sea data',
    ],
    correctIndex: 1,
    explanation: 'Deep learning uses neural networks with many layers (hence "deep") to learn complex patterns from large amounts of data.',
  },
  {
    id: '10',
    question: 'What is "reinforcement learning"?',
    options: [
      'Memorizing data through repetition',
      'AI that learns through trial, error, and rewards',
      'Strengthening computer hardware',
      'Re-training a model on the same data',
    ],
    correctIndex: 1,
    explanation: 'Reinforcement learning is where an AI agent learns by taking actions in an environment and receiving rewards or penalties.',
  },
  {
    id: '11',
    question: 'What is a "transformer" in AI?',
    options: [
      'A robot that changes shape',
      'A neural network architecture using attention mechanisms',
      'A data conversion tool',
      'A type of computer chip',
    ],
    correctIndex: 1,
    explanation: 'Transformers are a neural network architecture that uses "attention" to process sequences of data, powering models like GPT and BERT.',
  },
  {
    id: '12',
    question: 'What does "fine-tuning" mean in AI?',
    options: [
      'Making a model smaller',
      'Adjusting a pre-trained model for a specific task',
      'Fixing bugs in AI code',
      'Increasing a model\'s speed',
    ],
    correctIndex: 1,
    explanation: 'Fine-tuning takes a pre-trained model and further trains it on a smaller, task-specific dataset to improve performance for that particular use case.',
  },
  {
    id: '13',
    question: 'What is "generative AI"?',
    options: [
      'AI that only analyzes data',
      'AI that creates new content like text, images, or music',
      'AI that generates electricity',
      'A general-purpose computer',
    ],
    correctIndex: 1,
    explanation: 'Generative AI refers to models that can create new content — text, images, audio, video, or code — based on patterns learned from training data.',
  },
  {
    id: '14',
    question: 'What is "training data"?',
    options: [
      'Data used to test a model',
      'Data collected from training exercises',
      'The dataset an AI model learns patterns from',
      'Instructions written for AI developers',
    ],
    correctIndex: 2,
    explanation: 'Training data is the large collection of examples that an AI model learns from during the training process.',
  },
  {
    id: '15',
    question: 'What company created ChatGPT?',
    options: ['Google', 'Meta', 'OpenAI', 'Microsoft'],
    correctIndex: 2,
    explanation: 'ChatGPT was created by OpenAI, an AI research company. Microsoft is a major investor but did not build it.',
  },
  {
    id: '16',
    question: 'What is an "AI agent"?',
    options: [
      'A person who sells AI products',
      'An AI system that can take actions and make decisions autonomously',
      'A government regulator of AI',
      'A chatbot with a personality',
    ],
    correctIndex: 1,
    explanation: 'An AI agent is a system that can perceive its environment, make decisions, and take actions to achieve goals with varying degrees of autonomy.',
  },
  {
    id: '17',
    question: 'What is "open source" AI?',
    options: [
      'AI that is free to download',
      'AI whose code and/or weights are publicly available',
      'AI that works on any device',
      'AI with no restrictions',
    ],
    correctIndex: 1,
    explanation: 'Open source AI refers to models whose code, weights, or architecture are made publicly available for anyone to use, study, or modify.',
  },
  {
    id: '18',
    question: 'What is the "attention mechanism" in AI?',
    options: [
      'A way to make AI focus on homework',
      'A technique that helps models focus on relevant parts of input data',
      'AI that detects if you are paying attention',
      'A notification system in AI apps',
    ],
    correctIndex: 1,
    explanation: 'The attention mechanism allows models to weigh the importance of different parts of the input, focusing on what matters most for the current task.',
  },
  {
    id: '19',
    question: 'What is a "token" in the context of LLMs?',
    options: [
      'A cryptocurrency',
      'A piece of text (word or sub-word) that the model processes',
      'An access key for an API',
      'A small physical device',
    ],
    correctIndex: 1,
    explanation: 'In LLMs, a token is a chunk of text — typically a word or part of a word — that the model reads and generates. Models have context windows measured in tokens.',
  },
  {
    id: '20',
    question: 'What is "AI alignment"?',
    options: [
      'Making AI models run faster',
      'Ensuring AI systems act in accordance with human values and intentions',
      'Organizing AI code neatly',
      'Training AI on aligned datasets',
    ],
    correctIndex: 1,
    explanation: 'AI alignment is the field focused on ensuring AI systems behave in ways that are beneficial and aligned with human values, goals, and intentions.',
  },
];

// Get a random subset of questions for a quiz round
export function getQuizRound(count: number = 5): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Daily AI teasers / fun facts
export const dailyTeasers: DailyTeaser[] = [
  { fact: 'GPT-4 was trained on roughly 13 trillion tokens of text data.', category: 'Models' },
  { fact: 'The term "Artificial Intelligence" was first coined in 1956 at Dartmouth College.', category: 'History' },
  { fact: 'AI can now generate photorealistic images from text descriptions in seconds.', category: 'Generative AI' },
  { fact: 'The transformer architecture was introduced in the 2017 paper "Attention Is All You Need."', category: 'Research' },
  { fact: 'DeepMind\'s AlphaFold predicted the structure of nearly every known protein.', category: 'Science' },
  { fact: 'The global AI market is projected to reach $1.8 trillion by 2030.', category: 'Industry' },
  { fact: 'NVIDIA\'s H100 GPU can perform 4 petaflops of AI computation.', category: 'Hardware' },
  { fact: 'ChatGPT reached 100 million users faster than any app in history — just 2 months.', category: 'Milestones' },
  { fact: 'AI models can now write, debug, and explain code in over 80 programming languages.', category: 'Coding' },
  { fact: 'Open source models like Llama and Mistral are closing the gap with proprietary ones.', category: 'Open Source' },
  { fact: 'AI-generated art won a state fair art competition in 2022, sparking major debate.', category: 'Creative AI' },
  { fact: 'The "attention mechanism" lets AI focus on the most relevant parts of input — like how you scan a page.', category: 'How It Works' },
  { fact: 'Reinforcement learning helped AI master Go, Chess, and StarCraft at superhuman levels.', category: 'Gaming' },
  { fact: 'Multimodal AI can process text, images, audio, and video all at once.', category: 'Models' },
  { fact: 'AI is being used to discover new antibiotics and predict drug interactions.', category: 'Healthcare' },
  { fact: 'The first neural network was created in 1943 by McCulloch and Pitts.', category: 'History' },
  { fact: 'AI coding assistants can now complete code with over 40% accuracy on benchmarks.', category: 'Coding' },
  { fact: 'Diffusion models like Stable Diffusion work by learning to "denoise" random static into images.', category: 'How It Works' },
  { fact: 'The EU AI Act is the world\'s first comprehensive AI regulation framework.', category: 'Policy' },
  { fact: 'AI can now clone a voice from just 3 seconds of audio.', category: 'Audio AI' },
  { fact: 'Foundation models are called "foundation" because many applications are built on top of them.', category: 'Concepts' },
  { fact: 'AI hallucinations happen because models predict likely text, not factual truth.', category: 'Safety' },
  { fact: 'A single GPT-4 training run is estimated to have cost over $100 million.', category: 'Industry' },
  { fact: 'RAG (Retrieval Augmented Generation) helps AI give more accurate answers by looking up real data.', category: 'Techniques' },
  { fact: 'Self-driving cars use a combination of computer vision, lidar, and AI to navigate roads.', category: 'Robotics' },
  { fact: 'RLHF (Reinforcement Learning from Human Feedback) is how ChatGPT learned to be helpful and safe.', category: 'Training' },
  { fact: 'Google\'s Gemini model can process 1 million tokens — that\'s roughly 700,000 words in one go.', category: 'Models' },
  { fact: 'AI watermarking techniques are being developed to distinguish AI-generated content from human content.', category: 'Safety' },
  { fact: 'The "bitter lesson" in AI says that general methods using more compute always win in the long run.', category: 'Philosophy' },
  { fact: 'AI can now generate 3D objects and environments from text descriptions.', category: 'Generative AI' },
];

export function getDailyTeaser(): DailyTeaser {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dailyTeasers[dayOfYear % dailyTeasers.length];
}
