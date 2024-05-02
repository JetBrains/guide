---
date: 2024-03-04
title: Speed up your Django queries
topics:
  - django
  - databases
  - web
author: sb
subtitle: Optimising queries beyond the N + 1 problem.
seealso:
  - title: (documentation) Django support in PyCharm
    href: >-
      https://www.jetbrains.com/help/pycharm/django-support7.html
  - title: (documentation) Django Database optimization
    href: >-
      https://docs.djangoproject.com/en/5.0/topics/db/optimization/
thumbnail: ./thumbnail.png
video: "https://youtube.com/embed/mewTap8ZQ6w"
obsoletes:
  - /python/tips/django-query-speed-up/
---

You have enabled [django-debug-toolbar](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html) to investigate a slow page load time, and it shows that you have a database query taking over 2 seconds!

Here are 2 tips to speed up that database query.

## Only select the data you need

In the query, check which fields are being selected from the database.

Some fields greatly increase the amount of data being transferred, such as a large `TextField`, or require expensive processing to convert them to Python objects.

Django will select all fields by default. If you do not need to use all fields, either:

- Use [`defer()`](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#django.db.models.query.QuerySet.defer) passing the names of the fields you do not want Django to load.
- Use [`only()`](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#only) passing the names of the fields you only want Django to load.

## Add a database index

Adding a database indexes to columns used in the `WHERE` clause or in the `JOIN` clauses of a SQL query usually result in a large performance boost.

The `WHERE` clause in Django is driven by the fields you reference in `.filter()`.

The `JOIN` clauses in Django are mostly driven by `ForeignKey` fields referenced in a `.select_related()`. Django indexes `ForeignKey` fields by default!

It is worth investigating adding a database index to fields used in `.filter()`. The easiest way to add a database index to a field is to add `db_index=True` to the field definition.

The SQL panel in `django-debug-toolbar` has a link to `EXPLAIN` each query. Within **DETAIL** you can see the database `SCAN` and whether this is `USING INDEX` to see whether that query uses the generated database index.
