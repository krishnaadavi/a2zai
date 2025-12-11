// Glossary seed data - AI terms and definitions
export const glossaryTerms = [
  {
    slug: 'artificial-intelligence',
    term: 'Artificial Intelligence (AI)',
    shortDef: 'Computer systems that can perform tasks typically requiring human intelligence.',
    fullDef: `Artificial Intelligence refers to the simulation of human intelligence in machines programmed to think and learn like humans. AI systems can perform tasks such as visual perception, speech recognition, decision-making, and language translation.

AI is broadly categorized into:
- **Narrow AI (Weak AI)**: Designed for specific tasks (e.g., Siri, recommendation systems)
- **General AI (Strong AI)**: Hypothetical AI with human-like cognitive abilities
- **Superintelligent AI**: Theoretical AI surpassing human intelligence`,
    category: 'concepts',
    relatedTerms: ['machine-learning', 'deep-learning', 'neural-network'],
    examples: 'Examples include virtual assistants (Alexa, Siri), self-driving cars, facial recognition systems, and ChatGPT.',
  },
  {
    slug: 'machine-learning',
    term: 'Machine Learning (ML)',
    shortDef: 'A subset of AI where systems learn and improve from experience without being explicitly programmed.',
    fullDef: `Machine Learning is a method of data analysis that automates analytical model building. It enables computers to learn from data, identify patterns, and make decisions with minimal human intervention.

**Key Types:**
- **Supervised Learning**: Training on labeled data (classification, regression)
- **Unsupervised Learning**: Finding patterns in unlabeled data (clustering)
- **Reinforcement Learning**: Learning through trial and error with rewards`,
    category: 'techniques',
    relatedTerms: ['artificial-intelligence', 'deep-learning', 'supervised-learning', 'training'],
    examples: 'Spam filters learning to identify spam emails, Netflix recommendations based on viewing history.',
  },
  {
    slug: 'large-language-model',
    term: 'Large Language Model (LLM)',
    shortDef: 'AI models trained on massive text datasets that can understand and generate human-like text.',
    fullDef: `Large Language Models are neural networks trained on enormous amounts of text data. They learn patterns in language and can generate coherent, contextually relevant text.

**Key Characteristics:**
- Billions of parameters (GPT-4 has ~1.7 trillion)
- Trained on internet-scale text data
- Can perform many tasks without task-specific training (zero-shot learning)
- Use transformer architecture

**Capabilities:**
- Text generation and completion
- Question answering
- Summarization
- Translation
- Code generation`,
    category: 'models',
    relatedTerms: ['transformer', 'gpt', 'parameters', 'fine-tuning'],
    examples: 'GPT-4, Claude, Gemini, Llama 3, Mistral are all LLMs.',
  },
  {
    slug: 'neural-network',
    term: 'Neural Network',
    shortDef: 'Computing systems inspired by biological neural networks in the human brain.',
    fullDef: `Neural networks are a series of algorithms that recognize underlying relationships in data through a process that mimics how the human brain operates.

**Structure:**
- **Input Layer**: Receives raw data
- **Hidden Layers**: Process and transform data
- **Output Layer**: Produces final result

**How They Learn:**
1. Data flows through the network
2. Each neuron applies weights and activation functions
3. Output is compared to expected result
4. Errors propagate backward (backpropagation)
5. Weights are adjusted to minimize error`,
    category: 'techniques',
    relatedTerms: ['deep-learning', 'backpropagation', 'weights', 'activation-function'],
    examples: 'Image recognition in photos, voice recognition in smart speakers.',
  },
  {
    slug: 'deep-learning',
    term: 'Deep Learning',
    shortDef: 'Machine learning using neural networks with many layers to learn complex patterns.',
    fullDef: `Deep Learning is a subset of machine learning that uses multi-layered neural networks to progressively extract higher-level features from raw input.

**Why "Deep"?**
The term refers to the number of layers in the network. Deep networks have many hidden layers (sometimes hundreds), allowing them to learn hierarchical representations.

**Key Architectures:**
- **CNNs**: Convolutional Neural Networks for images
- **RNNs**: Recurrent Neural Networks for sequences
- **Transformers**: Attention-based networks for NLP

**Requirements:**
- Large amounts of training data
- Significant computational power (GPUs/TPUs)
- Careful architecture design`,
    category: 'techniques',
    relatedTerms: ['neural-network', 'machine-learning', 'transformer', 'cnn'],
    examples: 'Face recognition, autonomous vehicles, language translation.',
  },
  {
    slug: 'transformer',
    term: 'Transformer',
    shortDef: 'A neural network architecture using self-attention mechanisms, the foundation of modern LLMs.',
    fullDef: `Transformers are a type of neural network architecture introduced in the 2017 paper "Attention Is All You Need." They revolutionized NLP and are now used across AI.

**Key Innovation - Self-Attention:**
Unlike previous architectures that processed data sequentially, transformers can process all parts of the input simultaneously by calculating attention scores between every pair of elements.

**Architecture Components:**
- **Encoder**: Processes input (used in BERT)
- **Decoder**: Generates output (used in GPT)
- **Attention Heads**: Multiple parallel attention mechanisms

**Why Transformers Dominate:**
- Highly parallelizable (faster training)
- Better at capturing long-range dependencies
- Scale effectively with more data and compute`,
    category: 'techniques',
    relatedTerms: ['attention', 'large-language-model', 'gpt', 'bert'],
    examples: 'GPT, BERT, Claude, and all modern LLMs use transformer architecture.',
  },
  {
    slug: 'prompt',
    term: 'Prompt',
    shortDef: 'The input text or instructions given to an AI model to generate a response.',
    fullDef: `A prompt is the text input you provide to an AI model to get a desired output. The quality and structure of your prompt significantly affects the quality of the response.

**Prompt Components:**
- **Instructions**: What you want the AI to do
- **Context**: Background information
- **Examples**: Sample inputs/outputs (few-shot learning)
- **Constraints**: Limitations or requirements

**Prompt Engineering:**
The practice of designing effective prompts to get better results. Techniques include:
- Being specific and clear
- Providing examples
- Breaking complex tasks into steps
- Specifying output format`,
    category: 'concepts',
    relatedTerms: ['prompt-engineering', 'few-shot-learning', 'zero-shot'],
    examples: '"Write a professional email declining a meeting" is a prompt to an LLM.',
  },
  {
    slug: 'fine-tuning',
    term: 'Fine-Tuning',
    shortDef: 'Adapting a pre-trained model to perform better on specific tasks using additional training.',
    fullDef: `Fine-tuning is the process of taking a pre-trained model and training it further on a smaller, task-specific dataset to improve its performance on that particular task.

**Why Fine-Tune?**
- Pre-trained models are general-purpose
- Fine-tuning specializes them for your use case
- Requires less data than training from scratch
- Faster and cheaper than full training

**Common Approaches:**
- **Full Fine-Tuning**: Update all model weights
- **LoRA**: Low-Rank Adaptation - update only small adapter layers
- **RLHF**: Reinforcement Learning from Human Feedback`,
    category: 'techniques',
    relatedTerms: ['training', 'pre-training', 'lora', 'rlhf'],
    examples: 'Fine-tuning GPT on customer service conversations to create a support chatbot.',
  },
  {
    slug: 'parameters',
    term: 'Parameters',
    shortDef: 'The learnable values in a neural network that determine its behavior.',
    fullDef: `Parameters are the internal variables that a neural network learns during training. They include weights and biases that determine how input data is transformed into output.

**Scale in Modern Models:**
- GPT-2: 1.5 billion parameters
- GPT-3: 175 billion parameters
- GPT-4: ~1.7 trillion parameters (estimated)
- Llama 3: 8B to 405B parameters

**More Parameters Generally Means:**
- Greater capacity to learn complex patterns
- Better performance on diverse tasks
- Higher computational requirements
- More training data needed`,
    category: 'concepts',
    relatedTerms: ['weights', 'training', 'large-language-model'],
    examples: 'When someone says "a 70B model," they mean a model with 70 billion parameters.',
  },
  {
    slug: 'training',
    term: 'Training',
    shortDef: 'The process of teaching an AI model to perform tasks by exposing it to data.',
    fullDef: `Training is the process where a machine learning model learns patterns from data by adjusting its parameters to minimize prediction errors.

**Training Process:**
1. **Forward Pass**: Data flows through the model
2. **Loss Calculation**: Measure error between prediction and truth
3. **Backward Pass**: Calculate how to adjust parameters
4. **Update**: Modify parameters to reduce error
5. **Repeat**: Iterate over many examples (epochs)

**Key Concepts:**
- **Epochs**: Complete passes through the training data
- **Batch Size**: Number of examples processed together
- **Learning Rate**: How much to adjust parameters each step
- **Loss Function**: Measures prediction error`,
    category: 'techniques',
    relatedTerms: ['parameters', 'fine-tuning', 'pre-training', 'backpropagation'],
    examples: 'Training GPT-4 reportedly cost over $100 million in compute.',
  },
  {
    slug: 'inference',
    term: 'Inference',
    shortDef: 'Using a trained AI model to make predictions on new, unseen data.',
    fullDef: `Inference is the process of using a trained model to generate outputs for new inputs. It's the "production" phase after training is complete.

**Training vs. Inference:**
- **Training**: Learning from data (expensive, done once)
- **Inference**: Using what was learned (cheaper, done many times)

**Inference Considerations:**
- **Latency**: Time to generate response
- **Throughput**: Requests handled per second
- **Cost**: Compute resources needed
- **Accuracy**: Quality of predictions`,
    category: 'concepts',
    relatedTerms: ['training', 'latency', 'throughput'],
    examples: 'When you ask ChatGPT a question, it performs inference to generate the answer.',
  },
  {
    slug: 'hallucination',
    term: 'Hallucination',
    shortDef: 'When an AI model generates false or fabricated information presented as fact.',
    fullDef: `Hallucination refers to AI models producing content that sounds plausible but is factually incorrect, fabricated, or nonsensical.

**Why Hallucinations Happen:**
- Models predict probable next tokens, not truth
- Training data may contain errors
- Models lack real-world grounding
- Overconfidence in generation

**Types of Hallucinations:**
- **Factual Errors**: Wrong dates, names, statistics
- **Fabricated Sources**: Made-up citations or quotes
- **Logical Inconsistencies**: Self-contradicting statements
- **Confident Nonsense**: Plausible-sounding gibberish

**Mitigation Strategies:**
- Retrieval-Augmented Generation (RAG)
- Fact-checking pipelines
- User verification
- Temperature reduction`,
    category: 'concepts',
    relatedTerms: ['rag', 'grounding', 'temperature'],
    examples: 'An LLM citing a non-existent research paper or inventing historical events.',
  },
  {
    slug: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    shortDef: 'A technique combining information retrieval with text generation to improve accuracy.',
    fullDef: `RAG enhances LLM responses by first retrieving relevant information from external sources, then using that information to generate more accurate, grounded responses.

**How RAG Works:**
1. **Query**: User asks a question
2. **Retrieve**: Search knowledge base for relevant documents
3. **Augment**: Add retrieved context to the prompt
4. **Generate**: LLM produces response using the context

**Benefits:**
- Reduces hallucinations
- Enables access to current information
- Allows domain-specific knowledge
- More transparent (can cite sources)

**Components:**
- **Vector Database**: Stores document embeddings
- **Embedding Model**: Converts text to vectors
- **Retriever**: Finds relevant documents
- **Generator**: LLM that produces final response`,
    category: 'techniques',
    relatedTerms: ['hallucination', 'embeddings', 'vector-database'],
    examples: 'A customer service bot that retrieves from company documentation before answering.',
  },
  {
    slug: 'embeddings',
    term: 'Embeddings',
    shortDef: 'Numerical representations of data (text, images) that capture semantic meaning.',
    fullDef: `Embeddings are dense vector representations of data where similar items are mapped to nearby points in a high-dimensional space.

**Why Embeddings Matter:**
- Convert unstructured data to numbers computers can process
- Capture semantic relationships (king - man + woman ≈ queen)
- Enable similarity search and clustering
- Foundation for RAG and recommendation systems

**Types:**
- **Word Embeddings**: Represent individual words (Word2Vec, GloVe)
- **Sentence Embeddings**: Represent entire sentences
- **Image Embeddings**: Represent images (CLIP)

**Common Dimensions:**
- OpenAI ada-002: 1,536 dimensions
- BERT: 768 dimensions
- Large models: Up to 4,096+ dimensions`,
    category: 'techniques',
    relatedTerms: ['rag', 'vector-database', 'semantic-search'],
    examples: 'Searching for "automobile" and finding documents about "cars" because their embeddings are similar.',
  },
  {
    slug: 'token',
    term: 'Token',
    shortDef: 'The basic unit of text that language models process, roughly 3/4 of a word.',
    fullDef: `Tokens are the fundamental units that language models use to process text. Tokenization breaks text into these smaller pieces before processing.

**Tokenization Examples:**
- "Hello world" → ["Hello", " world"] (2 tokens)
- "unhappiness" → ["un", "happiness"] or ["unhapp", "iness"]
- Spaces, punctuation, and special characters are often separate tokens

**Why Tokens Matter:**
- **Context Windows**: Models have token limits (e.g., 128K tokens)
- **Pricing**: API costs are per token
- **Performance**: Longer inputs = slower processing

**Rules of Thumb:**
- ~4 characters per token (English)
- ~3/4 words per token
- 1 page ≈ 500-600 tokens
- Non-English languages often use more tokens`,
    category: 'concepts',
    relatedTerms: ['context-window', 'tokenizer', 'large-language-model'],
    examples: 'GPT-4 has a 128K token context window, roughly 300 pages of text.',
  },
  {
    slug: 'context-window',
    term: 'Context Window',
    shortDef: 'The maximum amount of text a language model can process at once.',
    fullDef: `The context window (or context length) is the maximum number of tokens a model can consider when generating a response.

**Why It Matters:**
- Determines how much text you can include in a prompt
- Limits conversation history in chat applications
- Affects ability to process long documents

**Evolution of Context Windows:**
- GPT-3: 4,096 tokens
- GPT-4: 8K-128K tokens
- Claude 3: 200K tokens
- Gemini 1.5: 1M+ tokens

**Working with Limits:**
- Summarize long documents
- Use RAG for relevant retrieval
- Chunk large inputs
- Prioritize recent context`,
    category: 'concepts',
    relatedTerms: ['token', 'large-language-model', 'rag'],
    examples: 'With a 100K context window, you can paste an entire book into a single prompt.',
  },
  {
    slug: 'gpt',
    term: 'GPT (Generative Pre-trained Transformer)',
    shortDef: 'OpenAI\'s series of large language models that power ChatGPT.',
    fullDef: `GPT is a family of large language models developed by OpenAI, known for their ability to generate human-like text.

**GPT Evolution:**
- **GPT-1** (2018): 117M parameters, proved the concept
- **GPT-2** (2019): 1.5B parameters, shockingly good text generation
- **GPT-3** (2020): 175B parameters, few-shot learning breakthrough
- **GPT-4** (2023): ~1.7T parameters (estimated), multimodal
- **GPT-4o** (2024): Optimized for speed and multimodal

**Key Features:**
- Decoder-only transformer architecture
- Trained on diverse internet text
- Instruction-tuned versions (InstructGPT, ChatGPT)
- Available via API and ChatGPT interface`,
    category: 'models',
    relatedTerms: ['transformer', 'large-language-model', 'openai', 'chatgpt'],
    examples: 'ChatGPT is powered by GPT-4, while the API offers various GPT models.',
  },
  {
    slug: 'attention',
    term: 'Attention Mechanism',
    shortDef: 'A technique allowing models to focus on relevant parts of the input when generating output.',
    fullDef: `Attention mechanisms allow neural networks to weigh the importance of different parts of the input when producing each part of the output.

**Self-Attention:**
For each element in a sequence, calculate how much to "attend to" every other element:
1. Create Query, Key, Value vectors for each token
2. Calculate attention scores (Query × Key)
3. Apply softmax to get weights
4. Weighted sum of Values produces output

**Why Attention Revolutionized AI:**
- Handles long-range dependencies
- Parallelizable (unlike RNNs)
- Interpretable (attention weights show focus)
- Scales effectively

**Multi-Head Attention:**
Run multiple attention operations in parallel, each learning different relationships (syntax, semantics, coreference, etc.)`,
    category: 'techniques',
    relatedTerms: ['transformer', 'self-attention', 'multi-head-attention'],
    examples: 'When translating "The cat sat on the mat, it was soft," attention helps connect "it" to "mat."',
  },
  {
    slug: 'computer-vision',
    term: 'Computer Vision',
    shortDef: 'AI field focused on enabling computers to interpret and understand visual information.',
    fullDef: `Computer Vision is a field of AI that trains computers to interpret and understand the visual world using digital images, videos, and deep learning models.

**Key Tasks:**
- **Image Classification**: What's in this image?
- **Object Detection**: Where are objects in the image?
- **Segmentation**: Pixel-level classification
- **Face Recognition**: Identifying individuals
- **OCR**: Reading text from images

**Technologies:**
- Convolutional Neural Networks (CNNs)
- Vision Transformers (ViT)
- YOLO (You Only Look Once)
- CLIP (Connecting text and images)

**Applications:**
- Autonomous vehicles
- Medical imaging
- Security and surveillance
- Augmented reality`,
    category: 'concepts',
    relatedTerms: ['cnn', 'image-classification', 'object-detection'],
    examples: 'Tesla Autopilot uses computer vision to understand the road environment.',
  },
  {
    slug: 'natural-language-processing',
    term: 'Natural Language Processing (NLP)',
    shortDef: 'AI field focused on enabling computers to understand and generate human language.',
    fullDef: `Natural Language Processing is a branch of AI that helps computers understand, interpret, and manipulate human language.

**Core NLP Tasks:**
- **Text Classification**: Categorizing text (spam detection)
- **Named Entity Recognition**: Finding names, dates, places
- **Sentiment Analysis**: Determining opinion/emotion
- **Machine Translation**: Converting between languages
- **Question Answering**: Answering natural language questions
- **Text Generation**: Creating human-like text

**Evolution:**
- **Rule-based** (1950s-1980s): Hand-crafted rules
- **Statistical** (1990s-2000s): Probabilistic models
- **Deep Learning** (2010s): Neural networks
- **Transformers** (2017+): Attention-based models
- **LLMs** (2020+): Foundation models`,
    category: 'concepts',
    relatedTerms: ['large-language-model', 'transformer', 'text-classification'],
    examples: 'Google Translate, Grammarly, and ChatGPT all use NLP.',
  },
];
