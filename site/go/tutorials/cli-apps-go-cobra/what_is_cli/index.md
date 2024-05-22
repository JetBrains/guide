---
type: TutorialStep
date: 2024-04-22
title: "What Are Command Line Interfaces?"
topics:
  - go
author: iu
subtitle: ""
thumbnail: ./thumbnail.png
---

A CLI is a text-based method for interacting with computer systems or applications. Users engage with the system by entering specific commands from a list of predefined commands, prompting the system to execute the task associated with each particular command. These commands are typically inputted via a terminal window or command prompt.

Some fundamental principles dictate how users interact with the system and the underlying rules that govern CLI functionality. Understanding these concepts is essential for effectively using and navigating CLI applications. These foundational concepts are outlined below.

### Commands

Commands are predefined text-based directives for users to convey instructions that trigger the execution of a desired action by the application. Each command adheres to a specific syntax and distinct sets of options that guide its execution and resulting action. Additionally, some commands also possess subcommands that further streamline the execution of the parent command.

Considering the input below, `zero` is the command, while `divide` represents the subcommand that streamlines the command to a particular action:

```
zero divide 3 1.5
```

### Arguments

Arguments represent supplementary bits of information essential to the proper execution of the command. Notably, arguments encompass various data elements (such as file names and file paths) that serve to enrich the command's functionality and tailor it to specific tasks. Consider the terminal input below:

```
zero divide 3 1.5
```

The numbers `3` and `1.5` represent arguments essential for proper execution of the `divide` command.

### Options

Alternatively known as flags or switches, options are parameters that modify the behavior of a command during execution. Typically, options are indicated by preceding hyphens (`-`) or double hyphens (`--`) to distinguish them from other command elements. The command below shows a perfect example use case for options/flags:

```
go run main.go multiply 5.4 2 -r
```

### Configurations

Configurations in a command line application allow you to tailor its behavior. These customizable settings and options can be stored in configuration files or environment variables, making them easily accessible and reusable for individual users.

### Environment Variables

In CLI applications, environment variables serve as dynamic storage for preserving essential system information, configurations, or user-specific data. These variables are readily accessible, enabling seamless retrieval or modification whenever required.

### User Inputs

User inputs initiate actions or executions in CLIs. These inputs comprise a range of essential elements, including commands, subcommands, arguments, and options. Through these inputs, users effectively communicate their intentions to the command line interface, prompting the system to perform specific tasks or operations in response. The command below represents a user input containing a command, subcommand, arguments, and a flag/option:

```
go run main.go multiply 5.4 2 -r
```

### Outputs

Outputs encompass the outcomes of executed commands, providing users with the desired results or presenting error messages when an incorrect command is submitted.
