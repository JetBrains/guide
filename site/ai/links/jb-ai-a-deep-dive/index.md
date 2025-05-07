---
date: 2023-10-05
title: JetBrains AI - A Deep Dive By Vladislav Tankov
topics:
  - ai
  - aia
author: vt
subtitle: The implementation of JetBrains AI – the backbone of AI Assistant, Grazie, and other JetBrains products.
thumbnail: ./thumbnail.png
video: "https://youtu.be/MYhkTnag81o"
linkURL: "https://youtu.be/MYhkTnag81o"
---

The JetBrains AI platform covers a broad range of functionality, from coding to writing assistance. We will discuss both JetBrains’s own models and the caveats of integration with some well-known LLM providers. We will also shed light on inference techniques used in JetBrains AI products.

Team Lead of the JetBrains AI and Grazie projects at JetBrains
Vladislav created the Grazie product and the platform that has recently morphed into JetBrains AI – both from scratch. He has diverse experience in backend, frontend, and DevOps and is the creator of Kotless – a serverless framework for Kotlin and other open-source libraries.

## Integration of AI

- **AI Chat**: Uses GPT-4 to respond to user queries with context-specific information about the project.
- **Inlay Intentions**: Embeds AI-powered suggestions directly within the code editor, such as generating documentation or providing code completions.
- **Commit Generation**: AI assists with generating commit messages, utilizing context and historical data to create meaningful summaries.
- **Renaming**: AI enhances the existing renaming features with more intelligent and context-aware suggestions.

## Machine Learning Basics

- Vladislav explains the fundamentals of machine learning using the example of identifying Golden Retrievers.
- **Generalization**: The ability of a trained model to apply learned concepts to new, unseen data.
- **Erroneous Responses**: Acknowledging that machine learning models can sometimes produce incorrect outputs.

## Large Language Models (LLMs)

- LLMs are essentially large and complex models capable of understanding and generating human-like text.
- LLMs work by predicting the next word or fragment of text based on the given context.
- **Size Matters**: Larger models with more parameters can store and retrieve more information, leading to better performance and "intelligence."

## Practical Applications

- **One-Line Code Completion**: Simplifies coding by predicting the next line of code, a feature already existing in some form for years.
- **Multi-Line Code Completion**: Uses LLMs to predict and generate multiple lines of code based on the given context.
- **AI-Driven Intentions**: The AI can explain and refactor code, enhancing the developer's productivity.
- **Chat and Instruction Understanding**: Fine-tuned models understand instructions and can generate appropriate responses, such as writing a poem or providing code snippets.

## Architecture of JetBrains AI

- JetBrains AI platform integrates multiple models and APIs to offer various functionalities.
- Uses on-device machine learning models to refine the context and improve the suggestions.
- Emphasizes the importance of cost-effective inference, especially for large language models.

## Inference and Practical Considerations

- **Inference**: Refers to running a trained model to get predictions or outputs.
- **Cost of Inference**: Inference can be significantly expensive, making it crucial to balance between model size and cost-effectiveness.
- **When to Use LLMs**: Large language models are suitable for general tasks, while specific tasks can be handled by smaller, custom models to save costs.
