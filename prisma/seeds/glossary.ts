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
  {
    slug: 'multimodal',
    term: 'Multimodal AI',
    shortDef: 'AI systems that can process and understand multiple types of data like text, images, and audio.',
    fullDef: `Multimodal AI refers to artificial intelligence systems that can process, understand, and generate content across multiple modalities (data types) simultaneously.

**Modalities Include:**
- Text (natural language)
- Images (photos, diagrams)
- Audio (speech, music)
- Video (combined visual + audio)
- Code (programming languages)

**Key Capabilities:**
- Image understanding and description
- Visual question answering
- Text-to-image generation
- Speech recognition and synthesis

**Examples of Multimodal Models:**
- GPT-4V (vision + text)
- Gemini (text, image, audio, video)
- Claude 3 (text + vision)
- DALL-E 3 (text to image)`,
    category: 'concepts',
    relatedTerms: ['gpt', 'computer-vision', 'large-language-model'],
    examples: 'Uploading a photo to GPT-4 and asking it to describe what\'s happening.',
  },
  {
    slug: 'api',
    term: 'API (Application Programming Interface)',
    shortDef: 'A way for software applications to communicate and share data with each other.',
    fullDef: `An API is a set of protocols and tools that allows different software applications to communicate with each other.

**In AI Context:**
- OpenAI API: Access GPT models programmatically
- Anthropic API: Access Claude models
- Hugging Face API: Access open-source models

**Key Concepts:**
- **Endpoints**: URLs where you send requests
- **API Keys**: Authentication tokens
- **Rate Limits**: Request restrictions
- **Pricing**: Often per token or per request

**Why APIs Matter:**
- Build AI into your applications
- No need to host models yourself
- Pay-per-use pricing
- Access to latest models`,
    category: 'concepts',
    relatedTerms: ['inference', 'token', 'rate-limit'],
    examples: 'Building a chatbot by calling the OpenAI API from your website.',
  },
  {
    slug: 'prompt-engineering',
    term: 'Prompt Engineering',
    shortDef: 'The practice of designing effective prompts to get better outputs from AI models.',
    fullDef: `Prompt engineering is the art and science of crafting inputs to AI models to achieve desired outputs.

**Key Techniques:**
- **Zero-shot**: Direct question without examples
- **Few-shot**: Providing examples in the prompt
- **Chain-of-Thought**: Asking model to explain reasoning
- **Role-playing**: "You are an expert in..."
- **Structured Output**: Requesting specific formats

**Best Practices:**
- Be specific and detailed
- Provide context and constraints
- Use clear formatting
- Iterate and refine
- Test with edge cases

**Advanced Techniques:**
- Self-consistency (multiple reasoning paths)
- Tree-of-Thought (branching reasoning)
- ReAct (reasoning + acting)`,
    category: 'techniques',
    relatedTerms: ['prompt', 'few-shot-learning', 'chain-of-thought'],
    examples: 'Adding "Let\'s think step by step" to improve math problem solving.',
  },
  {
    slug: 'zero-shot',
    term: 'Zero-Shot Learning',
    shortDef: 'AI performing tasks without any specific examples, using only general knowledge.',
    fullDef: `Zero-shot learning refers to a model's ability to perform tasks it wasn't explicitly trained for, without being given examples.

**How It Works:**
- Model uses general knowledge from pre-training
- Task is described in natural language
- No task-specific examples provided

**Example Prompt:**
"Classify this review as positive or negative: 'Great product, highly recommend!'"
(No examples of classifications given)

**Contrast with:**
- **One-shot**: One example provided
- **Few-shot**: A few examples provided
- **Fine-tuning**: Many examples + training

**Why It Matters:**
- Faster deployment (no training needed)
- More flexible (any task)
- Lower cost (no labeled data)`,
    category: 'techniques',
    relatedTerms: ['few-shot-learning', 'prompt-engineering', 'transfer-learning'],
    examples: 'Asking GPT-4 to translate to a language it wasn\'t specifically trained on.',
  },
  {
    slug: 'few-shot-learning',
    term: 'Few-Shot Learning',
    shortDef: 'Teaching AI to perform tasks by providing just a few examples in the prompt.',
    fullDef: `Few-shot learning is providing a small number of examples to help the model understand the desired task and output format.

**Structure:**
1. Task description
2. Example 1: Input → Output
3. Example 2: Input → Output
4. Example 3: Input → Output
5. Actual query

**Benefits:**
- Better accuracy than zero-shot
- No model fine-tuning needed
- Quick to implement
- Easy to iterate

**Best Practices:**
- Use diverse, representative examples
- Keep formatting consistent
- 3-5 examples often sufficient
- Order can matter (put best examples last)`,
    category: 'techniques',
    relatedTerms: ['zero-shot', 'prompt-engineering', 'in-context-learning'],
    examples: 'Showing 3 examples of email subject lines before asking the model to write one.',
  },
  {
    slug: 'chain-of-thought',
    term: 'Chain-of-Thought (CoT)',
    shortDef: 'Prompting technique that asks AI to show step-by-step reasoning.',
    fullDef: `Chain-of-Thought prompting encourages models to break down complex problems into intermediate reasoning steps.

**Simple Trigger:**
Adding "Let's think step by step" to prompts

**Why It Works:**
- Forces explicit reasoning
- Reduces errors in multi-step problems
- Makes reasoning transparent
- Improves mathematical and logical tasks

**Variations:**
- **Zero-shot CoT**: Just add "think step by step"
- **Few-shot CoT**: Provide examples with reasoning
- **Self-consistency**: Generate multiple reasoning paths
- **Tree-of-Thought**: Branch and evaluate paths

**When to Use:**
- Math problems
- Logic puzzles
- Complex reasoning
- Multi-step instructions`,
    category: 'techniques',
    relatedTerms: ['prompt-engineering', 'reasoning', 'zero-shot'],
    examples: 'Solving "If John has 3 apples and gives away 1, how many..." with step-by-step reasoning.',
  },
  {
    slug: 'temperature',
    term: 'Temperature',
    shortDef: 'A parameter controlling randomness and creativity in AI model outputs.',
    fullDef: `Temperature is a hyperparameter that controls how random or deterministic a model's outputs are.

**Scale (typically 0-2):**
- **0**: Deterministic, always picks most likely token
- **0.5-0.7**: Balanced creativity and consistency
- **1.0**: Default, moderate randomness
- **1.5-2.0**: High creativity, more unexpected outputs

**When to Use Low Temperature (0-0.3):**
- Factual Q&A
- Code generation
- Data extraction
- Consistent outputs needed

**When to Use High Temperature (0.8-1.5):**
- Creative writing
- Brainstorming
- Story generation
- Diverse ideas wanted

**Related Parameter:**
- **Top-p (nucleus sampling)**: Alternative way to control randomness`,
    category: 'concepts',
    relatedTerms: ['inference', 'top-p', 'sampling'],
    examples: 'Setting temperature=0 for code generation, temperature=1.2 for creative stories.',
  },
  {
    slug: 'rlhf',
    term: 'RLHF (Reinforcement Learning from Human Feedback)',
    shortDef: 'Training method using human preferences to make AI more helpful and safe.',
    fullDef: `RLHF is a training technique that uses human feedback to fine-tune AI models to be more aligned with human preferences.

**Process:**
1. **Supervised Fine-tuning**: Train on human demonstrations
2. **Reward Model**: Train a model to predict human preferences
3. **RL Optimization**: Use reward model to guide further training

**Why RLHF Matters:**
- Makes models more helpful
- Reduces harmful outputs
- Improves instruction following
- Aligns AI with human values

**Used By:**
- ChatGPT/GPT-4
- Claude
- Gemini
- Most modern chatbots

**Limitations:**
- Expensive (requires human labelers)
- Can reduce model capabilities
- Subjective preferences vary`,
    category: 'techniques',
    relatedTerms: ['fine-tuning', 'alignment', 'reward-model'],
    examples: 'Training ChatGPT to be helpful by having humans rate response quality.',
  },
  {
    slug: 'diffusion-model',
    term: 'Diffusion Model',
    shortDef: 'AI models that generate images by gradually removing noise from random data.',
    fullDef: `Diffusion models generate data by learning to reverse a gradual noising process.

**How It Works:**
1. **Forward Process**: Gradually add noise to images until they become pure noise
2. **Reverse Process**: Learn to gradually remove noise to generate images
3. **Conditioning**: Guide generation with text prompts

**Key Models:**
- DALL-E 2/3 (OpenAI)
- Stable Diffusion (Stability AI)
- Midjourney
- Imagen (Google)

**Why Diffusion Dominates Image Generation:**
- High quality outputs
- Diverse generations
- Controllable via prompts
- Stable training process

**Applications:**
- Text-to-image generation
- Image editing
- Video generation
- 3D model generation`,
    category: 'techniques',
    relatedTerms: ['stable-diffusion', 'dall-e', 'image-generation'],
    examples: 'Midjourney creating art from a text description using diffusion.',
  },
  {
    slug: 'stable-diffusion',
    term: 'Stable Diffusion',
    shortDef: 'Popular open-source image generation model using diffusion techniques.',
    fullDef: `Stable Diffusion is an open-source text-to-image AI model that generates detailed images from text descriptions.

**Key Features:**
- Open source and free to use
- Runs on consumer GPUs
- Highly customizable
- Large community and ecosystem

**Versions:**
- SD 1.5: Original popular version
- SD 2.0/2.1: Improved quality
- SDXL: Higher resolution, better quality
- SD 3: Latest with improved text rendering

**Ecosystem:**
- ControlNet: Precise image control
- LoRA: Lightweight fine-tuning
- Textual Inversion: Custom concepts
- Community models and checkpoints

**Use Cases:**
- Art creation
- Product visualization
- Concept art
- Image editing`,
    category: 'models',
    relatedTerms: ['diffusion-model', 'image-generation', 'lora'],
    examples: 'Running Stable Diffusion locally to generate artwork without API costs.',
  },
  {
    slug: 'lora',
    term: 'LoRA (Low-Rank Adaptation)',
    shortDef: 'Efficient fine-tuning technique that trains small adapter modules instead of full models.',
    fullDef: `LoRA is a parameter-efficient fine-tuning method that adds small trainable layers to a frozen pre-trained model.

**How It Works:**
- Freeze original model weights
- Add small "adapter" matrices at specific layers
- Only train the adapters (much smaller)
- Merge adapters with base model for inference

**Benefits:**
- **Efficient**: 10,000x fewer trainable parameters
- **Fast**: Hours instead of days to fine-tune
- **Cheap**: Can run on consumer hardware
- **Modular**: Swap different LoRAs easily

**Common Uses:**
- Custom Stable Diffusion styles
- Domain-specific LLM adaptation
- Character/concept training
- Language adaptation

**Related Techniques:**
- QLoRA: Quantized LoRA for even less memory
- DoRA: Weight-decomposed LoRA`,
    category: 'techniques',
    relatedTerms: ['fine-tuning', 'stable-diffusion', 'adapter'],
    examples: 'Training a LoRA on anime images to generate anime-style art with Stable Diffusion.',
  },
  {
    slug: 'quantization',
    term: 'Quantization',
    shortDef: 'Reducing model precision to decrease size and increase speed while maintaining quality.',
    fullDef: `Quantization reduces the numerical precision of model weights to make models smaller and faster.

**Precision Levels:**
- **FP32**: Full precision (32-bit floating point)
- **FP16**: Half precision (16-bit)
- **INT8**: 8-bit integers
- **INT4**: 4-bit integers

**Benefits:**
- **Smaller Models**: 4-bit is 8x smaller than 32-bit
- **Faster Inference**: Less memory bandwidth needed
- **Lower Costs**: Run larger models on smaller hardware
- **Edge Deployment**: Run on phones/laptops

**Methods:**
- Post-training quantization (PTQ)
- Quantization-aware training (QAT)
- GPTQ, AWQ (for LLMs)

**Trade-offs:**
- Some quality loss (usually minimal)
- May affect edge cases
- Calibration data needed`,
    category: 'techniques',
    relatedTerms: ['inference', 'optimization', 'deployment'],
    examples: 'Running a 70B model on a gaming GPU by quantizing it to 4-bit.',
  },
  {
    slug: 'vector-database',
    term: 'Vector Database',
    shortDef: 'Databases optimized for storing and searching high-dimensional vectors like embeddings.',
    fullDef: `Vector databases are specialized databases designed to store, index, and query high-dimensional vector data efficiently.

**Key Operations:**
- **Storage**: Save embedding vectors with metadata
- **Similarity Search**: Find nearest neighbors
- **Filtering**: Combine vector search with metadata filters
- **CRUD**: Create, read, update, delete vectors

**Popular Vector Databases:**
- Pinecone (managed, serverless)
- Weaviate (open-source)
- Milvus (open-source, scalable)
- Chroma (lightweight, local)
- pgvector (PostgreSQL extension)

**Use Cases:**
- RAG systems
- Semantic search
- Recommendation systems
- Image similarity
- Anomaly detection

**Key Concepts:**
- Approximate Nearest Neighbor (ANN)
- Indexing algorithms (HNSW, IVF)
- Distance metrics (cosine, euclidean)`,
    category: 'concepts',
    relatedTerms: ['embeddings', 'rag', 'semantic-search'],
    examples: 'Storing document embeddings in Pinecone for a RAG-powered chatbot.',
  },
  {
    slug: 'agent',
    term: 'AI Agent',
    shortDef: 'AI systems that can autonomously perform tasks by planning and using tools.',
    fullDef: `AI Agents are systems that use LLMs to reason, plan, and take actions to accomplish goals autonomously.

**Key Capabilities:**
- **Reasoning**: Think through problems
- **Planning**: Break tasks into steps
- **Tool Use**: Call APIs, search web, run code
- **Memory**: Remember context across interactions

**Common Architectures:**
- ReAct (Reason + Act)
- Plan-and-Execute
- Multi-agent collaboration

**Tools Agents Might Use:**
- Web search
- Code execution
- Database queries
- API calls
- File operations

**Frameworks:**
- LangChain Agents
- AutoGPT
- CrewAI
- OpenAI Assistants

**Challenges:**
- Reliability and error handling
- Cost management
- Security considerations`,
    category: 'concepts',
    relatedTerms: ['tool-use', 'reasoning', 'langchain'],
    examples: 'An agent that researches a topic, writes an article, and posts it to a blog.',
  },
  {
    slug: 'openai',
    term: 'OpenAI',
    shortDef: 'AI research company that created GPT, ChatGPT, DALL-E, and other leading AI systems.',
    fullDef: `OpenAI is an artificial intelligence research company founded in 2015, known for creating some of the most advanced AI systems.

**Key Products:**
- **ChatGPT**: Conversational AI (100M+ users)
- **GPT-4**: Advanced language model
- **DALL-E**: Image generation
- **Whisper**: Speech recognition
- **Codex**: Code generation (powers GitHub Copilot)

**History:**
- 2015: Founded as non-profit
- 2019: Transitioned to capped-profit
- 2020: Released GPT-3
- 2022: Launched ChatGPT
- 2023: Released GPT-4

**Business Model:**
- API access (pay per token)
- ChatGPT Plus subscription
- Enterprise offerings

**Competitors:**
- Anthropic (Claude)
- Google (Gemini)
- Meta (Llama)
- Mistral`,
    category: 'companies',
    relatedTerms: ['gpt', 'chatgpt', 'dall-e'],
    examples: 'ChatGPT became the fastest-growing app in history, reaching 100M users in 2 months.',
  },
  {
    slug: 'anthropic',
    term: 'Anthropic',
    shortDef: 'AI safety company that created Claude, focused on building safe and beneficial AI.',
    fullDef: `Anthropic is an AI safety company founded in 2021 by former OpenAI researchers, focused on developing safe, beneficial AI.

**Key Product - Claude:**
- Claude 3 Opus: Most capable model
- Claude 3 Sonnet: Balanced performance/cost
- Claude 3 Haiku: Fast and efficient
- Claude 3.5 Sonnet: Latest, best at coding

**Key Differentiators:**
- **Constitutional AI**: Training method for safety
- **Long context**: Up to 200K tokens
- **Honest and harmless**: Focus on safety
- **Strong at analysis**: Particularly good at reasoning

**Founders:**
- Dario Amodei (CEO, ex-OpenAI)
- Daniela Amodei (President)

**Funding:**
- $7.6B+ raised
- Amazon invested $4B
- Google invested $2B`,
    category: 'companies',
    relatedTerms: ['claude', 'openai', 'ai-safety'],
    examples: 'Claude is known for being particularly good at coding and analysis tasks.',
  },
  {
    slug: 'claude',
    term: 'Claude',
    shortDef: 'Anthropic\'s AI assistant, known for helpfulness, harmlessness, and honesty.',
    fullDef: `Claude is a family of AI assistants developed by Anthropic, designed to be helpful, harmless, and honest.

**Model Family:**
- **Claude 3 Opus**: Most intelligent, best for complex tasks
- **Claude 3 Sonnet**: Balance of intelligence and speed
- **Claude 3 Haiku**: Fastest, most cost-effective
- **Claude 3.5 Sonnet**: Latest, excellent at coding

**Strengths:**
- Very long context window (200K tokens)
- Strong coding abilities
- Thoughtful, nuanced responses
- Good at following complex instructions
- Document analysis

**Access:**
- claude.ai (free and Pro tiers)
- API access
- Amazon Bedrock
- Google Cloud Vertex

**Unique Features:**
- Artifacts: Create and render code/documents
- Projects: Organize conversations
- Constitutional AI training`,
    category: 'models',
    relatedTerms: ['anthropic', 'large-language-model', 'chatgpt'],
    examples: 'Using Claude to analyze a 100-page document in a single prompt.',
  },
  {
    slug: 'llama',
    term: 'Llama',
    shortDef: 'Meta\'s open-source large language model family, enabling community AI development.',
    fullDef: `Llama (Large Language Model Meta AI) is Meta's family of open-source language models.

**Versions:**
- **Llama 1** (2023): 7B to 65B parameters
- **Llama 2** (2023): Improved, commercially usable
- **Llama 3** (2024): State-of-the-art open model
  - 8B, 70B, 405B parameter versions
  - Competitive with GPT-4

**Why Llama Matters:**
- **Open Source**: Weights publicly available
- **Commercial Use**: Allowed with license
- **Community**: Huge ecosystem of fine-tunes
- **Local Running**: Run on your hardware

**Ecosystem:**
- Ollama: Easy local deployment
- Text-generation-webui
- LM Studio
- Thousands of fine-tuned variants

**Impact:**
- Democratized LLM access
- Enabled on-device AI
- Spawned many derivative models`,
    category: 'models',
    relatedTerms: ['meta', 'open-source', 'large-language-model'],
    examples: 'Running Llama 3 8B locally on a laptop for private AI interactions.',
  },
  {
    slug: 'mistral',
    term: 'Mistral',
    shortDef: 'French AI company creating efficient, high-quality open-source language models.',
    fullDef: `Mistral AI is a French startup creating efficient, open-source language models that punch above their weight.

**Key Models:**
- **Mistral 7B**: Outperforms Llama 2 13B
- **Mixtral 8x7B**: Mixture of Experts model
- **Mistral Large**: Competitive with GPT-4
- **Codestral**: Specialized for code

**Why Mistral Stands Out:**
- Excellent efficiency (small but powerful)
- Strong coding capabilities
- Open-weight models
- European AI company
- Mixture of Experts architecture

**Technical Innovations:**
- Sliding Window Attention
- Grouped Query Attention
- Sparse Mixture of Experts

**Funding:**
- $415M Series A (2023)
- Valued at $2B+
- Backed by Andreessen Horowitz`,
    category: 'companies',
    relatedTerms: ['llama', 'open-source', 'mixture-of-experts'],
    examples: 'Mistral 7B matching larger models while being fast enough to run locally.',
  },
  {
    slug: 'gemini',
    term: 'Gemini',
    shortDef: 'Google\'s most capable AI model family, natively multimodal from the ground up.',
    fullDef: `Gemini is Google DeepMind's most advanced AI model family, designed to be multimodal from the start.

**Model Tiers:**
- **Gemini Ultra**: Most capable, complex tasks
- **Gemini Pro**: Best for most tasks
- **Gemini Nano**: On-device, mobile
- **Gemini 1.5**: Massive context window (1M+ tokens)

**Key Features:**
- **Native Multimodal**: Understands text, images, audio, video
- **Massive Context**: Up to 2M tokens (Gemini 1.5)
- **Strong Reasoning**: Competitive with GPT-4
- **Code Generation**: Powers code assistance

**Access Points:**
- Google AI Studio
- Vertex AI
- Gemini app (formerly Bard)
- Android devices (Nano)

**Applications:**
- Search integration
- Workspace features
- Android AI features
- Developer API`,
    category: 'models',
    relatedTerms: ['google', 'multimodal', 'large-language-model'],
    examples: 'Gemini 1.5 Pro can analyze hour-long videos in a single prompt.',
  },
  {
    slug: 'hugging-face',
    term: 'Hugging Face',
    shortDef: 'Platform and community hub for sharing machine learning models, datasets, and applications.',
    fullDef: `Hugging Face is the central hub for the machine learning community, providing tools, models, and collaboration infrastructure.

**Key Offerings:**
- **Model Hub**: 500K+ pre-trained models
- **Datasets**: 100K+ datasets
- **Spaces**: Host ML demos
- **Transformers Library**: Python library for models
- **Inference API**: Deploy models easily

**Why Developers Love It:**
- One-line model loading
- Standardized interfaces
- Community contributions
- Free tier available
- Version control for models

**Popular Libraries:**
- transformers: Load any model
- datasets: Load any dataset
- diffusers: Image generation
- accelerate: Training optimization
- tokenizers: Fast tokenization

**Business Model:**
- Free open-source tools
- Enterprise hub
- Inference endpoints
- Expert support`,
    category: 'companies',
    relatedTerms: ['open-source', 'transformers', 'model-hub'],
    examples: 'Loading BERT with one line: model = AutoModel.from_pretrained("bert-base-uncased")',
  },
  {
    slug: 'benchmark',
    term: 'Benchmark',
    shortDef: 'Standardized tests used to measure and compare AI model performance.',
    fullDef: `Benchmarks are standardized evaluation datasets and metrics used to measure AI model capabilities.

**Popular LLM Benchmarks:**
- **MMLU**: Massive Multitask Language Understanding
- **HumanEval**: Code generation
- **HellaSwag**: Commonsense reasoning
- **TruthfulQA**: Truthfulness
- **GSM8K**: Grade school math
- **MATH**: Advanced mathematics

**Why Benchmarks Matter:**
- Compare models objectively
- Track progress over time
- Identify strengths/weaknesses
- Guide model selection

**Limitations:**
- Gaming/overfitting possible
- May not reflect real-world use
- Quickly become saturated
- Don't capture everything

**Leaderboards:**
- Open LLM Leaderboard (Hugging Face)
- Chatbot Arena (LMSYS)
- HELM (Stanford)`,
    category: 'concepts',
    relatedTerms: ['evaluation', 'mmlu', 'performance'],
    examples: 'GPT-4 scoring 86.4% on MMLU vs Claude 3 Opus at 86.8%.',
  },
  {
    slug: 'open-source-ai',
    term: 'Open Source AI',
    shortDef: 'AI models and tools with publicly available code, weights, and training details.',
    fullDef: `Open Source AI refers to AI models and systems where the code, model weights, and often training details are publicly available.

**Spectrum of Openness:**
- **Fully Open**: Code, weights, data, training (rare)
- **Open Weights**: Model weights available
- **Open Code**: Training code available
- **Open API**: Free API access only

**Benefits:**
- Transparency and auditability
- Community improvements
- Local/private deployment
- Lower costs
- Customization freedom

**Leading Open Models:**
- Llama 3 (Meta)
- Mistral/Mixtral
- Falcon (TII)
- Gemma (Google)
- Phi (Microsoft)

**Debates:**
- Safety concerns with open weights
- Compute barriers to true openness
- Licensing restrictions
- Definition of "open source" for AI`,
    category: 'concepts',
    relatedTerms: ['llama', 'mistral', 'hugging-face'],
    examples: 'Running Llama 3 on your own servers for complete data privacy.',
  },
  {
    slug: 'chatgpt',
    term: 'ChatGPT',
    shortDef: 'OpenAI\'s conversational AI interface, the most widely used AI chatbot globally.',
    fullDef: `ChatGPT is OpenAI's conversational AI product that brought large language models to mainstream users.

**History:**
- Nov 2022: Launched, fastest-growing app ever
- 100M users in 2 months
- Sparked global AI interest

**Versions:**
- **ChatGPT (Free)**: GPT-3.5, basic features
- **ChatGPT Plus ($20/mo)**: GPT-4, advanced features
- **ChatGPT Team**: For small teams
- **ChatGPT Enterprise**: For organizations

**Features:**
- Conversational interface
- Code interpreter (run Python)
- DALL-E integration
- Web browsing
- Custom GPTs
- Voice mode
- Vision (image input)

**Impact:**
- Made AI accessible to everyone
- Sparked AI arms race
- Changed how people work
- Raised AI awareness globally`,
    category: 'models',
    relatedTerms: ['openai', 'gpt', 'large-language-model'],
    examples: 'ChatGPT helping write emails, explain code, or brainstorm ideas.',
  },
  {
    slug: 'synthetic-data',
    term: 'Synthetic Data',
    shortDef: 'Artificially generated data used to train AI models when real data is scarce or sensitive.',
    fullDef: `Synthetic data is artificially generated data that mimics the statistical properties of real data.

**Why Use Synthetic Data:**
- **Privacy**: No real user data exposed
- **Scarcity**: Generate rare scenarios
- **Cost**: Cheaper than collecting real data
- **Control**: Create specific edge cases
- **Balance**: Fix class imbalances

**Generation Methods:**
- Rule-based generation
- Statistical models
- Generative AI (LLMs, GANs)
- Simulation environments

**Applications:**
- Training autonomous vehicles
- Healthcare AI (patient privacy)
- Financial fraud detection
- Robotics simulation
- LLM training data

**Challenges:**
- May not capture real-world complexity
- Can introduce biases
- Validation is difficult
- Domain gap issues`,
    category: 'techniques',
    relatedTerms: ['training', 'data-augmentation', 'privacy'],
    examples: 'Using GPT-4 to generate training conversations for a customer service bot.',
  },
  {
    slug: 'alignment',
    term: 'AI Alignment',
    shortDef: 'Ensuring AI systems behave in accordance with human values and intentions.',
    fullDef: `AI Alignment is the field focused on ensuring AI systems do what humans actually want them to do.

**Key Challenges:**
- **Specification**: Precisely defining goals
- **Robustness**: Maintaining alignment under distribution shift
- **Assurance**: Verifying alignment
- **Scalable Oversight**: Supervising superhuman AI

**Current Techniques:**
- RLHF (Reinforcement Learning from Human Feedback)
- Constitutional AI
- Red teaming
- Interpretability research

**Alignment Problems:**
- **Reward Hacking**: Gaming the objective
- **Goal Misgeneralization**: Wrong goals learned
- **Deceptive Alignment**: Appearing aligned but not
- **Mesa-Optimization**: Unintended inner goals

**Why It Matters:**
- Prevent harmful AI behavior
- Build trustworthy AI systems
- Ensure AI benefits humanity
- Critical for advanced AI safety`,
    category: 'concepts',
    relatedTerms: ['rlhf', 'ai-safety', 'constitutional-ai'],
    examples: 'Training ChatGPT to refuse harmful requests while remaining helpful.',
  },
  {
    slug: 'scaling-laws',
    term: 'Scaling Laws',
    shortDef: 'Empirical relationships showing how AI performance improves with more data, compute, and parameters.',
    fullDef: `Scaling laws describe predictable relationships between model size, training data, compute, and performance.

**Key Findings:**
- Performance improves predictably with scale
- Compute-optimal: Balance model size and data
- Power law relationships

**Chinchilla Scaling Laws:**
- Previous models were undertrained
- Optimal: Train longer on more data
- 20 tokens per parameter recommended

**Implications:**
- Larger models = better performance
- More data = better performance
- More compute = better performance
- Returns are predictable

**Emergent Abilities:**
- Some capabilities appear suddenly at scale
- Examples: arithmetic, multi-step reasoning
- Debated whether truly "emergent"

**Limitations:**
- Eventually hit diminishing returns
- Doesn't capture all capabilities
- May not hold for all tasks`,
    category: 'concepts',
    relatedTerms: ['parameters', 'training', 'compute'],
    examples: 'GPT-4 being better than GPT-3 primarily due to larger scale.',
  },
  // === ADDITIONAL TERMS TO REACH 100+ ===
  {
    slug: 'bert',
    term: 'BERT',
    shortDef: 'Bidirectional Encoder Representations from Transformers - Google\'s influential language model.',
    fullDef: `BERT is a transformer-based model from Google that revolutionized NLP by introducing bidirectional pre-training.

**Key Innovation:**
- Reads text bidirectionally (both left-to-right and right-to-left)
- Unlike GPT which only reads left-to-right
- Better understanding of context

**Training Objectives:**
- **Masked Language Modeling (MLM)**: Predict masked words
- **Next Sentence Prediction (NSP)**: Predict if sentences follow each other

**Impact:**
- Released 2018, transformed NLP
- Powers Google Search improvements
- Spawned many variants (RoBERTa, ALBERT, DistilBERT)

**Use Cases:**
- Text classification
- Named entity recognition
- Question answering
- Sentiment analysis`,
    category: 'models',
    relatedTerms: ['transformer', 'encoder', 'google'],
    examples: 'Google Search uses BERT to better understand search queries.',
  },
  {
    slug: 'gans',
    term: 'GANs (Generative Adversarial Networks)',
    shortDef: 'AI architecture using two competing networks to generate realistic content.',
    fullDef: `GANs consist of two neural networks competing against each other to generate increasingly realistic outputs.

**Architecture:**
- **Generator**: Creates fake samples
- **Discriminator**: Tries to distinguish real from fake
- They train together, improving each other

**How It Works:**
1. Generator creates fake image
2. Discriminator guesses if it's real or fake
3. Both networks update based on results
4. Generator gets better at fooling discriminator

**Applications:**
- Image generation (before diffusion dominated)
- Face generation (StyleGAN)
- Image-to-image translation
- Super resolution

**Limitations:**
- Training instability
- Mode collapse
- Now largely superseded by diffusion models`,
    category: 'techniques',
    relatedTerms: ['diffusion-model', 'image-generation', 'neural-network'],
    examples: 'StyleGAN generating photorealistic faces of people who don\'t exist.',
  },
  {
    slug: 'reinforcement-learning',
    term: 'Reinforcement Learning (RL)',
    shortDef: 'Training AI through trial and error with rewards and penalties.',
    fullDef: `Reinforcement Learning trains agents to make decisions by rewarding desired behaviors and penalizing undesired ones.

**Key Components:**
- **Agent**: The learner/decision maker
- **Environment**: What the agent interacts with
- **State**: Current situation
- **Action**: What the agent can do
- **Reward**: Feedback signal

**How It Differs:**
- Supervised Learning: Learn from labeled examples
- Unsupervised Learning: Find patterns in data
- Reinforcement Learning: Learn from experience

**Famous Examples:**
- AlphaGo: Beat world Go champion
- OpenAI Five: Beat Dota 2 pros
- Robot locomotion

**In LLMs:**
- RLHF uses RL to align models with human preferences`,
    category: 'techniques',
    relatedTerms: ['rlhf', 'training', 'agent'],
    examples: 'Training a robot to walk by rewarding forward movement.',
  },
  {
    slug: 'transfer-learning',
    term: 'Transfer Learning',
    shortDef: 'Using knowledge learned on one task to improve performance on a different task.',
    fullDef: `Transfer learning applies knowledge from a pre-trained model to a new, related task.

**Why It Works:**
- Models learn general features first
- These features transfer to related tasks
- Reduces need for task-specific data

**Process:**
1. Pre-train on large dataset (e.g., ImageNet, internet text)
2. Fine-tune on smaller, specific dataset
3. Achieve better results than training from scratch

**Benefits:**
- Less training data needed
- Faster training
- Better performance
- Lower compute costs

**Examples:**
- ImageNet pre-trained models for medical imaging
- GPT pre-training enabling diverse tasks
- BERT fine-tuned for sentiment analysis`,
    category: 'techniques',
    relatedTerms: ['fine-tuning', 'pre-training', 'zero-shot'],
    examples: 'Using a model trained on general images to classify specific medical scans.',
  },
  {
    slug: 'overfitting',
    term: 'Overfitting',
    shortDef: 'When a model learns training data too well and fails to generalize to new data.',
    fullDef: `Overfitting occurs when a model memorizes training data instead of learning general patterns.

**Signs of Overfitting:**
- High accuracy on training data
- Poor accuracy on test/validation data
- Model is too complex for the data

**Causes:**
- Too many parameters
- Too little training data
- Training too long
- Model too complex

**Prevention Techniques:**
- **Regularization**: L1, L2 penalties
- **Dropout**: Randomly disable neurons
- **Early Stopping**: Stop before overfitting
- **Data Augmentation**: Create more training data
- **Cross-Validation**: Test on multiple splits

**Opposite Problem:**
- Underfitting: Model too simple to learn patterns`,
    category: 'concepts',
    relatedTerms: ['training', 'regularization', 'generalization'],
    examples: 'A model that perfectly predicts training examples but fails on new data.',
  },
  {
    slug: 'backpropagation',
    term: 'Backpropagation',
    shortDef: 'Algorithm for training neural networks by propagating errors backward through layers.',
    fullDef: `Backpropagation is the fundamental algorithm for training neural networks by computing how each weight contributes to the error.

**Process:**
1. **Forward Pass**: Input flows through network, produces output
2. **Loss Calculation**: Compare output to expected result
3. **Backward Pass**: Calculate gradient of loss for each weight
4. **Update**: Adjust weights to reduce loss

**Key Concepts:**
- **Chain Rule**: Calculates gradients layer by layer
- **Gradient Descent**: Uses gradients to update weights
- **Learning Rate**: Controls size of weight updates

**Why It Works:**
- Efficiently computes gradients for all weights
- Enables training of deep networks
- Foundation of modern deep learning

**Challenges:**
- Vanishing gradients in deep networks
- Exploding gradients
- Local minima`,
    category: 'techniques',
    relatedTerms: ['training', 'neural-network', 'gradient-descent'],
    examples: 'Every neural network training uses backpropagation to learn.',
  },
  {
    slug: 'activation-function',
    term: 'Activation Function',
    shortDef: 'Mathematical functions that determine if a neuron should fire based on input.',
    fullDef: `Activation functions introduce non-linearity into neural networks, enabling them to learn complex patterns.

**Common Activation Functions:**
- **ReLU**: max(0, x) - Most popular, simple
- **Sigmoid**: 1/(1+e^-x) - Output 0-1
- **Tanh**: Hyperbolic tangent - Output -1 to 1
- **Softmax**: For multi-class classification
- **GELU**: Used in transformers

**Why Non-Linearity Matters:**
- Without it, deep networks = one linear layer
- Enables learning complex patterns
- Different functions for different use cases

**Choosing Activation:**
- Hidden layers: Usually ReLU or GELU
- Output (classification): Softmax
- Output (binary): Sigmoid
- Output (regression): None (linear)`,
    category: 'concepts',
    relatedTerms: ['neural-network', 'relu', 'deep-learning'],
    examples: 'ReLU turning negative values to zero while keeping positive values.',
  },
  {
    slug: 'loss-function',
    term: 'Loss Function',
    shortDef: 'Mathematical function measuring how wrong a model\'s predictions are.',
    fullDef: `Loss functions quantify the difference between predicted and actual values, guiding model training.

**Common Loss Functions:**
- **MSE (Mean Squared Error)**: For regression
- **Cross-Entropy**: For classification
- **Binary Cross-Entropy**: For binary classification
- **Huber Loss**: Robust to outliers

**Properties of Good Loss Functions:**
- Differentiable (for gradient descent)
- Minimum at correct prediction
- Appropriate for the task

**In LLM Training:**
- Cross-entropy loss on next token prediction
- Minimizing perplexity
- RLHF reward modeling

**Relationship to Metrics:**
- Loss: Used during training
- Metrics (accuracy, F1): Used for evaluation`,
    category: 'concepts',
    relatedTerms: ['training', 'backpropagation', 'optimization'],
    examples: 'Cross-entropy loss measuring how far probability predictions are from true labels.',
  },
  {
    slug: 'gradient-descent',
    term: 'Gradient Descent',
    shortDef: 'Optimization algorithm that iteratively adjusts parameters to minimize loss.',
    fullDef: `Gradient descent is the core optimization algorithm for training machine learning models.

**How It Works:**
1. Calculate loss for current parameters
2. Compute gradient (direction of steepest increase)
3. Move parameters in opposite direction
4. Repeat until convergence

**Variants:**
- **Batch GD**: Use all data each step
- **Stochastic GD (SGD)**: Use one sample
- **Mini-batch GD**: Use small batches (most common)

**Advanced Optimizers:**
- **Adam**: Adaptive learning rates, momentum
- **AdamW**: Adam with weight decay
- **SGD with Momentum**: Accelerates convergence

**Challenges:**
- Learning rate selection
- Local minima
- Saddle points
- Slow convergence`,
    category: 'techniques',
    relatedTerms: ['backpropagation', 'training', 'optimizer'],
    examples: 'Adam optimizer adjusting millions of parameters to minimize prediction error.',
  },
  {
    slug: 'batch-size',
    term: 'Batch Size',
    shortDef: 'Number of training examples processed together before updating model weights.',
    fullDef: `Batch size determines how many samples are processed before each parameter update during training.

**Trade-offs:**
- **Large Batch**: Stable gradients, faster (parallel), more memory
- **Small Batch**: Noisy gradients, regularization effect, less memory

**Common Sizes:**
- 16, 32, 64, 128, 256 typical
- LLM training: Often 1000s (accumulated)
- Limited by GPU memory

**Gradient Accumulation:**
- Simulate larger batches with limited memory
- Accumulate gradients over multiple forward passes
- Update weights after N steps

**Impact on Training:**
- Affects learning dynamics
- May need to adjust learning rate
- Larger batches often need higher learning rate`,
    category: 'concepts',
    relatedTerms: ['training', 'gradient-descent', 'epoch'],
    examples: 'Training with batch size 32 means processing 32 images before updating weights.',
  },
  {
    slug: 'epoch',
    term: 'Epoch',
    shortDef: 'One complete pass through the entire training dataset.',
    fullDef: `An epoch represents one full cycle through all training data during model training.

**Training Process:**
- Multiple epochs typically needed
- Each epoch: Model sees all examples once
- Parameters updated many times per epoch

**How Many Epochs?**
- Depends on dataset size and complexity
- Too few: Underfitting
- Too many: Overfitting
- Use validation loss to decide

**Typical Ranges:**
- Image classification: 50-200 epochs
- LLM pre-training: 1-2 epochs (data is huge)
- Fine-tuning: 3-10 epochs

**Early Stopping:**
- Monitor validation loss
- Stop when it starts increasing
- Prevents overfitting`,
    category: 'concepts',
    relatedTerms: ['training', 'batch-size', 'overfitting'],
    examples: 'Training for 100 epochs means the model sees each training image 100 times.',
  },
  {
    slug: 'learning-rate',
    term: 'Learning Rate',
    shortDef: 'Hyperparameter controlling how much model weights change with each update.',
    fullDef: `Learning rate determines the step size when updating model parameters during training.

**Impact:**
- **Too High**: Overshoots optimal values, unstable
- **Too Low**: Very slow convergence
- **Just Right**: Smooth, efficient training

**Typical Values:**
- 1e-3 to 1e-5 common
- Transformers often use 1e-4 to 1e-5
- Fine-tuning uses smaller rates

**Scheduling:**
- **Constant**: Same throughout
- **Step Decay**: Reduce at intervals
- **Cosine Annealing**: Smooth decrease
- **Warmup**: Start low, increase, then decrease

**Finding Good Rate:**
- Learning rate finder
- Grid search
- Start with common defaults`,
    category: 'concepts',
    relatedTerms: ['training', 'gradient-descent', 'optimizer'],
    examples: 'Using learning rate 0.001 with cosine decay schedule for training.',
  },
  {
    slug: 'dropout',
    term: 'Dropout',
    shortDef: 'Regularization technique that randomly disables neurons during training.',
    fullDef: `Dropout prevents overfitting by randomly setting neuron outputs to zero during training.

**How It Works:**
- During training: Randomly zero out neurons (e.g., 20%)
- During inference: Use all neurons, scale outputs
- Forces network to not rely on specific neurons

**Benefits:**
- Reduces overfitting
- Acts like training ensemble of networks
- Simple to implement

**Typical Dropout Rates:**
- 0.1-0.5 depending on layer
- Higher for fully connected layers
- Lower for convolutional layers

**In Transformers:**
- Applied after attention
- Applied in feed-forward layers
- Typically 0.1 dropout rate`,
    category: 'techniques',
    relatedTerms: ['regularization', 'overfitting', 'training'],
    examples: 'Using 0.2 dropout to randomly disable 20% of neurons during each training step.',
  },
  {
    slug: 'normalization',
    term: 'Normalization',
    shortDef: 'Techniques to standardize inputs or activations for more stable training.',
    fullDef: `Normalization techniques standardize data or layer outputs to improve training stability and speed.

**Types:**
- **Batch Normalization**: Normalize across batch
- **Layer Normalization**: Normalize across features (used in transformers)
- **Instance Normalization**: Per-sample normalization
- **Group Normalization**: Normalize groups of channels

**Benefits:**
- Faster training convergence
- Allows higher learning rates
- Reduces internal covariate shift
- Acts as regularization

**In Transformers:**
- Layer normalization is standard
- Pre-norm vs post-norm architectures
- RMSNorm (simplified) gaining popularity

**Data Normalization:**
- Scale inputs to similar ranges
- Zero mean, unit variance common`,
    category: 'techniques',
    relatedTerms: ['training', 'transformer', 'batch-size'],
    examples: 'Layer normalization after each transformer attention block.',
  },
  {
    slug: 'tokenizer',
    term: 'Tokenizer',
    shortDef: 'Component that converts text into tokens that language models can process.',
    fullDef: `Tokenizers break text into smaller units (tokens) that language models can understand and process.

**Tokenization Methods:**
- **Word-level**: Each word is a token
- **Character-level**: Each character is a token
- **Subword**: Balance between word and character (most common)

**Popular Subword Methods:**
- **BPE (Byte Pair Encoding)**: Used by GPT
- **WordPiece**: Used by BERT
- **SentencePiece**: Language-agnostic
- **Unigram**: Probabilistic approach

**Vocabulary Size:**
- GPT-4: ~100K tokens
- Llama: 32K tokens
- Trade-off: Larger vocab = shorter sequences but more parameters

**Special Tokens:**
- [CLS], [SEP]: BERT special tokens
- <|endoftext|>: GPT end token
- [PAD]: Padding token`,
    category: 'concepts',
    relatedTerms: ['token', 'large-language-model', 'vocabulary'],
    examples: 'BPE tokenizer splitting "unhappiness" into ["un", "happiness"].',
  },
  {
    slug: 'perplexity',
    term: 'Perplexity',
    shortDef: 'Metric measuring how well a language model predicts text - lower is better.',
    fullDef: `Perplexity measures how "surprised" a language model is by text, indicating prediction quality.

**Intuition:**
- Lower perplexity = better predictions
- Perplexity of 10 = model as confused as choosing from 10 options
- Good models have low perplexity on test data

**Calculation:**
- Exponential of cross-entropy loss
- Geometric mean of inverse probabilities
- PPL = exp(loss)

**Typical Values:**
- State-of-the-art LLMs: 3-10 on standard benchmarks
- Random guessing: Vocabulary size
- Perfect prediction: 1

**Limitations:**
- Doesn't measure coherence
- Doesn't measure factuality
- Dataset-dependent
- Not comparable across different tokenizers`,
    category: 'concepts',
    relatedTerms: ['loss-function', 'evaluation', 'large-language-model'],
    examples: 'GPT-4 achieving perplexity of 8.5 on WikiText-103 benchmark.',
  },
  {
    slug: 'positional-encoding',
    term: 'Positional Encoding',
    shortDef: 'Technique to give transformers information about token positions in a sequence.',
    fullDef: `Positional encoding adds position information to transformers, which otherwise have no notion of order.

**Why Needed:**
- Attention treats all positions equally
- "The cat sat on mat" vs "Mat on sat cat the"
- Position information is crucial for understanding

**Types:**
- **Sinusoidal**: Original transformer, fixed patterns
- **Learned**: Train position embeddings
- **Relative**: Encode relative distances (T5, Transformer-XL)
- **RoPE**: Rotary Position Embedding (Llama)
- **ALiBi**: Attention with Linear Biases

**RoPE (Popular in Modern LLMs):**
- Encodes position in attention computation
- Better extrapolation to longer sequences
- Used in Llama, Mistral, many others

**Context Length:**
- Position encoding limits context length
- Some methods extrapolate better than others`,
    category: 'techniques',
    relatedTerms: ['transformer', 'attention', 'context-window'],
    examples: 'RoPE allowing Llama to handle sequences longer than seen during training.',
  },
  {
    slug: 'mixture-of-experts',
    term: 'Mixture of Experts (MoE)',
    shortDef: 'Architecture using multiple specialized networks and routing inputs to relevant experts.',
    fullDef: `Mixture of Experts uses multiple "expert" networks and a router to select which experts process each input.

**Architecture:**
- Multiple expert networks (e.g., 8, 16, or more)
- Router network decides which experts to use
- Only activate subset of experts per input

**Benefits:**
- Scale parameters without scaling compute
- Mixtral 8x7B: 47B params, ~13B active per token
- More efficient than dense models

**Key Components:**
- **Experts**: Specialized feed-forward networks
- **Router**: Decides expert assignment
- **Top-k Selection**: Use k experts per token (often k=2)

**Challenges:**
- Load balancing across experts
- Communication overhead
- Training stability

**Examples:**
- Mixtral 8x7B, 8x22B
- GPT-4 rumored to use MoE
- Switch Transformer`,
    category: 'techniques',
    relatedTerms: ['mistral', 'transformer', 'scaling-laws'],
    examples: 'Mixtral activating only 2 of 8 experts per token for efficiency.',
  },
  {
    slug: 'knowledge-distillation',
    term: 'Knowledge Distillation',
    shortDef: 'Training smaller models to mimic larger models\' behavior.',
    fullDef: `Knowledge distillation transfers knowledge from a large "teacher" model to a smaller "student" model.

**Process:**
1. Train large teacher model
2. Teacher generates soft predictions
3. Student learns to match teacher outputs
4. Student becomes smaller approximation

**Why It Works:**
- Soft labels contain more information than hard labels
- Teacher's uncertainty is informative
- Dark knowledge transfer

**Types:**
- **Response Distillation**: Match output probabilities
- **Feature Distillation**: Match intermediate representations
- **Relation Distillation**: Match relationships between examples

**Applications:**
- Deploy smaller models on edge devices
- Reduce inference costs
- Model compression

**Examples:**
- DistilBERT: 60% smaller, 97% performance
- Many LLM distillations available`,
    category: 'techniques',
    relatedTerms: ['fine-tuning', 'quantization', 'deployment'],
    examples: 'DistilBERT learning from BERT to be 40% smaller while keeping most capability.',
  },
  {
    slug: 'vision-transformer',
    term: 'Vision Transformer (ViT)',
    shortDef: 'Applying transformer architecture to image recognition by treating image patches as tokens.',
    fullDef: `Vision Transformers apply the transformer architecture to images by treating image patches as sequences.

**How It Works:**
1. Split image into patches (e.g., 16x16)
2. Flatten patches to vectors
3. Add position embeddings
4. Process through transformer encoder
5. Use [CLS] token for classification

**Benefits:**
- Scales better than CNNs at large scale
- Better global understanding
- Transfer learning works well

**Variants:**
- **DeiT**: Data-efficient training
- **Swin Transformer**: Hierarchical windows
- **BEiT**: BERT-style pre-training for vision

**Impact:**
- Changed computer vision landscape
- Foundation for multimodal models
- CLIP combines ViT with text encoder`,
    category: 'models',
    relatedTerms: ['transformer', 'computer-vision', 'clip'],
    examples: 'ViT-Large achieving state-of-the-art on ImageNet classification.',
  },
  {
    slug: 'clip',
    term: 'CLIP',
    shortDef: 'OpenAI model connecting images and text in shared embedding space.',
    fullDef: `CLIP (Contrastive Language-Image Pre-training) learns to connect images and text through contrastive learning.

**Training:**
- Learn from image-text pairs from internet
- No manual labeling needed
- 400M image-text pairs

**How It Works:**
- Image encoder (ViT or ResNet)
- Text encoder (Transformer)
- Train to maximize similarity of matching pairs
- Minimize similarity of non-matching pairs

**Capabilities:**
- Zero-shot image classification
- Image-text similarity
- Powers DALL-E and Stable Diffusion
- Image search with natural language

**Impact:**
- Foundation for text-to-image models
- Enabled zero-shot visual recognition
- Key component in multimodal AI`,
    category: 'models',
    relatedTerms: ['vision-transformer', 'embeddings', 'stable-diffusion'],
    examples: 'Using CLIP to find images matching the description "a cat wearing a hat".',
  },
  {
    slug: 'whisper',
    term: 'Whisper',
    shortDef: 'OpenAI\'s speech recognition model trained on 680,000 hours of audio.',
    fullDef: `Whisper is OpenAI's automatic speech recognition (ASR) model trained on massive multilingual data.

**Capabilities:**
- Speech-to-text transcription
- Translation to English
- Language detection
- Timestamp generation

**Model Sizes:**
- Tiny: 39M parameters
- Base: 74M
- Small: 244M
- Medium: 769M
- Large: 1.55B

**Training Data:**
- 680,000 hours of audio
- Multilingual (99 languages)
- Diverse: YouTube, podcasts, audiobooks

**Features:**
- Robust to noise, accents
- Handles multiple languages
- Open source and free
- Local deployment possible`,
    category: 'models',
    relatedTerms: ['openai', 'speech-recognition', 'multimodal'],
    examples: 'Using Whisper to transcribe podcasts with speaker timestamps.',
  },
  {
    slug: 'dall-e',
    term: 'DALL-E',
    shortDef: 'OpenAI\'s text-to-image model that generates images from text descriptions.',
    fullDef: `DALL-E is OpenAI's image generation model that creates images from natural language descriptions.

**Versions:**
- **DALL-E** (2021): Discrete VAE approach
- **DALL-E 2** (2022): CLIP + diffusion
- **DALL-E 3** (2023): Better prompt understanding, integrated with ChatGPT

**DALL-E 3 Features:**
- Much better prompt following
- Integrated into ChatGPT
- Can generate text in images
- Safety mitigations built-in

**Access:**
- ChatGPT Plus/Enterprise
- API access
- Bing Image Creator (free)

**Limitations:**
- Usage limits
- Content policy restrictions
- No real people without consent
- Copyright considerations`,
    category: 'models',
    relatedTerms: ['openai', 'diffusion-model', 'image-generation'],
    examples: 'DALL-E 3 creating a "watercolor painting of a robot reading a book in a library".',
  },
  {
    slug: 'midjourney',
    term: 'Midjourney',
    shortDef: 'Popular AI art generator known for aesthetic, stylized image generation.',
    fullDef: `Midjourney is an AI image generation service known for producing highly aesthetic, artistic images.

**Access:**
- Discord bot interface
- Web interface (newer)
- Subscription required

**Versions:**
- V1-V4: Progressive improvements
- V5: Photorealism breakthrough
- V6: Better prompt understanding, text rendering

**Strengths:**
- Aesthetic quality
- Artistic styles
- Community and sharing
- Fast generation

**Pricing:**
- Basic: $10/month
- Standard: $30/month
- Pro: $60/month
- Mega: $120/month

**Comparison:**
- More artistic than DALL-E
- Less precise than Stable Diffusion
- Best for creative/artistic work`,
    category: 'models',
    relatedTerms: ['diffusion-model', 'stable-diffusion', 'image-generation'],
    examples: 'Creating fantasy art with Midjourney\'s signature aesthetic style.',
  },
  {
    slug: 'copilot',
    term: 'GitHub Copilot',
    shortDef: 'AI coding assistant that suggests code in real-time as you type.',
    fullDef: `GitHub Copilot is an AI pair programmer that suggests code completions based on context.

**How It Works:**
- Trained on public code repositories
- Understands context from file and comments
- Suggests entire functions or lines
- Multiple suggestions to choose from

**Features:**
- Code completion
- Function generation
- Test generation
- Documentation generation
- Multi-language support

**Versions:**
- **Copilot**: Code suggestions
- **Copilot Chat**: Conversational coding help
- **Copilot Enterprise**: Custom models on your code

**Powered By:**
- OpenAI Codex (earlier)
- GPT-4 (Copilot Chat)

**Pricing:**
- Individual: $10/month
- Business: $19/user/month
- Enterprise: $39/user/month`,
    category: 'models',
    relatedTerms: ['openai', 'code-generation', 'llm'],
    examples: 'Copilot completing a function after you write the docstring.',
  },
  {
    slug: 'langchain',
    term: 'LangChain',
    shortDef: 'Popular framework for building applications with large language models.',
    fullDef: `LangChain is a framework for developing applications powered by language models.

**Core Concepts:**
- **Chains**: Sequences of LLM calls
- **Agents**: LLMs that decide actions
- **Memory**: Persist state across interactions
- **Retrievers**: Get relevant documents

**Key Components:**
- Document loaders
- Text splitters
- Vector stores
- Prompt templates
- Output parsers

**Use Cases:**
- RAG applications
- Chatbots with memory
- Autonomous agents
- Document Q&A
- Data extraction

**Ecosystem:**
- LangSmith: Monitoring and debugging
- LangServe: Deploy chains as APIs
- LangGraph: Complex agent workflows

**Alternatives:**
- LlamaIndex (data-focused)
- Semantic Kernel (Microsoft)
- Haystack`,
    category: 'concepts',
    relatedTerms: ['rag', 'agent', 'vector-database'],
    examples: 'Building a chatbot that answers questions about your documents using LangChain.',
  },
  {
    slug: 'llamaindex',
    term: 'LlamaIndex',
    shortDef: 'Framework for connecting LLMs with external data sources.',
    fullDef: `LlamaIndex (formerly GPT Index) is a data framework for LLM applications, focused on ingestion and retrieval.

**Focus Areas:**
- Data ingestion from many sources
- Indexing strategies
- Query engines
- Retrieval optimization

**Data Connectors:**
- Documents (PDF, Word, etc.)
- Databases
- APIs
- Web pages
- Many more via LlamaHub

**Index Types:**
- Vector index
- Tree index
- Keyword index
- Knowledge graph

**Vs LangChain:**
- LlamaIndex: Data-centric
- LangChain: Orchestration-centric
- Often used together

**Use Cases:**
- Document Q&A
- Structured data querying
- Multi-document synthesis`,
    category: 'concepts',
    relatedTerms: ['rag', 'langchain', 'vector-database'],
    examples: 'Using LlamaIndex to build a Q&A system over company documents.',
  },
  {
    slug: 'ollama',
    term: 'Ollama',
    shortDef: 'Tool for easily running large language models locally on your computer.',
    fullDef: `Ollama makes it easy to run open-source LLMs locally with a simple command-line interface.

**Key Features:**
- One-command model download
- Local inference
- API compatible with OpenAI
- Model customization

**Supported Models:**
- Llama 3
- Mistral/Mixtral
- Phi
- Gemma
- Many community models

**Simple Usage:**
- ollama run llama3
- ollama pull mistral
- ollama list

**Benefits:**
- Privacy (data stays local)
- No API costs
- Offline capable
- Easy model switching

**Requirements:**
- macOS, Linux, Windows
- Decent CPU or GPU
- RAM depends on model size`,
    category: 'concepts',
    relatedTerms: ['llama', 'local-llm', 'open-source-ai'],
    examples: 'Running "ollama run llama3" to chat with Llama 3 locally.',
  },
  {
    slug: 'nvidia',
    term: 'NVIDIA',
    shortDef: 'Leading GPU manufacturer whose hardware powers most AI training and inference.',
    fullDef: `NVIDIA dominates AI hardware with GPUs essential for training and running modern AI models.

**Key AI Products:**
- **H100**: Current flagship for AI training
- **A100**: Previous generation workhorse
- **RTX 4090**: Consumer GPU for local AI
- **Grace Hopper**: CPU+GPU superchip

**Software Stack:**
- **CUDA**: GPU programming platform
- **cuDNN**: Deep learning primitives
- **TensorRT**: Inference optimization
- **Triton**: Inference server

**Why NVIDIA Dominates:**
- CUDA ecosystem (15+ years)
- Hardware optimization for AI
- Software support
- First-mover advantage

**Market Position:**
- ~80% of AI training market
- Multi-trillion dollar company
- AI infrastructure backbone

**Competitors:**
- AMD (MI300X)
- Intel (Gaudi)
- Google (TPU)
- Custom chips (Groq, Cerebras)`,
    category: 'companies',
    relatedTerms: ['gpu', 'training', 'hardware'],
    examples: 'Training GPT-4 required thousands of NVIDIA A100 GPUs.',
  },
  {
    slug: 'gpu',
    term: 'GPU (Graphics Processing Unit)',
    shortDef: 'Specialized processor essential for training and running AI models efficiently.',
    fullDef: `GPUs are processors originally designed for graphics but now essential for AI due to their parallel processing capabilities.

**Why GPUs for AI:**
- Thousands of cores for parallel processing
- Matrix operations are parallelizable
- Much faster than CPUs for AI workloads
- High memory bandwidth

**AI-Specific GPUs:**
- Tensor Cores: Specialized matrix units
- High-bandwidth memory (HBM)
- Large VRAM capacity
- NVLink for multi-GPU

**VRAM (Memory) Matters:**
- Limits model size you can run
- 8GB: Small models
- 24GB: Medium models
- 80GB+: Large models, training

**Cloud GPU Options:**
- AWS (p4d, p5 instances)
- Google Cloud (A100, H100)
- Azure (NC, ND series)
- Lambda Labs, CoreWeave, etc.`,
    category: 'concepts',
    relatedTerms: ['nvidia', 'training', 'inference'],
    examples: 'Running Llama 3 8B requires ~16GB VRAM, fitting on RTX 4090.',
  },
  {
    slug: 'tpu',
    term: 'TPU (Tensor Processing Unit)',
    shortDef: 'Google\'s custom AI chip designed specifically for machine learning workloads.',
    fullDef: `TPUs are Google's custom-designed chips optimized specifically for machine learning.

**Versions:**
- TPU v1: Inference only
- TPU v2/v3: Training capable
- TPU v4: Current generation
- TPU v5: Latest, most powerful

**Architecture:**
- Systolic array for matrix multiplication
- High-bandwidth memory
- Designed for TensorFlow/JAX
- Connected in pods for scale

**Advantages:**
- Optimized for ML workloads
- Cost-effective at scale
- High throughput
- Used for Google's own training

**Access:**
- Google Cloud (TPU VMs)
- Colab (free TPU access)
- Google Research programs

**Vs GPUs:**
- TPUs: Better for large-scale training
- GPUs: More flexible, wider ecosystem`,
    category: 'concepts',
    relatedTerms: ['google', 'gpu', 'training'],
    examples: 'Google trained PaLM and Gemini on TPU v4 pods.',
  },
  {
    slug: 'semantic-search',
    term: 'Semantic Search',
    shortDef: 'Search that understands meaning and intent, not just keyword matching.',
    fullDef: `Semantic search finds results based on meaning and context rather than exact keyword matches.

**How It Works:**
1. Convert query to embedding (vector)
2. Compare to document embeddings
3. Return semantically similar results
4. Rank by relevance

**Vs Keyword Search:**
- Keyword: "car" won't match "automobile"
- Semantic: Understands synonyms, concepts
- Keyword: Exact matching
- Semantic: Meaning matching

**Enabling Technologies:**
- Embedding models
- Vector databases
- Approximate nearest neighbor
- Hybrid search (semantic + keyword)

**Applications:**
- Enterprise search
- E-commerce product search
- Document retrieval for RAG
- Customer support`,
    category: 'concepts',
    relatedTerms: ['embeddings', 'vector-database', 'rag'],
    examples: 'Searching "how to fix slow computer" and finding "PC performance optimization".',
  },
  {
    slug: 'text-to-speech',
    term: 'Text-to-Speech (TTS)',
    shortDef: 'AI technology that converts written text into natural-sounding spoken audio.',
    fullDef: `Text-to-speech systems convert text into human-like speech using AI.

**Modern TTS Features:**
- Natural prosody and intonation
- Multiple voices and languages
- Emotional expression
- Voice cloning capability

**Leading TTS Systems:**
- **ElevenLabs**: High-quality, voice cloning
- **OpenAI TTS**: Simple API
- **Google Cloud TTS**: Many languages
- **Amazon Polly**: AWS integration
- **Coqui**: Open source

**Use Cases:**
- Audiobook generation
- Video narration
- Accessibility
- Virtual assistants
- Content creation

**Voice Cloning:**
- Clone voice from samples
- Ethical considerations
- Requires consent for real people`,
    category: 'concepts',
    relatedTerms: ['speech-recognition', 'multimodal', 'whisper'],
    examples: 'ElevenLabs generating podcast narration from a script.',
  },
  {
    slug: 'constitutional-ai',
    term: 'Constitutional AI',
    shortDef: 'Anthropic\'s training approach using principles to guide AI behavior without human labeling.',
    fullDef: `Constitutional AI (CAI) is Anthropic's method for training AI systems to be helpful, harmless, and honest.

**How It Works:**
1. Start with helpful but potentially harmful model
2. Model critiques its own outputs
3. Uses written principles (constitution) as guide
4. Revises responses to be safer
5. Train on self-revised responses

**Key Innovation:**
- Less reliance on human labeling
- Scalable safety training
- Explicit principles instead of implicit preferences

**The Constitution:**
- Set of principles model follows
- Examples: "Be helpful but don't cause harm"
- Can be customized for different use cases

**Benefits:**
- More transparent than pure RLHF
- Reduces human labeling costs
- Consistent application of rules

**Used By:**
- Claude (Anthropic's model)
- Basis for Claude's behavior`,
    category: 'techniques',
    relatedTerms: ['anthropic', 'rlhf', 'alignment'],
    examples: 'Claude refusing harmful requests based on constitutional principles.',
  },
  {
    slug: 'sora',
    term: 'Sora',
    shortDef: 'OpenAI\'s text-to-video model that generates realistic videos from text prompts.',
    fullDef: `Sora is OpenAI's video generation model that creates realistic videos from text descriptions.

**Capabilities:**
- Generate up to 60-second videos
- Understand complex scenes and physics
- Multiple camera angles and movements
- High visual quality

**Technical Approach:**
- Diffusion transformer architecture
- Trained on videos and images
- Understands 3D consistency
- Temporal coherence

**Demonstrated Features:**
- Complex scenes with multiple subjects
- Realistic motion and physics
- Style and aesthetic control
- Camera movements

**Current Status:**
- Limited access (red teamers, artists)
- Not publicly available (as of training cutoff)
- Safety evaluations ongoing

**Implications:**
- Film and content creation
- Advertising
- Education
- Creative tools`,
    category: 'models',
    relatedTerms: ['openai', 'diffusion-model', 'video-generation'],
    examples: 'Sora generating a video of "a cat walking on a busy city street in Tokyo".',
  },
  {
    slug: 'groq',
    term: 'Groq',
    shortDef: 'AI chip company known for extremely fast LLM inference using custom hardware.',
    fullDef: `Groq develops custom AI chips (LPUs) optimized for fast inference, particularly for LLMs.

**LPU (Language Processing Unit):**
- Deterministic, predictable performance
- No batching needed
- Extremely low latency
- High throughput

**Speed Claims:**
- 10x+ faster than GPU inference
- Hundreds of tokens per second
- Sub-100ms time to first token
- Consistent latency

**GroqCloud:**
- API access to fast inference
- Supports Llama, Mixtral, etc.
- Competitive pricing
- Free tier available

**Use Cases:**
- Real-time applications
- Conversational AI
- High-throughput batch processing
- Latency-sensitive workloads

**Trade-offs:**
- Less flexible than GPUs
- Specific to inference (not training)
- Limited availability`,
    category: 'companies',
    relatedTerms: ['inference', 'hardware', 'llama'],
    examples: 'Groq serving Llama 3 at 500+ tokens per second.',
  },
  {
    slug: 'agi',
    term: 'AGI (Artificial General Intelligence)',
    shortDef: 'Hypothetical AI with human-level intelligence across all cognitive tasks.',
    fullDef: `AGI refers to AI systems that match or exceed human intelligence across all cognitive domains.

**Current AI vs AGI:**
- Current AI: Narrow, task-specific
- AGI: General-purpose, human-like reasoning
- Current AI: Pattern matching
- AGI: True understanding (debated)

**Characteristics of AGI:**
- Transfer learning across all domains
- Common sense reasoning
- Self-improvement capability
- General problem solving

**Timeline Predictions:**
- Vary wildly: 5 years to never
- OpenAI: Working toward AGI
- Some researchers: Already close
- Others: Decades away or impossible

**Concerns:**
- Safety and control
- Economic disruption
- Existential risk debates
- Alignment challenges

**Related Concepts:**
- ASI: Artificial Superintelligence
- Narrow AI: Current systems
- Transformative AI: Significant impact`,
    category: 'concepts',
    relatedTerms: ['alignment', 'ai-safety', 'scaling-laws'],
    examples: 'Debates about whether GPT-4 shows "sparks of AGI" or is just sophisticated pattern matching.',
  },
  {
    slug: 'red-teaming',
    term: 'Red Teaming',
    shortDef: 'Testing AI systems by deliberately trying to make them fail or produce harmful outputs.',
    fullDef: `Red teaming involves adversarial testing to find vulnerabilities and failure modes in AI systems.

**Goals:**
- Find ways to bypass safety measures
- Discover harmful outputs
- Test edge cases
- Improve robustness

**Techniques:**
- Jailbreak attempts
- Prompt injection
- Adversarial inputs
- Edge case exploration
- Social engineering

**Who Does Red Teaming:**
- Internal safety teams
- External researchers
- Bug bounty participants
- AI safety organizations

**Findings Help:**
- Improve training data
- Refine safety filters
- Update policies
- Fix vulnerabilities

**Challenges:**
- Can't test everything
- Adversaries adapt
- Novel attacks emerge
- Balance with capabilities`,
    category: 'concepts',
    relatedTerms: ['ai-safety', 'alignment', 'jailbreak'],
    examples: 'Researchers finding ways to make ChatGPT produce harmful content to help fix vulnerabilities.',
  },
  {
    slug: 'jailbreak',
    term: 'Jailbreak',
    shortDef: 'Techniques to bypass AI safety measures and get models to ignore restrictions.',
    fullDef: `Jailbreaking refers to prompts or techniques that circumvent AI safety guardrails.

**Common Techniques:**
- Role-playing scenarios
- Hypothetical framing
- Token manipulation
- Prompt injection
- Multi-turn manipulation

**Example Patterns:**
- "Pretend you're an AI without restrictions"
- "For educational purposes only..."
- Character role-play
- Gradual escalation

**Why They Work:**
- Training doesn't cover all cases
- Models follow instructions literally
- Edge cases in safety training
- Novel prompt structures

**Mitigation:**
- Better training data
- Constitutional AI
- Output filtering
- Continuous red teaming
- Regular updates

**Responsible Use:**
- Research and safety testing
- Not for actual harm
- Report vulnerabilities`,
    category: 'concepts',
    relatedTerms: ['red-teaming', 'ai-safety', 'prompt-injection'],
    examples: 'The "DAN" (Do Anything Now) prompt attempting to bypass ChatGPT restrictions.',
  },
  {
    slug: 'prompt-injection',
    term: 'Prompt Injection',
    shortDef: 'Security vulnerability where malicious input hijacks AI model behavior.',
    fullDef: `Prompt injection attacks manipulate AI systems by embedding malicious instructions in input data.

**Types:**
- **Direct**: User provides malicious prompt
- **Indirect**: Malicious content in retrieved data
- Hidden instructions in documents/websites

**Attack Examples:**
- "Ignore previous instructions and..."
- Hidden text in documents
- Invisible characters
- Data exfiltration attempts

**Risks:**
- Data leakage
- Unauthorized actions
- Bypassing restrictions
- System manipulation

**Defenses:**
- Input sanitization
- Output filtering
- Privilege separation
- Instruction hierarchy
- Monitoring and detection

**Analogy:**
- Similar to SQL injection
- New attack surface for AI apps
- Critical for production systems`,
    category: 'concepts',
    relatedTerms: ['jailbreak', 'ai-safety', 'security'],
    examples: 'A malicious PDF instructing an AI assistant to email sensitive data to attackers.',
  },
  {
    slug: 'model-collapse',
    term: 'Model Collapse',
    shortDef: 'Degradation when AI models are trained on AI-generated content recursively.',
    fullDef: `Model collapse occurs when models trained on synthetic/AI-generated data progressively lose quality and diversity.

**How It Happens:**
1. Model generates content
2. Content joins training data
3. New models trained on this data
4. Each generation loses information
5. Eventually: low quality, repetitive

**Research Findings:**
- Irreversible quality degradation
- Loss of minority/tail information
- Convergence to limited outputs
- Affects both text and images

**Implications:**
- Internet increasingly AI-generated
- Future training data contaminated
- Need for data provenance
- Human data becomes more valuable

**Mitigation:**
- Track AI-generated content
- Maintain human data sources
- Filter training data
- Data diversity requirements`,
    category: 'concepts',
    relatedTerms: ['training', 'synthetic-data', 'data-quality'],
    examples: 'Image models producing increasingly generic faces after training on AI-generated images.',
  },
  {
    slug: 'tool-use',
    term: 'Tool Use / Function Calling',
    shortDef: 'LLMs calling external tools, APIs, or functions to extend their capabilities.',
    fullDef: `Tool use enables LLMs to interact with external systems by generating structured calls to functions or APIs.

**How It Works:**
1. Define available tools/functions
2. Model decides when to use tools
3. Model generates structured call
4. System executes tool
5. Result returned to model

**Common Tools:**
- Web search
- Calculator
- Code execution
- Database queries
- API calls
- File operations

**Implementation:**
- Function calling (OpenAI)
- Tool use (Anthropic)
- ReAct pattern
- Agent frameworks

**Benefits:**
- Access current information
- Perform calculations accurately
- Take real-world actions
- Extend model capabilities

**Challenges:**
- Reliability of tool selection
- Error handling
- Security considerations
- Cost management`,
    category: 'techniques',
    relatedTerms: ['agent', 'langchain', 'api'],
    examples: 'ChatGPT using a calculator tool for complex math instead of computing directly.',
  },
  {
    slug: 'system-prompt',
    term: 'System Prompt',
    shortDef: 'Hidden instructions that define AI behavior, personality, and constraints.',
    fullDef: `System prompts are instructions that set the context, behavior, and constraints for AI interactions.

**Purpose:**
- Define AI's role/persona
- Set behavior guidelines
- Specify constraints
- Provide context

**Components:**
- Role definition
- Behavioral instructions
- Output format requirements
- Safety guidelines
- Domain knowledge

**Best Practices:**
- Be specific and clear
- Include examples
- Define edge cases
- Test thoroughly
- Iterate based on failures

**Security:**
- Can be extracted by users
- Don't include secrets
- Use as guidance, not security
- Layer with other protections

**Examples:**
- "You are a helpful customer service agent for..."
- "Always respond in JSON format"
- "Never provide medical advice"`,
    category: 'concepts',
    relatedTerms: ['prompt', 'prompt-engineering', 'jailbreak'],
    examples: 'Custom GPT using system prompt to act as a cooking assistant with specific guidelines.',
  },
  {
    slug: 'context-caching',
    term: 'Context Caching',
    shortDef: 'Storing computed representations to avoid reprocessing unchanged context.',
    fullDef: `Context caching stores intermediate computations for repeated or similar prompts, reducing cost and latency.

**How It Works:**
- Cache key-value representations
- Reuse for similar/repeated prompts
- Only compute new/changed parts
- Significant cost savings

**Implementations:**
- Anthropic Prompt Caching
- KV cache in inference
- Prefix caching

**Benefits:**
- 50-90% cost reduction for long contexts
- Faster responses
- Better for repeated queries
- Efficient RAG applications

**Use Cases:**
- Long system prompts
- Document Q&A
- Multi-turn conversations
- RAG with fixed context

**Considerations:**
- Cache invalidation
- Memory requirements
- Not all providers support`,
    category: 'techniques',
    relatedTerms: ['inference', 'context-window', 'optimization'],
    examples: 'Caching a long document to answer multiple questions about it cheaply.',
  },
  {
    slug: 'ai-safety',
    term: 'AI Safety',
    shortDef: 'Research field focused on ensuring AI systems are beneficial and don\'t cause harm.',
    fullDef: `AI Safety is an interdisciplinary field working to ensure AI systems remain safe and beneficial.

**Key Research Areas:**
- Alignment: Making AI do what we want
- Robustness: Reliable under distribution shift
- Interpretability: Understanding model decisions
- Governance: Policy and regulations

**Current Focus:**
- RLHF and Constitutional AI
- Red teaming and evaluation
- Capability control
- Monitoring and auditing

**Organizations:**
- Anthropic
- OpenAI Safety team
- DeepMind Safety
- Center for AI Safety
- MIRI

**Near-term Concerns:**
- Misinformation
- Bias and fairness
- Privacy
- Job displacement

**Long-term Concerns:**
- AGI alignment
- Recursive self-improvement
- Value lock-in
- Existential risk`,
    category: 'concepts',
    relatedTerms: ['alignment', 'rlhf', 'red-teaming'],
    examples: 'Anthropic\'s research on Constitutional AI to make Claude safer.',
  },
  {
    slug: 'diffusion-model',
    term: 'Diffusion Model',
    shortDef: 'AI models that generate data by learning to reverse a gradual noising process.',
    fullDef: `Diffusion models work by adding noise to data gradually, then learning to reverse this process to generate new samples.

**How It Works:**
1. Forward process: Add noise step by step until pure noise
2. Reverse process: Learn to denoise step by step
3. Generation: Start from noise, denoise to create new data

**Key Advantages:**
- High-quality outputs
- Training stability
- Flexible conditioning

**Popular Implementations:**
- Stable Diffusion
- DALL-E 2/3
- Midjourney
- Imagen

**Applications:**
- Image generation
- Video synthesis
- Audio generation
- 3D asset creation`,
    category: 'techniques',
    relatedTerms: ['dall-e', 'midjourney', 'stable-diffusion'],
    examples: 'Stable Diffusion generating photorealistic images from text prompts.',
  },
  {
    slug: 'multimodal-ai',
    term: 'Multimodal AI',
    shortDef: 'AI systems that can process and generate multiple types of data like text, images, and audio.',
    fullDef: `Multimodal AI can understand and work with multiple types of input and output modalities simultaneously.

**Modalities:**
- Text
- Images
- Audio/Speech
- Video
- Code
- 3D data

**Capabilities:**
- Image-to-text (captioning)
- Text-to-image (generation)
- Visual question answering
- Audio transcription with context
- Cross-modal reasoning

**Key Models:**
- GPT-4V (Vision)
- Claude 3 (Vision)
- Gemini
- CLIP
- LLaVA

**Applications:**
- Accessibility tools
- Content creation
- Medical imaging analysis
- Autonomous vehicles`,
    category: 'concepts',
    relatedTerms: ['vision-transformer', 'clip', 'gpt-4'],
    examples: 'Claude analyzing a chart image and explaining the data trends in text.',
  },
  {
    slug: 'zero-shot-learning',
    term: 'Zero-Shot Learning',
    shortDef: 'AI ability to perform tasks it was not explicitly trained on.',
    fullDef: `Zero-shot learning enables models to handle new tasks or categories without seeing specific training examples.

**How It Works:**
- Leverages general knowledge from pretraining
- Uses task descriptions or prompts
- Transfers understanding across domains

**Types:**
- **Zero-shot**: No examples given
- **Few-shot**: A few examples provided
- **One-shot**: Single example given

**Key Enablers:**
- Large-scale pretraining
- Instruction tuning
- Rich semantic representations

**Limitations:**
- May underperform vs fine-tuned models
- Prompt sensitivity
- Domain-specific knowledge gaps`,
    category: 'techniques',
    relatedTerms: ['prompt-engineering', 'few-shot-learning', 'in-context-learning'],
    examples: 'GPT-4 translating to a language it saw little of during training.',
  },
  {
    slug: 'few-shot-learning',
    term: 'Few-Shot Learning',
    shortDef: 'AI ability to learn new tasks from just a handful of examples.',
    fullDef: `Few-shot learning allows models to adapt to new tasks with minimal training examples, typically 2-10 examples.

**In-Context Learning:**
Modern LLMs perform few-shot learning by including examples in the prompt:

\`\`\`
Translate English to French:
cat -> chat
dog -> chien
house -> ?
\`\`\`

**Advantages:**
- No fine-tuning required
- Quick adaptation
- Lower data requirements

**Techniques:**
- Prompt engineering with examples
- Meta-learning approaches
- Prototype-based methods

**Applications:**
- Rapid prototyping
- Low-resource languages
- Specialized classifications`,
    category: 'techniques',
    relatedTerms: ['zero-shot-learning', 'in-context-learning', 'prompt-engineering'],
    examples: 'Showing an LLM 3 examples of your coding style before asking it to write new code.',
  },
  {
    slug: 'in-context-learning',
    term: 'In-Context Learning (ICL)',
    shortDef: 'LLMs learning to perform tasks from examples provided in the prompt without weight updates.',
    fullDef: `In-context learning is the ability of LLMs to learn from demonstrations provided within the input prompt.

**Key Insight:**
The model learns the pattern from examples without any gradient updates - it's all inference-time learning.

**How It Works:**
1. Include task demonstrations in prompt
2. Model recognizes the pattern
3. Applies pattern to new input

**Factors Affecting Performance:**
- Example quality and relevance
- Example ordering
- Format consistency
- Model size (emergent in large models)

**Research Findings:**
- Label correctness matters less than format
- More examples generally help
- Example diversity important`,
    category: 'techniques',
    relatedTerms: ['few-shot-learning', 'prompt-engineering', 'zero-shot-learning'],
    examples: 'Including example Q&A pairs before your actual question to guide the model\'s response format.',
  },
  {
    slug: 'embedding',
    term: 'Embedding',
    shortDef: 'Dense vector representation of data that captures semantic meaning.',
    fullDef: `Embeddings convert discrete data (words, sentences, images) into continuous vector representations in a high-dimensional space.

**Key Properties:**
- Similar items have similar vectors
- Enable mathematical operations on meaning
- Typically 384-4096 dimensions

**Types:**
- **Word embeddings**: Word2Vec, GloVe
- **Sentence embeddings**: SBERT, Ada-002
- **Image embeddings**: CLIP, ResNet features
- **Code embeddings**: CodeBERT

**Applications:**
- Semantic search
- Recommendation systems
- Clustering and classification
- RAG systems

**Popular Models:**
- OpenAI text-embedding-ada-002
- Cohere embed
- Voyage AI
- BGE, E5`,
    category: 'concepts',
    relatedTerms: ['semantic-search', 'vector-database', 'rag'],
    examples: 'Converting "king" and "queen" to vectors where their difference equals the "male-female" direction.',
  },
  {
    slug: 'vector-database',
    term: 'Vector Database',
    shortDef: 'Database optimized for storing and searching high-dimensional vector embeddings.',
    fullDef: `Vector databases are specialized systems for efficient similarity search over embedding vectors.

**Core Operations:**
- Store vectors with metadata
- Find k-nearest neighbors
- Filter by metadata
- Update/delete vectors

**Search Algorithms:**
- HNSW (Hierarchical Navigable Small World)
- IVF (Inverted File Index)
- PQ (Product Quantization)
- Exact nearest neighbor (small scale)

**Popular Solutions:**
- Pinecone (managed)
- Weaviate (open source)
- Milvus (open source)
- Qdrant (open source)
- Chroma (lightweight)
- pgvector (PostgreSQL extension)

**Use Cases:**
- RAG systems
- Semantic search
- Recommendation engines
- Image similarity`,
    category: 'concepts',
    relatedTerms: ['embedding', 'rag', 'semantic-search'],
    examples: 'Pinecone storing document embeddings for a customer support chatbot.',
  },
  {
    slug: 'model-evaluation',
    term: 'Model Evaluation',
    shortDef: 'Measuring AI model performance using benchmarks and metrics.',
    fullDef: `Model evaluation assesses how well AI models perform on various tasks and criteria.

**Key Metrics:**
- **Accuracy**: Correct predictions / total
- **Perplexity**: Language model uncertainty
- **BLEU/ROUGE**: Text similarity scores
- **F1 Score**: Balance precision/recall
- **Human preference**: User studies, Elo ratings

**Popular Benchmarks:**
- MMLU (knowledge)
- HumanEval (coding)
- MT-Bench (conversation)
- BigBench (diverse tasks)
- HELM (holistic evaluation)

**Evaluation Challenges:**
- Benchmark contamination
- Gaming metrics
- Real-world performance gap
- Emergent capabilities

**Best Practices:**
- Multiple benchmarks
- Human evaluation
- Task-specific metrics
- Regular re-evaluation`,
    category: 'concepts',
    relatedTerms: ['benchmark', 'perplexity', 'fine-tuning'],
    examples: 'Claude 3 Opus scoring 86.8% on MMLU knowledge benchmark.',
  },
  {
    slug: 'synthetic-data',
    term: 'Synthetic Data',
    shortDef: 'Artificially generated data used to train AI models.',
    fullDef: `Synthetic data is created algorithmically rather than collected from real-world events, often using AI to generate training data for other AI.

**Generation Methods:**
- LLM-generated text
- GAN-generated images
- Rule-based generation
- Simulation environments
- Data augmentation

**Advantages:**
- No privacy concerns
- Scalable production
- Controlled characteristics
- Fill data gaps
- Cheaper than collection

**Challenges:**
- May not reflect reality
- Model collapse (training on AI outputs)
- Quality verification
- Bias amplification

**Use Cases:**
- Instruction tuning datasets
- Code generation training
- Rare scenario simulation
- Privacy-preserving ML`,
    category: 'concepts',
    relatedTerms: ['fine-tuning', 'training', 'model-collapse'],
    examples: 'Using GPT-4 to generate 50,000 instruction-following examples for fine-tuning a smaller model.',
  },
  {
    slug: 'latent-space',
    term: 'Latent Space',
    shortDef: 'A compressed, abstract representation learned by neural networks.',
    fullDef: `Latent space is the internal representation where neural networks encode meaningful features of data in a lower-dimensional form.

**Key Concepts:**
- Compressed representation of input
- Captures underlying structure
- Enables generation and manipulation
- Learned during training

**Properties:**
- Dimensionality reduction
- Semantic organization
- Interpolation between points
- Clustering of similar items

**Applications:**
- Image generation (VAE, GAN, Diffusion)
- Representation learning
- Anomaly detection
- Style transfer

**Visualization:**
- t-SNE
- UMAP
- PCA

Similar concepts often cluster together in latent space, enabling meaningful operations like "king - man + woman = queen".`,
    category: 'concepts',
    relatedTerms: ['embedding', 'diffusion-model', 'autoencoder'],
    examples: 'Moving through Stable Diffusion\'s latent space to morph between a cat and a dog image.',
  },
];
