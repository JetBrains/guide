---
date: 2021-07-30
title: Write SQL queries using popular database packages
topics:
  - completion
  - databases
  - editing
  - inspections
  - mongodb
  - navigation
  - refactoring
  - running
author: dlsniper
subtitle: Work with SQL queries and get completion and other features automatically.
thumbnail: ./thumbnail.png
video: "https://youtu.be/9oGVEUWehy0"
obsoletes:
  - /go/tips/write-sql-queries-in-go
---

SQL queries are recognized automatically when these strings are used in popular SQL packages such as _database/sql_, _github.com/jmoiron/sqlx_, and _github.com/gobuffalo/pop_.

The IDE automatically recognizes which databases are configured, their type, e.g. Postgres, MongoDB, etc., and provides all features available to query, refactor, or reference the database.

Use the string literal which contains the SQL query in any of the functions accepting queries from one of the supported packages, and they'll be recognized automatically.
