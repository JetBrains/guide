---
date: 2022-09-16
title: Working with SQL and databases in WebStorm
topics:
  - databases
author: ms
subtitle: The basics of writing SQL queries and working with data using the Database Tools and SQL plugin for WebStorm.
thumbnail: ./thumbnail.png
video: "https://youtu.be/hzLchYXMv40"
linkURL: "https://youtu.be/hzLchYXMv40"
---

DataGrip's powerful database tools are fully integrated into WebStorm, enhancing the workflow for full-stack JavaScript developers working with databases. Users can leverage a wide range of features for database management, query execution, and data visualization directly within their development environment.

## Overview of DataGrip and WebStorm Integration

- WebStorm requires the installation of the "Database Tools and SQL" plugin, which can be found in the plugin marketplace.
- Once installed, the Database tool window becomes accessible for managing and working with databases.

## Database Explorer Features

- Supports a wide array of SQL and NoSQL databases with full or basic support.
- Full support includes custom SQL parsers and syntax error highlighting.
- The Database tool window allows managing schemas, tables, and more.
- Users can customize the appearance and what schemas/databases they want to see for better performance and usability.
- Capability to color-code data sources and set data sources to read-only mode to avoid accidental changes.

## Query Console

- The Query Console is used for writing and running SQL queries in a temporary editor.
- Live templates help quickly generate common SQL statements (e.g., SELECT, INSERT).
- Results of queries can be named and organized for better readability.
- Comparing data sets from different queries using built-in comparison tools.
- In-editor result mode allows viewing query results directly below the SQL code to facilitate a notebook-like workflow.
- Query history and local history features ensure that all past queries and changes are saved and can be revisited.

## Code Assistance and Refactoring

- Intelligent code completion, inspections, and annotations to help write correct SQL.
- Refactoring support includes renaming tables, columns, and other objects.
- Navigation is simplified with shortcuts that lead to DDL (Data Definition Language) views, related data, and database trees.

## Data Editor

- Editing, updating, adding, and deleting rows directly within the data grid.
- The toolbar includes options for sorting, filtering, and transposing data.
- Extractors allow exporting data in various formats (SQL, JSON, CSV, etc.).
- Custom data extractors can be created using Groovy scripts for specific formats.
- Copying data between different databases is simplified with the "Copy to Database" feature.

## Advanced Features

- Schema comparison allows comparing differences between environments and generating migration scripts.
- Connecting to cloud-hosted databases like AWS RDS, Azure Cosmos is supported.
- Performance tuning through viewing and analyzing execution plans.
- Support for language injections enables running and analyzing SQL embedded within other languages (e.g., JavaScript).

## MongoDB Integration

- MongoDB collections can be viewed and queried with SQL-like syntax.
- JSON data can be visualized in various formats and queried directly.
- Built-in conversion of SQL to JavaScript for MongoDB operations.

## Conclusion and Q&A

-
- Addressed various user questions related to specific database features, schema comparison, and performance tools.
