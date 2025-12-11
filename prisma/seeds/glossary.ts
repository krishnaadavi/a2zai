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
];
