---
date: 2019-04-17
title: Create SQLite Database Connection
topics:
  - databases
author: pwe
subtitle: How to drag-and-drop a .sqlite database file onto the Database tool to create a connection.
seealso:
  - title: Connecting to a database
    href: >-
      https://www.jetbrains.com/help/pycharm/connecting-to-a-database.html#connect-to-sqlite
thumbnail: ./thumbnail.png
video: "https://youtu.be/U2sAgysf1Hc"
obsoletes:
  - /pycharm/tips/create-sqlite-connection
---

PyCharm with Pro subscription includes our Database tool, [DataGrip](https://www.jetbrains.com/datagrip/), which is wonderful. It gives you a professional-level, visual way to work with SQL development in a project.

The Database tool needs to create database connection for the project, which not only lets you browse tables, edit rows, and perform queries, but it also injects superpowers into your Python code. Strings in Python that look like SQL get autocomplete, not only on SQL, but on the tables and columns in your project. Even refactoring those names.

But creating a database connection means filling in some details. For a SQLite database, it's a lot easier. Just drag and drop your `.sqlite` db file onto the Database tool window. _Note: You might have to download the SQLite drivers._

Once done, your project has a database, you can browse the tables, and use the schema in your Python code's SQL strings.
