---
type: TutorialStep
date: 2024-04-22
title: Introduction
topics:
  - go
  - web
author: rpeden
subtitle: Setting Up Gin, SQLite, and Essential REST APIs.
thumbnail: ./thumbnail.png
---

This first part of the series focuses on constructing the Go backend of the application. You'll create a new Go project, configure Gin, establish a database using SQLite, and develop the essential REST APIs required for the project.

## What Will You Learn in This Series?

The app that you'll build is a simple group chat app with Go, Gin, and React. Your app will allow users to log in, join chat rooms, and send and receive messages.

The series explains how to build this web app in three parts:

- In part one, you'll build the Go backend with Gin, including setting up the project structure and creating the models and routes for the app. You'll implement several backend endpoints that will provide the frontend with the data it needs.
- In part two, you'll build the React frontend with Tailwind. You'll create the components, pages, and frontend routes for the app.
- In part three, you'll integrate the backend and frontend parts of the app.

You'll use the following tools and frameworks to build the app:

- [Go](https://go.dev/): An open source programming language that aims to make it easy to build simple, reliable, and efficient software.
- [Gin](https://github.com/gin-gonic/gin): The web framework you'll use to create the chat app's HTTP server and backend routes. Gin is lightweight, high-performance, and easy to use.
- [SQLite](https://www.sqlite.org/index.html): A small, self-contained database that does not require any installation or configuration. You'll use it to store data about messages, channels, and users.
- [React](https://react.dev): A JavaScript library that makes it easy to create fast and efficient user interfaces. In this case, you'll use React to create a frontend chat UI that uses the backend API to let users participate in group chats.

By the end of this series, you'll have a solid understanding of how to build a full-stack web app with Go, Gin, and React. You'll also learn some best practices and tips for web development with these technologies.

## Building the App's Go Backend with Gin

This first part of the series focuses on building the app's backend using Go, Gin, and the GoLand IDE. By the end of the tutorial, you will have built a fully functional group chat backend.
