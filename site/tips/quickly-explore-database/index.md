---
date: 2022-10-20
title: Quickly Explore Database Tables in any JetBrains IDE
topics:
  - data
  - databases
author: hs
subtitle: How does exploring your database without writing a single line of SQL sound?
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://youtu.be/hEg40WdXsDg"
---

## The Problem

Do you want to quickly explore the tables in your database without needing to write a single query? In our last video, we saw how the IDE can help us speed up queries. Let’s use a couple of these tricks to check out the best restaurant locations serving seafood. We can see functions like expanding the column names from the star wildcard, and letting the IDE complete the JOIN statement for us.

## The Solution

These queries are definitely faster to write, but what if I want to be lazy? Is there a way to get out of querying altogether? With the IDE, you can get to know your database without having to write any code at all. For example, we can use Quick Documentation to see the table DDL statement and top 10 rows.

This is a great start, but I want to really start exploring my data. Not a problem! Simply select the table you want to have a look at, …
and press F4 to open the data editor.

In order to find those best seafood restaurants that we were looking at earlier, we can use the filtering and sorting pane. We can type our WHERE clause here, to filter the table to only Seafood restaurants, and here, we can add in our ORDER BY to get the best rated ones.

Actually, this still feels like too much work. What about ordering the table simply by clicking the column we want to use for sorting, one click for ascending, and two for descending.

If the table view is feeling a bit too big, we can also hide some columns, and to hide multiple columns, open the columns list, and press space over every column you don’t want to see.

And don’t worry, we didn’t forget about exploring table joins! To find those restaurant locations with the best seafood, we can press CMD-Down on highlighted rows. Which will take us to all of the rows that join to them in other tables. As long as we have our foreign keys set up properly, the IDE will do the work for us.

Ok, what if I told you you can do full-text search on all fields in a table in one go? Just press CMD-f to change our filtering and sorting pane into a text search. Apart from being able to do simple string matching, we can also use advanced options like case sensitivity, whole word matching, or regex matching. We can also filter the table to only the matching rows!

Not enough for you? Well, you can also do full-text search across your entire schema or even the entire database! As you can see, you also have a range of options here to make your search as broad or targetted as you like. And again, you have a range of options here to make your search more targeted.

You can see that the IDE has found the string “Seafood” in three tables. Let’s have a look at some recipes that have matched our search.
This opens another data editor, which contains only those rows that have “Seafood” in one of the fields.

We can play around with these results just as with the other data editors, doing further filtering, sorting or joining. With the IDE, database exploration is only a few clicks of a button away.
