---
date: 2024-08-01
title: Prompt Engineering For Developers
topics:
  - ai
  - aia
  - deeper-ai
author: mb
subtitle: Prompt Engineering - Basic Concepts For Developers.
thumbnail: ./thumbnail.jpg
video: "https://www.youtube.com/watch?v=NO7eeQJIU3Y"
linkURL: "https://www.youtube.com/watch?v=NO7eeQJIU3Y"
---

This video provides a thorough overview of practical concepts needed for building applications with LLMs, moving beyond simple prompt engineering to explore real-world integration and optimization strategies.

## Use Case Introduction

- **Example Project**: Marco conceptualizes a button on a web application that recommends books programmatically without user interaction. The goal is to prepare prompts for LLMs, send them, pass the responses, and perform meaningful actions with the output.

## Providers vs. Models

- **Providers and Models**: Differentiates between providers (like OpenAI, Google, Anthropic) and their respective models (GPT for OpenAI, Claude for Anthropic, Gemini for Google).

## Working with OpenAI

- Demonstrates using OpenAI's Playground for executing queries with different models, explaining that the principles applied are valid across various providers and models.

## LLM Basics

- **Document Completion Engines**: LLMs complete documents based on training data, and responses depend heavily on how the prompts are structured.
- **Tokenization**: Explains how LLMs process input by breaking it into tokens, which are smaller units (often but not limited to words).

## Chat API and ChatML

- **ChatML**: Introduces ChatML, a markup language for structuring chat-like documents, enhancing interactions with LLMs by defining roles like system, user, and assistant.
- **State Management**: Emphasizes maintaining the state by sending the entire conversation history with each API call.

## Context and Latency

- **Importance of Context**: Discusses the necessity of providing relevant context in prompts, including user preferences and previous interactions.
- **Latency Issues**: Balances between useful context and the time/processing constraints to gather and prepare this context.

## Practical Example in IntelliJ IDEA

- **AI Assistant in IntelliJ**: Shows how JetBrains’ IDE uses context-aware prompts, incorporating relevant code snippets, open tabs, and project-specific information for generating useful outputs.

## Token Limits

- **Window Context Size**: Discusses the limits on input and output tokens for models and tools like OpenAI's Tick Token and Hugging Face's Tokenizer Library for counting tokens.

## Functions in Chat API

- **Dynamic Information Retrieval**: Introduces functions in the chat API to extend capabilities, like retrieving current stock prices, emphasizing the importance of defining functions in the backend.

## Error Handling

- **Error Resilience**: Stresses the importance of handling errors when parsing model responses, given that outputs might not always match the expected format.

## Choosing the Right Model

- **Model Selection Criteria**: Factors like intelligence, speed, cost, API convenience, and legal considerations guide the choice of the model.
- **Cost Versus Performance**: Highlights the cost differences between GPT-4 and cheaper models like GPT-3.5 Turbo, weighing the trade-offs based on use case.

## Additional Tips

- **Prompts and Responses**: Importance of refocusing and structuring prompts to maintain model attention, including techniques like using the third person for improved recommendations.
- **Structured Documents**: Using structured formats like XML, YAML, or JSON for better interaction with LLMs.
