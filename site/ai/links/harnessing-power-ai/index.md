---
date: 2025-03-26
title: Harnessing the Power of AI in IntelliJ IDEA
topics:
  - ai
  - aia
  - learn-aia
  - learn-junie
author: aa
subtitle: Exploring AI-powered code generation, refactoring, and agentic automation with IntelliJ IDEA and Junie.
thumbnail: ./thumbnail.png
video: "https://www.youtube.com/watch?v=8mxAeSqhamk"
linkURL: "https://www.youtube.com/watch?v=8mxAeSqhamk"
---

In this updated talk, Anton from JetBrains presents a comprehensive exploration of AI-assisted programming within IntelliJ IDEA, with a special focus on **Junie** — a new agentic development tool designed to automate and supervise complex development workflows. Through demos, reflections, and audience Q&A, Anton shows how different levels of AI support — from basic code completion to fully autonomous multi-step agents — can transform the developer experience.

## Overview of AI in IntelliJ IDEA

- JetBrains integrates various AI capabilities into IntelliJ IDEA, ranging from lightweight in-editor completions to full agentic automation via Junie.
- Users can choose between local and cloud-based models, including JetBrains-hosted LLMs (like _Mellum_) and external providers (e.g., Claude 3.7).
- The AI Assistant and Junie aim to **augment**, not replace, developers — helping them move faster, experiment more freely, and focus on higher-level problems.

## AI Support Levels and Capabilities

Anton outlines a **progressive scale of AI-assisted development**:

### Level 0: Minimal Assistance

- Local inline code completions using lightweight models.
- Helps with repetitive tasks when the developer knows exactly what to do.
- Fast and context-aware, but limited in scope.

### Level 1: Verbose Completions

- Multiline cloud-based completions based on comments or partial code.
- Useful for solving known problems or generating code in unfamiliar languages.
- Anton shows how it can implement utility functions just from a descriptive comment.

### Level 2: Structured Prompting

- Developers use inline prompts or actions to trigger higher-level suggestions.
- Includes tools like “Generate Unit Tests” or “Suggest Refactoring.”
- More control over code generation, with automatic insertion and preview diff support.

### Level 3: Conversational Refactoring

- Full-featured **chat interface** for working with the codebase.
- Supports tasks like changing code style, converting code structure, or adding tests based on discussion.
- Still requires developer supervision — reviewing changes and rerunning tests.

### Level 4: Agentic Workflows with Junie

- **Junie** is an AI-powered agent that can scan your project, generate a development plan, and execute tasks across multiple files.
- Developers can write high-level goals in `.junie/guidelines.md` and track progress in markdown task lists.
- Example: Anton shows how Junie analyzes a project, writes an improvement plan, breaks it into tasks, and executes “Phase 1” while updating the checklist.

## Notable Features and Demos

- **Full-Line Completion Plugin**: Offline, single-line predictions.
- **Mellum Model**: JetBrains' own fine-tuned LLM for multi-line completions.
- **Automatic Unit Test Generation**: Based on context and function analysis.
- **Inline Prompting**: Use comments like `// group list of students by name` to trigger completions.
- **Chat-Based Refactoring**: Claude-powered assistant suggests and applies refactorings with inline explanations.
- **Junie**:
  - Scans codebase.
  - Generates structured development plans.
  - Executes code changes across the project.
  - Can be guided by persistent markdown instructions.

## Anton’s Hobby Projects: AI as a Creative Partner

Anton shares how Junie empowered him to create multiple side projects without writing a single line of code:

- Games (Minesweeper, 2048, Solitaire) in Kotlin Multiplatform.
- Web tools (MIDI visualizer, podcast recorder, music tuner) — all developed without frontend experience.
- AI-driven fitness tracker using pose estimation in the browser.

## Practical Insights and Discussion

- **Model Selection**: Claude 3.7 used for Junie; JetBrains handles API tokens and quota for users.
- **Plans and Pricing**: Free tier expected with limits; enterprise hosting options also available.
- **Gradle Support**: Junie understands Gradle configurations and adapts suggestions accordingly.
- **Future Features**: Planned integration with CI/CD, OpenRewrite, and MCP for deeper automation.

## Key Takeaways

- **AI tools are most powerful when developers know how to use them strategically.**
- Junie exemplifies a shift from AI as assistant to AI as autonomous agent, executing tasks while you supervise.
- Greenfield projects, fast prototyping, and unfamiliar tech stacks are ideal use cases.
- Developer judgment, intuition, and domain knowledge remain essential — but AI tools can dramatically accelerate learning and iteration.
