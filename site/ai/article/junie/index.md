---
date: 2025-09-04
title: "Junie Playbook"
topics:
  - ai
  - junie
author: hs
subtitle: Exploring Junie with IntelliJ IDEA
thumbnail: ./thumbnail.png
obsoletes:
  - /ai/article/junie/intellij-idea/
  - /ai/article/junie/pycharm/
---

## Exploring Junie with You JetBrains IDE

Welcome to Junie, the coding agent by JetBrains!

We're here to help you hand off your tasks and let Junie handle routine or more complex tasks for you—check out this guide to get started.

This playbook includes examples from different technologies for new Junie users so that you can explore it in action for your JetBrains IDE.

As of September 2025, Junie is supported in:

- IntelliJ IDEA
- PyCharm
- WebStorm
- GoLand
- PhpStorm
- RubyMine
- RustRover
- Rider

Please note that since Junie is powered by AI, the results of the examples are not deterministic. This is where you can use follow-up prompts to further refine the results.

### Install

1. Install [JetBrains Junie from the Marketplace in the Plugin tab](https://plugins.jetbrains.com/plugin/26104-jetbrains-junie), and restart the IDE if required.
2. Open the plugin from the right sidebar.

![install.png](install.png)

## Junie Guidelines

You can use the `.junie/guidelines.md` file in the root directory to personalize Junie and make it truly effective for your team.

You can ask Junie to create it by entering a prompt such as:

The `.junie/guidelines.md` file can contain instructions in any format. For example:

- `Specify that tests should always be added to a specific folder or use a particular framework.`
- `Inform Junie about existing guidelines in your repository (e.g., by pointing to the correct file path), and it will read and apply them.`

If you notice Junie doing something suboptimal, add a hint or clarification in the guidelines file. These instructions will be added to Junie’s context, helping it make better decisions and work more effectively within your project.
If the `.junie/guidelines.md` file already exists in your project (e.g., created by teammates), Junie will automatically use it.

_Analyze the project structure and tech stack, and create a `.junie/guidelines.md` file with concise, well-structured information to help new developers. Include guidance on organizing the structure, running tests, executing scripts, and following best practices. Keep the content short, clear, and practical. By consolidating your project's coding standards in the `.junie/guidelines.md` file, you enable Junie to consistently apply them without needing to include the same instructions in every prompt._

This will trigger Junie to explore the project for a bit, executing commands like 'ls' and then it will generate this file. You as the smart developer should review the results carefully. Good instructions make Junie more effective, while unclear or incomplete guidelines can lead to low-quality outcomes. Alternatively, you can create this file manually from scratch and copy any existing guides you have into it. JetBrains has a [GitHub repository](https://github.com/JetBrains/junie-guidelines/) of Junie guidelines for different technologies, which you can use as a starting point.

### Brave Mode versus Playing Safe

Junie is an agent that can run code, execute terminal commands, and work with the file system. This means Junie could, in theory, install something you don’t want, delete files or execute unexpected code on your system.

With that in mind, don't use risky prompts such as _do something with my personal important files in this directory which I have in one copy and no backups_. Likewise do pay attention to what Junie does during and after it has finished.

Junie has a setting called **Brave mode** which when selected means that Junie can execute terminal commands without your explicit approval. By default, approval is required, and it’s safer to keep this enabled.

![brave-mode.png](brave-mode.png)

## Technology specific prompts to try

To start with, here are some fun Junie prompts for you to try in your project:

`Write/update a README.md about the project`

——————

`Analyze the repository, read important files and build an architectural dependency map between the modules, generate an ASCII diagram, and add it to the README.md.`

——————

`Analyze the last 10 commits, read relevant files and understand how it impacted user scenarios, generate very short and concise summary and an ASCII diagram (make it interesting, engaging, using emoji and art), and create a file changelog.txt`

——————

`Provide a code coverage report in a text file. If coverage is less than 80%, add tests to achieve the coverage goal.`

## Technology specific examples to try

Once you've got a feel for Junie, feel free to try some of these technology-specific prompts.

### Java

In a new Spring Boot project, try this prompt:
`Create a JPA entity called Bookmark and a corresponding Spring Data Repository_`

**Tip**: As we mentioned, for security reasons, the default is to approve any terminal action for Junie explicitly. However, there are many terminal actions in this example, so you can choose to uncheck it if you want to.

Junie will add the necessary dependencies (spring-boot-starter-data-jpa, H2 in-memory database driver) in the pom.xml, create a Bookmark JPA entity and Spring Data JPA Repository BookmarkRepository. Review the generated code, and if it looks good to you, click **Done**.

Next, you can implement basic CRUD (Create, Read, Update, Delete) functionalities for bookmarks with Thymeleaf view templates.

Try this prompt: `Implement CRUD operations for Bookmarks with Thymeleaf and Bootstrap CSS`

Once Junie is done, you can start the application and [access the URL](http://localhost:8080/bookmarks).

You should be able to view, add, edit and delete bookmarks.

Finally, let’s ask Junie to write integration test cases for our app.

Try this prompt: `Add integration tests for all controller methods.`

Once Junie is Done, it will automatically run all the tests.

As we mentioned, you can define your coding conventions and best practices in a `.junie/guidelines.md` file located at the root of your project. Junie will automatically follow these guidelines when generating code.

## Python
