// AI 101 Explainer content - Markdown format
export const explainers = [
  {
    slug: 'what-is-ai',
    title: 'What is AI?',
    subtitle: 'Understanding artificial intelligence in plain English',
    category: 'fundamentals',
    difficulty: 'beginner',
    readTime: 3,
    order: 1,
    content: `
# What is AI?

You've heard the term everywhere—AI is writing emails, creating art, diagnosing diseases, and apparently coming for everyone's jobs. But what actually *is* AI?

## The Simple Definition

**Artificial Intelligence is software that can perform tasks that typically require human intelligence.**

That's it. No magic, no sentient robots (yet). Just really sophisticated software.

## What Makes AI Different from Regular Software?

Traditional software follows explicit rules:
- **IF** user clicks button **THEN** show menu
- **IF** password incorrect **THEN** show error

AI learns patterns from data:
- Show the AI 10,000 cat photos → it learns what "cat" looks like
- Feed it millions of sentences → it learns how language works

**The key difference:** Regular software does exactly what programmers tell it. AI figures things out from examples.

## The Three Levels of AI

### 1. Narrow AI (What We Have Today)
AI that's really good at **one specific thing**:
- ChatGPT: Generating text
- Midjourney: Creating images
- Tesla Autopilot: Driving assistance

These systems can't do anything outside their specialty. ChatGPT can't drive your car.

### 2. General AI (The Goal)
AI with human-like versatility—can learn any task a human can.

**Status:** Doesn't exist yet. Some argue GPT-4 shows early signs.

### 3. Superintelligent AI (Sci-Fi... For Now)
AI smarter than all humans combined.

**Status:** Theoretical. The thing people worry about in movies.

## Why AI Seems to Have Exploded Recently

Three things came together:

1. **Massive Data:** The internet created endless training material
2. **Computing Power:** GPUs made complex calculations feasible
3. **Better Algorithms:** Transformers (2017) changed everything

It's not that AI suddenly appeared—we've been working on it since the 1950s. We just finally have the ingredients to make it work.

## The Bottom Line

AI is pattern recognition at scale. It's not thinking or feeling—it's finding statistical relationships in data and using them to make predictions.

When you chat with ChatGPT, it's predicting the most likely next word, millions of times per second, based on patterns it learned from the internet. Impressive? Absolutely. Conscious? No.

---

*Next up: [Machine Learning vs AI](/learn/101/ml-vs-ai) — What's the difference?*
`,
  },
  {
    slug: 'ml-vs-ai',
    title: 'Machine Learning vs AI',
    subtitle: 'Understanding the relationship between these terms',
    category: 'fundamentals',
    difficulty: 'beginner',
    readTime: 4,
    order: 2,
    content: `
# Machine Learning vs AI

People use "AI" and "Machine Learning" interchangeably. They're related, but not the same thing.

## The Relationship

Think of it like this:

\`\`\`
Artificial Intelligence (the big umbrella)
    └── Machine Learning (a technique to achieve AI)
            └── Deep Learning (a type of ML)
                    └── LLMs like GPT (a type of deep learning)
\`\`\`

**AI** is the goal: Make computers do intelligent things.
**Machine Learning** is one way to get there: Let computers learn from data.

## The Traditional Approach (Pre-ML)

Early AI used **explicit rules** programmed by humans:

\`\`\`
IF email contains "Nigerian prince" AND "send money"
THEN mark as spam
\`\`\`

**The problem:** You need to anticipate every scenario. Miss one trick, and spam gets through.

## The Machine Learning Approach

Instead of writing rules, you show the computer examples:

1. Feed it 100,000 emails labeled "spam" or "not spam"
2. The algorithm finds patterns you never thought of
3. It can catch spam tricks humans haven't even seen yet

**The magic:** The computer writes its own rules based on data.

## Types of Machine Learning

### Supervised Learning
- You provide labeled examples: "This is a cat, this is a dog"
- The model learns the mapping between input and label
- **Use case:** Email classification, price prediction

### Unsupervised Learning
- You provide data without labels
- The model finds patterns on its own
- **Use case:** Customer segmentation, anomaly detection

### Reinforcement Learning
- The model learns by trial and error
- Gets rewards for good actions, penalties for bad ones
- **Use case:** Game playing, robotics

## Deep Learning: ML on Steroids

Deep Learning uses **neural networks** with many layers (hence "deep").

Why it matters:
- Can learn incredibly complex patterns
- Powers most modern AI (GPT, image generators, voice assistants)
- Needs lots of data and computing power

## A Practical Example

**Task:** Identify dogs in photos

**Traditional Programming:**
\`\`\`
IF has four legs AND has tail AND has fur AND...
\`\`\`
Good luck defining every possible dog pose and breed.

**Machine Learning:**
\`\`\`
Here are 1 million dog photos.
Here are 1 million non-dog photos.
Figure out the difference.
\`\`\`
The model learns features humans can't even articulate.

## Why This Matters for You

When people say "AI," they usually mean machine learning systems today. Understanding this helps you:

- **Cut through hype:** Not everything needs AI
- **Ask better questions:** "What data was this trained on?"
- **Spot limitations:** ML is only as good as its training data

## The Bottom Line

- **AI** = The dream (intelligent machines)
- **Machine Learning** = The method (learning from data)
- **Deep Learning** = The technique powering today's breakthroughs

All modern AI you interact with—ChatGPT, image generators, recommendation systems—is machine learning under the hood.

---

*Next up: [How LLMs Work](/learn/101/how-llms-work) — The technology behind ChatGPT*
`,
  },
  {
    slug: 'how-llms-work',
    title: 'How LLMs Work',
    subtitle: 'Demystifying the technology behind ChatGPT and Claude',
    category: 'models',
    difficulty: 'intermediate',
    readTime: 6,
    order: 3,
    content: `
# How LLMs Work

Large Language Models like GPT-4 and Claude can write essays, code, poetry, and hold conversations. How do they actually work?

## The Core Insight

LLMs are **next-word prediction machines**.

When you type "The cat sat on the ___", the model predicts the most likely next word based on patterns it learned from billions of text examples.

That's it. Everything else—conversations, reasoning, creativity—emerges from doing this really, really well.

## Training: Reading the Internet

### Phase 1: Pre-training

The model reads massive amounts of text:
- Websites, books, articles, code
- Wikipedia, Reddit, academic papers
- Billions upon billions of words

For each chunk of text, it plays a game:
1. Hide the next word
2. Predict what it should be
3. Check if it was right
4. Adjust to do better next time

After seeing enough examples, the model learns:
- Grammar and syntax
- Facts and knowledge
- Reasoning patterns
- Writing styles

### Phase 2: Fine-tuning

Raw pre-trained models are like unsocialized geniuses—smart but unhelpful.

Fine-tuning teaches them to:
- Follow instructions
- Be helpful and harmless
- Format responses appropriately

This uses **RLHF (Reinforcement Learning from Human Feedback)**:
1. Humans rate model responses
2. Model learns what humans prefer
3. Repeat until it's actually useful

## The Transformer Architecture

All modern LLMs use **transformers** (from the 2017 paper "Attention Is All You Need").

### The Key Innovation: Attention

Previous models read text word-by-word, forgetting earlier words.

Transformers can look at all words simultaneously and decide which ones are important for each prediction.

Example: "The trophy didn't fit in the suitcase because **it** was too big."

What does "it" refer to? The trophy or suitcase?

Attention lets the model:
1. Look at all words in the sentence
2. Calculate relevance scores
3. Determine "it" = trophy (because trophies are typically "too big")

### Why This Matters

Attention enables:
- Understanding context across long passages
- Connecting related concepts
- Handling complex, multi-step reasoning

## Inside the Model: Parameters

LLMs have billions of **parameters**—numbers that determine behavior.

| Model | Parameters |
|-------|------------|
| GPT-2 | 1.5 billion |
| GPT-3 | 175 billion |
| GPT-4 | ~1.7 trillion |
| Llama 3 405B | 405 billion |

More parameters = more capacity to learn patterns = generally better performance.

But also = more expensive to train and run.

## Generation: How Responses Are Created

When you ask a question:

1. **Tokenization:** Your text is split into tokens (~4 characters each)
2. **Encoding:** Tokens become numbers the model understands
3. **Processing:** Numbers flow through transformer layers
4. **Prediction:** Model outputs probability for each possible next token
5. **Selection:** Pick a token (usually using some randomness)
6. **Repeat:** Use the new token to predict the next one
7. **Stop:** Continue until reaching an end signal

This happens incredibly fast—hundreds of tokens per second.

## The "Temperature" Setting

Temperature controls randomness in token selection:

- **Low temperature (0.0-0.3):** More predictable, focused responses
- **Medium temperature (0.5-0.7):** Balanced creativity and coherence
- **High temperature (0.8-1.0+):** More creative, but potentially chaotic

## What LLMs Don't Do

LLMs are impressive but not magic:

- **They don't "understand" like humans.** They find statistical patterns.
- **They don't access the internet** (unless given tools).
- **They can "hallucinate"**—generate plausible-sounding nonsense.
- **They don't learn from conversations** (each chat starts fresh).

## The Bottom Line

LLMs are sophisticated pattern matching machines trained on human text. They predict what comes next based on what they've seen before.

The "intelligence" emerges from:
1. Massive scale (billions of parameters)
2. Massive data (trillions of words)
3. Clever architecture (transformers + attention)

Understanding this helps you use them better—and recognize their limitations.

---

*Next up: [Understanding Model Parameters](/learn/101/model-parameters) — What "7B" and "70B" actually mean*
`,
  },
  {
    slug: 'model-parameters',
    title: 'Understanding Model Parameters',
    subtitle: 'What 7B, 70B, and 405B actually mean',
    category: 'models',
    difficulty: 'intermediate',
    readTime: 5,
    order: 4,
    content: `
# Understanding Model Parameters

You see it everywhere: "Llama 3 70B", "Mistral 7B", "GPT-4 with 1.7 trillion parameters."

What do these numbers mean, and why should you care?

## What Are Parameters?

Parameters are the **learnable numbers inside a neural network** that determine its behavior.

Think of parameters like the settings on a massive mixing board:
- Millions of knobs
- Each slightly adjusted during training
- Together they determine what the model outputs

When an LLM is trained, it's essentially finding the right values for all these parameters to predict text accurately.

## The Numbers in Context

| Model | Parameters | Rough Capability |
|-------|------------|------------------|
| GPT-2 | 1.5B | Basic text generation |
| Llama 3 8B | 8B | Good for simple tasks |
| Mistral 7B | 7B | Surprisingly capable |
| Llama 3 70B | 70B | Strong all-around |
| GPT-4 | ~1.7T | State of the art |
| Llama 3 405B | 405B | Near GPT-4 level |

**B = Billion, T = Trillion**

## Does Bigger Always Mean Better?

### Generally, Yes
More parameters = more capacity to learn complex patterns.

A 70B model will usually outperform a 7B model on:
- Complex reasoning
- Nuanced understanding
- Following intricate instructions

### But It's Not That Simple

**Architecture matters:**
- Mistral 7B often beats larger models
- Training quality can compensate for size
- Mixture of Experts (MoE) changes the math

**Diminishing returns:**
- The jump from 7B to 70B is huge
- The jump from 70B to 700B? Less dramatic

## Why Size Matters for You

### Running Models Locally

Larger models need more resources:

| Model Size | VRAM Needed | Can Run On |
|------------|-------------|------------|
| 7B | ~8GB | Gaming GPU (RTX 3080) |
| 13B | ~16GB | High-end GPU (RTX 4090) |
| 70B | ~40GB | Server GPU (A100) |
| 405B | ~200GB+ | Multiple A100s |

**Rule of thumb:** ~2 bytes per parameter for basic inference.

### API Costs

Bigger models = higher API costs:
- GPT-3.5: ~$0.002 per 1K tokens
- GPT-4: ~$0.03 per 1K tokens (15x more)

### Speed

Bigger models = slower responses:
- 7B: Near-instant responses
- 70B: Noticeable pause
- 400B+: Several seconds per response

## Choosing the Right Size

### When to Use Smaller Models (7B-13B)
- Simple tasks (summarization, classification)
- Running locally on consumer hardware
- High-volume, cost-sensitive applications
- Speed is critical

### When to Use Larger Models (70B+)
- Complex reasoning required
- Nuanced, creative writing
- Multi-step problems
- Accuracy is paramount

## The Open Source Sweet Spot

For most people running local AI:

**Llama 3 8B / Mistral 7B**
- Runs on gaming hardware
- Surprisingly capable
- Fast responses
- Free to use

**Llama 3 70B**
- Needs serious hardware (or cloud)
- Near-commercial quality
- Great for serious projects

## Quantization: Cheating the Size Limit

**Quantization** reduces model precision to fit larger models on smaller hardware.

A 70B model normally needs ~140GB of memory, but:
- **8-bit quantization:** ~70GB (half!)
- **4-bit quantization:** ~35GB (quarter!)
- **2-bit quantization:** ~17GB (but quality suffers)

Trade-off: Some quality loss for massive memory savings.

## The Bottom Line

Parameters indicate model capability, but context matters:
- **7B models** are your daily drivers
- **70B models** are for serious work
- **400B+ models** are API-only for most people

For most tasks, a well-trained 7B model beats a poorly-trained 70B model.

Don't chase parameter counts—chase results for your use case.

---

*Next up: [Prompt Engineering Basics](/learn/101/prompt-engineering) — How to get better results from AI*
`,
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering Basics',
    subtitle: 'How to get better results from AI models',
    category: 'applications',
    difficulty: 'beginner',
    readTime: 4,
    order: 5,
    content: `
# Prompt Engineering Basics

The same AI model can give you brilliant or terrible results. The difference? How you ask.

Prompt engineering is the skill of crafting inputs that get the outputs you want.

## The Fundamental Truth

**LLMs want to complete patterns.**

If your prompt looks like the start of a helpful answer, you'll get a helpful answer.
If it looks like the start of rambling nonsense, you'll get rambling nonsense.

## Five Techniques That Actually Work

### 1. Be Specific

**Bad prompt:**
> Write about dogs.

**Good prompt:**
> Write a 200-word blog post about the health benefits of daily walks for golden retrievers, targeting first-time dog owners.

**Why it works:** Specificity constrains the output space.

### 2. Provide Context

**Bad prompt:**
> Is this code good?

**Good prompt:**
> I'm a junior developer learning Python. Review this function that calculates shipping costs. Focus on readability and any obvious bugs. Here's the code: [code]

**Why it works:** Context shapes the response style and depth.

### 3. Show Examples (Few-Shot Learning)

**Bad prompt:**
> Convert this to formal English.

**Good prompt:**
> Convert informal text to formal English.

> Informal: gonna head out soon
> Formal: I will be leaving shortly.

> Informal: that meeting was a total waste
> Formal: The meeting was not productive.

> Informal: hey can u send me that doc
> Formal: [Your turn]

**Why it works:** Examples demonstrate exactly what you want.

### 4. Assign a Role

**Bad prompt:**
> Explain quantum computing.

**Good prompt:**
> You are a physics professor known for clear explanations. Explain quantum computing to a curious high school student. Use analogies, avoid jargon, and check for understanding.

**Why it works:** Roles activate relevant knowledge and style.

### 5. Structure the Output

**Bad prompt:**
> Analyze this business idea.

**Good prompt:**
> Analyze this business idea using this structure:
>
> **Strengths:** (3 bullet points)
> **Weaknesses:** (3 bullet points)
> **Market Opportunity:** (1 paragraph)
> **Recommendation:** (Yes/No with reasoning)

**Why it works:** Structure prevents rambling and ensures completeness.

## Common Mistakes to Avoid

### Being Too Vague
"Make it better" → Better how? More formal? Funnier? Shorter?

### Assuming Knowledge
The AI doesn't know your project, your preferences, or what you tried before.

### Asking Multiple Things
"Write a tagline, suggest improvements, and translate to Spanish" → Do one at a time.

### Not Iterating
First response not perfect? Refine and try again. It's a conversation.

## The "Act As" Framework

A simple template that works for most tasks:

\`\`\`
Act as a [ROLE] with expertise in [DOMAIN].

Your task is to [SPECIFIC ACTION].

Context: [RELEVANT BACKGROUND]

Requirements:
- [REQUIREMENT 1]
- [REQUIREMENT 2]
- [REQUIREMENT 3]

Output format: [DESIRED STRUCTURE]
\`\`\`

## Quick Wins

Try adding these to any prompt:

- "Think step by step" — Improves reasoning
- "Be concise" — Reduces fluff
- "If unsure, say so" — Reduces hallucination
- "Ask clarifying questions if needed" — Better results

## The Meta-Skill

The best prompt engineers don't memorize templates. They:

1. **Understand the model's tendencies**
2. **Anticipate failure modes**
3. **Iterate quickly based on results**

Start simple. Add detail when the output isn't right. Remove detail when it's over-constrained.

---

*Next up: [AI Ethics 101](/learn/101/ai-ethics) — The important questions everyone should consider*
`,
  },
  {
    slug: 'ai-ethics',
    title: 'AI Ethics 101',
    subtitle: 'The important questions everyone should consider',
    category: 'ethics',
    difficulty: 'beginner',
    readTime: 5,
    order: 6,
    content: `
# AI Ethics 101

AI is powerful. Power requires responsibility. Here are the ethical considerations everyone using AI should understand.

## The Big Questions

### 1. Bias and Fairness

**The Problem:**
AI learns from human-generated data. Human data contains human biases.

**Real Examples:**
- Resume screening AI that favored men (trained on historical hiring data)
- Facial recognition that performed worse on darker skin tones
- Loan algorithms that discriminated against certain zip codes

**What to Consider:**
- What data was the AI trained on?
- Whose perspectives are represented?
- Who might be harmed by errors?

### 2. Transparency and Explainability

**The Problem:**
Most AI systems are "black boxes"—we can't see how they reach conclusions.

**Why It Matters:**
- How do you appeal an AI decision that affects you?
- Can you trust a diagnosis you don't understand?
- How do you fix bias you can't identify?

**The Tradeoff:**
More powerful models are often less explainable. The best-performing AI is often the hardest to interpret.

### 3. Privacy

**The Problem:**
AI needs data. Often, lots of personal data.

**Concerns:**
- Training data may include private information
- AI can infer sensitive information from innocuous data
- Data collected for one purpose may be used for another

**Questions to Ask:**
- What data does this AI collect?
- Who has access to it?
- Can I opt out?

### 4. Job Displacement

**The Reality:**
AI will change work. Some jobs will disappear. Others will transform. New ones will emerge.

**The Nuance:**
- Automation has always changed jobs (ATMs didn't eliminate bank tellers)
- The question is speed—how fast can workers adapt?
- Benefits and costs won't be distributed evenly

**What's Different:**
AI affects cognitive work, not just physical tasks. Writers, lawyers, programmers—no one is fully immune.

### 5. Misinformation

**The Problem:**
AI can generate convincing fake content at scale:
- Deepfake videos
- Synthetic articles
- Fake social media accounts

**The Challenge:**
Creating fakes is easier than detecting them. The asymmetry favors bad actors.

**Implications:**
- Harder to trust what you see
- Erosion of shared reality
- Democracy and journalism at risk

## Responsible AI Use

### For Individuals

**Do:**
- Verify AI outputs, especially for important decisions
- Consider who might be affected by how you use AI
- Be transparent when AI generated your content
- Report harmful outputs to developers

**Don't:**
- Use AI to deceive or manipulate
- Trust AI blindly for consequential decisions
- Share others' private information with AI
- Assume AI is neutral or objective

### For Organizations

**Do:**
- Audit AI systems for bias
- Maintain human oversight for high-stakes decisions
- Be transparent about AI use
- Consider impact on employees and society

**Don't:**
- Deploy AI without testing for harms
- Hide AI decision-making from affected parties
- Ignore feedback about problems
- Prioritize efficiency over ethics

## The Current Regulatory Landscape

**EU AI Act (2024):**
- Risk-based approach
- Strict rules for "high-risk" AI (hiring, credit, law enforcement)
- Transparency requirements
- Heavy fines for violations

**US Approach:**
- Sector-specific guidelines
- Executive orders on AI safety
- No comprehensive federal law (yet)

**China:**
- Strict content rules
- Algorithm registration requirements
- Focus on social stability

## The Alignment Problem

The deepest ethical question: How do we ensure AI systems do what we actually want?

**The Challenge:**
- We can't perfectly specify human values
- AI optimizes for what we measure, not what we mean
- Powerful AI pursuing wrong goals = disaster

**Current Approaches:**
- RLHF: Training AI on human preferences
- Constitutional AI: Built-in principles
- Interpretability research: Understanding what AI is "thinking"

## What You Can Do

1. **Stay informed** — AI is evolving fast
2. **Think critically** — Question AI outputs and applications
3. **Speak up** — Report problems and advocate for responsible use
4. **Vote and engage** — Policy matters

AI ethics isn't just for researchers and policymakers. Everyone using AI has a role to play.

---

*Congratulations! You've completed AI 101. Return to [Learn](/learn) to explore the glossary and stay current with AI developments.*
`,
  },
];
