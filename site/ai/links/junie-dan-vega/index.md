---
date: 2025-04-25
title: "Beyond Auto-Complete: Junie Is Your Autonomous Coding Partner in JetBrains IDEs"
topics:
  - ai
  - junie
  - ai-community
author: bravit
subtitle: A hands-on look at Junie’s autonomous coding, project understanding, and customizable behavior.
thumbnail: ./thumbnail.jpg
linkURL: "https://www.youtube.com/watch?v=fcbSG8lm7So"
---

## Introduction to JetBrains Junie

In [this video](https://www.youtube.com/watch?v=fcbSG8lm7So) Dan Vega introduces **JetBrains Junie**, a new AI-powered coding agent designed to work directly within JetBrains IDEs, such as IntelliJ IDEA, PyCharm, WebStorm, and GoLand. Unlike traditional autocomplete assistants, Junie is a **fully autonomous coding partner** that can understand your code, implement features, and even run and assess tests while keeping the developer in control.

---

### Features and Capabilities

- **Deep IDE integration**: Works as a plugin within JetBrains IDEs.
- **Context-aware code generation**: Junie explores your codebase to produce relevant and cohesive code.
- **Autonomous task execution**: Capable of performing multi-step tasks like implementing features or modifying configuration files.
- **Two interaction modes**:
  - **Ask Mode**: Chat-based interface for exploratory tasks.
  - **Code Mode**: Directly request and approve code changes.
- **Brave Mode**: Allows Junie to execute terminal commands autonomously.

---

### Demo Highlights

#### 1. **Exploring an Existing Project**

- Junie analyzes a simple Spring Boot to-do app.
- Provides a high-level overview including:
  - Purpose and functionality
  - Tech stack (e.g., Spring Boot 3.1.4, JDK 21)
  - Architecture and data flow
- Offers insights without needing to manually inspect files.

#### 2. **Creating a New REST API**

- Junie generates a full CRUD API using the JSONPlaceholder service:
  - Creates model, service, controller, and configuration files
  - Writes a `README.md` file proactively
  - Handles testing and can revise code based on test results
- Demonstrates plan-first execution: Junie creates a detailed task plan before coding.

### Customization via `.junie/guidelines`

- The speaker shows how to define **personal or team coding standards** using a `.junie/guidelines` file.
- Preferences included:
  - Java 21, Spring Boot, Maven
  - Favor `record` over `class` for immutability
  - Use `RestClient` instead of `RestTemplate`
  - Package by feature, not by layer
- Junie partially adheres to these; room for further alignment via better guideline definition.

### Final Thoughts

- Junie is **not just a smart assistant**, but a **true coding companion**.
- The speaker emphasizes: **"You are the pilot, not the passenger."**
- Junie's output should be reviewed, refined, and treated as a **starting point**, not a final solution.
- Great potential for productivity, especially for developers already working in JetBrains IDEs.

## Resources Mentioned

- [JetBrains Junie](https://www.jetbrains.com/junie/)
- [Juni FAQ](https://lp.jetbrains.com/ai-ides-faq/)
- Blog posts and examples from [JetBrains Guide](https://www.jetbrains.com/guide/ai/)
