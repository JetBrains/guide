---
date: 2021-05-12
title: DataGrip Overview
topics:
  - databases
author: hs
subtitle: This is the overview video of DataGrip, the SQL IDE from JetBrains.
thumbnail: ./thumbnail.png
video: "https://youtu.be/U5SOD-eeK50"
linkURL: "https://youtu.be/U5SOD-eeK50"
---

The video provides a thorough walkthrough of DataGrip's features, emphasizing its capabilities in enhancing SQL development workflows.

## Adding a New Data Source

- Demonstrates adding a new data source from a wide range of supported databases (SQL and NoSQL).
- Example provided for setting up a PostgreSQL data source.
- Various options like read-only mode, keep alive query, SSH/SSL configurations, and schema selection are highlighted.

## Database Explorer Basics

- Introduction to the database tree on the left side of the DataGrip UI.
- Features like speed search for locating database objects quickly.
- Grouping and organizing data sources to keep them manageable.
- Options to hide unneeded objects using regular expressions.

## ER Diagrams

- Visualization of database schemas in ER diagrams.
- Ability to zoom and explore relationships between tables.

## Copy/Paste and Color Data Sources

- Copying and pasting data source configurations across IDEs.
- Color coding data sources for easy differentiation (e.g., production, staging, test).

## Query Console Basics

- Writing and running SQL queries in the query console.
- Use of live templates to quickly generate common SQL statements.
- Customizing and creating new live templates.

## Code Completion and Formatting

- Intelligent code completion and suggestions for SQL code.
- Handling ambiguous columns and qualifying identifiers.
- Abbreviations for quick code completion (e.g., "ob" for "ORDER BY").

## Inspections

- Real-time code analysis and inspections to highlight errors and issues.
- Example inspections include unresolved references, always true conditions, and potential data loss in DELETE operations.

## Running Queries

- Running queries without selection, lists of possible queries to run, and customizing query execution actions.
- Explain plan feature for analyzing query execution plans.

## Refactorings

- Renaming aliases and tables with automatic updates to all references.
- Reviewing and submitting changes with database change tool.

## Result Tabs and Comparisons

- Naming result tabs using comments.
- Comparing data sets from multiple result tabs.

## Services Tool Window

- Overview of connections and execution times for recent queries.
- In-editor result mode for viewing results directly in context.

## Navigation and Documentation

- Navigating to DDL of tables and other objects.
- Viewing table structure and data without navigating away from the editor.

## Data Editor

- Editing, sorting, and filtering data in tables.
- Copy/paste functionality and editing multiple cells at once.
- Navigation by foreign keys and filtering data with SQL-like syntax.

## Text Search and Paging

- Text search within data sets and client-side search capabilities.
- Configuring page size for result sets.
- Using full-text search for more complex searches.

## Data Export and Import

- Extracting data in various formats (e.g., SQL, JSON, CSV).
- Exporting data sets to different databases.
- Importing data from CSV files into the database.

## Modifying and Generating SQL

- Modifying tables through the modify table window.
- Generating SQL for existing database objects.
- Using pg_dump for PostgreSQL and MySQL.

## Editing Source Code of Procedures and Views

- Updating source code for routines and views.
- Synchronizing source codes across multiple data sources.

## Text Editor Capabilities

- Useful shortcuts for editing code (delete line, duplicate line, comment line).
- Multiple cursors and text search with completion.

## Files Tool Window

- Attaching directories to the files tool window for easier management of work files.
- Running SQL queries from external files with full context-aware assistance.

## Version Control System Integration

- Integration with Git for commits, commits & pushes, and viewing diffs.
- Working with dump files and running larger scripts through run configurations.

## DDL Data Source

- Creating DDL data sources to represent database structures without actual data.

## Plugins

- Utilizing the JetBrains marketplace for additional functionality through plugins.
- Examples include color themes, string manipulation, language support, and more.
