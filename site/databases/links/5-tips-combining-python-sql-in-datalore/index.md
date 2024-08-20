---
date: 2022-07-28
title: 5 Tips for Combining Python and SQL in Datalore
topics:
  - databases
author: ag
subtitle: What if you could use Python and SQL inside of one tool?
thumbnail: ./thumbnail.png
video: "https://youtu.be/5lPTshUFpW8"
linkURL: "https://youtu.be/5lPTshUFpW8"
---

SQL is extremely good for data retrieval and calculating basic statistics, whereas Python comes into its own when you need in-depth, flexible exploratory data analysis or data science. What if you could use both programming languages inside of one tool?

## Introduction to DataLore

- DataLore is an all-in-one notebook environment designed for data-driven teams.
- Supports smart coding assistance for Python, SQL, R, and Scala.
- Features include real-time collaboration, interactive and static report sharing, and the ability to host on-premises.

## Tip 1 - Native SQL and Database Connections

- DataLore allows native database connections without writing code, supporting various databases like Postgres, MySQL, and Snowflake.
- Database credentials are securely managed and not exposed in the notebook environment.
- These connections can be reused across multiple notebooks and shared within team workspaces.

## Tip 2 - Creating and Using SQL Cells

- Native SQL cells can be created directly within DataLore notebooks, with support for SQL code completion.
- The result of SQL queries can be saved directly into a Pandas DataFrame for further analysis in Python.
- Example: Executing a SQL query to fetch data, saving results to a DataFrame, and conducting exploratory data analysis.

## Tip 3 - Interactive Controls and Parameterization

- DataLore supports native interactive controls such as drop-downs, sliders, checkboxes, and text inputs.
- These controls can be used to parameterize SQL queries, enhancing interactivity and saving costs on data retrieval.
- Example: Creating a drop-down for customer types and using this to parameterize SQL queries.

## Tip 4 - Visualization and Analysis

- DataLore provides built-in visualization capabilities with a "Visualize" tab, supporting common charts and plots without writing code.
- Supports popular Python visualization libraries like Matplotlib, Seaborn, Plotly, and Bokeh.
- Example: Creating plots to analyze customer behavior, visualizing time series data, and customizing plots using Python code.

## Tip 5 - Sharing and Automating Reports

- Notebooks can be shared as interactive reports with stakeholders who don't need a DataLore account.
- Reports can be scheduled to update automatically, ensuring that stakeholders always see the latest data.
- Example: Publishing a report with interactive controls, scheduling notebook runs, and enabling email notifications for task failures.

## Additional Features and Flexibility

- Full Python environment allows for extensive customization and use of various libraries.
- Background computation support for long-running queries.
- DataLore can be installed on local machines or cloud environments using Docker or Kubernetes for enhanced computational power.

## Q&A Highlights

- DataLore Community Plan users can try SQL cells and database connections for 30 days for free.
- Future support for more complex SQL operations like CREATE TABLE is planned.
- Advanced customization for visualizations is available, with full support for Python plotting libraries.

## How to Get Started

- Users can try DataLore Community or Pro for free.
- Documentation and blog posts are available to help with onboarding and feature utilization.
