---
date: 2022-09-06
title: Turbocharging SQL Queries
topics:
  - data
  - databases
  - platform
author: hs
subtitle: >-
  Want to take your SQL query speed to the next level? This video will explore
  how your JetBrains IDE can help you achieve faster SQL queries.
thumbnail: ./thumbnail.png
video: "https://youtu.be/-MFoSwcPkb4"
---

Learn SQL tips and SQL optimization techniques as we delve into query performance and utilizing Live Templates for SQL automation. Discover how your JetBrains IDE features and IDE Productivity enhancements can make SQL techniques more efficient. This tutorial covers SQL optimization tips, improving query speed, and harnessing the power of your JetBrains IDE for faster and more productive database work.

## The Problem

So, who’s up for a few hours of typing out variations of the same SQL queries? You’ve just got access to a hot new database and you can’t wait to explore the contents. Let’s have a closer look at this recipes table here. We’ll start by writing a top 10 query to check out what’s inside.

```sql
SELECT *
FROM recipes
LIMIT 10;
```

This `cuisine_type` field looks interesting, let’s see how frequent each category in this field is. So first we’ll pop in the cuisine_type column name, aAnd then a COUNT() function, then the table name, then the group by, oh, and then order it all by `cuisine_type`.

Let’s keep exploring. The ingredients table has a category field that we might want to also have a peek at. So let’s copy and paste the previous query, and then replace the `cuisine_type` field with category in all the places. Then replace the table name, and finally, we can run this query and check out the data.

## The Solution

Luckily, the IDE has a bunch of functionality that lets us cut out a lot of this manual work. Let’s start with a trick that helps us avoid using the STAR wildcard.

We can hit Alt- or Option-ENTER next to this wildcard …
And the IDE will expand the column list for us!

Instead of manually typing out each column name, we can instead bring up the context menu by pressing <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux), and let the IDE expand the column list for us, and we can now just go ahead and delete any of the fields we don’t want to retrieve!

If we do need to type out columns, or anything really, the IDE’s sophisticated code completion makes this a breeze. What about JOIN statements?
Well, if we have the table foreign keys properly set up, or the join columns have the same name, the IDE will do the work for us, detecting the correct columns and automatically creating the table aliases.

After this, we can select the “qualify identifier” context action. By using our trusty Alt- or Option-ENTER shortcut, and save the boilerplate of typing out each table alias!

Remember all of that boring copying and pasting we had to do earlier? We can get rid of all of that using Live Templates, which are templates of frequently used queries. To create a new Live Template, we just need to go to this section within Settings or Preferences, and select “Add” under “SQL”.

Let’s say we want to template a query to get descriptive statistics. We can enter the query here, and replace the column name, and the table name with variables.

We can then call this template in our console with the abbreviation of our choice. We can now easily use this template to get descriptive stats for any field in any table! With the IDE, cut out the boring stuff and crank out those queries!
