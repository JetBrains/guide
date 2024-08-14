---
date: 2023-08-02
title: Working with SQLite Databases in any JetBrains IDE
topics:
  - databases
author: hs
subtitle: Connect to your SQLite database easily inside your JetBrains IDE.
thumbnail: ./thumbnail.png
video: "https://youtu.be/Qw_JniULJBI"
linkURL: "https://youtu.be/Qw_JniULJBI"
---

## The Problem

So, you need to work with a SQLite database. You could do everything through the command line … but what if I told you that there’s a better way?

We have our SQLite database “recipes” here, and we want to know what’s inside. We first need to connect to our database using the sqlite3 command, and then get the list of tables using the tables dot command. Then to have a look at what’s inside our tables, we need to follow that up with the schema dot command.

## The Solution

What about doing a simple query to find the most delicious, easy pasta recipes? Well, we’ll first need to start our SELECT statement and add the column names, then add our table name, then add in the WHERE clause, oh, and then order it all by difficulty.

Once that’s done, we end up with all of our data in plain text. We’d need to copy and paste it into a CSV parser just to look at it properly!

Luckily the IDE offers us not only a solution to start exploring our database, but a super lazy solution. All we need to do is open the Database tool window in the IDE, and then drag and drop our SQLite database into it to make the connection.

As you can see, the IDE has already prepopulated all the fields, and will even download the database drivers we need with one click! We just go ahead and click OK to finish up.

And Voilà! The IDE has introspected the contents of our entire database, and at a glance we can see everything, down to the schemas of individual tables! Although this is not a dedicated SQL IDE, you can run native SQL code in a console attached to this database.

We can now write that same query that we wrote in the command line, but much more comfortably. You can see that the IDE is really helping us here, giving us suggestions for not only the SQL commands, but also the column names.

The IDE also helps us check when we’ve made mistakes in our SQL queries. …
It not only helpfully highlights errors in red, but gives us an indication of what we’ve done wrong.

Remember the yucky plain text we got when we used the command line? Let’s see what happens when we run the same query using the IDE.

Now look at this beautiful interactive table. This is a lot nicer to read, and we’ve got new ways of exploring the data, such as sorting columns by clicking the header, or transposing the data, which helps with viewing a lot of columns.

You can also export the results of queries into a huge range of formats, from your usual CSV flavours to SQL insert statements, and even Markdown.

And finally, you can even send this result back to the database as a new table with a few clicks. All we need to do here is select “Copy to database”, select our database as the target schema, and give the table the name we’d like to call it.

And there we have it, a new table with only our most delicious pasta recipes. SQLite databases in half the time and double the fun.
